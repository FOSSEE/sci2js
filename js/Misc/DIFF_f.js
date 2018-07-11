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
        this.model.dep_ut = [false,true];
        exprs = [[strcat(sci2exp(this.x0[1-1]))],[strcat(sci2exp(this.x0[2-1]))]];
        gr_i = [];
        this.x = standard_define([2,2],this.model,exprs,gr_i);
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
        this.x = arg1;
        graphics = arg1.graphics;
        exprs = graphics.exprs;
        this.model = arg1.model;
        while (true) {
            [ok,this.x0,this.xd0,exprs] = scicos_getvalue("Set continuous linear system parameters",["Initial state","Initial Derivative"],list("vec",1,"vec",1),exprs);
            if (!ok) {
                break;
            }
            graphics.exprs = exprs;
            this.model.state = new ScilabDouble([this.x0.slice()],[this.xd0.slice()]);
            this.x.graphics = graphics;
            this.x.model = this.model;
            break;
        }
        this.x.model.firing = [];
        return new BasicBlock(this.x);
    }
}
