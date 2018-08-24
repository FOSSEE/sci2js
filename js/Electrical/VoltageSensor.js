/* autogenerated from "macros/Electrical/VoltageSensor.sci" */
function VoltageSensor() {
    VoltageSensor.prototype.define = function VoltageSensor() {
        this.model = scicos_model();
        this.model.in = new ScilabDouble([1]);
        this.model.out = new ScilabDouble([1],[1]);
        this.model.sim = new ScilabString(["VoltageSensor"]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        var mo = modelica();
        mo.model = "VoltageSensor";
        mo.inputs = "p";
        mo.outputs = [["n"],["v"]];
        this.model.equations = new ScilabDouble([mo]);
        var exprs = [];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"VoltageSensor\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,2]),this.model,new ScilabDouble(exprs),list(gr_i,0));
        this.x.graphics.in_implicit = ["I"];
        this.x.graphics.out_implicit = [["I"],["E"]];
        return new VoltageSensorBlock(this.x);
    }
    VoltageSensor.prototype.details = function VoltageSensor() {
        return this.x;
    }
    VoltageSensor.prototype.get = function VoltageSensor() {
        alert("parameters cannot be modified");
    }
    VoltageSensor.prototype.set = function VoltageSensor() {
        return new VoltageSensorBlock(this.x);
    }
    VoltageSensor.prototype.get_popup_title = function VoltageSensor() {
        var set_param_popup_title = "Set parameters";
        return set_param_popup_title;
    }
}
