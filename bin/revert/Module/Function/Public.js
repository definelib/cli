

module.exports = {
    fix(line, { quote, }, id$pkg) {
        if (!id$pkg) {
            return line;
        }


        let regexp = /\s+require\s*\(\s*["']\S+["']\)?/g;
        let list = line.match(regexp);

        if (!list) {
            return line;
        }

        //替换掉公共模块的引用，如：
        //const TableResizer = require('TableResizer');

        Object.keys(id$pkg).forEach((id) => {
            let pkg = id$pkg[id];
            let s0 = `require(${quote}${id}${quote})`;  //如 `require('TableResizer')`
            let s1 = `require(${quote}${pkg}${quote})`; //如 `require('@definelib/table-resizer')`

            line = line.replace(s0, s1);
        });

        
        return line;
    },

   
};