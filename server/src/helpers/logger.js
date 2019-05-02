const chalk = require('chalk');

global.log = (...params) => console.log(...params);

global.warn = (...params) => console.log(chalk.green.bold(...params));

global.logError = (...params) => console.log(chalk.red.bold(...params));
