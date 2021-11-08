
const path = require('path');
const fs = require('fs');
const Directory = require('@definejs/directory');
const File = require('@definejs/file');


module.exports = {


    render(home) {
        let node_modules = `${home}/node_modules/`;
        let src = `${node_modules}@definelib/`;
        let dest = `${home}/@definelib/`;

        Directory.delete(dest);
        Directory.copy(src, dest);


        let list = fs.readdirSync(dest);

        list.forEach((item) => {
            let dir = path.join(dest, item);
            let stat = fs.statSync(dir);
            let isDir = stat.isDirectory();

            if (!isDir) {
                return;
            }

            let home = `${dest}/${item}/`;

            Directory.delete(`${home}/modules/`);
            File.delete(`${home}/config.js`);
            File.delete(`${home}/index.js`);
           
            
        });

       
        Directory.delete(node_modules);
        File.delete(`${home}/package-lock.json`);
        File.delete(`${home}/package.json`);


    },
};