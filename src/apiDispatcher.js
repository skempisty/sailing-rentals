/**
 * @api/index.js
 */

const basename = require('path').basename;
const fs = require('fs');

fs.readdirSync(`${__dirname}/api/`).forEach((filename) => {
    if (!/\.js$/.test(filename)) {
        return;
    }

    const name = basename(filename, '.js');
    function load() {
        return require(`./api/${name}`);
    }

    exports.__defineGetter__(name, load);
});
