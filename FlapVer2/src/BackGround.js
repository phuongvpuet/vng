/**
 * Created by Phuong on 6/3/2020.
 */

var BackGround = cc.Sprite.extend({
    appearPosition: cc.p(GLOBAL.SCREEN_WIDTH / 2, GLOBAL.SCREEN_HEIGHT / 2),
    ctor: function () {
        this._super(res.flapBackGround);
        this.init();
    },
    init:function(){
        this.x = this.appearPosition.x;
        this.y = this.appearPosition.y;
    }

});