/**
 * @author  Petrus.Law (petrus.law@outlook.com)
 * @date    2014-03-21 20:10:10
 * @desc    遮罩控件
 */

var Mask = cc.LayerColor.extend({

    //触摸事件优先级
    HANDLER_PRIORITY: cc.MENU_HANDLER_PRIORITY - 1,

    //可触摸尺寸
    _rect:null,

    ctor:function(){
        this._super();
        cc.associateWithNative(this, cc.LayerColor);
    },

    init:function (c4b, HANDLER_PRIORITY) {
        this._super(c4b || cc.c4b(0, 0, 0, 178));

        this.HANDLER_PRIORITY = HANDLER_PRIORITY || cc.MENU_HANDLER_PRIORITY - 1;

        this.setTouchEnabled(true);

        var size = cc.Director.getInstance().getWinSize();

        this._rect = cc.rect(0, 0, size.width, size.height);

        return true;
    },

    remove:function(cleanup) {
        this.removeFromParent(cleanup);
    },

    setRect:function(rect) {
        this._rect = rect;
    },

    set:function(cfg){
        for(var key in cfg){
            this[key] = cfg[key];
        }
    },

    onEnter:function () {
        cc.registerTargetedDelegate(this.HANDLER_PRIORITY, true, this);
        this._super();
    },
    onExit:function () {
        cc.unregisterTouchDelegate(this);
        this._super();
    },

    containsTouchLocation:function (touch) {
        var getPoint = touch.getLocation();

        this._rect.x += this.getPosition().x;
        this._rect.y += this.getPosition().y;
        return cc.rectContainsPoint(this._rect, getPoint);
    },

    onTouchBegan:function (touch, event) {
        if (!this.containsTouchLocation(touch)) return false;
        return true;
    },
    onTouchMoved:function (touch, event) {
    },
    onTouchEnded:function (touch, event) {
    },
    onTouchCancelled:function (touch, event) {
    },
    touchDelegateRetain:function () {
    },
    touchDelegateRelease:function () {
    }
});


Mask.create = function(c4b, HANDLER_PRIORITY) {
    var layer = new Mask();
    if (layer && layer.init(c4b, HANDLER_PRIORITY)) {
        return layer;
    }
    return null;
};