#!/usr/bin/env node

//把用 define(id, factory) 包装定义的模块复原成符合 Node.js 的模块。
//当把一个项目的中用 define() 包装定义的模块发布到 npm 时，最好同时提供符合 Node.js 模块定义规范的版本。
//复原转换后的结果会放在 `modules` 目录，与 `define` 目录在同一级目录。
//因此要确保当前目录下存在 `define` 子目录，并且不要在 `modules` 下存放文件（否则会给清空而丢失）。

//
//示例：
// definelib revert

require('colors');

const path = require('path');
const fs = require('fs');
const { program, } = require('commander');
const Directory = require('@definejs/directory');
const File = require('@definejs/file');
const Module = require('./revert/Module');
const HTML = require('./revert/HTML');





let src = path.resolve('./define');
let dest = path.resolve('./modules');
let config = path.resolve('./config.js');

if (!fs.existsSync(src)) {
    console.log(`当前目录下不存在 define 子目录`,)
    return;
}

//解析命令行参数。
program.parse(process.argv);
config = fs.existsSync(config) ? require(config) : {};

Directory.delete(dest);

Directory.each(src, function (dir, files, dirs) {

    files.forEach((file) => {
        let ext = path.extname(file).toLowerCase();
        let name = path.relative( src, file);
        let target = `${dest}/${name}`;

        let content = null;

        switch (ext) {
            case '.js':
                content = Module.render(file, config);
                break;
            
            case '.html':
            case '.htm':
                target = target + '.js';
                content = HTML.render(file);
                
                break;
            
            default:
                content = File.read(file);
                break;
        }


        File.write(target, content);
        console.log(`写入`.bgGreen, target.green);

    });
});