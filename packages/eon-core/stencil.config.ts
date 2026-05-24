import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'eon',
  srcDir: 'src',
  globalStyle: 'src/global.scss',
  outputTargets: [
    { type: 'dist' },
    { type: 'docs-readme' },
    { type: 'www', serviceWorker: null }
  ],
  testing: {
    browserHeadless: 'new'
  }
};

