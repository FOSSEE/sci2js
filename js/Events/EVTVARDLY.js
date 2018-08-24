/* autogenerated from "macros/Events/EVTVARDLY.sci" */
function EVTVARDLY() {
    EVTVARDLY.prototype.define = function EVTVARDLY() {
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["evtvardly"]), new ScilabDouble([4]));
        this.model.in = new ScilabDouble([1]);
        this.model.evtin = new ScilabDouble([1]);
        this.model.evtout = new ScilabDouble([1]);
        this.model.blocktype = new ScilabString(["d"]);
        this.model.firing = new ScilabDouble([-1]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        var exprs = string(this.model.firing);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"EVTVARDLY\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,2]),this.model,new ScilabString([exprs]),gr_i);
        return new BasicBlock(this.x);
    }
    EVTVARDLY.prototype.details = function EVTVARDLY() {
        return this.x;
    }
    EVTVARDLY.prototype.get = function EVTVARDLY() {
        var options = {
            fir:["Initial event firing time (<0 if absent)",this.fir],
        }
        return options;
    }
    EVTVARDLY.prototype.set = function EVTVARDLY() {
        var exprs = this.graphics.exprs;
        while (true) {
            var ok = true;
            this.fir = arguments[0]["fir"];
            if (!ok) {
                break;
            }
            this.graphics.exprs = new ScilabDouble([exprs]);
            this.model.firing = new ScilabDouble([this.fir]);
            this.x.graphics = this.graphics;
            this.x.model = this.model;
            break;
        }
        return new BasicBlock(this.x);
    }
    EVTVARDLY.prototype.get_popup_title = function EVTVARDLY() {
        var set_param_popup_title = "Set parameter of variable event delay";
        return set_param_popup_title;
    }
}
