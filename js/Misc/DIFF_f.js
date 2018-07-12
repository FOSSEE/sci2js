/* autogenerated from "macros/Misc/DIFF_f.sci" */
function DIFF_f() {
    DIFF_f.prototype.define = function DIFF_f() {
        this.x0 = [[0],[0]];
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["diffblk"]), new ScilabDouble([10001]));
        this.model.in1 = new ScilabDouble([1]);
        this.model.out = new ScilabDouble([1]);
        this.model.state = new ScilabDouble(this.x0);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabDouble([false,true]);
        this.exprs = [[strcat(sci2exp(this.x0[1-1]))],[strcat(sci2exp(this.x0[2-1]))]];
        this.gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DIFF_f\",sz(1),sz(2));"]);
        this.x = standard_define([2,2],this.model,this.exprs,this.gr_i);
        return new BasicBlock(this.x);
    }
    DIFF_f.prototype.details = function DIFF_f() {
        return this.x;
    }
    DIFF_f.prototype.get = function DIFF_f() {
        var options = {
            x0:["Initial state",this.x0.toString().replace(/,/g," ")],
            xd0:["Initial Derivative",this.xd0],
        }
        return options;
    }
    DIFF_f.prototype.set = function DIFF_f() {
        this.x0 = inverse(arguments[0]["x0"])
        this.xd0 = arguments[0]["xd0"]
        this.exprs = arguments[0]["exprs"]
        this.x = arg1;
        this.graphics = arg1.graphics;
        this.exprs = this.graphics.exprs;
        this.model = arg1.model;
        while (true) {
            [ok,this.x0,this.xd0,this.exprs] = scicos_getvalue("Set continuous linear system parameters",["Initial state","Initial Derivative"],list("vec",1,"vec",1),this.exprs);
            if (!ok) {
                break;
            }
            this.graphics.exprs = new ScilabDouble([this.exprs]);
            this.model.state = new ScilabDouble([this.x0.slice()],[this.xd0.slice()]);
            this.x.graphics = this.graphics;
            this.x.model = this.model;
            break;
        }
        this.x.model.firing = [];
        return new BasicBlock(this.x);
    }
}
