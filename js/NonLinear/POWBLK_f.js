/* autogenerated from "macros/NonLinear/POWBLK_f.sci" */
function POWBLK_f() {
    POWBLK_f.prototype.define = function POWBLK_f() {
        var in1 = 1;
        this.a = 1.5;
        this.model = scicos_model();
        this.model.sim = new ScilabString(["powblk"]);
        this.model.in = new ScilabDouble([-1]);
        this.model.out = new ScilabDouble([-1]);
        this.model.rpar = new ScilabDouble([this.a]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        var exprs = string(this.a);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"POWBLK_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,2]),this.model,new ScilabString([exprs]),gr_i);
        return new BasicBlock(this.x);
    }
    POWBLK_f.prototype.details = function POWBLK_f() {
        return this.x;
    }
    POWBLK_f.prototype.get = function POWBLK_f() {
        var exprs = this.graphics.exprs;
        if (size(exprs,"*")==2) {
            var exprs = exprs[2-1];
        }
        this.set_param_popup_title = "Set u^a block parameters";
        var options = {
            a:["to the power of",this.a],
        }
        return options;
    }
    POWBLK_f.prototype.set = function POWBLK_f() {
        var exprs = this.graphics.exprs;
        if (size(exprs,"*")==2) {
            var exprs = exprs[2-1];
        }
        while (true) {
            var ok = true;
            this.a = parseFloat(arguments[0]["a"]);
            var exprs = [arguments[0]["a"]];
            if (!ok) {
                break;
            }
            this.graphics.exprs = new ScilabDouble([exprs]);
            if (this.a==int(this.a)) {
                this.model.ipar = new ScilabDouble([this.a]);
                this.model.rpar = new ScilabDouble([]);
            } else {
                this.model.rpar = new ScilabDouble([this.a]);
                this.model.ipar = new ScilabDouble([]);
            }
            this.model.firing = new ScilabDouble([]);
            this.x.graphics = this.graphics;
            this.x.model = this.model;
            break;
        }
        return new BasicBlock(this.x);
    }
    POWBLK_f.prototype.get_popup_title = function POWBLK_f() {
        return this.set_param_popup_title;
    }
    POWBLK_f.prototype.importset = function POWBLK_f() {
        var graphics = this.x.graphics;
        var ary = getData(graphics.exprs);
        this.a = ary[0];
    }
    POWBLK_f.prototype.getContainer = function POWBLK_f() { return new BasicBlock(this.x); }
}
