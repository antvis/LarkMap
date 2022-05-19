import { defineConfig } from 'dumi';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  title: 'LarkMap',
  favicon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
  logo: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
  mode: 'site',
  base: '/',
  publicPath: '/',
  outputPath: 'docs-dist',
  metas: [
    { name: 'keywords', content: 'L7, AntV, AntV LarkMap' },
    { name: 'description', content: '🌍 A React toolkit for geospatial visualization based on L7' },
  ],
  // Google Analytics
  // analytics: isProduction ? { ga: 'G-CBX7JL1Q57' } : false,
  locales: [['zh-CN', '中文']],
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/antvis/LarkMap',
    },
  ],
  themeConfig: {
    carrier: 'Dipper',
  },
  hash: true,
  // 同步 gh-page CNAME 文件
  copy: isProduction ? ['docs/CNAME'] : [],
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
  },
  links: [],
  scripts: [
    'https://gw.alipayobjects.com/os/lib/react/17.0.1/umd/react.development.js',
    'https://gw.alipayobjects.com/os/lib/react-dom/17.0.1/umd/react-dom.development.js',
  ],
  // more config: https://d.umijs.org/config
});
