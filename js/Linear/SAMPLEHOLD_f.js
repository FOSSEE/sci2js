/* autogenerated from "macros/Linear/SAMPLEHOLD_f.sci" */
function SAMPLEHOLD_f() {
    SAMPLEHOLD_f.prototype.define = function SAMPLEHOLD_f() {
        var in1 = -1;
        this.model = scicos_model();
        this.model.sim = new ScilabString(["samphold"]);
        this.model.in = new ScilabDouble([-1]);
        this.model.out = new ScilabDouble([-1]);
        this.model.evtin = new ScilabDouble([1]);
        this.model.blocktype = new ScilabString(["d"]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SAMPLEHOLD_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,2]),this.model,new ScilabString([" "]),gr_i);
        return new BasicBlock(this.x);
    }
    SAMPLEHOLD_f.prototype.details = function SAMPLEHOLD_f() {
        return this.x;
    }
    SAMPLEHOLD_f.prototype.get = function SAMPLEHOLD_f() {
        alert("parameters cannot be modified");
    }
    SAMPLEHOLD_f.prototype.set = function SAMPLEHOLD_f() {
        this.x.model.firing = [];
        return new BasicBlock(this.x);
    }
    SAMPLEHOLD_f.prototype.get_popup_title = function SAMPLEHOLD_f() {
        return;
    }
    SAMPLEHOLD_f.prototype.getContainer = function SAMPLEHOLD_f() { return new BasicBlock(this.x); }
}
