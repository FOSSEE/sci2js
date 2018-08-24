/* autogenerated from "macros/Misc/BOUNCEXY.sci" */
function BOUNCEXY() {
    BOUNCEXY.prototype.define = function BOUNCEXY() {
        this.win = -1;
        this.imode = 1;
        this.clrs = [[1],[2]];
        this.siz = [[1],[1]];
        this.xmin = -5;
        this.xmax = 5;
        this.ymin = 0;
        this.ymax = 15;
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["bouncexy"]), new ScilabDouble([4]));
        this.model.in = new ScilabDouble([-1],[-1]);
        this.model.in2 = new ScilabDouble([1],[1]);
        this.model.intyp = new ScilabDouble([1],[1]);
        this.model.evtin = new ScilabDouble([1]);
        var z = [];
        for (i=1;i<=size(this.clrs,"*");i+=1) {
            z[6*(i-1)+1-1] = 0;
            z[6*(i-1)+2-1] = 0;
            z[6*(i-1)+3-1] = 2*this.siz[i-1];
            z[6*(i-1)+4-1] = 2*this.siz[i-1];
            z[6*(i-1)+5-1] = 0.000;
            z[6*(i-1)+6-1] = 64.0*360.000;
        }
        this.model.dstate = new ScilabDouble(z);
        this.model.rpar = new ScilabDouble([this.xmin],[this.xmax],[this.ymin],[this.ymax]);
        this.model.ipar = new ScilabDouble([this.win],[this.imode],[this.clrs.slice()]);
        this.model.blocktype = new ScilabString(["d"]);
        this.model.firing = new ScilabDouble([]);
        this.model.dep_ut = new ScilabBoolean([false,false]);
        var exprs = [[strcat(sci2exp(this.clrs))],[strcat(sci2exp(this.siz))],[strcat(sci2exp(this.win))],[strcat(sci2exp(1))],[strcat(sci2exp(this.xmin))],[strcat(sci2exp(this.xmax))],[strcat(sci2exp(this.ymin))],[strcat(sci2exp(this.ymax))]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"BOUNCEXY\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,2]),this.model,new ScilabDouble(exprs),gr_i);
        return new BasicBlock(this.x);
    }
    BOUNCEXY.prototype.details = function BOUNCEXY() {
        return this.x;
    }
    BOUNCEXY.prototype.get = function BOUNCEXY() {
        var options = {
            clrs:["colors",this.clrs.toString().replace(/,/g," ")],
            siz:["radii",this.siz.toString().replace(/,/g," ")],
            win:["window number (-1 for automatic)",this.win],
            imode:["animation mode (0,1)",this.imode],
            xmin:["Xmin",this.xmin],
            xmax:["Xmax",this.xmax],
            ymin:["Ymin",this.ymin],
            ymax:["Ymax",this.ymax],
        }
        return options;
    }
    BOUNCEXY.prototype.set = function BOUNCEXY() {
        var exprs = this.graphics.exprs;
        var dstate = this.model.dstate;
        while (true) {
            var ok = true;
            this.clrs = inverse(arguments[0]["clrs"]);
            this.siz = inverse(arguments[0]["siz"]);
            this.win = parseFloat(arguments[0]["win"]);
            this.imode = parseFloat(arguments[0]["imode"]);
            this.xmin = parseFloat(arguments[0]["xmin"]);
            this.xmax = parseFloat(arguments[0]["xmax"]);
            this.ymin = parseFloat(arguments[0]["ymin"]);
            this.ymax = parseFloat(arguments[0]["ymax"]);
            if (!ok) {
                break;
            }
            var mess = [];
            if (size(this.clrs,"*")!=size(this.siz,"*")) {
                var mess = [[mess],["colors and radii must have equal size (number of balls)"],[" "]];
                var ok = false;
            }
            if (this.win<-1) {
                var mess = [[mess],["Window number cannot be inferior than -1"],[" "]];
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
                var rpar = [[this.xmin],[this.xmax],[this.ymin],[this.ymax]];
                var ipar = [[this.win],[this.imode],[this.clrs.slice()]];
                var z = [];
                for (i=1;i<=size(this.clrs,"*");i+=1) {
                    z[6*(i-1)+1-1] = 0;
                    z[6*(i-1)+2-1] = 0;
                    z[6*(i-1)+3-1] = 2*this.siz[i-1];
                    z[6*(i-1)+4-1] = 2*this.siz[i-1];
                    z[6*(i-1)+5-1] = 0.000;
                    z[6*(i-1)+6-1] = 64.0*360.000;
                }
                this.model.dstate = new ScilabDouble(z);
                this.model.rpar = new ScilabDouble(rpar);
                this.model.ipar = new ScilabDouble(ipar);
                this.graphics.exprs = new ScilabDouble([exprs]);
                this.x.graphics = this.graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
}
