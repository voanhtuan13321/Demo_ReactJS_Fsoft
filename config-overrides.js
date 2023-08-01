// config-overrides.js
const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    '~': path.resolve(__dirname, 'src/'), // Thay đổi đường dẫn tương ứng với thư mục src của bạn
  })
);
