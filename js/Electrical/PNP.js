/* autogenerated from "macros/Electrical/PNP.sci" */
function PNP() {
    PNP.prototype.define = function PNP() {
        ModelName = "PNP";
        PrametersValue = [[50],[0.1],[0],[0.02],[1.200e-10],[5.000e-09],[1.000e-12],[4.000e-13],[5.000e-13],[0.8],[0.4],[0.8],[0.333],[1.000e-15],[1.000e-15],[0.02585],[40]];
        ParametersName = [["Bf"],["Br"],["Is"],["Vak"],["Tauf"],["Taur"],["Ccs"],["Cje"],["Cjc"],["Phie"],["Me"],["Phic"],["Mc"],["Gbc"],["Gbe"],["Vt"],["EMinMax"]];
        this.model = scicos_model();
        Typein = [];
        Typeout = [];
        MI = [];
        MO = [];
        P = [[100,90,-2,0],[0,50,2,0],[100,10,-2,0]];
        PortName = [["C"],["B"],["E"]];
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
        this.model.rpar = new ScilabDouble(PrametersValue);
        mo.parameters = list(ParametersName,PrametersValue,zeros(ParametersName));
        exprs = [["50"],["0.1"],["1.e-16"],["0.02"],["0.12e-9"],["5e-9"],["1e-12"],["0.4e-12"],["0.5e-12"],["0.8"],["0.4"],["0.8"],["0.333"],["1e-15"],["1e-15"],["0.02585"],["40"]];
        gr_i = [];
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = [false,true];
        mo.model = ModelName;
        this.model.equations = new ScilabDouble([mo]);
        this.model.in1 = new ScilabDouble([ones(size(MI,"*"),1)]);
        this.model.out = new ScilabDouble([ones(size(MO,"*"),1)]);
        this.x = standard_define([2,2],this.model,exprs,list(gr_i,0));
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
        this.Bf = arguments[0]["Bf"]
        this.Br = arguments[0]["Br"]
        this.Is = arguments[0]["Is"]
        this.Vak = arguments[0]["Vak"]
        this.Tauf = arguments[0]["Tauf"]
        this.Taur = arguments[0]["Taur"]
        this.Ccs = arguments[0]["Ccs"]
        this.Cje = arguments[0]["Cje"]
        this.Cjc = arguments[0]["Cjc"]
        this.Phie = arguments[0]["Phie"]
        this.Me = arguments[0]["Me"]
        this.Phic = arguments[0]["Phic"]
        this.Mc = arguments[0]["Mc"]
        this.Gbc = arguments[0]["Gbc"]
        this.Gbe = arguments[0]["Gbe"]
        this.Vt = arguments[0]["Vt"]
        this.EMinMax = arguments[0]["EMinMax"]
        this.x = arg1;
        graphics = arg1.graphics;
        exprs = graphics.exprs;
        this.model = arg1.model;
        this.x = arg1;
        exprs = this.x.graphics.exprs;
        while (true) {
            [ok,this.Bf,this.Br,this.Is,this.Vak,this.Tauf,this.Taur,this.Ccs,this.Cje,this.Cjc,this.Phie,this.Me,this.Phic,this.Mc,this.Gbc,this.Gbe,this.Vt,this.EMinMax,exprs] = scicos_getvalue([["Set PNP block parameters:"],[""]],["Bf  : Forward beta","Br  : Reverse beta","Is  : Transport saturation current","Vak : Early voltage (inverse), 1/Volt","Tauf: Ideal forward transit time","Taur: Ideal reverse transit time","Ccs : Collector-substrat(ground) cap.","Cje : Base-emitter zero bias depletion cap.","Cjc : Base-coll. zero bias depletion cap.","Phie: Base-emitter diffusion voltage","Me  : Base-emitter gradation exponent","Phic: Base-collector diffusion voltage","Mc  : Base-collector gradation exponent","Gbc : Base-collector conductance","Gbe : Base-emitter conductance","Vt  : Voltage equivalent of temperature","EMinMax: if x > EMinMax, the exp(x) function is linearized"],list("vec",1,"vec",1,"vec",1,"vec",1,"vec",1,"vec",1,"vec",1,"vec",1,"vec",1,"vec",1,"vec",1,"vec",1,"vec",1,"vec",1,"vec",1,"vec",1,"vec",1),exprs);
            if (!ok) {
                break;
            }
            this.x.model.equations.parameters[2-1] = list(this.Bf,this.Br,this.Is,this.Vak,this.Tauf,this.Taur,this.Ccs,this.Cje,this.Cjc,this.Phie,this.Me,this.Phic,this.Mc,this.Gbc,this.Gbe,this.Vt,this.EMinMax);
            this.x.graphics.exprs = exprs;
            break;
        }
        return new BasicBlock(this.x);
    }
}
