const Lines = require('@definejs/lines');

module.exports = {
    parse({ content, id, factory, }) {
        if (!factory) {
            return;
        }

        let type = Array.isArray(factory) ? 'array' : typeof factory;
        let valid = type == 'array' || type == 'function' || type == 'object';

        if (!valid) {
            return;
        }


        let lines = Lines.split(content);
        let quote = `'`;
        let beginTag = `define(${quote}${id}${quote},`;

        let beginNo = lines.findIndex((line) => {
            return line.startsWith(beginTag);
        });

        //尝试双引号。
        if (beginNo < 0) {
            quote = `"`;
            beginTag = `define(${quote}${id}${quote},`; 

            beginNo = lines.findIndex((line) => {
                return line.startsWith(beginTag);
            });
        }

        if (beginNo < 0) {
            return;
        }



        let endTag = type == 'array' ? `]);` : `});`;

        let endNo = lines.findIndex((line) => {
            return line.startsWith(endTag);
        });

        if (endNo < 0 || endNo < beginNo) {
            return;
        }


        return {
            type,
            quote,
            beginNo,
            endNo,
            beginTag,
            endTag,
            lines,
        };

    },
};