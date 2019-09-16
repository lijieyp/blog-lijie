# vue移动端适配

由于`viewport`单位得到众多浏览器的兼容，`lib-flexible`这个过渡方案已经可以放弃使用，不管是现在的版本还是以前的版本，都存有一定的问题。建议大家开始使用`viewport`来替代此方案。`vw`的兼容方案可以参阅[《如何在Vue项目中使用vw实现移动端适配》](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)一文。

1.首先把安装amfe-flexible，这里使用npm install

```
npm  install -S amfe-flexible
```

2.在入口文件min.js中引入

```
import 'amfe-flexible/index.js'
```

3.在根目录的index.html 的头部加入手机端适配的meta代码

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
```

4.安装px2rem-loader，这里使用npm install
作用：在开发过程中把px转化rem，前提是ui设计的psd图尺寸大小是750*1334，这样我们在iphone6的模拟机上直接使用所标注的尺寸，在浏览器中px2rem-loader插件会把px自动转化为rem。安装命令如下：

```
npm install px2rem-loader
```

5.px2rem-loader的配置
在build文件夹中的utils.js中添加：

```javascript
const px2remLoader = {
    loader: 'px2rem-loader',
    options: {
      remUnit: 75
    }
  }
```


然后在下面的generateLoaders方法当中，修改：

```javascript
const loaders = [cssLoader,px2remLoader]
```

