const path = require('path');
const less = require('less');
const postcss = require('postcss');
const syntax = require('postcss-less');
const autoprefixer = require('autoprefixer');

const loader = function (lessContent) {
  const cb = this.async();
  this.setOutputOptions({
    ext: '.css',
  });
  postcss([autoprefixer({})])
    .process(lessContent, { syntax })
    .then((result) => {
      // less 转 css
      less.render(result.content, (err, css) => {
        if (err) {
          console.error(err);
          return;
        }
        cb(null, css.css);
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = loader;
