/* autogenerated from "macros/Electrical/CVS.sci" */
function CVS() {
    CVS.prototype.define = function CVS() {
        var ModelName = "CVS";
        var PrametersValue = [];
        var ParametersName = [];
        this.model = scicos_model();
        var Typein = [];
        var Typeout = [];
        var MI = [];
        var MO = [];
        var P = [[2,50,1,0],[70,98,2,0],[70,2,-2,0]];
        var PortName = [["vin"],["p"],["n"]];
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
        var exprs = [];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CVS\",sz(1),sz(2));"]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabBoolean([false,true]);
        mo.model = ModelName;
        this.model.equations = new ScilabDouble([mo]);
        this.model.in = new ScilabDouble([ones(size(MI,"*"),1)]);
        this.model.out = new ScilabDouble([ones(size(MO,"*"),1)]);
        this.x = new standard_define(new ScilabDouble([2.1,3]),this.model,new ScilabDouble(exprs),list(gr_i,0));
        this.x.graphics.in_implicit = Typein;
        this.x.graphics.out_implicit = Typeout;
        return new BasicBlock(this.x);
    }
    CVS.prototype.details = function CVS() {
        return this.x;
    }
    CVS.prototype.get = function CVS() {
        alert("parameters cannot be modified");
    }
    CVS.prototype.set = function CVS() {
        var exprs = this.graphics.exprs;
        return new BasicBlock(this.x);
    }
}
