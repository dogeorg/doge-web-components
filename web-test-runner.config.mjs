import { mockPlugin } from '@web/mocks/plugins.js';
import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  nodeResolve: true,
  files: ['src/**/test.*'],
  plugins: [mockPlugin()],
  concurrentBrowsers: 1,
  concurrency: 2,
  browsers: [
    playwrightLauncher({ product: 'webkit' }),
    playwrightLauncher({ product: 'firefox' }),
    playwrightLauncher({ product: 'chromium' })
  ],
};