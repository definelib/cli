
const Fn = require('@definejs/fn');

module.exports = {
    parse(content) {
        let code = `
            let obj = {
                id: '',
                name: '',
                factory: null,
            };

            function define(id, factory) {
                obj.id = id;
                obj.name = id.split('/').slice(-1)[0];
                obj.factory = factory;
            }

            ${content};

            return obj;

        `;

        let obj = Fn.exec(code);
        return obj;
    },
};