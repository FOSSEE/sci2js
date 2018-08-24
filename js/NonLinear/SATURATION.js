/* autogenerated from "macros/NonLinear/SATURATION.sci" */
function SATURATION() {
    SATURATION.prototype.define = function SATURATION() {
        this.minp = -1;
        this.maxp = 1;
        var rpar = [[this.maxp],[this.minp]];
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["satur"]), new ScilabDouble([4]));
        this.model.in = new ScilabDouble([1]);
        this.model.nzcross = new ScilabDouble([2]);
        this.model.nmode = new ScilabDouble([1]);
        this.model.out = new ScilabDouble([1]);
        this.model.rpar = new ScilabDouble(rpar);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        var exprs = [[string(this.maxp)],[string(this.minp)],[string(this.model.nmode)]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SATURATION\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,2]),this.model,new ScilabDouble(exprs),gr_i);
        return new BasicBlock(this.x);
    }
    SATURATION.prototype.details = function SATURATION() {
        return this.x;
    }
    SATURATION.prototype.get = function SATURATION() {
        var options = {
            maxp:["Upper limit",this.maxp],
            minp:["Lower limit",this.minp],
            zeroc:["zero crossing (0:no, 1:yes)",this.zeroc],
        }
        return options;
    }
    SATURATION.prototype.set = function SATURATION() {
        var exprs = this.graphics.exprs;
        while (true) {
            var ok = true;
            this.maxp = parseFloat(arguments[0]["maxp"]);
            this.minp = parseFloat(arguments[0]["minp"]);
            this.zeroc = arguments[0]["zeroc"];
            if (!ok) {
                break;
            }
            if (this.maxp<=this.minp) {
                message("Upper limit must be > Lower limit");
                throw "user error";
            } else {
                var rpar = [[this.maxp],[this.minp]];
                this.model.rpar = new ScilabDouble(rpar);
                if (this.zeroc!=0) {
                    this.model.nzcross = new ScilabDouble([2]);
                    this.model.nmode = new ScilabDouble([1]);
                } else {
                    this.model.nzcross = new ScilabDouble([0]);
                    this.model.nmode = new ScilabDouble([0]);
                }
                this.graphics.exprs = new ScilabDouble([exprs]);
                this.x.graphics = this.graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
}
