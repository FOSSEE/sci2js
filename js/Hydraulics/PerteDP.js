/* autogenerated from "macros/Hydraulics/PerteDP.sci" */
function PerteDP() {
    PerteDP.prototype.define = function PerteDP() {
        this.model = scicos_model();
        this.model.in = new ScilabDouble([1]);
        this.model.out = new ScilabDouble([1]);
        this.L = 10;
        this.D = 0.2;
        this.lambda = 0.03;
        this.z1 = 0;
        this.z2 = 0;
        this.p_rho = 0;
        this.model.rpar = new ScilabDouble([this.L],[this.D],[this.lambda],[this.z1],[this.z2],[this.p_rho]);
        this.model.sim = new ScilabString(["PerteDP"]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        var mo = modelica();
        mo.model = "PerteDP";
        mo.inputs = "C1";
        mo.outputs = "C2";
        mo.parameters = list([["L"],["D"],["lambda"],["z1"],["z2"],["p_rho"]],[[this.L],[this.D],[this.lambda],[this.z1],[this.z2],[this.p_rho]]);
        this.model.equations = new ScilabDouble([mo]);
        this.model.in = new ScilabDouble([ones(size(mo.inputs,"*"),1)]);
        this.model.out = new ScilabDouble([ones(size(mo.outputs,"*"),1)]);
        var exprs = [[string(this.L)],[string(this.D)],[string(this.lambda)],[string(this.z1)],[string(this.z2)],[string(this.p_rho)]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"PerteDP\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,1]),this.model,new ScilabDouble(exprs),list(gr_i,0));
        this.x.graphics.in_implicit = ["I"];
        this.x.graphics.out_implicit = ["I"];
        return new BasicBlock(this.x);
    }
    PerteDP.prototype.details = function PerteDP() {
        return this.x;
    }
    PerteDP.prototype.get = function PerteDP() {
        var exprs = this.graphics.exprs;
        this.set_param_popup_title = "Parametres du tuyau";
        var options = {
            L:["Longueur du tube : L (m)",this.L],
            D:["Diamètre interne du tube : D (m)",this.D],
            lambda:["Coefficient de perte de charge-frottement(S.U) : lambda",this.lambda],
            z1:["Altitude entrée tuyauterie : z1 (m)",this.z1],
            z2:["Altitude sortie tuyauterie : z2 (m)",this.z2],
            p_rho:["Si >0, masse volumique imposée fu fluide : p_rho (kg/m3)",this.p_rho],
        }
        return options;
    }
    PerteDP.prototype.set = function PerteDP() {
        var exprs = this.graphics.exprs;
        while (true) {
            var ok = true;
            this.L = parseFloat(arguments[0]["L"]);
            this.D = parseFloat(arguments[0]["D"]);
            this.lambda = parseFloat(arguments[0]["lambda"]);
            this.z1 = parseFloat(arguments[0]["z1"]);
            this.z2 = parseFloat(arguments[0]["z2"]);
            this.p_rho = parseFloat(arguments[0]["p_rho"]);
            var exprs = [arguments[0]["L"], arguments[0]["D"], arguments[0]["lambda"], arguments[0]["z1"], arguments[0]["z2"], arguments[0]["p_rho"]];
            if (!ok) {
                break;
            }
            this.model.rpar = new ScilabDouble([this.L],[this.D],[this.lambda],[this.z1],[this.z2],[this.p_rho]);
            this.model.equations.parameters[2-1] = list(new ScilabDouble([this.L]), new ScilabDouble([this.D]), new ScilabDouble([this.lambda]), new ScilabDouble([this.z1]), new ScilabDouble([this.z2]), new ScilabDouble([this.p_rho]));
            this.graphics.exprs = new ScilabDouble([exprs]);
            this.x.graphics = this.graphics;
            this.x.model = this.model;
            break;
        }
        return new BasicBlock(this.x);
    }
    PerteDP.prototype.get_popup_title = function PerteDP() {
        return this.set_param_popup_title;
    }
    PerteDP.prototype.importset = function PerteDP() {
        var graphics = this.x.graphics;
        var ary = getData(graphics.exprs);
        this.L = ary[0];
        this.D = ary[1];
        this.lambda = ary[2];
        this.z1 = ary[3];
        this.z2 = ary[4];
        this.p_rho = ary[5];
    }
    PerteDP.prototype.getContainer = function PerteDP() { return new BasicBlock(this.x); }
}
