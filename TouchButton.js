/**
 * @author  Petrus.Law (petrus.law@outlook.com)
 * @date    2014-04-08 11:36:11
 * @desc    自定义按钮
 */

var TouchButton = cc.Sprite.extend({

	res: [],	// 资源

	customSprites: null,	// 自定义资源

	isCache: false,	// 是否使用缓存资源

	status: 0, // 状态码 0:未选中、1:选中、2:关闭

	isSwallow: false,	// 吞噬触摸事件

	enabled: true,	// 允许改变状态

	touchPriority: cc.MENU_HANDLER_PRIORITY,	// 触摸优先级

    movePix: 10,	// 灵敏度像素

	target: null,

	callback: {began: null, moved: null, ended: null},

	ctor: function(){
        this._super();
        cc.associateWithNative(this, cc.Layer);
    },

    init: function(){
        this._super();

        var res = this.res;

        // 正常状态
        var normal = null;
		// 选中状态
		var selected = null;
		// 隐匿状态
		var disabled = null;

        if(this.customSprites){
        	normal = this.customSprites[0];
        	selected = this.customSprites[1];
        	disabled = this.customSprites[2];
        }else{
        	normal = this.isCache ? cc.Sprite.createWithSpriteFrameNameres(res[0]) : cc.Sprite.create(res[0]);
        	selected = this.isCache ? cc.Sprite.createWithSpriteFrameNameres(res[1] || res[0]) : cc.Sprite.create(res[1] || res[0]);
        	disabled = this.isCache ? cc.Sprite.createWithSpriteFrameNameres(res[2] || res[1] || res[0]) : cc.Sprite.create(res[2] || res[1] || res[0]);
        }

		var button = this.button = cc.MenuItemToggle.create(
            cc.MenuItemSprite.create(normal, normal, normal),
            cc.MenuItemSprite.create(selected, selected, selected),
            cc.MenuItemSprite.create(disabled, disabled, disabled),
            function(){}, this
        );

        this.touchSize = normal.getContentSize();

        button.setEnabled(false);
        button.setSelectedIndex(this.status);

        var menu = cc.Menu.create();
        menu.setPosition(cc.p(0, 0));
        this.addChild(menu);
        menu.addChild(button);

        this.createTouchRect();

        return true;
    },

    /**
     * 设置状态码
     */
    setStatus: function(status){
    	// Logger.debug("进入setstatus: "+status);
    	this.status = status;
    	this.button.setSelectedIndex(status);
    },

    createTouchRect: function(){
    	var touchSize = this.touchSize;
        var centerPoint = this.centerPoint;
        var rotation = this.rotation;

        var sprite = this.touchSprite = cc.Sprite.create();
        sprite.setTextureRect(cc.rect(0, 0, touchSize.width, touchSize.height));
        //
        sprite.setColor(cc.c3b(220, 30, 58));
        sprite.setOpacity(0);

        this.addChild(sprite);
    },

    onEnter: function(){
        cc.registerTargetedDelegate(this.touchPriority, this.isSwallow, this);
    },
    onExit: function(){
        cc.unregisterTouchDelegate(this);
    },

    onCallback: function(key){
    	if(this.callback[key]) this.callback[key].call(this.target, this);
    },

    rect: function(){
    	var touchSize = this.touchSize;
        return cc.rect(-touchSize.width/2, -touchSize.height / 2, touchSize.width, touchSize.height);
    },

    containsTouchLocation: function(touch){
        // 检测点击是否在Rect中
        var myRect = this.rect();

        var myPoint = this.touchSprite.convertTouchToNodeSpaceAR(touch);
        if(cc.rectContainsPoint(this.rect(), myPoint)){
            return true;
        }
        return false;
    },

    onTouchBegan: function (touch, event){
    	if(!this.enabled || this.status != 0){
    		return false;
    	}
        if (this.containsTouchLocation(touch)){
            this.startTouchPoint = this.convertToWorldSpaceAR(touch.getLocation());
            // 设置触摸开始生效
            this.TOUCH_EFFC = true;
            this.setStatus(1);
            this.onCallback("began");
            return true;
        }
        this.TOUCH_EFFC = false;
        return false;
    },

    onTouchMoved: function(touch, event){
    	if(!this.TOUCH_EFFC) return;
    	// 移出mapRect边界
        if (!this.containsTouchLocation(touch)){
        	// Logger.debug("MOVE移出边界");
            this.setStatus(0);
            this.TOUCH_EFFC = false;
            return;
        }
        var touchPoint = this.convertToWorldSpaceAR(touch.getLocation());
        // 超出灵敏度
        if(Math.abs(touchPoint.x-this.startTouchPoint.x) > this.movePix){
            this.setStatus(0);
            this.TOUCH_EFFC = false;
            return;
        }

        this.onCallback("moved");
    },
    onTouchEnded: function(touch, event){
		if(!this.TOUCH_EFFC) return;
		var touchPoint = this.convertToWorldSpaceAR(touch.getLocation());
		// 手指拖动距离10以内,调用回调
        if(Math.abs(touchPoint.x-this.startTouchPoint.x) < this.movePix){
        	this.onCallback("ended");
        }
        this.setStatus(0);
        this.TOUCH_EFFC = false;
    },
    onTouchCancelled: function(touch, event){
    },
    touchDelegateRetain: function(){
    },
    touchDelegateRelease: function(){
    }

})

TouchButton.create = function(cfg){
    var sprite = new TouchButton();
    for(var key in cfg) sprite[key] = cfg[key];
    if(sprite.init()){
        return sprite;
    }
    return null;
}