/* autogenerated from "macros/Sinks/CMATVIEW.sci" */
function CMATVIEW() {
    CMATVIEW.prototype.define = function CMATVIEW() {
        this.cmin = 0;
        this.cmax = 100;
        var size_c = 25;
        this.colormap = jetcolormap(size_c);
        var alpha_c = 0.24;
        var beta_c = 1;
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["cmatview"]), new ScilabDouble([4]));
        this.model.in = new ScilabDouble([-1]);
        this.model.in2 = new ScilabDouble([-2]);
        this.model.intyp = new ScilabDouble([1]);
        this.model.evtin = new ScilabDouble([1]);
        this.model.ipar = new ScilabDouble([this.cmin],[this.cmax],[size_c]);
        this.model.rpar = new ScilabDouble([alpha_c],[beta_c],[this.colormap.slice()]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        var exprs = [[string("jetcolormap(25)")],[string(this.cmin)],[string(this.cmax)]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CMATVIEW\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,2]),this.model,new ScilabDouble(exprs),gr_i);
        return new BasicBlock(this.x);
    }
    CMATVIEW.prototype.details = function CMATVIEW() {
        return this.x;
    }
    CMATVIEW.prototype.get = function CMATVIEW() {
        var exprs = this.graphics.exprs;
        this.set_param_popup_title = "Set Scope parameters";
        var options = {
            colormap:["ColorMap",this.colormap],
            cmin:["Minimum level range",this.cmin],
            cmax:["Maximum level range",this.cmax],
        }
        return options;
    }
    CMATVIEW.prototype.set = function CMATVIEW() {
        var exprs = this.graphics.exprs;
        while (true) {
            var ok = true;
            this.colormap = parseFloat(arguments[0]["colormap"]);
            this.cmin = parseFloat(arguments[0]["cmin"]);
            this.cmax = parseFloat(arguments[0]["cmax"]);
            var exprs = [arguments[0]["colormap"], arguments[0]["cmin"], arguments[0]["cmax"]];
            if (!ok) {
                break;
            }
            var mess = [];
            if (this.cmax<=this.cmin) {
                var mess = [[mess],["Error with minimum and maximum value"],[" "]];
                var ok = false;
            }
            if (!ok) {
                message([["Some specified values are inconsistent:"],[" "],[mess]]);
                throw "user error";
            }
            if (ok) {
                var size_c = size(this.colormap.slice(),1);
                var sol = inv([[this.cmin,1],[this.cmax,1]])*[[1],[size_c/3]];
                var alpha_c = sol[1-1];
                var beta_c = sol[2-1];
                var ipar = [[this.cmin],[this.cmax],[size_c]];
                var rpar = [[alpha_c],[beta_c],[this.colormap.slice()]];
                this.model.ipar = new ScilabDouble(ipar);
                this.model.rpar = new ScilabDouble(rpar);
                this.graphics.exprs = new ScilabDouble([exprs]);
                this.x.graphics = this.graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
    CMATVIEW.prototype.get_popup_title = function CMATVIEW() {
        return this.set_param_popup_title;
    }
    CMATVIEW.prototype.importset = function CMATVIEW() {
        var graphics = this.x.graphics;
        var ary = getData(graphics.exprs);
        this.colormap = ary[0];
        this.cmin = ary[1];
        this.cmax = ary[2];
    }
    CMATVIEW.prototype.getContainer = function CMATVIEW() { return new BasicBlock(this.x); }
}
