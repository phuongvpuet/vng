/**
 * Created by Phuong on 6/3/2020.
 */


var Message = cc.Sprite.extend({
    appearPosition: cc.p(144, 300),
    ctor: function () {
        this._super(res.flapOnStart);
        this.init();
    },
    init:function(){
        this.x = this.appearPosition.x;
        this.y = this.appearPosition.y;
    }

});