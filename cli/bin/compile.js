const path = require('path');
const { execSync } = require('child_process');

const grainc = path.join(__dirname, 'grainc.exe');

const grain = require('../../compiler/_esy/default/build/default/grain_js/grain_js.bc.js');
console.log(grain);

module.exports = (file, options) => {
  try {
    execSync(`${grainc} --stdlib=${options.stdlib} ${options.cflags ? options.cflags : ''} ${file}`);
    return file.replace(/\.gr$/, '.wasm')
  } catch (e) {
    console.log(e.stdout.toString());
    if (options.graceful) {
      process.exit()
    } else {
      process.exit(1)
    }
  }
}
