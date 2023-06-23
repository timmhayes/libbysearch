jestPreviewConfigure({ autoPreview: true });

import '@testing-library/jest-dom';
import { jestPreviewConfigure } from 'jest-preview'
import './index.scss';

jestPreviewConfigure({
  // Opt-in to automatic mode to preview failed test case automatically.
  autoPreview: true,
})
