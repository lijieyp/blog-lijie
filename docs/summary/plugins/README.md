# vue插件
## vue动态生成二维码

1.安装qrcode插件

```javascript
npm install qrcode --save
```

2.引入插件

```javascript
import QRCode from 'qrcode'
```

3.绘制一个canvas	

```html
<el-form status-icon label-suffix="：" :label-width="infoPagelink.labelwidth" class="dialogBox">
  <el-form-item label="链接" :style="'width:100%'">
    <div>
      <span id="copy_href">{{infoPagelink.defaultData.GateWayName}}</span>
      <el-button type="primary" data-clipboard-action="copy" data-clipboard-target="#copy_href" class="pull-right copy_button" size="mini">复制</el-button>
      <div class="pull-clear"></div>
    </div>
  </el-form-item>
  <el-form-item label="链接" :style="'width:100%'">
    <canvas id="canvas" ref="canvas"></canvas>
  </el-form-item>
</el-form>
```

4.动态生成二维码

```javascript
editInfoPagelink:function(data){
  this.dialogVisible = true;
  this.$nextTick(() => {
    // let QueryDetail='http://www.kspxzx.com/#/guard';
    let QueryDetail='http://hbsim-nacos.huabokeji.com/mobile/huabosimapp/#/schemeOption?',
        request = [];
    request.push('recmPageId=' + data.recmPageId);    
    /* for (var key in data) {
      request.push(key + '=' + data[key]);
    } */
    var url = QueryDetail + request.join('&');
    this.infoPagelink.defaultData.GateWayName = url;

    let canvas = this.$refs.canvas
    QRCode.toCanvas(canvas, url, (error)=>{
      if (error) console.error(error)
      console.log('success!');
    })
    this.$set(this.infoPagelink,'showDialog',true);
  });
},
```

## vue复制粘贴

1.安装clipboard插件

```
npm install clipboard --save
```

2.引入插件

```javascript
import clipboard from 'clipboard'
```

3.使用

- **从另一个元素复制文本**

一个很常见的用例是从另一个元素复制内容。你可以给目标元素添加一个 data-clipboard-target 属性来实现这个功能。

这个属性的值就是能匹配到另一个元素的选择器。

```html
<!-- Target -->
<input id="foo" value="https://github.com/zenorocha/clipboard.js.git">
<!-- Trigger -->
<button class="btn" data-clipboard-target="#foo">
	<img src="assets/clippy.svg" alt="Copy to clipboard">
</button>
```

- **从另一个元素剪切文本**

此外，你可以定义一个 `data-clipboard-action` 属性来指明你想要复制还是剪切内容

如果你省略这个属性，则默认为复制。

```html
<!-- Target -->
<textarea id="bar">Mussum ipsum cacilds...</textarea>

<!-- Trigger -->
<button class="btn" data-clipboard-action="cut" data-clipboard-target="#bar">
	Cut to clipboard
</button>
```

正如你所料, `cut` 操作只在`<input>` 或者 `<textarea>` 元素上生效

- **从属性复制文本**

事实上，你甚至不需要从另一个元素来复制内容。 你仅需要给目标元素设置一个`data-clipboard-text` 属性即可

```html
<button class="btn" data-clipboard-text="Just because you can doesn't mean you should — clipboard.js">
		Copy to clipboard
</button>
```

- **事件**

如果你想要展示一些用户反馈，或者在用户复制/剪切后获取已经选择的文字，这里有个示例供你参考。

我们通过触发自定义事件，比如`success` 和 `error` 让你可以设置监听并实现自定义逻辑

```javascript
var clipboard = new ClipboardJS('.btn');
clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);
    e.clearSelection();
});
clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});
```

打开你的调试窗口，就能看到实例演示了