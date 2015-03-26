/**
 * @author  Petrus.Law (petrus.law@outlook.com)
 * @date    2014-03-22 20:10:10
 * @desc    类Toast控件
 */

var PopUpMsg = cc.Layer.extend({

    //显示的时间,默认为0.8秒
    time:0.8,

    //显示的文字
    msg:'暂无信息',

    //是否自动消失
    isFade:true,

    //是否显示动画
    isAnim:true,

    //显示的位置
    pos:null,

    // 自定义内容
    content:null,

    //字体大小
    fontSize:UIConfig.font.medium,

    // 自定义尺寸
    contentSize: null,

    // 垂直间距
    paddingVertical: 20,

    // 水平间距
    paddingHorizontal: 30,

    bg: null,

    //回调函数
    callback: null,

    target: null,

    scale:1,

    //z值
    zorder:99999,

    ctor:function() {
        this._super();
        cc.associateWithNative(this, cc.Layer);
    },
    init:function () {

        this._super();

        var size = cc.Director.getInstance().getWinSize();
        var offsetX = (size.width - UIConfig.size.width) / 2;
        var offsetY = (size.height - UIConfig.size.height) / 2;

        var content= this.content || cc.LabelTTF.create(this.msg, UIConfig.font.family,this.fontSize);
        var _w = this.contentSize ? this.contentSize.width : content.getContentSize().width;
        var _h = this.contentSize ? this.contentSize.height : content.getContentSize().height;
        //背景框大小
        var bgWidth = this.contentSize ? _w : _w+this.paddingHorizontal*2;
        var bgHeight = this.contentSize ? _h : _h+this.paddingVertical*2;
        var pos=this.pos||cc.p(size.width/2,size.height/2-60);
        var bg = this.bg = cc.Scale9Sprite.create("res/msg.png");
        bg.setContentSize(cc.size(bgWidth, bgHeight));
        bg.setPosition(pos);

        if(this.content instanceof Array){
            UI.parseUI(content, bg);
        } else {
            content.setPosition(cc.p(bgWidth/2,bgHeight/2));
            bg.addChild(content);
        }

        this.addChild(bg);

        this.setScale(this.scale);

        return true;
    },

    onEnterTransitionDidFinish:function(){
        this._super();
        if(!this.isAnim) return;
        if(!this.isFade) {
            this.runAction(cc.Sequence.create(
                cc.MoveBy.create(0.3,cc.p(0,60))
            ));
            return;
        }
        this.runAction(cc.Sequence.create(
            cc.MoveBy.create(0.3,cc.p(0,60)),
            cc.DelayTime.create(this.time),
            cc.FadeOut.create(0.3),
            cc.CallFunc.create(function(){
                this.removeFromParent(true);
                if(this.callback){
                    this.callback.call(this.target)
                }
            },this)
        ));
    }

});


/**
* cfg 格式: {time:0.8,msg:"文字内容",pos:cc.p(20,30)}
* 获取PopUpMsg单例
**/
PopUpMsg.getInstance=function(cfg){
    var sprite = cc.Director.getInstance().getRunningScene().getChildByTag(UIConfig.TAG.PopMsg);
    if (!sprite) {
        sprite = PopUpMsg.create(cfg);
        sprite.setTag(UIConfig.TAG.PopMsg);
        return sprite;
    }
    return sprite;
}

//cfg 格式: {time:0.8,msg:"文字内容",pos:cc.p(20,30),isFade:true}
PopUpMsg.create = function (cfg) {
    //是否允许多个显示,默认为单个
    var layer = new PopUpMsg();
    var cfg = cfg || {};
    for (var k in cfg) layer[k] = cfg[k];
    if (layer && layer.init()) {
        var parent = cfg.parent || cc.Director.getInstance().getRunningScene();
        if(parent){
            parent.addChild(layer,layer.zorder);
        }
        else{
            Logger.debug("PopUpMsg 错误");
        }
        return layer;
    }
    return null;
};