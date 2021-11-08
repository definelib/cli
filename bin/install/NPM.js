
require('colors');

const { exec, } = require('child_process');
const ora = require('ora');

const Home = require('./NPM/Home');
const Package = require('./NPM/Package');



module.exports = {

    download(name, force) {
        let home = Home.init(name, force);

        if (!home) {
            return;
        }


        let loading = ora();
        let pkg = `@definelib/${name}`;

        //先初始化一个空的 package.json 文件，
        //可以避免安装到含有 package.json 的父目录中。
        let cmd = `npm init -y && npm install ${pkg}`; 

        console.log('Start installing...'.blue);
        loading.start(cmd.blue); //出现加载图标。


        exec(cmd, { 'cwd': home, }, function (error, stdout, stderr) {
            if (error) {
                console.log('');
                console.log(`install failed.`.red);
                loading.fail();
                console.log(error);
                return;
            }


            Package.render(home);

            loading.succeed();
            console.log('');
            console.log('install completed!'.green);
            
            

        });
    },
};