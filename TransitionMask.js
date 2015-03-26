/**
 * @author  Petrus.Law (petrus.law@outlook.com)
 * @date    2014-04-08 19:11:55
 * @desc    渐变遮罩
 */
var TransitionMask = cc.Layer.extend({

 	actionPerUnit: 0.075,   // 每帧动画时间
 	framsNum: 10,			// 帧数
 	bgColor: cc.c4b(0, 0, 0, 255),	// 背景颜色
 	TOUCH_ELEC: false,	// 触摸是否生效生效
 	touchedCallback: null,		// 触摸完毕回调函数
 	showCallback: [],	// 显示完成回调函数, 可能会有多个，所以使用数组
 	target: null,		// 引用元素
 	parent: null,		// 父元素
 	mask: null,
    fadeTo: 255,
 	order: 999,
 	HANDLER_PRIORITY: cc.MENU_HANDLER_PRIORITY - 1,	// 触摸优先级

 	ctor: function(){
        this._super();
        cc.associateWithNative(this, cc.LayerColor);
    },

    init: function(){
        this._super();

        if(this.parent) this.parent.addChild(this, this.order);

    	return true;
    },

    onEnterTransitionDidFinish: function(){
        var action = cc.Sequence.create(
            cc.FadeTo.create(this.actionPerUnit * this.framsNum, this.fadeTo),
            cc.CallFunc.create(function(){
                if(this.showCallback instanceof Array){
                    for(var i=0; i<this.showCallback.length; i++){
                        this.showCallbacks[i].call(this.target || this);
                    }
                } else {
                    this.showCallback.call(this.target || this);
                }
            }, this)
        );

        var size = cc.Director.getInstance().getWinSize();
        var sprite = cc.Sprite.create();
        sprite.setTextureRect(cc.rect(0, 0, size.width, size.height));
        sprite.setColor(cc.c3b(0, 0, 0));
        sprite.setPosition(cc.p(size.width/2, size.height/2));
        sprite.setOpacity(0);
        this.addChild(sprite, -1);

        sprite.runAction(action);
    },

    onEnter:function () {
        cc.registerTargetedDelegate(this.HANDLER_PRIORITY, true, this);
    },
    onExit:function () {
        cc.unregisterTouchDelegate(this);
    },

    setTouchElec: function(bool){
    	this.TOUCH_ELEC = bool || false;
    },

    onTouchBegan:function (touch, event) {
        if (!this.TOUCH_ELEC) return false;
        return true;
    },
    onTouchMoved:function (touch, event) {
    },
    onTouchEnded:function (touch, event) {
    	if(this.touchedCallback){
    		this.touchedCallback.call(this.target || this);
    	}
    },
    onTouchCancelled:function (touch, event) {
    	if(this.touchedCallback){
    		this.touchedCallback.call(this.target || this);
    		this.removeFromParent(true);
    	}
    },
    touchDelegateRetain:function () {
    },
    touchDelegateRelease:function () {
    }

})

TransitionMask.create = function(cfg){
 	var layer = new TransitionMask();
    if(!cfg) cfg = {};
    for(var key in cfg){
        layer[key] = cfg[key];
    }
    if (layer && layer.init()) {
        return layer;
    }
    return null;
}
