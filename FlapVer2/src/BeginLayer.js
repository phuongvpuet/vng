

var BeginLayer = cc.Layer.extend({
    _scrollBase1:null,
    _scrollBase2:null,
    _winSize:null,
    _message:null,
    _background:null,

    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._background = new BackGround();
        this._message = new Message();
        this._scrollBase1 = new Base();
        this._scrollBase2 = new Base();
        this._scrollBase2.x = GLOBAL.SCREEN_WIDTH / 2 + this._scrollBase2.width;

        this.addChild(this._background);
        this.addChild(this._message);
        this.addChild(this._scrollBase1);
        this.addChild(this._scrollBase2);

        this.scheduleUpdate();

        var label = new cc.LabelTTF("Cloned by phuongnv6", "Arial", 20);
        label.setColor(cc.color(255, 255, 255));
        this.addChild(label, 1);
        label.x = GLOBAL.SCREEN_WIDTH  / 2;
        label.y = 470;
        this.addTouchListener();
        this.addKeyboardListener();
        return true;
    },
    addTouchListener:function(){
        var self = this;
        //Add code here
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event){
                self.start();
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
                    if (key == 32){
                        audioEngine.playEffect(res.flapMusicSwoosh);
                        self.start();
                    }
                }
            }, this);
        }
    },
    movingBase: function () {
        this._scrollBase1.update();
        this._scrollBase2.update();
    },
    update:function(){
        this.movingBase();
    },
    start:function(){
        cc.LoaderScene.preload(g_maingame, function () {
            var scene = new cc.Scene();
            scene.addChild(new GameLayer());
            cc.director.runScene(new cc.TransitionFade(1, scene));
        }, this);
    }
});

BeginLayer.scene = function () {
    var scene = new cc.Scene();
    var layer = new BeginLayer();
    scene.addChild(layer);
    return scene;
};
