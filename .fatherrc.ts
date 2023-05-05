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
      '@antv/l7': 'L7',
      '@antv/l7-draw': { root: ['L7', 'Draw'], commonjs2: '@antv/l7-draw', commonjs: '@antv/l7-draw' },
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
