/**
 * Created by Phuong on 6/3/2020.
 */

var Pipe = cc.Sprite.extend({

    ctor: function (flipY) {
        this._super(res.flapPipe);
        this.flippedY = flipY;
        this.init();
   },
    init: function () {

    },
    rectCollide: function () {
        return cc.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    },
    update:function(pipeTop) {
        if (!pipeTop) {
            if (this.x <= -this.width) {
                this.x = GLOBAL.SCREEN_WIDTH + this.width / 2;
                this.y = GLOBAL.SCREEN_HEIGHT + (Math.random() * (80 - (-80)) + (-80));
            }
        }
        else
        {
            if (this.x <= -this.width) {
                this.x = pipeTop.x;
                this.y = pipeTop.y - pipeTop.height - GLOBAL.GAP;
            }
        }
        this.x -= GLOBAL.VELOCITY;
    }
});