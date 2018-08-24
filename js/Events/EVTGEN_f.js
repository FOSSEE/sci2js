/* autogenerated from "macros/Events/EVTGEN_f.sci" */
function EVTGEN_f() {
    EVTGEN_f.prototype.define = function EVTGEN_f() {
        this.tt = 0;
        this.model = scicos_model();
        this.model.sim = new ScilabString(["trash"]);
        this.model.evtout = new ScilabDouble([1]);
        this.model.blocktype = new ScilabString(["d"]);
        this.model.firing = new ScilabDouble([this.tt]);
        this.model.dep_ut = new ScilabBoolean([false,false]);
        var exprs = string(this.tt);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"EVTGEN_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3,2]),this.model,new ScilabString([exprs]),gr_i);
        return new BasicBlock(this.x);
    }
    EVTGEN_f.prototype.details = function EVTGEN_f() {
        return this.x;
    }
    EVTGEN_f.prototype.get = function EVTGEN_f() {
        var options = {
            tt:["Event Time",this.tt],
        }
        return options;
    }
    EVTGEN_f.prototype.set = function EVTGEN_f() {
        var exprs = this.graphics.exprs;
        while (true) {
            var ok = true;
            this.tt = parseFloat(arguments[0]["tt"]);
            if (!ok) {
                break;
            }
            this.graphics.exprs = new ScilabDouble([exprs]);
            if (this.model.firing!=this.tt) {
                this.model.firing = new ScilabDouble([this.tt]);
            }
            this.x.graphics = this.graphics;
            this.x.model = this.model;
            break;
        }
        return new BasicBlock(this.x);
    }
}
