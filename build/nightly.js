const package = require('../package.json');
const fs = require('fs');

const time = new Date().toISOString().split('T')[0].replace(/\W/g, '');
package.version = (package.version + '-nightly.' + time).replace(/\r?\n|\r/g, '');
fs.writeFile('./dist/package.json', JSON.stringify(package), 'utf8', (error) => {
  if (error) {
    throw error;
  }
  return console.log('package.json set to ' + package.version);
});