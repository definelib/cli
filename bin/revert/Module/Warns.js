const HintLine = require('@definejs/hint-line');

module.exports = {
    check(file, lines, tokens) {
        if (!tokens || tokens.length == 0) {
            return;
        }

        let has = false;

        lines.forEach((line, no) => {
            tokens.forEach((token) => {
                if (!line.includes(token)) {
                    return;
                }

                has = true;
                console.log(`所在文件:`.magenta, file.yellow);
                console.log(`使用警告:`.magenta, token.bold.blue);

                HintLine.highlight(lines, no, {
                    size: 2,
                    current: 'bgYellow',
                });

                console.log('');
            });
        });

        return has;
    },
};