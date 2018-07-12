/* autogenerated from "macros/Hydraulics/VanneReglante.sci" */
function VanneReglante() {
    VanneReglante.prototype.define = function VanneReglante() {
        this.model = scicos_model();
        this.model.in1 = new ScilabDouble([1],[1]);
        this.model.out = new ScilabDouble([1]);
        this.Cvmax = 8005.42;
        this.p_rho = 0;
        this.model.rpar = new ScilabDouble([this.Cvmax],[this.p_rho]);
        this.model.sim = new ScilabString(["VanneReglante"]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabDouble([true,false]);
        var mo = modelica();
        mo.model = "VanneReglante";
        mo.inputs = ["C1","Ouv"];
        mo.outputs = "C2";
        mo.parameters = list([["Cvmax"],["p_rho"]],[[this.Cvmax],[this.p_rho]]);
        this.model.equations = new ScilabDouble([mo]);
        this.model.in1 = new ScilabDouble([ones(size(mo.inputs,"*"),1)]);
        this.model.out = new ScilabDouble([ones(size(mo.outputs,"*"),1)]);
        this.exprs = [[string(this.Cvmax)],[string(this.p_rho)]];
        this.gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"VanneReglante\",sz(1),sz(2));"]);
        this.x = standard_define([2,2],this.model,this.exprs,list(this.gr_i,0));
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
        this.exprs = arguments[0]["exprs"]
        this.x = arg1;
        this.graphics = arg1.graphics;
        this.exprs = this.graphics.exprs;
        this.model = arg1.model;
        while (true) {
            [ok,this.Cvmax,this.p_rho,this.exprs] = scicos_getvalue("Paramètres de la vanne reglante",["Cvmax","p_rho"],list("vec",-1,"vec",-1),this.exprs);
            if (!ok) {
                break;
            }
            this.model.rpar = new ScilabDouble([this.Cvmax],[this.p_rho]);
            this.model.equations.parameters[2-1] = list(new ScilabDouble([this.Cvmax]), new ScilabDouble([this.p_rho]));
            this.graphics.exprs = new ScilabDouble([this.exprs]);
            this.x.graphics = this.graphics;
            this.x.model = this.model;
            break;
        }
        return new BasicBlock(this.x);
    }
}
