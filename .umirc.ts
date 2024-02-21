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
    excludes: ['docs/common', 'docs/blocks/layer-attribute'],
  },
  metas: [
    { name: 'keywords', content: 'L7, Map, React, L7React, ReactMap, AntV, LarkMap' },
    {
      name: 'description',
      content: '🌍 A React toolkit for geospatial visualization based on L7',
    },
  ],
  // Google Analytics
  // analytics: isProduction ? { ga: 'G-CBX7JL1Q57' } : false,
  locales: [['zh-CN', '中文']],
  navs: [
    null,
    {
      title: '周边生态',
      children: [
        {
          title: 'L7',
          path: 'https://l7.antv.antgroup.com',
        },
        {
          title: 'L7Plot',
          path: 'https://l7plot.antv.antgroup.com',
        },
        {
          title: 'L7Draw',
          path: 'https://l7draw.antv.vision',
        },
        {
          title: 'LocationInsight',
          path: 'https://locationinsight.antv.antgroup.com',
        },
        {
          title: 'L7Editor',
          path: 'https://l7editor.antv.antgroup.com',
        },
      ],
    },
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
  exportStatic: {},
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
    'https://gw.alipayobjects.com/os/lib/antd/4.23.6/dist/antd.css',
    'https://api.tiles.mapbox.com/mapbox-gl-js/v1.13.2/mapbox-gl.css',
    '.__dumi-default-navbar { z-index: 1001 !important; }',
    '.__dumi-default-menu { width: 300px !important; }',
    '.__dumi-default-layout { padding-left: 350px !important; }',
  ],
  scripts: [
    ` window._AMapSecurityConfig = {
      securityJsCode: "290ddc4b0d33be7bc9b354bc6a4ca614"
    }`,
    'https://webapi.amap.com/maps?v=2.0&key=6f025e700cbacbb0bb866712d20bb35c',
    'https://gw.alipayobjects.com/os/lib/react/17.0.2/umd/react.development.js',
    'https://gw.alipayobjects.com/os/lib/react-dom/17.0.2/umd/react-dom.development.js',
    'https://gw.alipayobjects.com/os/lib/antd/4.23.6/dist/antd.js',
    /** lodash */
    'https://gw.alipayobjects.com/os/lib/lodash/4.17.20/lodash.min.js',
    /** turf */
    'https://gw.alipayobjects.com/os/lib/turf/turf/6.5.0/turf.min.js',
    /** mapbox */
    'https://api.tiles.mapbox.com/mapbox-gl-js/v1.13.2/mapbox-gl.js',
  ],
    analytics: {
    baidu: 'cf82ae99d09bff40c32ae3dd5c532ae2',
  },
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
