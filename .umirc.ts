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
  resolve: {
    // 排除公共 API 文档目录
    excludes: ['docs/common'],
  },
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
  extraBabelIncludes: ['@antv/dumi-theme-antv'],
  theme: {
    '@s-site-menu-width': '280px',
    '@primary-color': '#873bf4',
  },
  themeConfig: {
    carrier: 'LarkMap',
  },
  hash: true,
  // 同步 gh-page CNAME 文件
  copy: isProduction ? ['docs/CNAME'] : [],
  devtool: isProduction ? false : 'eval',
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
    antd: 'window.antd',
    lodash: '_',
    'mapbox-gl': 'window.mapboxgl',
    '@turf/turf': 'window.turf',
  },
  styles: [
    'https://gw.alipayobjects.com/os/lib/antd/4.22.2/dist/antd.css',
    'https://api.tiles.mapbox.com/mapbox-gl-js/v1.13.2/mapbox-gl.css',
  ],
  scripts: [
    'https://gw.alipayobjects.com/os/lib/react/17.0.1/umd/react.development.js',
    'https://gw.alipayobjects.com/os/lib/react-dom/17.0.1/umd/react-dom.development.js',
    'https://gw.alipayobjects.com/os/lib/antd/4.22.2/dist/antd.js',
    /** lodash */
    'https://gw.alipayobjects.com/os/lib/lodash/4.17.20/lodash.min.js',
    /** turf */
    'https://gw.alipayobjects.com/os/lib/turf/turf/6.5.0/turf.min.js',
    /** mapbox */
    'https://api.tiles.mapbox.com/mapbox-gl-js/v1.13.2/mapbox-gl.js',
  ],
  // chunks: ['vendors', 'umi'],
  // chainWebpack: function (config) {
  //   config.merge({
  //     optimization: {
  //       splitChunks: {
  //         chunks: 'all',
  //         // minSize: 30000,
  //         // minChunks: 2,
  //         automaticNameDelimiter: '.',
  //         cacheGroups: {
  //           vendor: {
  //             name: 'vendors',
  //             test({ resource }) {
  //               return /[\\/]node_modules[\\/]/.test(resource);
  //             },
  //             priority: 10,
  //           },
  //         },
  //       },
  //     },
  //   });
  // },
  // more config: https://d.umijs.org/config
});
