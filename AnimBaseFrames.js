/**
 * @author  Petrus.Law (petrus.law@outlook.com)
 * @date    2014-04-19 13:59:01
 * @desc    帧动画封装控件
 */
var AnimationBaseFrames = cc.Sprite.extend({

    res: null,  // 资源
    startFrame: 0,  // 开始帧
    endFrame: 0,    // 结束帧
    initWithFrame: NaN, // 初始帧
    parent: null,   // 父元素
    target: null,   // 引用元素
    delayTime: 0,   // 延迟时间
    perUnit: 0.1,   // 每帧动画时间
    position: null,
    callback: null,
    initSprite: null,   // 初始 sprite
    order: NaN,     // 优先级
    scale: NaN,     // 缩放
    isRepeat:false,  //是否重复
    isRemove: true, // 是否移除
    isZeroPrefix: false,  // frame小于是0时资源名是否加上0

    ctor: function(){
        this._super();
        cc.associateWithNative( this, cc.Layer );
    },

    init: function(){
        this._super();

        var cache = cc.SpriteFrameCache.getInstance();

        var sprite = this.initSprite || cc.Sprite.create();
        this.addChild(sprite);

        if(this.initWithFrame){
            sprite.initWithSpriteFrameName(this.res+this.initWithFrame+".png");
        }

        var animation = cc.Animation.create();
        for(var i=this.startFrame; i<=this.endFrame; i++){
            var frameRes = this.res+i+".png";
            if(this.isZeroPrefix && i<10) frameRes = this.res+String("0")+i+".png";
            var frame = cache.getSpriteFrame(frameRes);
            if(!frame) continue;
            animation.addSpriteFrame(frame);
        }
        animation.setDelayPerUnit(this.perUnit);
        animation.setRestoreOriginalFrame(true);

        var animate = cc.Animate.create(animation);
        var seq = cc.Sequence.create(
            cc.DelayTime.create(this.delayTime),
            animate,
            cc.CallFunc.create(function(){
                if(this.isRemove) sprite.removeFromParent(true);
                if (this.callback) this.callback.call(this.target || null);
            }, this)
        )
        if(!this.isRepeat) sprite.runAction(seq);
        else sprite.runAction(cc.RepeatForever.create(seq));
        if(this.position) this.setPosition(this.position);
        if(this.order) this.setZOrder(this.order);
        if(this.scale) sprite.setScale(this.scale);
        if(this.parent) this.parent.addChild(this);

        return true;
    }
});

AnimationBaseFrames.create = function(cfg) {
    if(!cfg) return null;
    var sprite = new AnimationBaseFrames();
    for(var key in cfg) sprite[key] = cfg[key];
    if (sprite && sprite.init()) {
        return sprite;
    }
    return null;
};
