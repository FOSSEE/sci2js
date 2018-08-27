/* autogenerated from "macros/Electrical/PNP.sci" */
function PNP() {
    PNP.prototype.define = function PNP() {
        var ModelName = "PNP";
        var PrametersValue = [[50],[0.1],[0],[0.02],[1.200e-10],[5.000e-09],[1.000e-12],[4.000e-13],[5.000e-13],[0.8],[0.4],[0.8],[0.333],[1.000e-15],[1.000e-15],[0.02585],[40]];
        var ParametersName = [["Bf"],["Br"],["Is"],["Vak"],["Tauf"],["Taur"],["Ccs"],["Cje"],["Cjc"],["Phie"],["Me"],["Phic"],["Mc"],["Gbc"],["Gbe"],["Vt"],["EMinMax"]];
        this.model = scicos_model();
        var Typein = [];
        var Typeout = [];
        var MI = [];
        var MO = [];
        var P = [[100,90,-2,0],[0,50,2,0],[100,10,-2,0]];
        var PortName = [["C"],["B"],["E"]];
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
        var exprs = [["50"],["0.1"],["1.e-16"],["0.02"],["0.12e-9"],["5e-9"],["1e-12"],["0.4e-12"],["0.5e-12"],["0.8"],["0.4"],["0.8"],["0.333"],["1e-15"],["1e-15"],["0.02585"],["40"]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"PNP\",sz(1),sz(2));"]);
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
    PNP.prototype.details = function PNP() {
        return this.x;
    }
    PNP.prototype.get = function PNP() {
        var options = {
            Bf:["Bf  : Forward beta",this.Bf],
            Br:["Br  : Reverse beta",this.Br],
            Is:["Is  : Transport saturation current",this.Is],
            Vak:["Vak : Early voltage (inverse), 1/Volt",this.Vak],
            Tauf:["Tauf: Ideal forward transit time",this.Tauf],
            Taur:["Taur: Ideal reverse transit time",this.Taur],
            Ccs:["Ccs : Collector-substrat(ground) cap.",this.Ccs],
            Cje:["Cje : Base-emitter zero bias depletion cap.",this.Cje],
            Cjc:["Cjc : Base-coll. zero bias depletion cap.",this.Cjc],
            Phie:["Phie: Base-emitter diffusion voltage",this.Phie],
            Me:["Me  : Base-emitter gradation exponent",this.Me],
            Phic:["Phic: Base-collector diffusion voltage",this.Phic],
            Mc:["Mc  : Base-collector gradation exponent",this.Mc],
            Gbc:["Gbc : Base-collector conductance",this.Gbc],
            Gbe:["Gbe : Base-emitter conductance",this.Gbe],
            Vt:["Vt  : Voltage equivalent of temperature",this.Vt],
            EMinMax:["EMinMax: if x > EMinMax, the exp(x) function is linearized",this.EMinMax],
        }
        return options;
    }
    PNP.prototype.set = function PNP() {
        var exprs = this.graphics.exprs;
        var exprs = this.x.graphics.exprs;
        while (true) {
            var ok = true;
            this.Bf = arguments[0]["Bf"];
            this.Br = arguments[0]["Br"];
            this.Is = arguments[0]["Is"];
            this.Vak = arguments[0]["Vak"];
            this.Tauf = arguments[0]["Tauf"];
            this.Taur = arguments[0]["Taur"];
            this.Ccs = arguments[0]["Ccs"];
            this.Cje = arguments[0]["Cje"];
            this.Cjc = arguments[0]["Cjc"];
            this.Phie = arguments[0]["Phie"];
            this.Me = arguments[0]["Me"];
            this.Phic = arguments[0]["Phic"];
            this.Mc = arguments[0]["Mc"];
            this.Gbc = arguments[0]["Gbc"];
            this.Gbe = arguments[0]["Gbe"];
            this.Vt = arguments[0]["Vt"];
            this.EMinMax = arguments[0]["EMinMax"];
            var exprs = [arguments[0]["Bf"], arguments[0]["Br"], arguments[0]["Is"], arguments[0]["Vak"], arguments[0]["Tauf"], arguments[0]["Taur"], arguments[0]["Ccs"], arguments[0]["Cje"], arguments[0]["Cjc"], arguments[0]["Phie"], arguments[0]["Me"], arguments[0]["Phic"], arguments[0]["Mc"], arguments[0]["Gbc"], arguments[0]["Gbe"], arguments[0]["Vt"], arguments[0]["EMinMax"]];
            if (!ok) {
                break;
            }
            this.x.model.equations.parameters[2-1] = list(this.Bf,this.Br,this.Is,this.Vak,this.Tauf,this.Taur,this.Ccs,this.Cje,this.Cjc,this.Phie,this.Me,this.Phic,this.Mc,this.Gbc,this.Gbe,this.Vt,this.EMinMax);
            this.x.graphics.exprs = exprs;
            break;
        }
        return new BasicBlock(this.x);
    }
    PNP.prototype.get_popup_title = function PNP() {
        var set_param_popup_title = "Set PNP block parameters:";
        return set_param_popup_title;
    }
}
