/* autogenerated from "macros/Linear/SUM_f.sci" */
function SUM_f() {
    SUM_f.prototype.define = function SUM_f() {
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["plusblk"]), new ScilabDouble([2]));
        this.model.in1 = new ScilabDouble([-1],[-1],[-1]);
        this.model.out = new ScilabDouble([-1]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabDouble([true,false]);
        this.gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SUM_f\",sz(1),sz(2));"]);
        this.exprs = [];
        this.x = standard_define([1,1],this.model,this.exprs,this.gr_i);
        return new BasicBlock(this.x);
    }
    SUM_f.prototype.details = function SUM_f() {
        return this.x;
    }
    SUM_f.prototype.get = function SUM_f() {
        var options = {
        }
        return options;
    }
    SUM_f.prototype.set = function SUM_f() {
        this.x = arg1;
        return new BasicBlock(this.x);
    }
}
