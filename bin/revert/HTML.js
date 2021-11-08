
const File = require('@definejs/file');
const Lines = require('@definejs/lines');


module.exports = {

    render(file) {
        let content = File.read(file);

        let code = `$(document.body).append(\`${content} \`);`;

        return code;

    },
};