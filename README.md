# @definelib/cli

用于下载和发布在 web 项目中用 `define` 定义的模块和组件。

在 web 项目中，用 `define` 定义的模块和组件，如果想发布到 npm 上共享，需要先进行一些转换。  
同时，如果想在 web 项目使用这种用 `define` 定义的模块和组件，需要先进行下载。  
`@definelib/cli` 命令工具提供了这样的功能，可以很方便进行发布和下载。  

## 安装
建议使用全局安装，以便可以在任一目录中使用命令。

``` bash
npm install -g @definelib/cli

```

## 使用

### definelib install

安装 @definelib 下的包。  
安装后的包会放在 <package-name> 目录下的 `@definelib` 子目录中。  
直接拷贝 `@definelib` 子目录到项目中使用即可。  

示例：  
definelib install <package-name> [--force|-f]  
definelib install gridview  
definelib insgtall gridview -f  


### definelib revert
把用 define(id, factory) 包装定义的模块复原成符合 Node.js 的模块。  
当把一个项目的中用 define() 包装定义的模块发布到 npm 时，最后同时提供符合 Node.js 模块定义规范的版本。  
复原转换后的结果会放在 `modules` 目录，与 `define` 目录在同一级目录。  
因此要确保当前目录下存在 `define` 子目录，并且不要在 `modules` 下存放文件（否则会给清空而丢失）。  


示例：
definelib revert