/* autogenerated from "macros/MatrixOp/MATZCONJ.sci" */
function MATZCONJ() {
    MATZCONJ.prototype.define = function MATZCONJ() {
        this.model = scicos_model();
        var function_name = "matz_conj";
        var funtyp = 4;
        this.model.sim = list(new ScilabString([function_name]), new ScilabDouble([funtyp]));
        this.model.in = new ScilabDouble([-1]);
        this.model.in2 = new ScilabDouble([-2]);
        this.model.intyp = new ScilabDouble([2]);
        this.model.out = new ScilabDouble([-1]);
        this.model.out2 = new ScilabDouble([-2]);
        this.model.outtyp = new ScilabDouble([2]);
        this.model.evtin = new ScilabDouble([]);
        this.model.evtout = new ScilabDouble([]);
        this.model.state = new ScilabDouble([]);
        this.model.dstate = new ScilabDouble([]);
        this.model.rpar = new ScilabDouble([]);
        this.model.ipar = new ScilabDouble([]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.firing = new ScilabDouble([]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        var label = [];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATZCONJ\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,2]),this.model,new ScilabDouble(label),gr_i);
        return new BasicBlock(this.x);
    }
    MATZCONJ.prototype.details = function MATZCONJ() {
        return this.x;
    }
    MATZCONJ.prototype.get = function MATZCONJ() {
        alert("parameters cannot be modified");
    }
    MATZCONJ.prototype.set = function MATZCONJ() {
        return new BasicBlock(this.x);
    }
}
