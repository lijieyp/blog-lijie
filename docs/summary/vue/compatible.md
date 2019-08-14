# 浏览器兼容

## JS兼容
vue可通过`babel-polifill`兼容所有支持es5的浏览器
### `babel-polifill`安装配置
安装npm包
```bash
cnpm install --save-dev -babel-polyfill
```
引入`babel-polifill`的三种方法
```bash
1.require("babel-polyfill");

2.import "babel-polyfill";

3.module.exports = {

　　entry: ["babel-polyfill", "./app/js"]

};
```
设置`.babelrc`,添加配置`"useBuiltIns": "entry"`
```bash
"presets": [
    ["env", {
      "modules": false,
      "useBuiltIns": "entry",
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "stage-2"
  ],
  "plugins": ["transform-vue-jsx", "transform-runtime"]
```
::: warning 警告
如果项目中使用第三方ui库,例如iview,则需要注意,如果在main.js里通过Vue.use(iview)全局引用
了iview,那么在组件中使用iview组件时候,一定不要在单独import个别组件,否则会在ie浏览器中引发错误
:::
::: warning 警告
组件属性不要写两次,在ie里会报错,严重错误,页面不会显示
例如 `show-elevator` 声明两次
```vue
 <Page show-elevator show-total @on-change="changeNo" @on-page-size-change="changeSize" :page-size="prop_pageSize"
            :current="prop_pageNo" :total="prop_total" show-elevator/>
```
:::
## CSS兼容
vue-cli创建项目已经内置了postss+autoprefixer,为不同浏览器自动添加了前缀.

## IE兼容要点

* 如果项目中使用了flex流式布局,那么ie9是不支持的,最低要求是ie10

* Iview使用的不支持ie的js语句:
table组件中使用了classList,最低支持ie10(不完全)

* Class extends无法在ie中正确使用,静态函数无法继承所以弃用

* axios全局error修正return error 改为return Promise.reject(error);否则在ie浏览器下错误也会进入then

* Ie11下,内部元素如果使用absolute,z-index要大于等于容器的z-index,否则会被背景图挡住

* Ie不支持设置背景透明时使用类似#ffffffee的方式

* 由于Chrome、iOS 等相继限制非安全域的定位请求所以http资源定位的文件可能会加载失败,建议升级到https

* 如果form表单中使用了excat类型的组件需要确保在业务数据中存在此字段

## IE兼容问题汇总

### css打包之后过大
```bash
1.需要安装两个插件(extract-text-webpack-plugin,css-split-webpack-plugin)
2.在webpack.base.config.js中加入以下代码
plugins: [
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      allChunks: true,
    }),
    new CSSSplitWebpackPlugin({
      size: 4000,
      filename: 'static/css/[name]-[part].[ext]'
    })
  ]
3.将vue-loader.config.js中的isProduction值改为true
```

### ie9 不兼容window.console方法
将代码放在index.html中即可
```bash
try{
        console.log(11)
      }catch (e){
        ;(function(g) {
          'use strict';
          var _console = g.console || {};
          var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'exception', 'error', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];

          var console = {version: '0.1.0'};
          var key;
          for(var i = 0, len = methods.length; i < len; i++) {
            key = methods[i];
            console[key] = function (key) {
              return function () {
                if (typeof _console[key] === 'undefined') {
                  return 0;
                }

                Function.prototype.apply.call(_console[key], _console, arguments);
              };
            }(key);
          }

          g.console = console;
        }(window));
      }
```
### 兼容requestAnimationFrame
在main.js中加入以下代码
```bash
(function () {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
      window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () { callback(currTime + timeToCall); },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }
}());
```
### webpackJsonp未定义

更改webpack-dev-server版本为2.71或更低（npm install --save-dev webpack-dev-server@2.7.1）


### 兼容postMessage

postMessage在ie9中不支持传输对象，只支持传输字符串（建议使用json序列化）


### 兼容dataset(下拉框无法选中)
```bash
if (window.HTMLElement) {
  if (Object.getOwnPropertyNames(HTMLElement.prototype).indexOf('dataset') === -1) {
    Object.defineProperty(HTMLElement.prototype, 'dataset', {
      get: function () {
        var attributes = this.attributes; // 获取节点的所有属性
        var name = [];
        var value = []; // 定义两个数组保存属性名和属性值
        var obj = {}; // 定义一个空对象
        for (var i = 0; i < attributes.length; i++) { // 遍历节点的所有属性
          if (attributes[i].nodeName.slice(0, 5) === 'data-') { // 如果属性名的前面5个字符符合"data-"
            // 取出属性名的"data-"的后面的字符串放入name数组中
            name.push(attributes[i].nodeName.slice(5));
            // 取出对应的属性值放入value数组中
            value.push(attributes[i].nodeValue);
          }
        }
        for (var j = 0; j < name.length; j++) { // 遍历name和value数组
          obj[name[j]] = value[j]; // 将属性名和属性值保存到obj中
        }
        return obj; // 返回对象
      },
    });
  }
}
```
### 不兼容scrollTo
```bash
toTop(el){
    if (el && el.scrollTo) {
        el.scrollTo(0, 0);
    } else {
        el.scrollTop = 0;
    }
}
```
### 项目内路由跳转避免使用location.href
```bash
jump(){
    location.href = '/#/about'
}
```
浏览器地址栏url变了，然而页面没有发生改变！
应使用如下方法.
```bash
jump(){
    let url = '/#/about';
    let path = url.split('#')[1];
    this.$router.push(path);
}
```
### 兼容classList（ie9）
```bash
错误信息：
无法获取未定义或 null 引用的属性“add”
无法获取未定义或 null 引用的属性“remove”
如果你查看sourceMap发现了classList().add或classList.remove()等等，那肯定是classList的问题了。
解决方案：添加以下代码到main.js
if (!('classList' in document.documentElement)) {
    Object.defineProperty(HTMLElement.prototype, 'classList', {
        get: function () {
            var self = this;
            function update(fn) {
                return function (value) {
                    var classes = self.className.split(/\s+/g);
                    var index = classes.indexOf(value);

                    fn(classes, index, value);
                    self.className = classes.join(' ');
                };
            }

            return {
                add: update(function (classes, index, value) {
                    if (!~index) classes.push(value);
                }),

                remove: update(function (classes, index) {
                    if (~index) classes.splice(index, 1);
                }),

                toggle: update(function (classes, index, value) {
                    if (~index) { classes.splice(index, 1); } else { classes.push(value); }
                }),

                contains: function (value) {
                    return !!~self.className.split(/\s+/g).indexOf(value);
                },

                item: function (i) {
                    return self.className.split(/\s+/g)[i] || null;
                },
            };
        },
    });
}
```
## iview组件库兼容

1、iview 的table组件中的selection列在ie中会因为宽度过窄而出现三个点（建议最低为60）

2、iview 的modal组件在页面高度发生改变时modal框会发生偏移（建议使用固定定位）

```bash
.ivu-modal-wrap{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
```

## vue-treeselect组件兼容

在ie10中vue-treeselect组件文本框中的文字只能显示一半

```bash
.vue-treeselect__placeholder{
  overflow: visible;
}
```

## 其它兼容问题

#### [点击我](https://juejin.im/post/5b94f141f265da0ada5222dc)