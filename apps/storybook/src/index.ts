import { readFile } from 'node:fs/promises';
import { createServer, type IncomingMessage } from 'node:http';
import { resolve } from 'node:path';
import { componentLibrary } from '@jarvis/manifest';
import type { LibraryManifest } from '@jarvis/manifest';
import { createStories } from './stories';

async function loadManifestData(): Promise<LibraryManifest> {
  try {
    const raw = await readFile(resolve(process.cwd(), '../../packages/jarvis-manifest/generated/library.manifest.json'), 'utf8');
    return JSON.parse(raw) as LibraryManifest;
  } catch {
    return {
      generatedAt: new Date().toISOString(),
      components: componentLibrary,
      charts: []
    };
  }
}

loadManifestData().then((data) => {
  const stories = createStories(data);

  function renderLayout(title: string, body: string): string {
    return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${title} | Jarvis Storybook</title>
    <style>
      body { font-family: 'IBM Plex Sans', sans-serif; margin: 0; background: #f8fafc; color: #111827; }
      .shell { display: grid; grid-template-columns: 18rem minmax(0, 1fr); min-height: 100vh; }
      nav { background: #0f172a; color: white; padding: 1.5rem; }
      nav a { color: #a7f3d0; text-decoration: none; }
      nav ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.4rem; }
      main { padding: 2rem; }
      .panel { background: white; border-radius: 1rem; padding: 1.25rem 1.5rem; margin-bottom: 1rem; box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06); }
      .canvas { display: grid; place-items: start; min-height: 12rem; border: 1px dashed #cbd5e1; border-radius: 0.875rem; padding: 1rem; background: #fff; }
      code, pre { background: #eef2f7; border-radius: 0.5rem; }
      pre { padding: 1rem; overflow: auto; }
      .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); gap: 1rem; }
      .card-link { display: block; background: white; border: 1px solid #e2e8f0; border-radius: 0.875rem; padding: 1rem; text-decoration: none; color: inherit; }
      @media (max-width: 900px) { .shell { grid-template-columns: 1fr; } }
    </style>
  </head>
  <body>
    <div class="shell">
      <nav>
        <h1><a href="/">Jarvis Storybook</a></h1>
        <p>${stories.length} manifest-driven stories.</p>
        <ul>${stories.map((story) => `<li><a href="/stories/${story.id}">${story.componentTag}</a></li>`).join('')}</ul>
      </nav>
      <main>${body}</main>
    </div>
  </body>
</html>`;
  }

  function renderHome(): string {
    return renderLayout(
      'Home',
      `<section class="panel">
        <h1>Story Catalog</h1>
        <p>Isolated preview entries generated from the Jarvis manifest layer.</p>
        <div class="grid">
          ${stories.map((story) => `<a class="card-link" href="/stories/${story.id}"><strong>${story.componentTag}</strong><p>${story.summary}</p></a>`).join('')}
        </div>
      </section>`
    );
  }

  function renderStory(id: string): string {
    const story = stories.find((item) => item.id === id);
    if (!story) {
      return renderLayout('Not Found', `<section class="panel"><h1>Not Found</h1><p>No story exists for this id.</p></section>`);
    }

    return renderLayout(
      story.componentTag,
      `<section class="panel">
        <p><strong>Category:</strong> ${story.category}</p>
        <h1>${story.componentTag}</h1>
        <p>${story.summary}</p>
      </section>
      <section class="panel">
        <h2>Preview</h2>
        <div class="canvas"><code>${story.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></div>
      </section>
      <section class="panel">
        <h2>Source</h2>
        <pre><code>${story.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </section>`
    );
  }

  function route(request: IncomingMessage): string {
    const url = new URL(request.url ?? '/', 'http://localhost:4401');
    const segments = url.pathname.split('/').filter(Boolean);

    if (!segments.length) {
      return renderHome();
    }

    if (segments[0] === 'stories' && segments[1]) {
      return renderStory(segments[1]);
    }

    return renderLayout('Not Found', `<section class="panel"><h1>Not Found</h1></section>`);
  }

  createServer((request, response) => {
    response.setHeader('content-type', 'text/html; charset=utf-8');
    response.end(route(request));
  }).listen(4401);

  console.log('Storybook preview server listening on http://localhost:4401');
});
