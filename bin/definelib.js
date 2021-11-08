#!/usr/bin/env node
const { program, } = require('commander');
const pkg = require('../package.json');

program.storeOptionsAsProperties(false);
program.version(pkg.version, '-v, --version');

//定义使用方法。
program.usage('<command> [options]');
program.command('install', 'install modules of `@definelib` from NPM.');
program.command('revert', 'revert defined modules to Node.js modules');


//解析命令行参数。
program.parse(process.argv);

