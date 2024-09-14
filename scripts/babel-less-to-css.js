// https://github.com/umijs/father/blob/father-build%401.22.5/packages/father-build/src/getBabelConfig.ts#L25

const transformImportLess2Css = () => {
  return {
    name: 'transform-import-less-to-css',
    visitor: {
      ImportDeclaration(path) {
        const re = /\.less$/;
        if (re.test(path.node.source.value)) {
          path.node.source.value = path.node.source.value.replace(re, '.css');
        }
      },
    },
  };
};

module.exports = transformImportLess2Css;
