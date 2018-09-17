/* autogenerated from "macros/Hydraulics/PuitsP.sci" */
function PuitsP() {
    PuitsP.prototype.define = function PuitsP() {
        this.model = scicos_model();
        this.P0 = 100000;
        this.T0 = 290;
        this.H0 = 100000;
        this.option_temperature = 1;
        this.model.rpar = new ScilabDouble([this.P0],[this.T0],[this.H0],[this.option_temperature]);
        this.model.sim = new ScilabString(["Puits"]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        var mo = modelica();
        mo.model = "Puits";
        mo.inputs = ["C"];
        mo.parameters = list([["P0"],["T0"],["H0"],["option_temperature"]],[[this.P0],[this.T0],[this.H0],[this.option_temperature]]);
        this.model.equations = new ScilabDouble([mo]);
        this.model.in = new ScilabDouble([ones(size(mo.inputs,"*"),1)]);
        var exprs = [[string(this.P0)],[string(this.T0)],[string(this.H0)],[string(this.option_temperature)]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"PuitsP\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2.5,2]),this.model,new ScilabDouble(exprs),list(gr_i,0));
        this.x.graphics.in_implicit = ["I"];
        return new BasicBlock(this.x);
    }
    PuitsP.prototype.details = function PuitsP() {
        return this.x;
    }
    PuitsP.prototype.get = function PuitsP() {
        var exprs = this.graphics.exprs;
        this.set_param_popup_title = "Paramètres du puits";
        var options = {
            P0:["Pression de la source : P0 (Pa)",this.P0],
            T0:["Temperature de la source : T0 (K)",this.T0],
            H0:["Enthalpie spécifique de la source : H0 (J/kg)",this.H0],
            option_temperature:["1:température fixée - 2:enthalpie fixée : option_temperature",this.option_temperature],
        }
        return options;
    }
    PuitsP.prototype.set = function PuitsP() {
        var exprs = this.graphics.exprs;
        while (true) {
            var ok = true;
            this.P0 = parseFloat(arguments[0]["P0"]);
            this.T0 = parseFloat(arguments[0]["T0"]);
            this.H0 = parseFloat(arguments[0]["H0"]);
            this.option_temperature = parseFloat(arguments[0]["option_temperature"]);
            var exprs = [arguments[0]["P0"], arguments[0]["T0"], arguments[0]["H0"], arguments[0]["option_temperature"]];
            if (!ok) {
                break;
            }
            this.model.rpar = new ScilabDouble([this.P0],[this.T0],[this.H0],[this.option_temperature]);
            this.model.equations.parameters[2-1] = list(new ScilabDouble([this.P0]), new ScilabDouble([this.T0]), new ScilabDouble([this.H0]), new ScilabDouble([this.option_temperature]));
            this.graphics.exprs = new ScilabDouble([exprs]);
            this.x.graphics = this.graphics;
            this.x.model = this.model;
            break;
        }
        return new BasicBlock(this.x);
    }
    PuitsP.prototype.get_popup_title = function PuitsP() {
        return this.set_param_popup_title;
    }
    PuitsP.prototype.importset = function PuitsP() {
        var graphics = this.x.graphics;
        var ary = getData(graphics.exprs);
        this.P0 = ary[0];
        this.T0 = ary[1];
        this.H0 = ary[2];
        this.option_temperature = ary[3];
    }
    PuitsP.prototype.getContainer = function PuitsP() { return new BasicBlock(this.x); }
}
