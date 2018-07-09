/* autogenerated from "macros/NonLinear/ABS_VALUE.sci" */
function ABS_VALUE() {
    ABS_VALUE.prototype.define = function ABS_VALUE() {
        nu = -1;
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["absolute_value"]), new ScilabDouble([4]));
        this.model.in1 = new ScilabDouble([nu]);
        this.model.out = new ScilabDouble([nu]);
        this.model.nzcross = new ScilabDouble([nu]);
        this.model.nmode = new ScilabDouble([nu]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = [true,false];
        exprs = [string([1])];
        gr_i = [];
        this.x = standard_define([2,2],this.model,exprs,gr_i);
        return new BasicBlock(this.x);
    }
    ABS_VALUE.prototype.details = function ABS_VALUE() {
        return this.x;
    }
    ABS_VALUE.prototype.get = function ABS_VALUE() {
        var options = {
            zcr:["use zero_crossing (1: yes) (0:no)",this.zcr],
        }
        return options;
    }
    ABS_VALUE.prototype.set = function ABS_VALUE() {
        this.zcr = arguments[0]["zcr"]
        this.x = arg1;
        graphics = arg1.graphics;
        exprs = graphics.exprs;
        this.model = arg1.model;
        while (true) {
            [ok,this.zcr,exprs] = scicos_getvalue("Set block parameters",["use zero_crossing (1: yes) (0:no)"],list("vec",1),exprs);
            if (!ok) {
                break;
            }
            graphics.exprs = exprs;
            if (ok) {
                if (this.zcr!=0) {
                    this.model.nmode = new ScilabDouble([-1]);
                    this.model.nzcross = new ScilabDouble([-1]);
                } else {
                    this.model.nmode = new ScilabDouble([0]);
                    this.model.nzcross = new ScilabDouble([0]);
                }
                this.x.graphics = graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
}
