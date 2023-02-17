import { defineConfig } from 'father';

export default defineConfig({
  esm: { output: 'es' },
  cjs: { output: 'lib' },
  // https://github.com/umijs/father/blob/master/docs/config.md#umd
  umd: {
    name: 'LarkMap',
    output: 'dist',
    extractCSS: true,
    externals: {
      lodash: '_',
      'lodash-es': '_',
      react: 'React',
      'react-dom': 'ReactDOM',
      antd: 'antd',
      '@ant-design/icons': 'icons',
      '@antv/l7': 'L7',
      '@antv/l7-draw': 'L7.Draw',
    },
    chainWebpack(memo) {
      memo
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [
          { analyzerMode: 'static', openAnalyzer: false },
        ]);
      return memo;
    },
  },
});
