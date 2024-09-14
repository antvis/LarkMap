import { defineConfig } from 'father';
import { IFatherBundlessConfig } from 'father/dist/types';

const less2CssConfig: IFatherBundlessConfig = {
  transformer: 'babel', // 使用 babel 编译
  extraBabelPlugins: [
    [
      './scripts/babel-less-to-css.js', // 把文件中的 '.less' 字符转为 '.css'
      { test: '\\.less' },
    ],
  ],
};

export default defineConfig({
  esm: {
    output: 'es',
    ...less2CssConfig,
  },
  cjs: {
    output: 'lib',
    ...less2CssConfig,
  },
  plugins: [
    // less 编译为 css
    './scripts/father-plugin-less.js',
  ],
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
