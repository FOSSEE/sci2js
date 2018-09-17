/* autogenerated from "macros/Events/HALT_f.sci" */
function HALT_f() {
    HALT_f.prototype.define = function HALT_f() {
        this.n = 0;
        this.model = scicos_model();
        this.model.sim = new ScilabString(["hltblk"]);
        this.model.evtin = new ScilabDouble([1]);
        this.model.dstate = new ScilabDouble([0]);
        this.model.ipar = new ScilabDouble([0]);
        this.model.blocktype = new ScilabString(["d"]);
        this.model.dep_ut = new ScilabBoolean([false,false]);
        var exprs = string(this.n);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"HALT_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,2]),this.model,new ScilabString([exprs]),gr_i);
        return new BasicBlock(this.x);
    }
    HALT_f.prototype.details = function HALT_f() {
        return this.x;
    }
    HALT_f.prototype.get = function HALT_f() {
        var exprs = this.graphics.exprs;
        this.set_param_popup_title = "Set Halt block parameters";
        var options = {
            n:["State on halt",this.n],
        }
        return options;
    }
    HALT_f.prototype.set = function HALT_f() {
        var exprs = this.graphics.exprs;
        while (true) {
            var ok = true;
            this.n = parseFloat(arguments[0]["n"]);
            var exprs = [arguments[0]["n"]];
            if (!ok) {
                break;
            }
            if (ok) {
                this.graphics.exprs = new ScilabDouble([exprs]);
                this.model.ipar = new ScilabDouble([this.n]);
                this.x.graphics = this.graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
    HALT_f.prototype.get_popup_title = function HALT_f() {
        return this.set_param_popup_title;
    }
    HALT_f.prototype.importset = function HALT_f() {
        var graphics = this.x.graphics;
        var ary = getData(graphics.exprs);
        this.n = ary[0];
    }
    HALT_f.prototype.getContainer = function HALT_f() { return new BasicBlock(this.x); }
}
