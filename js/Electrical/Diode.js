/* autogenerated from "macros/Electrical/Diode.sci" */
function Diode() {
    Diode.prototype.define = function Diode() {
        this.Ids = 1.e-6;
        this.Vt = 0.04;
        this.Maxexp = 15;
        this.R = 1.e8;
        this.model = scicos_model();
        this.model.rpar = new ScilabDouble([this.Ids],[this.Vt],[this.Maxexp],[this.R]);
        this.model.in = new ScilabDouble([1]);
        this.model.out = new ScilabDouble([1]);
        this.model.sim = new ScilabString(["Diode"]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        var mo = modelica();
        mo.model = "Diode";
        mo.inputs = "p";
        mo.outputs = "n";
        mo.parameters = list(["Ids","Vt","Maxexp","R"],list(this.Ids,this.Vt,this.Maxexp,this.R));
        this.model.equations = new ScilabDouble([mo]);
        var exprs = string([[this.Ids],[this.Vt],[this.Maxexp],[this.R]]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"Diode\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,1]),this.model,new ScilabString([exprs]),list(gr_i,0));
        this.x.graphics.in_implicit = ["I"];
        this.x.graphics.out_implicit = ["I"];
        return new BasicBlock(this.x);
    }
    Diode.prototype.details = function Diode() {
        return this.x;
    }
    Diode.prototype.get = function Diode() {
        var exprs = this.graphics.exprs;
        this.set_param_popup_title = "Set Diode block parameter";
        var options = {
            Ids:["Saturation cuurent (A)",this.Ids],
            Vt:["Voltage equivalent to temperature (Volt)",this.Vt],
            Maxexp:["Max exponent for linear continuation",this.Maxexp],
            R:["R (ohm)",this.R],
        }
        return options;
    }
    Diode.prototype.set = function Diode() {
        var exprs = this.graphics.exprs;
        while (true) {
            var ok = true;
            this.Ids = parseFloat(arguments[0]["Ids"]);
            this.Vt = parseFloat(arguments[0]["Vt"]);
            this.Maxexp = parseFloat(arguments[0]["Maxexp"]);
            this.R = parseFloat(arguments[0]["R"]);
            var exprs = [arguments[0]["Ids"], arguments[0]["Vt"], arguments[0]["Maxexp"], arguments[0]["R"]];
            if (!ok) {
                break;
            }
            this.model.rpar = new ScilabDouble([this.Ids],[this.Vt],[this.Maxexp],[this.R]);
            this.model.equations.parameters = list(new ScilabDouble([["Ids","Vt","Maxexp","R"]]),list(this.Ids,this.Vt,this.Maxexp,this.R));
            this.graphics.exprs = new ScilabDouble([exprs]);
            this.x.graphics = this.graphics;
            this.x.model = this.model;
            break;
        }
        return new BasicBlock(this.x);
    }
    Diode.prototype.get_popup_title = function Diode() {
        return this.set_param_popup_title;
    }
    Diode.prototype.importset = function Diode() {
        var graphics = this.x.graphics;
        var ary = getData(graphics.exprs);
        this.Ids = ary[0];
        this.Vt = ary[1];
        this.Maxexp = ary[2];
        this.R = ary[3];
    }
    Diode.prototype.getContainer = function Diode() { return new BasicBlock(this.x); }
}
