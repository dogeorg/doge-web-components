import { mockPlugin } from '@web/mocks/plugins.js';

export default {
  nodeResolve: true,
  files: ['src/**/test.*'],
  plugins: [mockPlugin()],
};