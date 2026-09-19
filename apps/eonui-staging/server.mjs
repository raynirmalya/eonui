import { createServer } from 'node:http';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const repoRootDir = path.resolve(rootDir, '../..');
const corePackageDir = path.join(repoRootDir, 'packages/eon-core');
const libraryManifestPath = path.join(repoRootDir, 'packages/eon-manifest/generated/library.manifest.json');
const mockScreensRoot = path.resolve(process.env.EONUI_MOCK_SCREENS_ROOT || path.join(repoRootDir, 'docs/mock-screens'));
const mockElementConceptsRoot = path.join(mockScreensRoot, 'eonui-original-element-concepts');
const mockFeatureFormsRoot = path.join(mockScreensRoot, 'eonui-original-feature-form-mocks');
const mockDesignDocsRoot = path.resolve(process.env.EONUI_MOCK_DESIGN_DOCS_ROOT || path.join(repoRootDir, 'docs/eonui-element-design-docs'));
const host = '127.0.0.1';
const port = Number(process.env.PORT || 4310);

const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.map', 'application/json; charset=utf-8'],
  ['.mjs', 'text/javascript; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
]);

function send(res, status, body, contentType) {
  res.writeHead(status, {
    'Content-Type': contentType,
    'Cache-Control': 'no-store',
  });
  res.end(body);
}

function resolveInside(baseDir, requestPath) {
  const safePath = decodeURIComponent(requestPath).replace(/^\/+/, '');
  const resolvedPath = path.resolve(baseDir, safePath);
  const relativePath = path.relative(baseDir, resolvedPath);

  if (relativePath === '..' || relativePath.startsWith(`..${path.sep}`) || path.isAbsolute(relativePath)) {
    return null;
  }

  return resolvedPath;
}

async function readFileIfExists(filePath) {
  try {
    return await fs.readFile(filePath);
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return null;
    }

    throw error;
  }
}

async function readVendorFile(relativePath, resolvedPath) {
  const data = await readFileIfExists(resolvedPath);

  if (!data) {
    return null;
  }

  // The current core build emits a mismatched combined entry filename in dist/esm/index.js.
  // Rewrite it in the staging server so the explorer can use the main workspace build safely.
  if (relativePath === 'dist/esm/index.js') {
    return Buffer.from(
      data
        .toString('utf8')
        .replace('./eon-load-indicator.eon-progress.entry.js', './eon-load-indicator_2.entry.js'),
      'utf8'
    );
  }

  return data;
}

function toPosixPath(value) {
  return value.replaceAll('\\', '/');
}

function createExampleId(...parts) {
  return parts
    .filter(Boolean)
    .join(':')
    .replace(/[^a-zA-Z0-9:_-]+/g, '-');
}

function inferSharedCategories(folderName) {
  const lowerName = folderName.toLowerCase();

  if (lowerName.includes('form')) {
    return ['forms'];
  }

  return ['all'];
}

function addUniqueExample(collection, example) {
  if (!collection.some((candidate) => candidate.id === example.id)) {
    collection.push(example);
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function extractMarkdownSection(markdown, heading) {
  const pattern = new RegExp(`## ${escapeRegExp(heading)}\\r?\\n([\\s\\S]*?)(?=\\r?\\n## |$)`);
  const match = markdown.match(pattern);
  return match?.[1]?.trim() || '';
}

function extractBulletLines(markdown, heading) {
  const section = extractMarkdownSection(markdown, heading);

  if (!section) {
    return [];
  }

  return section
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim());
}

async function buildMockScreenIndex() {
  const folderEntries = await fs.readdir(mockScreensRoot, { withFileTypes: true }).catch((error) => {
    if (error?.code === 'ENOENT') {
      return [];
    }

    throw error;
  });
  const eonuiFolders = folderEntries.filter((entry) => entry.isDirectory() && entry.name.toLowerCase().startsWith('eonui'));
  const components = {};
  const sharedByCategory = {};
  const folders = [];

  for (const folder of eonuiFolders) {
    const folderPath = path.join(mockScreensRoot, folder.name);
    const componentProgressPath = path.join(folderPath, 'component-progress.json');
    const screenManifestPath = path.join(folderPath, 'screen-manifest.json');
    const componentProgressBuffer = await readFileIfExists(componentProgressPath);
    const screenManifestBuffer = await readFileIfExists(screenManifestPath);
    const folderSummary = {
      folder: folder.name,
      componentExamples: 0,
      sharedExamples: 0,
    };

    if (componentProgressBuffer) {
      const componentProgress = JSON.parse(componentProgressBuffer.toString('utf8'));
      const componentItems = Array.isArray(componentProgress) ? componentProgress : componentProgress.components || [];

      for (const item of componentItems) {
        const component = item.component || item.tag || item.name;

        if (!component) {
          continue;
        }

        if (!components[component]) {
          components[component] = [];
        }

        const examples = [
          item.lightImage
            ? {
                theme: 'light',
                image: item.lightImage,
              }
            : null,
          item.darkImage
            ? {
                theme: 'dark',
                image: item.darkImage,
              }
            : null,
        ].filter(Boolean);

        for (const example of examples) {
          addUniqueExample(components[component], {
            id: createExampleId(folder.name, component, example.theme, path.basename(example.image)),
            component,
            folder: folder.name,
            theme: example.theme,
            type: 'component-concept',
            label: `${item.conceptTitle || component} ${example.theme} concept`,
            image: `/mock-screens/${folder.name}/${toPosixPath(example.image)}`,
            category: item.category || '',
            conceptTitle: item.conceptTitle || '',
            docPath: item.docPath || '',
            source: 'component-progress',
          });
          folderSummary.componentExamples += 1;
        }
      }
    }

    if (screenManifestBuffer) {
      const manifestItems = JSON.parse(screenManifestBuffer.toString('utf8'));

      for (const item of Array.isArray(manifestItems) ? manifestItems : []) {
        if (item.component) {
          if (componentProgressBuffer) {
            continue;
          }

          if (!components[item.component]) {
            components[item.component] = [];
          }

          addUniqueExample(components[item.component], {
            id: createExampleId(folder.name, item.component, item.theme || 'default', path.basename(item.image || 'mock')),
            component: item.component,
            folder: folder.name,
            theme: item.theme || 'default',
            type: item.type || 'component-concept',
            label: item.name || `${item.component} ${item.theme || 'reference'} mock`,
            image: `/mock-screens/${folder.name}/${toPosixPath(item.image)}`,
            category: item.category || '',
            conceptTitle: item.name || '',
            docPath: '',
            source: 'screen-manifest',
          });
          folderSummary.componentExamples += 1;
          continue;
        }

        const categories = item.categories?.length ? item.categories : inferSharedCategories(folder.name);

        for (const category of categories) {
          if (!sharedByCategory[category]) {
            sharedByCategory[category] = [];
          }

          addUniqueExample(sharedByCategory[category], {
            id: createExampleId(folder.name, category, item.theme || 'default', path.basename(item.image || 'shared')),
            folder: folder.name,
            theme: item.theme || 'default',
            type: item.type || 'shared-reference',
            label: item.name || `${folder.name} ${item.theme || 'reference'}`,
            image: `/mock-screens/${folder.name}/${toPosixPath(item.image)}`,
            description: item.description || '',
            categories,
            source: 'screen-manifest',
          });
          folderSummary.sharedExamples += 1;
        }
      }
    }

    folders.push(folderSummary);
  }

  return {
    generatedOn: new Date().toISOString(),
    root: mockScreensRoot,
    folders,
    components,
    sharedByCategory,
  };
}

async function buildMockDesignIndex() {
  const componentProgressBuffer = await readFileIfExists(path.join(mockElementConceptsRoot, 'component-progress.json'));
  const featureFormManifestBuffer = await readFileIfExists(path.join(mockFeatureFormsRoot, 'screen-manifest.json'));
  const components = {};
  const sharedByCategory = {};
  const componentProgress = componentProgressBuffer ? JSON.parse(componentProgressBuffer.toString('utf8')) : { components: [] };
  const componentItems = Array.isArray(componentProgress) ? componentProgress : componentProgress.components || [];

  for (const item of componentItems) {
    const component = item.component || item.tag || item.name;

    if (!component) {
      continue;
    }

    const docRelativePath = item.docPath || '';
    const docAbsolutePath = docRelativePath ? resolveInside(mockDesignDocsRoot, docRelativePath) : null;
    const docBuffer = docAbsolutePath ? await readFileIfExists(docAbsolutePath) : null;
    const markdown = docBuffer ? docBuffer.toString('utf8') : '';

    components[component] = {
      component,
      category: item.category || '',
      conceptTitle: item.conceptTitle || '',
      docPath: docRelativePath,
      sections: {
        uniqueDesignDirection: extractBulletLines(markdown, 'Unique Design Direction'),
        fullFeatureStack: extractBulletLines(markdown, 'Full Feature Stack'),
        variantSystem: extractBulletLines(markdown, 'Variant System'),
        templateFirstContract: extractBulletLines(markdown, 'Template-First Contract'),
        stateModel: extractBulletLines(markdown, 'State Model'),
      },
    };
  }

  if (featureFormManifestBuffer) {
    const featureFormItems = JSON.parse(featureFormManifestBuffer.toString('utf8'));
    sharedByCategory.forms = (Array.isArray(featureFormItems) ? featureFormItems : []).map((item, index) => ({
      id: createExampleId('shared-feature-form', item.theme || 'default', index + 1),
      label: item.name || `Shared form concept ${index + 1}`,
      theme: item.theme || 'default',
      type: item.type || 'shared-reference',
      image: item.image || '',
    }));
  }

  return {
    generatedOn: new Date().toISOString(),
    components,
    sharedByCategory,
  };
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${host}:${port}`);

  try {
    if (url.pathname === '/data/library.manifest.json') {
      const data = await readFileIfExists(libraryManifestPath);

      if (!data) {
        send(res, 404, 'Not found', 'text/plain; charset=utf-8');
        return;
      }

      send(res, 200, data, 'application/json; charset=utf-8');
      return;
    }

    if (url.pathname === '/data/eonui-mock-screens.json') {
      const mockIndex = await buildMockScreenIndex();
      send(res, 200, Buffer.from(JSON.stringify(mockIndex, null, 2), 'utf8'), 'application/json; charset=utf-8');
      return;
    }

    if (url.pathname === '/data/eonui-mock-designs.json') {
      const designIndex = await buildMockDesignIndex();
      send(res, 200, Buffer.from(JSON.stringify(designIndex, null, 2), 'utf8'), 'application/json; charset=utf-8');
      return;
    }

    if (url.pathname.startsWith('/vendor/eonui-core/')) {
      const relativePath = url.pathname.slice('/vendor/eonui-core/'.length);
      const resolvedPath = resolveInside(corePackageDir, relativePath);

      if (!resolvedPath) {
        send(res, 403, 'Forbidden', 'text/plain; charset=utf-8');
        return;
      }

      const data = await readVendorFile(relativePath, resolvedPath);

      if (!data) {
        send(res, 404, 'Not found', 'text/plain; charset=utf-8');
        return;
      }

      const contentType = mimeTypes.get(path.extname(resolvedPath)) || 'application/octet-stream';
      send(res, 200, data, contentType);
      return;
    }

    if (url.pathname.startsWith('/mock-screens/')) {
      const relativePath = url.pathname.slice('/mock-screens/'.length);
      const resolvedPath = resolveInside(mockScreensRoot, relativePath);

      if (!resolvedPath) {
        send(res, 403, 'Forbidden', 'text/plain; charset=utf-8');
        return;
      }

      const data = await readFileIfExists(resolvedPath);

      if (!data) {
        send(res, 404, 'Not found', 'text/plain; charset=utf-8');
        return;
      }

      const contentType = mimeTypes.get(path.extname(resolvedPath)) || 'application/octet-stream';
      send(res, 200, data, contentType);
      return;
    }

    const requestPath = url.pathname === '/' ? '/index.html' : url.pathname;
    const resolvedPath = resolveInside(rootDir, requestPath);

    if (!resolvedPath) {
      send(res, 403, 'Forbidden', 'text/plain; charset=utf-8');
      return;
    }

    const data = await readFileIfExists(resolvedPath);

    if (data) {
      const contentType = mimeTypes.get(path.extname(resolvedPath)) || 'application/octet-stream';
      send(res, 200, data, contentType);
      return;
    }

    const fallbackHtml = await fs.readFile(path.join(rootDir, 'index.html'));
    send(res, 200, fallbackHtml, 'text/html; charset=utf-8');
  } catch (error) {
    const message = error instanceof Error ? error.stack || error.message : String(error);
    send(res, 500, message, 'text/plain; charset=utf-8');
  }
});

server.listen(port, host, () => {
  console.log(`eonui-staging available at http://${host}:${port}`);
});

export { server, host, port };
