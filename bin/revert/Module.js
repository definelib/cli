
require('colors');

const File = require('@definejs/file');
const Lines = require('@definejs/lines');

const Define = require('./Module/Define');
const Factory = require('./Module/Factory');
const ObjectRender = require('./Module/Object');
const FunctionRender = require('./Module/Function');
const Warns = require('./Module/Warns');




module.exports = {

    /**
     * 指定的文件中解析出模块的名称等信息。
     * @param {string} file 模块文件的路径。
     */
    render(file, config) {
        let { id$pkg, warns, } = config;
        let content = File.read(file);
        let { id, name, factory, } = Define.parse(content);
        let info = Factory.parse({ content, id, factory, });

        if (!info) {
            throw new Error(`无法解析: ${file}`);
        }


        let { type, lines, } = info;


        //针对 factory 为 function 的。
        if (type == 'function') {
            lines = FunctionRender.render(name, info, id$pkg);
        }
        else {
            //针对 factory 为对象或数组。
            lines = ObjectRender.render(info);
        }

        let hasWarn = Warns.check(file, lines, warns);
        if (hasWarn) {
            throw new Error(`有警告，请先处理。`);
        }



        return Lines.join(lines);

    },



};