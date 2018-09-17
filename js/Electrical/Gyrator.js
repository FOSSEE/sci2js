/* autogenerated from "macros/Electrical/Gyrator.sci" */
function Gyrator() {
    Gyrator.prototype.define = function Gyrator() {
        var ModelName = "Gyrator";
        var PrametersValue = [[1],[1]];
        var ParametersName = [["G1"],["G2"]];
        this.model = scicos_model();
        var Typein = [];
        var Typeout = [];
        var MI = [];
        var MO = [];
        var P = [[2.5,90,2,0],[2.5,10,2,0],[97.5,90,-2,0],[97.5,10,-2,0]];
        var PortName = [["p1"],["n1"],["p2"],["n2"]];
        for (i=1;i<=size(P,"r");i+=1) {
            if (P[i-1][3-1]==1) {
                var Typein = [[Typein],["E"]];
                var MI = [[MI],[PortName[i-1]]];
            }
            if (P[i-1][3-1]==2) {
                var Typein = [[Typein],["I"]];
                var MI = [[MI],[PortName[i-1]]];
            }
            if (P[i-1][3-1]==-1) {
                var Typeout = [[Typeout],["E"]];
                var MO = [[MO],[PortName[i-1]]];
            }
            if (P[i-1][3-1]==-2) {
                var Typeout = [[Typeout],["I"]];
                var MO = [[MO],[PortName[i-1]]];
            }
        }
        this.model = scicos_model();
        var mo = modelica();
        this.model.sim = new ScilabString([ModelName]);
        mo.inputs = MI;
        mo.outputs = MO;
        this.model.rpar = new ScilabDouble(PrametersValue);
        mo.parameters = list(ParametersName,PrametersValue,zeros(ParametersName));
        var exprs = [["1"],["1"]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"Gyrator\",sz(1),sz(2));"]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabBoolean([false,true]);
        mo.model = ModelName;
        this.model.equations = new ScilabDouble([mo]);
        this.model.in = new ScilabDouble([ones(size(MI,"*"),1)]);
        this.model.out = new ScilabDouble([ones(size(MO,"*"),1)]);
        this.x = new standard_define(new ScilabDouble([2,2]),this.model,new ScilabDouble(exprs),list(gr_i,0));
        this.x.graphics.in_implicit = Typein;
        this.x.graphics.out_implicit = Typeout;
        return new BasicBlock(this.x);
    }
    Gyrator.prototype.details = function Gyrator() {
        return this.x;
    }
    Gyrator.prototype.get = function Gyrator() {
        var exprs = this.graphics.exprs;
        var exprs = this.x.graphics.exprs;
        this.set_param_popup_title = "Set Gyrator block parameters:";
        var options = {
            G1:["G1",this.G1],
            G2:["G2",this.G2],
        }
        return options;
    }
    Gyrator.prototype.set = function Gyrator() {
        var exprs = this.graphics.exprs;
        var exprs = this.x.graphics.exprs;
        while (true) {
            var ok = true;
            this.G1 = arguments[0]["G1"];
            this.G2 = arguments[0]["G2"];
            var exprs = [arguments[0]["G1"], arguments[0]["G2"]];
            if (!ok) {
                break;
            }
            this.x.model.equations.parameters[2-1] = list(this.G1,this.G2);
            this.x.graphics.exprs = exprs;
            break;
        }
        return new BasicBlock(this.x);
    }
    Gyrator.prototype.get_popup_title = function Gyrator() {
        return this.set_param_popup_title;
    }
    Gyrator.prototype.importset = function Gyrator() {
        var graphics = this.x.graphics;
        var ary = getData(graphics.exprs);
        this.G1 = ary[0];
        this.G2 = ary[1];
    }
    Gyrator.prototype.getContainer = function Gyrator() { return new BasicBlock(this.x); }
}
