/* autogenerated from "macros/NonLinear/MAX_f.sci" */
function MAX_f() {
    MAX_f.prototype.define = function MAX_f() {
        var in1 = -1;
        this.model = scicos_model();
        this.model.sim = new ScilabString(["maxblk"]);
        this.model.in1 = new ScilabDouble([in1]);
        this.model.out = new ScilabDouble([1]);
        this.model.dstate = new ScilabDouble([0],[0]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabDouble([true,false]);
        this.exprs = " ";
        this.gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MAX_f\",sz(1),sz(2));"]);
        this.x = standard_define([2,2],this.model,this.exprs,this.gr_i);
        return new BasicBlock(this.x);
    }
    MAX_f.prototype.details = function MAX_f() {
        return this.x;
    }
    MAX_f.prototype.get = function MAX_f() {
        var options = {
        }
        return options;
    }
    MAX_f.prototype.set = function MAX_f() {
        this.x = arg1;
        return new BasicBlock(this.x);
    }
}
