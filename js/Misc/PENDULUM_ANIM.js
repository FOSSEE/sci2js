/* autogenerated from "macros/Misc/PENDULUM_ANIM.sci" */
function PENDULUM_ANIM() {
    PENDULUM_ANIM.prototype.define = function PENDULUM_ANIM() {
        this.plen = 2;
        this.csiz = 2;
        this.phi = 0;
        this.xmin = -5;
        this.xmax = 5;
        this.ymin = -5;
        this.ymax = 5;
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["anim_pen"]), new ScilabDouble([5]));
        this.model.in = new ScilabDouble([1],[1]);
        this.model.evtin = new ScilabDouble([1]);
        this.model.dstate = new ScilabDouble([0]);
        this.model.rpar = new ScilabDouble([this.plen],[this.csiz],[this.phi],[this.xmin],[this.xmax],[this.ymin],[this.ymax]);
        this.model.blocktype = new ScilabString(["d"]);
        this.model.dep_ut = new ScilabBoolean([false,false]);
        var exprs = string(this.model.rpar);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"PENDULUM_ANIM\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3,3]),this.model,new ScilabString([exprs]),gr_i);
        return new BasicBlock(this.x);
    }
    PENDULUM_ANIM.prototype.details = function PENDULUM_ANIM() {
        return this.x;
    }
    PENDULUM_ANIM.prototype.get = function PENDULUM_ANIM() {
        var options = {
            plen:["pendulum length",this.plen],
            csiz:["cart size (square side)",this.csiz],
            phi:["slope",this.phi],
            xmin:["Xmin",this.xmin],
            xmax:["Xmax",this.xmax],
            ymin:["Ymin",this.ymin],
            ymax:["Ymax",this.ymax],
        }
        return options;
    }
    PENDULUM_ANIM.prototype.set = function PENDULUM_ANIM() {
        var exprs = this.graphics.exprs;
        var dstate = this.model.dstate;
        while (true) {
            var ok = true;
            this.plen = parseFloat(arguments[0]["plen"]);
            this.csiz = parseFloat(arguments[0]["csiz"]);
            this.phi = parseFloat(arguments[0]["phi"]);
            this.xmin = parseFloat(arguments[0]["xmin"]);
            this.xmax = parseFloat(arguments[0]["xmax"]);
            this.ymin = parseFloat(arguments[0]["ymin"]);
            this.ymax = parseFloat(arguments[0]["ymax"]);
            if (!ok) {
                break;
            }
            var mess = [];
            if (this.plen<=0||this.csiz<=0) {
                var mess = [[mess],["Pendulum length and cart size must be positive."],[" "]];
                var ok = false;
            }
            if (this.ymin>=this.ymax) {
                var mess = [[mess],["Ymax must be greater than Ymin"],[" "]];
                var ok = false;
            }
            if (this.xmin>=this.xmax) {
                var mess = [[mess],["Xmax must be greater than Xmin"],[" "]];
                var ok = false;
            }
            if (!ok) {
                message(mess);
                throw "user error";
            } else {
                var rpar = [[this.plen],[this.csiz],[this.phi],[this.xmin],[this.xmax],[this.ymin],[this.ymax]];
                this.model.rpar = new ScilabDouble(rpar);
                this.graphics.exprs = new ScilabDouble([exprs]);
                this.x.graphics = this.graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
}
