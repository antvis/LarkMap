const path = require('path');
const fs = require('fs-extra');

const { version } = require('../package.json');

fs.writeFileSync(path.join(__dirname, '..', 'src', 'version.ts'), `export default '${version}'`, 'utf8');
