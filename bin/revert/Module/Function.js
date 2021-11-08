const Public = require('./Function/Public');
const Private = require('./Function/Private');

module.exports = {
    render(name, info, id$pkg) {
        let { lines, beginNo, endNo, quote, } = info;

        //针对 factory 为 function 的。
        for (let no = beginNo + 1; no < endNo; no++) {
            let line = lines[no];

            if (line.startsWith(`    `)) {
                line = line.slice(4);
            }

            line = Public.fix(line, { quote, }, id$pkg);
            line = Private.fix(line, { quote, name, });

            if (line.startsWith(`return `)) {
                line = `module.exports = ` + line.slice(`return `.length);
            }

            lines[no] = line;
        }

        lines[beginNo] = '';
        lines[endNo] = '';

        return lines;
    },
};