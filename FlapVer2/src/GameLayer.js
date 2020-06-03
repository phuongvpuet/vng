

var GameLayer = cc.Layer.extend({
    _state:null,
    _playable:null,
    _tmpScore:null,
    _textScore:null,
    _bird:null,
    _scrollBase1:null,
    _scrollBase2:null,
    _pipeTop1:null,
    _pipeBot1:null,
    _pipeTop2:null,
    _pipeBot2:null,
    _pipePassed:null,
    _secretNumber:null,
    _timePrank:null,
    _isPrank:null,
    _isMovePipeInPrank:null,
    _movePipeInPrank:null,

    ctor:function(){
        this._super();
        this.init();
    },

    init:function () {
        var audioEngine = cc.AudioEngine.getInstance();
        audioEngine.playEffect(res.flapMusicSwoosh);
        this._isPrank = false;
        this._secretNumber = Math.floor(2 + Math.random() * 5);
        this._playable = false;
        this._pipePassed = false;
        this._tmpScore = 0;
        this._state = GLOBAL.STATE_GAME_PLAYING;

        //backGround
        this._background = new BackGround();

        //Base
        this._scrollBase1 = new Base();
        this._scrollBase2 = new Base();
        this._scrollBase2.x = GLOBAL.SCREEN_WIDTH / 2 + this._scrollBase1.width;

        //Bird
        this._bird = new Bird();

        //Pipe1
        this._pipeTop1 = new Pipe(true);
        this._pipeTop1.x = GLOBAL.SCREEN_WIDTH + this._pipeTop1.width / 2 + (Math.random() *100);
        this._pipeTop1.y = GLOBAL.SCREEN_HEIGHT + (Math.random() * (80 - (-80)) + (-80));
        this._pipeBot1 = new Pipe(false);
        this._pipeBot1.x = this._pipeTop1.x;
        this._pipeBot1.y = this._pipeTop1.y - this._pipeTop1.height - GLOBAL.GAP;

        //Pipe2
        this._pipeTop2 = new Pipe(true);
        this._pipeTop2.x = this._pipeTop1.x + this._pipeTop1.width / 2 + GLOBAL.SCREEN_WIDTH / 2;
        this._pipeTop2.y = GLOBAL.SCREEN_HEIGHT + (Math.random() * (80 - (-80)) + (-80));
        this._pipeBot2 = new Pipe(false);
        this._pipeBot2.x = this._pipeTop2.x;
        this._pipeBot2.y = this._pipeTop2.y - this._pipeTop2.height - GLOBAL.GAP;

        // score
        this._textScore = new cc.LabelBMFont("Score: 0", res.arial_14_fnt);
        this._textScore.attr({
            anchorX: 1,
            anchorY: 0,
            x: GLOBAL.SCREEN_WIDTH - 5,
            y: GLOBAL.SCREEN_HEIGHT - 30,
            scale: 1.5
        });
        this._textScore.textAlign = cc.TEXT_ALIGNMENT_RIGHT;

        //
        this.addChild(this._textScore, 1000);
        this.addChild(this._background);
        this.addChild(this._pipeTop1);
        this.addChild(this._pipeBot1);
        this.addChild(this._pipeTop2);
        this.addChild(this._pipeBot2);
        this.addChild(this._scrollBase1);
        this.addChild(this._scrollBase2);
        this.addChild(this._bird);

        //
        this.addTouchListener();
        this.addKeyboardListener();
        // schedule
        this.schedule(this.update, 1/60);
        return true;
    },
    addTouchListener:function(){
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function (event) {
                if (self._state == GLOBAL.STATE_GAME_PLAYING) {
                self._playable = true;
                self._bird.jump();
                }
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
                        if (self._state == GLOBAL.STATE_GAME_PLAYING) {
                            var audioEngine = cc.AudioEngine.getInstance();
                            audioEngine.playEffect(res.flapMusicWing);
                            self._playable = true;
                            self._bird.jump();
                        }
                        return true;
                    }
                }
            }, this);
        }
    },
    movingBase: function () {
        this._scrollBase1.update();
        this._scrollBase2.update();
    },
    movingPipePrank:function(){
        if (!this._isMovePipeInPrank) {
            if (this._bird.x < this._pipeTop1.x) {
                this._movePipeInPrank = 30 + Math.random() * (this._pipeTop1.height / 2 - 30);
                if (this._pipeTop1.y - GLOBAL.SCREEN_HEIGHT > 30) {
                    this._pipeTop1.runAction(cc.moveBy(this._movePipeInPrank / 150, 0, -this._movePipeInPrank));
                    this._pipeBot1.runAction(cc.moveBy(this._movePipeInPrank / 150, 0, -this._movePipeInPrank));
                }
                else{
                    this._pipeTop1.runAction(cc.moveBy(this._movePipeInPrank / 150, 0, this._movePipeInPrank));
                    this._pipeBot1.runAction(cc.moveBy(this._movePipeInPrank / 150, 0, this._movePipeInPrank));
                }
            }
            if (this._bird.x < this._pipeTop2.x) {
                this._movePipeInPrank = 30 + Math.random() * (this._pipeTop2.height / 2 - 30);
                if (this._pipeTop2.y - GLOBAL.SCREEN_HEIGHT > 30) {
                    this._pipeTop2.runAction(cc.moveBy(this._movePipeInPrank / 150, 0, -this._movePipeInPrank));
                    this._pipeBot2.runAction(cc.moveBy(this._movePipeInPrank / 150, 0, -this._movePipeInPrank));
                }
                else{
                    this._pipeTop2.runAction(cc.moveBy(this._movePipeInPrank / 150, 0, this._movePipeInPrank));
                    this._pipeBot2.runAction(cc.moveBy(this._movePipeInPrank / 150, 0, this._movePipeInPrank));
                }
            }
            this._isMovePipeInPrank = true;
        }
    },
    movingPipe: function() {
        if (this._isPrank) this.movingPipePrank();
        this._pipeTop1.update(false);
        this._pipeBot1.update(this._pipeTop1);
        this._pipeTop2.update(false);
        this._pipeBot2.update(this._pipeTop2);
        if (this._pipeTop1.x <= -this._pipeTop1.width || this._pipeTop2.x <= -this._pipeTop2.width) this._pipePassed = false;
    },
    prank:function(){
        this._isMovePipeInPrank = false;
        this._secretNumber += Math.floor( 5 + Math.random() * 5)
        this._timePrank = new Date().getTime();
        GLOBAL.VELOCITY = 0;
        this._isPrank = true;
    },
    scoreCounter: function () {
        if(this._bird.x - this._pipeTop1.x > this._bird.width / 2 + this._pipeTop1.width / 2 || this._bird.x - this._pipeTop2.x > this._bird.width / 2 + this._pipeTop2.width / 2) {
            if (!this._pipePassed) {
                this._tmpScore += 1;
                this._pipePassed = true;
                var audioEngine = cc.AudioEngine.getInstance();
                audioEngine.playEffect(res.flapMusicPoint);
                if (this._tmpScore == this._secretNumber) {
                    this.runAction(cc.sequence(
                        cc.delayTime(1),
                        cc.callFunc(this.prank, this)));
                }
                this._textScore.setString("Score: " + this._tmpScore);
            }
        }
    },
    update:function (dt) {
        if (this._playable) {
            if (this._isPrank) {
                if ((new Date().getTime() - this._timePrank) / 1000 >= Math.ceil(2 + Math.random() * 3)){
                    this._isPrank = false;
                    GLOBAL.VELOCITY = 1.5;
                }
            }
            this._bird.update();
            this.movingBase();
            this.movingPipe();
            this.scoreCounter();
            this.checkIsCollide();
        }
    }
    ,
    checkIsCollide:function () {
        if (this.collide(this._bird, this._scrollBase1) || this.collide(this._bird, this._scrollBase2)
        || this.collide(this._bird, this._pipeTop1) || this.collide(this._bird, this._pipeTop2)
        || this.collide(this._bird, this._pipeBot1) || this.collide(this._bird, this._pipeBot2)
        || this._bird.y + this._bird.height / 2 >= GLOBAL.SCREEN_HEIGHT){
            this._playable = false;
            var audioEngine = cc.AudioEngine.getInstance();
            audioEngine.playEffect(res.flapMusicHit);
            this._state = GLOBAL.STATE_GAME_OVER;
            this._bird.stopAllActions();
            this._bird.dieAction();
            this.runAction(cc.sequence(
                cc.delayTime(this._bird.y / GLOBAL.SCREEN_HEIGHT),
                cc.callFunc(this.gameOver, this)));
        }

    },
    collide:function (a, b) {
	    var ax = a.x, ay = a.y, bx = b.x, by = b.y;
        if (Math.abs(ax - bx) > (a.width / 2 + b.width / 2) || Math.abs(ay - by) > (a.height / 2 + b.height / 2))
            return false;
        var aRect = a.rectCollide();
        var bRect = b.rectCollide();
        return cc.rectIntersectsRect(aRect, bRect);
    },
    gameOver:function (){
        var scene = new cc.Scene();
        scene.addChild(new GameOverLayer());
        cc.director.runScene(new cc.TransitionFade(1,scene));
    }
});

GameLayer.scene = function () {
    var scene = new cc.Scene();
    var layer = new GameLayer();
    scene.addChild(layer, 1);
    return scene;
};
