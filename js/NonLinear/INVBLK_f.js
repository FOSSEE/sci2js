/* autogenerated from "macros/NonLinear/INVBLK_f.sci" */
function INVBLK_f() {
    INVBLK_f.prototype.define = function INVBLK_f() {
        var in1 = -1;
        this.model = scicos_model();
        this.model.sim = new ScilabString(["invblk"]);
        this.model.in1 = new ScilabDouble([in1]);
        this.model.out = new ScilabDouble([in1]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabDouble([true,false]);
        this.exprs = " ";
        this.gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"INVBLK_f\",sz(1),sz(2));"]);
        this.x = standard_define([2,2],this.model,this.exprs,this.gr_i);
        return new BasicBlock(this.x);
    }
    INVBLK_f.prototype.details = function INVBLK_f() {
        return this.x;
    }
    INVBLK_f.prototype.get = function INVBLK_f() {
        var options = {
        }
        return options;
    }
    INVBLK_f.prototype.set = function INVBLK_f() {
        this.x = arg1;
        return new BasicBlock(this.x);
    }
}
