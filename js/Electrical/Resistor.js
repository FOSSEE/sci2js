/* autogenerated from "macros/Electrical/Resistor.sci" */
function Resistor() {
    Resistor.prototype.define = function Resistor() {
        this.model = scicos_model();
        this.R = 0.01;
        this.model.rpar = new ScilabDouble([this.R]);
        this.model.sim = new ScilabString(["resistor"]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        var mo = modelica();
        mo.model = "Resistor";
        mo.inputs = "p";
        mo.outputs = "n";
        mo.parameters = list("R",list(this.R));
        this.model.equations = new ScilabDouble([mo]);
        this.model.in = new ScilabDouble([ones(size(mo.inputs,"*"),1)]);
        this.model.out = new ScilabDouble([ones(size(mo.outputs,"*"),1)]);
        var exprs = string(this.R);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"Resistor\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,1]),this.model,new ScilabString([exprs]),list(gr_i,0));
        this.x.graphics.in_implicit = ["I"];
        this.x.graphics.out_implicit = ["I"];
        return new BasicBlock(this.x);
    }
    Resistor.prototype.details = function Resistor() {
        return this.x;
    }
    Resistor.prototype.get = function Resistor() {
        var options = {
            R:["R (ohm)",this.R],
        }
        return options;
    }
    Resistor.prototype.set = function Resistor() {
        var exprs = this.graphics.exprs;
        while (true) {
            var ok = true;
            this.R = parseFloat(arguments[0]["R"]);
            if (!ok) {
                break;
            }
            this.model.rpar = new ScilabDouble([this.R]);
            this.model.equations.parameters[2-1] = list(new ScilabDouble([this.R]));
            this.graphics.exprs = new ScilabDouble([exprs]);
            this.x.graphics = this.graphics;
            this.x.model = this.model;
            break;
        }
        return new BasicBlock(this.x);
    }
    Resistor.prototype.get_popup_title = function Resistor() {
        var set_param_popup_title = "Set Resistor block parameter";
        return set_param_popup_title;
    }
}
