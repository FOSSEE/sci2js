/* autogenerated from "macros/Branching/GotoTagVisibility.sci" */
function GotoTagVisibility() {
    GotoTagVisibility.prototype.define = function GotoTagVisibility() {
        this.model = scicos_model();
        this.model.sim = new ScilabString(["gototagvisibility"]);
        this.model.in = new ScilabDouble([]);
        this.model.in2 = new ScilabDouble([]);
        this.model.out = new ScilabDouble([]);
        this.model.out2 = new ScilabDouble([]);
        this.model.evtin = new ScilabDouble([]);
        this.model.intyp = new ScilabDouble([1]);
        this.model.outtyp = new ScilabDouble([1]);
        this.model.opar = list(new ScilabString(["A"]));
        this.model.blocktype = new ScilabString(["c"]);
        this.model.firing = new ScilabBoolean([false]);
        this.model.dep_ut = new ScilabBoolean([false,false]);
        var exprs = "A";
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"GotoTagVisibility\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,2]),this.model,new ScilabString([exprs]),gr_i);
        return new BasicBlock(this.x);
    }
    GotoTagVisibility.prototype.details = function GotoTagVisibility() {
        return this.x;
    }
    GotoTagVisibility.prototype.get = function GotoTagVisibility() {
        var options = {
            tag:["GotoTag",this.tag],
        }
        return options;
    }
    GotoTagVisibility.prototype.set = function GotoTagVisibility() {
        var exprs = this.graphics.exprs;
        while (true) {
            var ok = true;
            this.tag = arguments[0]["tag"];
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
                this.x.graphics = this.graphics;
                this.x.model = this.model;
                break;
            }
        }
        needcompile = resume(needcompile)
        return new BasicBlock(this.x);
    }
    GotoTagVisibility.prototype.get_popup_title = function GotoTagVisibility() {
        var set_param_popup_title = "Set parameters";
        return set_param_popup_title;
    }
}
