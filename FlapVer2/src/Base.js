/**
 * Created by Phuong on 6/3/2020.
 */

var Base = cc.Sprite.extend({
    base:null,
    ctor: function () {
       this._super(res.flapBase);
       this.init();
    },
    init: function () {
        this.x = GLOBAL.SCREEN_WIDTH / 2;
        this.y = this.height / 2;
    },
    rectCollide: function () {
      return cc.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    },
    update:function(){
        if (this.x <= -this.width / 2){
            this.x = this.width * 3 / 2;
        }
        this.x -= GLOBAL.VELOCITY;
    }
});