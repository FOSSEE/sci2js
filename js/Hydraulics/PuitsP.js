/* autogenerated from "macros/Hydraulics/PuitsP.sci" */
function PuitsP() {
    PuitsP.prototype.define = function PuitsP() {
        this.model = scicos_model();
        this.P0 = 100000;
        this.T0 = 290;
        this.H0 = 100000;
        this.option_temperature = 1;
        this.model.rpar = [[this.P0],[this.T0],[this.H0],[this.option_temperature]];
        this.model.sim = new ScilabString(["Puits"]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = [true,false];
        mo = modelica();
        mo.model = "Puits";
        mo.inputs = ["C"];
        mo.parameters = list([["P0"],["T0"],["H0"],["option_temperature"]],[[this.P0],[this.T0],[this.H0],[this.option_temperature]]);
        this.model.equations = new ScilabDouble([mo]);
        this.model.in1 = new ScilabDouble([ones(size(mo.inputs,"*"),1)]);
        exprs = [[string(this.P0)],[string(this.T0)],[string(this.H0)],[string(this.option_temperature)]];
        gr_i = [];
        this.x = standard_define([2.5,2],this.model,exprs,list(gr_i,0));
        this.x.graphics.in_implicit = ["I"];
        return new BasicBlock(this.x);
    }
    PuitsP.prototype.details = function PuitsP() {
        return this.x;
    }
    PuitsP.prototype.get = function PuitsP() {
        var options = {
            P0:["Pression de la source : P0 (Pa)",this.P0],
            T0:["Temperature de la source : T0 (K)",this.T0],
            H0:["Enthalpie spécifique de la source : H0 (J/kg)",this.H0],
            option_temperature:["1:température fixée - 2:enthalpie fixée : option_temperature",this.option_temperature],
        }
        return options;
    }
    PuitsP.prototype.set = function PuitsP() {
        this.P0 = parseFloat(arguments[0]["P0"])
        this.T0 = parseFloat(arguments[0]["T0"])
        this.H0 = parseFloat(arguments[0]["H0"])
        this.option_temperature = parseFloat(arguments[0]["option_temperature"])
        this.x = arg1;
        graphics = arg1.graphics;
        exprs = graphics.exprs;
        this.model = arg1.model;
        while (true) {
            [ok,this.P0,this.T0,this.H0,this.option_temperature,exprs] = scicos_getvalue("Paramètres du puits",["Pression de la source : P0 (Pa)","Temperature de la source : T0 (K)","Enthalpie spécifique de la source : H0 (J/kg)","1:température fixée - 2:enthalpie fixée : option_temperature"],list("vec",-1,"vec",-1,"vec",-1,"vec",-1),exprs);
            if (!ok) {
                break;
            }
            this.model.rpar = [[this.P0],[this.T0],[this.H0],[this.option_temperature]];
            this.model.equations.parameters[2] = list(new ScilabDouble([this.P0]), new ScilabDouble([this.T0]), new ScilabDouble([this.H0]), new ScilabDouble([this.option_temperature]));
            graphics.exprs = exprs;
            this.x.graphics = graphics;
            this.x.model = this.model;
            break;
        }
        return new BasicBlock(this.x);
    }
}
