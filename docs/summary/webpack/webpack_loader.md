# loader和插件的使用

## CSS样式处理

### 插入到style标签

```
npm i css-loader style-loader -D
npm i less less-loader -D
```

```
let path = require('path');
// 插件都是一个类，所以我们命名的时候尽量用大写开头
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        // 添加hash可以防止文件缓存，每次都会生成4位的hash串
        filename: 'bundle.[hash:4].js',   
        path: path.resolve('dist')
    },
	module:{//模块
		rules:[
			//css-loader 接续 @import这种语法的
			//style-loader 他是把css插入到head标签中
			//loader的特点 希望单一
			//loader的用法 字符串只用一个loader
			//多个loader需要[]
			//loader的顺序 默认是从右向左执行
			//loader还可以写成对象方式
			{
                test:/\.css$/,
                use:[
                    {
						loader:'style-loader',
						options:{
							insertAt:'top'//css插入到html文档顶部
						}
                    },
                    'css-loader'
                ]
            }，
            //处理less
            {
                test:/\.less$/,
                use:[
                    {
						loader:'style-loader',
						options:{
							insertAt:'top'//css插入到html文档顶部
						}
                    },
                    'css-loader',
                    'less-loader'
                ]
            }
		]
	}
}
```

### 抽离单独css文件，link标签引入

`npm i mini-css-extract-plugin -D`

```
let MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        // 添加hash可以防止文件缓存，每次都会生成4位的hash串
        filename: 'bundle.[hash:4].js',   
        path: path.resolve('dist')
    },
    plugins: [
        // 通过new一下这个类来使用插件
        new MiniCssExtractPlugin({
            filename:'css/main.css'
        })
    ],
    module:{//模块
		rules:[
			{
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader
                    'css-loader'
                ]
            }，
            //处理less
            {
                test:/\.less$/,
                use:[
                    MiniCssExtractPlugin.loader
                    'css-loader',
                    'less-loader'
                ]
            }
		]
	}
}
```

###  添加CSS3前缀

通过postcss中的autoprefixer可以实现将CSS3中的一些需要兼容写法的属性添加响应的前缀，这样省去我们不少的时间

由于也是一个loader加载器，我们也需要先安装一下

```text
npm i postcss-loader autoprefixer -D
```

安装后，我们还需要像webpack一样写一个config的配置文件，在项目根目录下创建一个**postcss.config.js**文件，配置如下：

```text
module.exports = {
    plugins: [require('autoprefixer')]  // 引用该插件即可了
}
```

然后在webpack里配置postcss-loader

```text
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            }
        ]
    }
}
```



## 转化ES6语法

```
npm i babel-loader @babel/core @babel/preset-env -D
npm i @babel/plugin-proposal-class-properties -D
npm i @babel/plugin-proposal-decorators -D
js异步语法转换
npm i @babel/plugin-transform-runtime -D
npm i @babel/runtime -S
npm i @babel/polyfill -S  //include语法不识别
```

```
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                	loader:'babel-loader',
                	options:{ //用babel-loader 需要把es6-es5
                		presets:[
                			'@babel/preset-env'
                		],
                		plugins:[ 
                			'@babel/plugin-proposal-decorators' //装饰器语法
                			'@babel/plugin-proposal-class-properties'//class语法转化
                			'@babel/plugin-transform-runtime'
                		]
                	}
                },
                //包括什么目录
                include:path.resolve(__dirname,'src')
                //排除node_modules
                exclude:/node_modules/
            }
        ]
    }
}
```

```
module.exports = '11'
require('@babel/polyfill')

'aaa'.includes('a')
```

## js语法校验

https://eslint.org/demo/    自定义语法校验最下面下载

```
npm i eslint eslint-loader -D
```

```
module.exports = {
    module: {
        rules: [
        	{
        		test:/\.js$/,
        		use:{
        			loader:'eslint-loader',
        			options:{
        				enforce:'pre'   //previous强制在其他loader之前执行 post强制之后
        			}
        		}
        	},
            {
                test: /\.js$/, //normal  普通的loader
                use: {
                	loader:'babel-loader',
                	options:{ //用babel-loader 需要把es6-es5
                		presets:[
                			'@babel/preset-env'
                		],
                		plugins:[ 
                			'@babel/plugin-proposal-decorators' //装饰器语法
                			'@babel/plugin-proposal-class-properties'//class语法转化
                			'@babel/plugin-transform-runtime'
                		]
                	}
                },
                //包括什么目录
                include:path.resolve(__dirname,'src')
                //排除node_modules
                exclude:/node_modules/
            }
        ]
    }
}
```

### 全局变量引入问题

expose-loader 暴露 全局的loader 内联的loader

```
npm i expose-loader -D
```

```
import $ from 'expose-loader?$!jquery' //把$暴露到window
console.log(window.$)
```

或

```
module.exports = {
    module: {
        rules: [
        	{
        		test:require.resolve('jquery'),
        		use:'expose-loader?$'
        	}
        ]
    }
}
```

给每个模块注入$

```
let webpack = require('webpack')

module.exports = {
    plugins:[
    	new webpack.ProvidePlugin({//在每个模块都注入$
    		$:'jquery'
    	})
    ]
}
```

## 图片处理

```
npm i file-loader url-loader -D
```

如果是在css文件里引入的如背景图之类的图片，就需要指定一下相对路径

```text
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    use: 'css-loader',
                    publicPath: '../'
                })
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,    // 小于8k的图片自动转成base64格式，并且不会存在实体图片
                            outputPath: '/images/',   // 图片打包后存放的目录
                            publicPath:'http://www.dd.com' //在所有img标签前加路径
                        }
                    }
                ]
            }
        ]
    }
}
```

### 页面img引用图片

页面中经常会用到img标签，img引用的图片地址也需要一个loader来帮我们处理好

```text
npm i html-withimg-loader -D
```

```text
module.exports = {
    module: {
        rules: [
            {
                test: /\.(htm|html)$/,
                use: 'html-withimg-loader'
            }
        ]
    }
}
```

### 引用字体图片和svg图片

字体图标和svg图片都可以通过file-loader来解析

```text
module.exports = {
    module: {
        rules: [
            {
                test: /\.(eot|ttf|woff|svg)$/,
                use: 'file-loader'
            }
        ]
    }
}
```

这样即使样式中引入了这类格式的图标或者图片都没有问题了，img如果也引用svg格式的话，配合上面写好的html-withimg-loader就都没有问题了

## 清理dist目录

在我们每次npm run build的时候都会在dist目录下创建很多打好的包，如果积累过多可能也会混乱

所以应该在每次打包之前将dist目录下的文件都清空，然后再把打好包的文件放进去

这里提供一个clean-webpack-plugin插件

```text
npm i clean-webpack-plugin -D
```

```text
let CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    plugins: [
        // 打包前先清空
        new CleanWebpackPlugin('dist')  
    ]
}
```

## html插件

文件都打包好了，但是我们在使用的时候不能在dist目录下去创建一个html文件，然后去引用打包后的js吧，这不合理，实际开发中也不会这样 我们需要实现html打包功能，可以通过一个模板实现打包出引用好路径的html来 这就需要用到一个常用的插件了，html-webpack-plugin，用之前我们来安一下它

```
npm i html-webpack-plugin -D
```

因为是个插件，所以需要在config.js里引用一下的

```
let path = require('path');
// 插件都是一个类，所以我们命名的时候尽量用大写开头
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        // 添加hash可以防止文件缓存，每次都会生成4位的hash串
        filename: 'bundle.[hash:4].js',   
        path: path.resolve('dist')
    },
    plugins: [
        // 通过new一下这个类来使用插件
        new HtmlWebpackPlugin({
            // 用哪个html作为模板
            // 在src目录下创建一个index.html页面当做模板来用
            template: './src/index.html',
            filename:'index.html',
            hash: true, // 会在打包好的bundle.js后面加上hash串
            minify:{
            	removeAttributeQuotes:true,//去除html双引号
            	collapseWhitespace：true //html压缩成一行
            }
        })
    ]
}
```

### 多页面开发，怎么配置多页面

如果开发的时候不只一个页面，我们需要配置多页面，那么需要怎么来搞呢？不用担心，html-webpack-plugin插件自有办法，我们来观望一下

```
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 多页面开发，怎么配置多页面
    entry: {
        index: './src/index.js',
        login: './src/login.js'
    },
    // 出口文件  
    output: {                       
        filename: '[name].js',
        path: path.resolve('dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',   
            filename: 'index.html',
            chunks: ['index']   // 对应关系,index.js对应的是index.html
        }),
        new HtmlWebpackPlugin({
            template: './src/login.html',
            filename: 'login.html',
            chunks: ['login']   // 对应关系,login.js对应的是login.html
        })
    ]
}
```

## html，CSS，js的代码压缩

**html压缩见html-webpack-plugin**

```
npm i optimize-css-assets-webpack-plugin -D
npm i uglifyjs-webpack-plugin -D
```

```
let OptimizeCss = require('optimize-css-assets-webpack-plugin')
let UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
	optimization:{//优化项
		minimizer:[
			new UglifyJsPlugin({
				cache:true,
				parallel:true,
				sourceMap:true
			})//webpack4.0自动配置，不需要单独安装
			new OptimizeCss({
				assetNameRegExp:/\.css$/g,
				cssProcessor:require('cssnano') //cnpm i cssnano -D
			}) //用后js就压缩也许无效，必须配置uglify.js
		]
	}
}
```

## 文件指纹的生成

Hash:和整个项目的构建相关，只要项目文件有修改，整个项目构建的hash值就会更改

Chunkhash:和webpack打包的chunk有关，不同的entry会生成不同的chunkhash值

Contenthash:根据文件内容来定义hash，文件内容不变，则contenthash不变

### js文件指纹的设置

```
module.exports = {
    // 多页面开发，怎么配置多页面
    entry: {
        index: './src/index.js',
        login: './src/login.js'
    },
    // 出口文件  
    output: {                       
        filename: '[name][chunkhash:8].js',
        path: __dirname+'/dist'
    },
}
```

### css文件指纹的设置

```
module.exports = {
    // 多页面开发，怎么配置多页面
    entry: {
        index: './src/index.js',
        login: './src/login.js'
    },
    // 出口文件  
    output: {                       
        filename: '[name][chunkhash:8].js',
        path: __dirname+'/dist'
    },
    plugins: [
        new MiniCssExtractPlugin({  
            filename: '[name][contenthash:8].css',
        })
    ]
}
```

### 图片的文件指纹设置

```
module.exports = {
    // 多页面开发，怎么配置多页面
    entry: './src/index.js',
    // 出口文件  
    output: {                       
        filename: 'bundle.js',
        path: __dirname+'/dist'
    },
    module:{
    	rules:[
    		{
    			test:/\.(png|svg|jpg|gif)$/,
    			use:[{
    				loader:'file-loader',
    				options:{
    					name:'img/[name][hash:8].[ext]'
    				}
    			}]
    		}
    	]
    }
}
```

