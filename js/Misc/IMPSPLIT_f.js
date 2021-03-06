/* autogenerated from "macros/Misc/IMPSPLIT_f.sci" */
function IMPSPLIT_f() {
    IMPSPLIT_f.prototype.define = function IMPSPLIT_f() {
        this.model = scicos_model();
        this.model.sim = new ScilabString(["limpsplit"]);
        var mo = modelica();
        mo.model = "limpsplit";
        mo.inputs = "n";
        mo.outputs = [["n"],["n"]];
        this.model.equations = new ScilabDouble([mo]);
        this.model.in = new ScilabDouble([ones(size(mo.inputs,"*"),1)]);
        this.model.out = new ScilabDouble([ones(size(mo.outputs,"*"),1)]);
        this.x = new standard_define(new ScilabDouble([1,1]),this.model,new ScilabDouble([]),[]);
        this.x.graphics.in_implicit = ["I"];
        this.x.graphics.out_implicit = ["I","I"];
        return new BasicBlock(this.x);
    }
    IMPSPLIT_f.prototype.details = function IMPSPLIT_f() {
        return this.x;
    }
    IMPSPLIT_f.prototype.get = function IMPSPLIT_f() {
        alert("parameters cannot be modified");
    }
    IMPSPLIT_f.prototype.set = function IMPSPLIT_f() {
        return new BasicBlock(this.x);
    }
    IMPSPLIT_f.prototype.get_popup_title = function IMPSPLIT_f() {
        return;
    }
    IMPSPLIT_f.prototype.getContainer = function IMPSPLIT_f() { return new BasicBlock(this.x); }
}
