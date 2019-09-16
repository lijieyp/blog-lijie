(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{152:function(t,a,s){"use strict";s.r(a);var e=s(0),n=Object(e.a)({},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"vue移动端适配"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue移动端适配","aria-hidden":"true"}},[t._v("#")]),t._v(" vue移动端适配")]),t._v(" "),s("p",[t._v("由于"),s("code",[t._v("viewport")]),t._v("单位得到众多浏览器的兼容，"),s("code",[t._v("lib-flexible")]),t._v("这个过渡方案已经可以放弃使用，不管是现在的版本还是以前的版本，都存有一定的问题。建议大家开始使用"),s("code",[t._v("viewport")]),t._v("来替代此方案。"),s("code",[t._v("vw")]),t._v("的兼容方案可以参阅"),s("a",{attrs:{href:"https://www.w3cplus.com/mobile/vw-layout-in-vue.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("《如何在Vue项目中使用vw实现移动端适配》"),s("OutboundLink")],1),t._v("一文。")]),t._v(" "),s("p",[t._v("1.首先把安装amfe-flexible，这里使用npm install")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("npm  install -S amfe-flexible\n")])])]),s("p",[t._v("2.在入口文件min.js中引入")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("import 'amfe-flexible/index.js'\n")])])]),s("p",[t._v("3.在根目录的index.html 的头部加入手机端适配的meta代码")]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("meta")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("viewport"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("content")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("p",[t._v("4.安装px2rem-loader，这里使用npm install\n作用：在开发过程中把px转化rem，前提是ui设计的psd图尺寸大小是750*1334，这样我们在iphone6的模拟机上直接使用所标注的尺寸，在浏览器中px2rem-loader插件会把px自动转化为rem。安装命令如下：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("npm install px2rem-loader\n")])])]),s("p",[t._v("5.px2rem-loader的配置\n在build文件夹中的utils.js中添加：")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" px2remLoader "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    loader"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'px2rem-loader'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      remUnit"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("75")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("然后在下面的generateLoaders方法当中，修改：")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" loaders "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("cssLoader"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("px2remLoader"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])])])},[],!1,null,null,null);a.default=n.exports}}]);