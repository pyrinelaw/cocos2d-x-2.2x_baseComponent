## cocos2d-x-2.2x基础UI控件



---
适用于cocos2dx-js-Binding2.2x版本
主要致力于改善与简化基础控件

**UIConfig.js**
UI配置文件

**UIUtils.js**
UI单元

```javascript
// 单行变色文本
UI.colorLabel({
    texts: [
        {text: 'text', color: red},
        {text: 'text', color: red}
    ],
    position: cc.p(x, y),
    fontSize: 24
});

// UI分析
var items = [item, item, item...];
UI.parseUI(items, target);
item = {
    type: 'sprite', // 类型，sprite、label、definition、lBMFont、item、scale9Sprite
    filename: 'xxx.png',    // 文件名
    frameName: 'xxx.png',   // 缓存文件名
    text: 'xxx',            // 内容
    fontSize: 28,           // 字体大小
    color: null,            // 字体颜色
    opacity: 1,             // 透明度
    anchorPoint: cc.p(0.5, 0.5),     // 中心点
    tag: null,              // 标签
    afterTag: null,         // 位于标签后
    flipX: false,           // X轴旋转
    flipY: false,           // Y轴旋转
    action: null,           // 动作
    zorder: null,           // 层级
    scale: 1,               // 缩放
    scaleX: 1,              // X轴缩放
    scaleY: 1               // Y轴缩放
}
```

**TransitionMask.js**
渐变遮罩

```javascript
TransitionMask.create({
    actionPerUnit: 0.075,       // 每帧动画时间
 	framsNum: 10,			    // X帧数后完全遮罩
 	bgColor: cc.c4b(0, 0, 0, 255),	// 背景颜色
 	touchedCallback: null,		    // 触摸完毕回调函数
 	showCallback: [],	// 显示完成回调函数, 可能会有多个，所以使用数组
 	target: null,		// 引用元素
 	parent: null,		// 父元素
    fadeTo: 255,        // 显示至亮度
 	order: 999,         // 层级
 	HANDLER_PRIORITY: cc.MENU_HANDLER_PRIORITY - 1,	// 触摸优先级
});
```

**TouchSprite.js**
触摸精灵

```javascript
// 普通调用
TouchSprite.create('xxx.png');
// 缓存文件
TouchSprite.createWithSpriteFrameName('xxx.png');
```

**TouchButton.js**
自定义触摸按钮

```javascript
TouchButton.create({
    res: ['normal.png', 'selected.png', 'disabled.png'],	// 资源,三种状态
	customSprites: null,	// 数组,自定义精灵，参考MenuButton
	isCache: false,	    // 是否使用缓存资源
	isSwallow: false,	// 是否吞噬触摸事件
	enabled: true,	    // 允许改变状态
	touchPriority: cc.MENU_HANDLER_PRIORITY,	// 触摸优先级
    movePix: 10,	    // 灵敏度像素
	target: null,       // 引用源
	callback: {
	    began: null,    // 触摸开始
	    moved: null,    // 触摸中
	    ended: null     // 触摸结束
	}
});
```

**PopUpMsg.js**
类Toast控件

```javascript
var cfg = {
    time:0.8,               //显示时间
    msg: '暂无信息',        //显示文字
    isFade:true,            //是否自动消失
    isAnim: true,           //是否显示动画
    pos:null,               //显示位置
    content: null,          // 自定义内容
    fontSize: 28,           //字体大小
    contentSize: null,      // 自定义尺寸
    paddingVertical: 20,    // 垂直间距
    paddingHorizontal: 30,  // 水平间距
    bg: null,               // 自定义背景
    callback: null,         //回调函数
    target: null,           // 引用源
}
// 普通创建
PopUpMsg.create(cfg);
// 单例模式
PopUpMsg.getInstance(cfg);
```

**Mask.js**

```javascript
// 创建
Mask.create(c4b, HANDLER_PRIORITY);
// 设置触摸区域，不设置默认全屏触摸
Mask.setRect(cc.Rect);
```

**Logger.js**
日志打印控件

```javascript
// 输出等级  0：Disable、1：Error、2：Warning、3：Info、4：Debug
Logger.level
// 输出方式
Logger.type
// 设置输出等级
Logger.setLevel(level);
// 打印普通、调试、警告、错误信息
Logger.info(msg);
Logger.debug(msg);
Logger.warn(msg);
Logger.error(msg);
```

**Http.js**
ajax请求

```javascript
Http.get(url);          // get请求
Http.post(url, data);   // post请求
Http.ajax(method, url, data);   // 综合写法
```

**AnimBaseFrames.js**
帧动画封装控件

```javascript
AnimationBaseFrames.create({
    res: null,          // 资源
    startFrame: 0,      // 开始帧
    endFrame: 0,        // 结束帧
    initWithFrame: NaN, // 初始帧
    parent: null,       // 父元素
    target: null,       // 引用元素
    delayTime: 0,       // 延迟时间
    perUnit: 0.1,       // 每帧动画时间
    position: null,     // 动画位置
    callback: null,     // 动画执行完毕回调
    initSprite: null,   // 初始 sprite
    order: NaN,         // 优先级
    scale: NaN,         // 缩放
    isRepeat:false,     //是否重复
    isRemove: true,     // 是否移除
    isZeroPrefix: false,  // frame小于是0时资源名是否加上0
});
```

-----
Data by 2014.05.09

**Download:** [https://www.github.com/pyrinelaw/cocos2d-x-2.2x_baseComponent](https://www.github.com/pyrinelaw/cocos2d-x-2.2x_baseComponent)




