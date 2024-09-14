// https://github.com/hexh250786313/blog/issues/30
const { addLoader } = require('father/dist/builder/bundless');

module.exports = async (api) => {
  const loaders = await api.applyPlugins({
    key: 'addPostcssLoader',
    initialValue: [
      {
        key: 'less-to-css',
        test: /\.less$/,
        loader: require.resolve('./loader-less-to-css'), // less 文件转 css 文件
      },
    ],
  });

  loaders.forEach((loader) => addLoader(loader));
};
