/**
 * Created by Phuong on 6/3/2020.
 */

var GameOverLayer = cc.Layer.extend({
    _background:null,
    _message:null,
    ctor:function(){
        this._super();
        this.init();
    },
    init: function () {
        this._backgrounnd = new BackGround();
        this._message = new cc.Sprite(res.flapGameOver);
        this._message.setPosition(GLOBAL.SCREEN_WIDTH / 2, - GLOBAL.SCREEN_HEIGHT);

        this.addChild(this._backgrounnd);
        this.addChild(this._message);
        this._message.runAction(cc.sequence(cc.delayTime(0.5), cc.moveBy(0.5, 0, GLOBAL.SCREEN_HEIGHT * 5 / 3)));

        this.addTouchListener();
        this.addKeyboardListener();
    },
    addTouchListener:function(){
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function (event) {
                var scene = new cc.Scene();
                scene.addChild(new GameLayer());
                cc.director.runScene(new cc.TransitionFade(1.2,scene));
                return true;
            }
        }, this);
    },
    addKeyboardListener:function(){
        var self = this;
        //Add code here
        if (cc.sys.capabilities.hasOwnProperty('keyboard')){
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function(key, event){
                    if (key == cc.KEY.enter){
                        var scene = new cc.Scene();
                        scene.addChild(new GameLayer());
                        cc.director.runScene(new cc.TransitionFade(1.2,scene));
                        return true;
                    }
                }
            }, this);
        }
    }
});

GameOverLayer.scene = function () {
    var scene = new cc.Scene();
    var layer = new GameOverLayer();
    scene.addChild(layer);
    return scene;
};