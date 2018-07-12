/* autogenerated from "macros/Electrical/VoltageSensor.sci" */
function VoltageSensor() {
    VoltageSensor.prototype.define = function VoltageSensor() {
        this.model = scicos_model();
        this.model.in1 = new ScilabDouble([1]);
        this.model.out = new ScilabDouble([1],[1]);
        this.model.sim = new ScilabString(["VoltageSensor"]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabDouble([true,false]);
        var mo = modelica();
        mo.model = "VoltageSensor";
        mo.inputs = "p";
        mo.outputs = [["n"],["v"]];
        this.model.equations = new ScilabDouble([mo]);
        this.exprs = [];
        this.gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"VoltageSensor\",sz(1),sz(2));"]);
        this.x = standard_define([2,2],this.model,this.exprs,list(this.gr_i,0));
        this.x.graphics.in_implicit = ["I"];
        this.x.graphics.out_implicit = [["I"],["E"]];
        return new VoltageSensorBlock(this.x);
    }
    VoltageSensor.prototype.details = function VoltageSensor() {
        return this.x;
    }
    VoltageSensor.prototype.get = function VoltageSensor() {
        var options = {
        }
        return options;
    }
    VoltageSensor.prototype.set = function VoltageSensor() {
        this.x = arg1;
        return new VoltageSensorBlock(this.x);
    }
}
