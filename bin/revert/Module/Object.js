
module.exports = {
    render({ lines, beginNo, beginTag, endNo, }) {
        line = lines[beginNo];
        lines[beginNo] = line.replace(beginTag, `module.exports =`);

        line = lines[endNo];
        lines[endNo] = line.slice(0, 1) + line.slice(2); //去掉第二个字符。 如 `});` ---> `};`
        return lines;
    },
};