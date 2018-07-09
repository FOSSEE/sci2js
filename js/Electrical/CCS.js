/* autogenerated from "macros/Electrical/CCS.sci" */
function CCS() {
    CCS.prototype.define = function CCS() {
        ModelName = "CCS";
        PrametersValue = [];
        ParametersName = [];
        this.model = scicos_model();
        Typein = [];
        Typeout = [];
        MI = [];
        MO = [];
        P = [[2,50,1,0],[70,98,2,0],[70,2,-2,0]];
        PortName = [["Iin"],["p"],["n"]];
        for (i=1;i<=size(P,"r");i+=1) {
            if (P[i-1][3-1]==1) {
                Typein = [[Typein],["E"]];
                MI = [[MI],[PortName[i-1]]];
            }
            if (P[i-1][3-1]==2) {
                Typein = [[Typein],["I"]];
                MI = [[MI],[PortName[i-1]]];
            }
            if (P[i-1][3-1]==-1) {
                Typeout = [[Typeout],["E"]];
                MO = [[MO],[PortName[i-1]]];
            }
            if (P[i-1][3-1]==-2) {
                Typeout = [[Typeout],["I"]];
                MO = [[MO],[PortName[i-1]]];
            }
        }
        this.model = scicos_model();
        mo = modelica();
        this.model.sim = new ScilabString([ModelName]);
        mo.inputs = MI;
        mo.outputs = MO;
        this.model.rpar = PrametersValue;
        mo.parameters = list(ParametersName,PrametersValue,zeros(ParametersName));
        exprs = [];
        gr_i = [];
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = [false,true];
        mo.model = ModelName;
        this.model.equations = new ScilabDouble([mo]);
        this.model.in1 = new ScilabDouble([ones(size(MI,"*"),1)]);
        this.model.out = new ScilabDouble([ones(size(MO,"*"),1)]);
        this.x = standard_define([2.1,3],this.model,exprs,list(gr_i,0));
        this.x.graphics.in_implicit = Typein;
        this.x.graphics.out_implicit = Typeout;
        return new BasicBlock(this.x);
    }
    CCS.prototype.details = function CCS() {
        return this.x;
    }
    CCS.prototype.get = function CCS() {
        var options = {
        }
        return options;
    }
    CCS.prototype.set = function CCS() {
        this.x = arg1;
        graphics = arg1.graphics;
        exprs = graphics.exprs;
        this.model = arg1.model;
        this.x = arg1;
        return new BasicBlock(this.x);
    }
}
