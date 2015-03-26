/**
 * @author  Petrus.Law (petrus.law@outlook.com)
 * @date    2014-03-12 11:11:59
 * @desc    描述一下吧
 */

var UIUtils = cc.Class.extend({

	// 单行变色文本 不可使用\n换行
    // {texts: [{text: "text", color: red}, {text: "text", color: red}], position: cc.p(x, y), fontSize: small}
    colorLabel: function(cfg){
        var texts = cfg.texts;
        var labels = [];
        var width = 0;
        var fontSize = cfg.fontSize || UIConfig.font.medium;
        var sprite = cc.Sprite.create();
        if(cfg.position) sprite.setPosition(cfg.position);

        for(var i=0; i<texts.length; i++){
            var label = cc.LabelTTF.create(texts[i].text, UIConfig.font.family, fontSize);
            label.setAnchorPoint(cc.p(0, 0.5));
            if(texts[i].tag) label.setTag(texts[i].tag);
            sprite.addChild(label);
            labels.push(label);
            width += label.getContentSize().width;
            if(texts[i].color){
                label.setColor(texts[i].color);
            }
            if(texts[i].tag){
                label.setTag(texts[i].tag);
            }
        }

        var anchorPointX = 0.5;
        if(cfg.anchorPoint){
            anchorPointX = cfg.anchorPoint.x;
        }

        var x = 0 - width * anchorPointX;

        for(var i=0; i<labels.length; i++){
            labels[i].setPosition(x, 0);
            x += labels[i].getContentSize().width;
        }

        return sprite;
    },

    /* 简单UI分析显示 */
    parseUI: function(items, target) {
        if (typeof(target) == 'undefined') return;
        for (var i = 0; i < items.length; i++){
            try
            {
                var item = null;
                if (items[i].type == 'sprite') {
                    if (typeof(items[i].frameName) != 'undefined') {
                        item = cc.Sprite.createWithSpriteFrameName(items[i].frameName);
                    } else {
                        item = cc.Sprite.create(items[i].filename);
                    }
                    target.addChild(item);
                } else if (items[i].type == 'label') {
                    var text = typeof(items[i].text) != 'undefined' && items[i].text != null ? items[i].text : "";
                    item = cc.LabelTTF.create(String(text), UIConfig.font.family, (items[i].fontSize || UIConfig.font.medium));
                    if(items[i].align=="left") item.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
                    target.addChild(item);
                } else if (items[i].type == 'definition'){
                    var text = typeof(items[i].text) != 'undefined' && items[i].text != null ? items[i].text : "";
                    item = cc.LabelTTF.createWithFontDefinition(String(text), items[i].definition);
                    target.addChild(item);
                } else if(items[i].type == 'lBMFont'){
                    var text = typeof(items[i].text) != 'undefined' && items[i].text != null ? items[i].text : "";
                    item = cc.LabelBMFont.create(text, items[i].fntFile);
                    target.addChild(item);
                } else if(items[i].type == 'item'){
                    item = items[i].item;
                    target.addChild(items[i].item);
                } else if(items[i].type == "scale9Sprite") {
                    if (typeof(items[i].frameName) != 'undefined') {
                        item = cc.Scale9Sprite.createWithSpriteFrameName(items[i].frameName);
                    } else {
                        item = cc.Scale9Sprite.create(items[i].filename);
                    }
                    if(items[i].contentSize){
                        item.setContentSize(items[i].contentSize);
                        target.addChild(item);
                    }
                }
                if (items[i].afterTag) {
                    var parent = target.getChildByTag(items[i].afterTag);
                    if (parent) {
                        var x = parent.getPositionX() + parent.getContentSize().width * (1 - parent.getAnchorPoint().x);
                        item.setPosition(cc.p(x + (items[i].position.x || 0), parent.getPositionY() + (items[i].position.y || 0) ));
                    }
                } else if (items[i].position) {
                    item.setPosition(items[i].position);
                }
                if (items[i].color) item.setColor(items[i].color);
                if (items[i].opacity == 0 || items[i].opacity) item.setOpacity(items[i].opacity);
                if (items[i].anchorPoint) item.setAnchorPoint(items[i].anchorPoint);
                if (items[i].tag) item.setTag(items[i].tag);
                if (items[i].flipX) item.setFlipX(items[i].flipX);
                if (items[i].flipY) item.setFlipY(items[i].flipY);
                if (items[i].action) item.runAction(items[i].action);
                if (items[i].zorder) item.setZOrder(items[i].zorder);
                if (items[i].scale) item.setScale(items[i].scale);
                if (items[i].scaleX) item.setScaleX(items[i].scaleX);
                if (items[i].scaleY) item.setScaleX(items[i].scaleY);
            } catch (e) {
                Logger.error("Parse UI error:"+ e);
            }
        }
    },

});

var UI = new UIUtils();