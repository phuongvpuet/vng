/**
 * Created by Phuong on 6/3/2020.
 */

var Bird = cc.Sprite.extend({
    _timeBeginFall:null,
    appearPosition: cc.p(GLOBAL.SCREEN_WIDTH / 2, GLOBAL.SCREEN_HEIGHT * 2 / 3),
    _animation:null,
    _action:null,
    _die1:null,
    _die2:null,
    ctor:function(){
        this._super(res.flapBirdMid);
        this.init();
    },
    init: function () {
        this.x = this.appearPosition.x;
        this.y = this.appearPosition.y;

        //animate
        this._animation = new cc.Animation();
        this._animation.addSpriteFrameWithFile(res.flapBirdUp);
        this._animation.addSpriteFrameWithFile(res.flapBirdMid);
        this._animation.addSpriteFrameWithFile(res.flapBirdDown);
        this._animation.setDelayPerUnit(2.8 / 60);
        this._animation.setRestoreOriginalFrame(true);

        this._action = cc.animate(this._animation);
        this.runAction(this._action.repeatForever());
    },
    jump: function () {
        this._timeBeginFall = new Date().getTime();
        var action = cc.spawn(
            cc.moveBy(0.2, 0, 65),
            cc.rotateTo(0.2, -30)
        );
        this.runAction(cc.sequence(action,cc.rotateTo(0.25, 0), cc.rotateTo(0.1, 90)));
    },
    dieAction: function(){
        this._die1 = cc.moveBy(0.15, -15, 50);
        this._die2 = cc.spawn(
            cc.moveTo(this.y / GLOBAL.SCREEN_HEIGHT / 3 * 2 , this.x, - this.height*2),
            cc.rotateBy(0.1, 120)
        );
        this.runAction(cc.sequence(this._die1, this._die2));
        var audioEngine = cc.AudioEngine.getInstance();
        audioEngine.playEffect(res.flapMusicDie);
    },
    rectCollide: function () {
        return cc.rect(this.x - this.width / 2, this.y - this.height / 2 - 10, this.width - 2, this.height + 10);
    },
    update: function () {
        this.y -= (new Date().getTime() - this._timeBeginFall) / 2000 * 4.6 * 4.6;
    }

});
