/* autogenerated from "macros/Events/CLKSPLIT_f.sci" */
function CLKSPLIT_f() {
    CLKSPLIT_f.prototype.define = function CLKSPLIT_f() {
        this.model = scicos_model();
        this.model.sim = new ScilabString(["split"]);
        this.model.evtin = new ScilabDouble([1]);
        this.model.evtout = new ScilabDouble([1],[1]);
        this.model.blocktype = new ScilabString(["d"]);
        this.model.firing = new ScilabBoolean([false,false,false]);
        this.model.dep_ut = new ScilabBoolean([false,false]);
        this.x = new standard_define(new ScilabDouble([1,1]),this.model,new ScilabDouble([]),[]);
        return new BasicBlock(this.x);
    }
    CLKSPLIT_f.prototype.details = function CLKSPLIT_f() {
        return this.x;
    }
    CLKSPLIT_f.prototype.get = function CLKSPLIT_f() {
        alert("parameters cannot be modified");
    }
    CLKSPLIT_f.prototype.set = function CLKSPLIT_f() {
        return new BasicBlock(this.x);
    }
    CLKSPLIT_f.prototype.get_popup_title = function CLKSPLIT_f() {
        var set_param_popup_title = "Set parameters";
        return set_param_popup_title;
    }
}
