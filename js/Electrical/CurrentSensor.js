/* autogenerated from "macros/Electrical/CurrentSensor.sci" */
function CurrentSensor() {
    CurrentSensor.prototype.define = function CurrentSensor() {
        this.model = scicos_model();
        this.model.in = new ScilabDouble([1]);
        this.model.out = new ScilabDouble([1],[1]);
        this.model.sim = new ScilabString(["CurrentSensor"]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        var mo = modelica();
        mo.model = "CurrentSensor";
        mo.inputs = "p";
        mo.outputs = [["n"],["i"]];
        this.model.equations = new ScilabDouble([mo]);
        var exprs = [];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CurrentSensor\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,2]),this.model,new ScilabDouble(exprs),list(gr_i,0));
        this.x.graphics.in_implicit = ["I"];
        this.x.graphics.out_implicit = [["I"],["E"]];
        return new BasicBlock(this.x);
    }
    CurrentSensor.prototype.details = function CurrentSensor() {
        return this.x;
    }
    CurrentSensor.prototype.get = function CurrentSensor() {
        alert("parameters cannot be modified");
    }
    CurrentSensor.prototype.set = function CurrentSensor() {
        return new BasicBlock(this.x);
    }
    CurrentSensor.prototype.get_popup_title = function CurrentSensor() {
        return;
    }
    CurrentSensor.prototype.getContainer = function CurrentSensor() { return new BasicBlock(this.x); }
}
