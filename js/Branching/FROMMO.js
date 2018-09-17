/* autogenerated from "macros/Branching/FROMMO.sci" */
function FROMMO() {
    FROMMO.prototype.define = function FROMMO() {
        this.model = scicos_model();
        this.model.sim = new ScilabString(["frommo"]);
        this.model.in = new ScilabDouble([]);
        this.model.in2 = new ScilabDouble([]);
        this.model.intyp = new ScilabDouble([1]);
        this.model.out = new ScilabDouble([-1]);
        this.model.out2 = new ScilabDouble([-2]);
        this.model.outtyp = new ScilabDouble([-1]);
        this.model.ipar = new ScilabDouble([]);
        this.model.opar = list(new ScilabString(["A"]));
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabBoolean([false,false]);
        var mo = modelica();
        mo.model = "frommo";
        mo.outputs = "n";
        var exprs = ["A"];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"FROMMO\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,1]),this.model,new ScilabString(exprs),gr_i);
        this.x.graphics.out_implicit = ["I"];
        return new BasicBlock(this.x);
    }
    FROMMO.prototype.details = function FROMMO() {
        return this.x;
    }
    FROMMO.prototype.get = function FROMMO() {
        var exprs = this.graphics.exprs;
        this.set_param_popup_title = "Set parameters";
        var options = {
            tag:["Tag",this.tag],
        }
        return options;
    }
    FROMMO.prototype.set = function FROMMO() {
        var exprs = this.graphics.exprs;
        while (true) {
            var ok = true;
            this.tag = arguments[0]["tag"];
            var exprs = [arguments[0]["tag"]];
            if (!ok) {
                break;
            }
            if (ok) {
                if (this.model.opar!=list(this.tag)) {
                    var needcompile = 4;
                    var y = needcompile;
                }
                this.graphics.exprs = new ScilabDouble([exprs]);
                this.model.opar = list(new ScilabDouble([this.tag]));
                this.x.model = this.model;
                this.x.graphics = this.graphics;
                break;
            }
        }
        needcompile = resume(needcompile)
        return new BasicBlock(this.x);
    }
    FROMMO.prototype.get_popup_title = function FROMMO() {
        return this.set_param_popup_title;
    }
    FROMMO.prototype.importset = function FROMMO() {
        var graphics = this.x.graphics;
        var ary = getData(graphics.exprs);
        this.tag = ary[0];
    }
    FROMMO.prototype.getContainer = function FROMMO() { return new BasicBlock(this.x); }
}
