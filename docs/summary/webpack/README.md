# webpack配置

## 安装

- 需要先在项目中npm init初始化一下，生成package.json
- 建议node版本安装到8.2以上

```
// webpack4中除了正常安装webpack之外，需要再单独安一个webpack-cli
npm i webpack webpack-cli -D
```

npm i -D 是 npm install --save-dev 的简写，是指安装模块并保存到 package.json 的 devDependencies中，主要在开发环境中的依赖包

## 运行

webpack4可以支持0配置打包，这里所说的0配置又是什么呢？当然在开发者眼中0配置的东西，那根本是无法用的，因为不够智能，那么我们就来看看做到了哪些0配置。

在使用webpack进行打包的时候，默认情况下会将src下的入口文件(index.js)进行打包

```
// node v8.2版本以后都会有一个npx
// npx会执行bin里的文件

npx webpack     // 不设置mode的情况下 打包出来的文件自动压缩

npx webpack --mode development  // 设置mode为开发模式，打包后的文件不被压缩
```

当执行npx webpack命令的时候，webpack会自动查找项目中src目录下的index.js文件，然后进行打包，生成一个dist目录并存在一个打包好的main.js文件

配置

在项目下创建一个webpack.config.js(默认，可修改)文件来配置webpack

```
module.exports = {
    entry: '',               // 入口文件
    output: {},              // 出口文件
    module: {},              // 处理对应模块
    plugins: [],             // 对应的插件
    devServer: {},           // 开发服务器配置
    mode: 'development'      // 模式配置
}
```

★ 启动devServer需要安装一下webpack-dev-server

```
npm i webpack-dev-server -D
```

```
// webpack.config.js

const path = require('path');

module.exports = {
    entry: './src/index.js',    // 入口文件
    output: {
        filename: 'bundle.js',      // 打包后的文件名称
        path: path.resolve('dist')  // 打包后的目录，必须是绝对路径
    }
}
```

上面就可以说是实现了最简单的webpack配置了，那接下来就打包一下看看

## 配置执行文件

工作当中我们打包编译的时候一般都执行npm run dev这样的命令，既然是通过npm执行的命令，我们就应该找到package.json里的执行脚本去配置一下命令

**npm run build**就是我们打包后的文件，这是生产环境下，上线需要的文件
**npm run dev**是我们开发环境下打包的文件，当然由于devServer帮我们把文件放到内存中了，所以并不会输出打包后的dist文件夹
通过npm run build之后会生成一个dist目录文件夹，就和上面打包后的样子一样了

## 多入口文件

多个入口可以有两种实现方式进行打包

- 一种是没有关系的但是要打包到一起去的，可以写一个数组，实现多个文件打包
- 另一种就是每一个文件都单独打包成一个文件的
- 下面就来看看这两种方式的写法

```
let path = require('path');

module.exports = {
    // 1.写成数组的方式就可以打出多入口文件，不过这里打包后的文件都合成了一个
    // entry: ['./src/index.js', './src/login.js'],
    // 2.真正实现多入口和多出口需要写成对象的方式
    entry: {
        index: './src/index.js',
        login: './src/login.js'
    },
    output: {
        // 1. filename: 'bundle.js',
        // 2. [name]就可以将出口文件名和入口文件名一一对应
        filename: '[name].js',      // 打包后会生成index.js和login.js文件
        path: path.resolve('dist')
    }
}
```















































