/* autogenerated from "macros/Events/ANDLOG_f.sci" */
function ANDLOG_f() {
    ANDLOG_f.prototype.define = function ANDLOG_f() {
        this.model = scicos_model();
        this.model.sim = new ScilabString(["andlog"]);
        this.model.out = new ScilabDouble([1]);
        this.model.evtin = new ScilabDouble([1],[1]);
        this.model.blocktype = new ScilabString(["d"]);
        this.model.firing = new ScilabDouble([]);
        this.model.dep_ut = new ScilabBoolean([false,false]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"ANDLOG_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3,3]),this.model,new ScilabDouble([]),gr_i);
        return new BasicBlock(this.x);
    }
    ANDLOG_f.prototype.details = function ANDLOG_f() {
        return this.x;
    }
    ANDLOG_f.prototype.get = function ANDLOG_f() {
        alert("parameters cannot be modified");
    }
    ANDLOG_f.prototype.set = function ANDLOG_f() {
        return new BasicBlock(this.x);
    }
    ANDLOG_f.prototype.get_popup_title = function ANDLOG_f() {
        return;
    }
    ANDLOG_f.prototype.getContainer = function ANDLOG_f() { return new BasicBlock(this.x); }
}
