#!/usr/bin/env node

//安装 @definelib 下的包。
//安装后的包会放在 <package-name> 目录下的 `@definelib` 子目录中。
//直接拷贝 `@definelib` 子目录到项目中使用即可。
//示例：
//  definelib install <package-name> [--force|-f]
//  definelib install gridview
//  definelib insgtall gridview -f

const { program, } = require('commander');
const NPM = require('./install/NPM');

program.usage('<package-name>');
program.option('-f, --force', 'force overwite the target directory when it is existed.');
program.parse(process.argv);


let opts = program.opts();
let args = program.args;

if (args.length < 1) {
    return program.help();
}

let name = args[0];

NPM.download(name, opts.force);