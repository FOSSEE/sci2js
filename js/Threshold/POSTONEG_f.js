/* autogenerated from "macros/Threshold/POSTONEG_f.sci" */
function POSTONEG_f() {
    POSTONEG_f.prototype.define = function POSTONEG_f() {
        var rpar = [[-1],[-1],[-1],[0]];
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["zcross"]), new ScilabDouble([1]));
        this.model.nzcross = new ScilabDouble([1]);
        this.model.in = new ScilabDouble([1]);
        this.model.evtout = new ScilabDouble([1]);
        this.model.rpar = new ScilabDouble([-1],[-1],[-1],[0]);
        this.model.blocktype = new ScilabString(["z"]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        this.model.firing = new ScilabDouble([-1]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"POSTONEG_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,2]),this.model,new ScilabDouble([]),gr_i);
        return new BasicBlock(this.x);
    }
    POSTONEG_f.prototype.details = function POSTONEG_f() {
        return this.x;
    }
    POSTONEG_f.prototype.get = function POSTONEG_f() {
        alert("parameters cannot be modified");
    }
    POSTONEG_f.prototype.set = function POSTONEG_f() {
        this.x.model.firing = [-1];
        return new BasicBlock(this.x);
    }
    POSTONEG_f.prototype.get_popup_title = function POSTONEG_f() {
        return;
    }
    POSTONEG_f.prototype.getContainer = function POSTONEG_f() { return new BasicBlock(this.x); }
}
