/* autogenerated from "macros/Hydraulics/VanneReglante.sci" */
function VanneReglante() {
    VanneReglante.prototype.define = function VanneReglante() {
        this.model = scicos_model();
        this.model.in1 = [[1],[1]];
        this.model.out = [1];
        this.Cvmax = 8005.42;
        this.p_rho = 0;
        this.model.rpar = new ScilabDouble([this.Cvmax],[this.p_rho]);
        this.model.sim = new ScilabString(["VanneReglante"]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = [true,false];
        mo = modelica();
        mo.model = "VanneReglante";
        mo.inputs = ["C1","Ouv"];
        mo.outputs = "C2";
        mo.parameters = list([["Cvmax"],["p_rho"]],[[this.Cvmax],[this.p_rho]]);
        this.model.equations = new ScilabDouble([mo]);
        this.model.in1 = new ScilabDouble([ones(size(mo.inputs,"*"),1)]);
        this.model.out = new ScilabDouble([ones(size(mo.outputs,"*"),1)]);
        exprs = [[string(this.Cvmax)],[string(this.p_rho)]];
        gr_i = [];
        this.x = standard_define([2,2],this.model,exprs,list(gr_i,0));
        this.x.graphics.in_implicit = [["I"],["E"]];
        this.x.graphics.out_implicit = ["I"];
        return new BasicBlock(this.x);
    }
    VanneReglante.prototype.details = function VanneReglante() {
        return this.x;
    }
    VanneReglante.prototype.get = function VanneReglante() {
        var options = {
            Cvmax:["Cvmax",this.Cvmax],
            p_rho:["p_rho",this.p_rho],
        }
        return options;
    }
    VanneReglante.prototype.set = function VanneReglante() {
        this.Cvmax = parseFloat(arguments[0]["Cvmax"])
        this.p_rho = parseFloat(arguments[0]["p_rho"])
        this.x = arg1;
        graphics = arg1.graphics;
        exprs = graphics.exprs;
        this.model = arg1.model;
        while (true) {
            [ok,this.Cvmax,this.p_rho,exprs] = scicos_getvalue("Paramètres de la vanne reglante",["Cvmax","p_rho"],list("vec",-1,"vec",-1),exprs);
            if (!ok) {
                break;
            }
            this.model.rpar = new ScilabDouble([this.Cvmax],[this.p_rho]);
            this.model.equations.parameters[2] = list(new ScilabDouble([this.Cvmax]), new ScilabDouble([this.p_rho]));
            graphics.exprs = exprs;
            this.x.graphics = graphics;
            this.x.model = this.model;
            break;
        }
        return new BasicBlock(this.x);
    }
}
