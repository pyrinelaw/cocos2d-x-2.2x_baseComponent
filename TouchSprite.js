/**
 * @author  Petrus.Law (petrus.law@outlook.com)
 * @date    2014-04-01 10:00:43
 * @desc    精灵触摸控件
 */
var TouchSprite = cc.Sprite.extend({
    _containsOffset:false,
    _state:null,
    STATE_GRABBED:0,
    STATE_UNGRABBED:1,
    // 触摸优先级
    PRIORITY: 1,
    // 吞下触摸事件
    SWALLOW: false,

    // _target
    _target:null,
    // 回调
    _callback:{began:null, moved:null, ended:null, cancelled:null},

    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.Sprite );
    },

    init:function (res) {
        this._super(res);
        this._state = this.STATE_UNGRABBED;
        return true;
    },

    // 启用点击事件回调
    setCallback:function(callback, target) {
        this._target = target;
        this._callback = callback;
    },

    // Touch
    rect:function () {
        var s = this.getContentSize();
        return cc.rect(-s.width / 2, -s.height / 2, s.width, s.height);
    },
    onEnter:function () {
        cc.registerTargetedDelegate(this.PRIORITY, this.SWALLOW, this);
        this._super();
    },
    onExit:function () {
        cc.unregisterTouchDelegate(this);
        this._super();
    },
    containsTouchLocation:function (touch) {
        // 检测点击是否在精灵内
        var myRect = this.rect();
        var myPoint = this.convertTouchToNodeSpaceAR(touch);
        return (cc.rectContainsPoint(myRect, myPoint)) ? true : false;
    },

    // 通用回调
    onCallback:function(type) {
        var locTarget = this._target,
            locCallback = this._callback[type] || null;
        if(!locCallback) return;

        if (locTarget && (typeof(locCallback) == "string")) {
            locTarget[locCallback](this);
        } else if (locTarget && (typeof(locCallback) == "function")) {
            locCallback.call(locTarget, this);
        } else {
            locCallback(this);
        }
    },
    onTouchBegan:function (touch, event) {
        if (!this.containsTouchLocation(touch)) return false;
        this._state = this.STATE_GRABBED;
        this.onCallback('began');
        return true;
    },
    onTouchMoved: function(touch, event){
        var diff = touch.getDelta();
        // 适配部分高灵敏度的屏幕
        if(Math.abs(diff.x) >= 5.0 || Math.abs(diff.y) > 5.0){
            this._state = this.STATE_UNGRABBED;
        }
        this.onCallback('moved');
    },
    onTouchEnded:function (touch, event) {
        if(this._state == this.STATE_GRABBED){
            this.onCallback('ended');
        }
        this._state == this.STATE_UNGRABBED;
    },
    onTouchCancelled:function(touch, event) {
        if(this._state == this.STATE_GRABBED){
            this.onCallback('ended');
        }
        this._state == this.STATE_UNGRABBED;
    },
    touchDelegateRetain:function () {
    },
    touchDelegateRelease:function () {
    }
});

TouchSprite.create = function(res) {
    var sprite = new TouchSprite();
    if (sprite) {
        var cfg = {};
        if (res instanceof Object) {
            cfg = res;
        } else {
            cfg.resource = res;
        }
        for (var k in cfg) sprite[k] = cfg[k];
        try
        {
            sprite.init(cfg.resource);
        } catch (e) {
            Logger.error("Create TouchSprite error:"+ e);
        }
        return sprite;
    }
    return null;
};
TouchSprite.createWithSpriteFrameName = function(res) {
    var sprite = new TouchSprite();
    if (sprite) {
        var cfg = {};
        if (res instanceof Object) {
            cfg = res;
        } else {
            cfg.resource = res;
        }
        for (var k in cfg) sprite[k] = cfg[k];
        try
        {
            sprite.initWithSpriteFrameName(cfg.resource);
        } catch (e) {
            Logger.error("Create TouchSprite with frame error:"+ e);
        }
        return sprite;
    }
    return null;
};