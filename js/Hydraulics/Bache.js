/* autogenerated from "macros/Hydraulics/Bache.sci" */
function Bache() {
    Bache.prototype.define = function Bache() {
        in1 = 2;
        out = 3;
        this.model = scicos_model();
        this.model.in1 = [-transpose([1:in1])];
        this.model.out = [-transpose([1:out])];
        this.Patm = 1.013e5;
        this.A = 1;
        this.ze1 = 40;
        this.ze2 = 0;
        this.zs1 = 40;
        this.zs2 = 0;
        this.z0 = 30;
        this.T0 = 290;
        this.p_rho = 0;
        this.model.rpar = [[this.Patm],[this.A],[this.ze1],[this.ze2],[this.zs1],[this.zs2],[this.z0],[this.T0],[this.p_rho]];
        this.model.sim = new ScilabString(["Bache"]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = [true,false];
        mo = modelica();
        mo.model = "Bache";
        mo.inputs = ["Ce1","Ce2"];
        mo.outputs = ["Cs1","Cs2","yNiveau"];
        mo.parameters = list([["Patm"],["A"],["ze1"],["ze2"],["zs1"],["zs2"],["z0"],["T0"],["p_rho"]],[[this.Patm],[this.A],[this.ze1],[this.ze2],[this.zs1],[this.zs2],[this.z0],[this.T0],[this.p_rho]]);
        this.model.equations = new ScilabDouble([mo]);
        this.model.in1 = new ScilabDouble([ones(size(mo.inputs,"*"),1)]);
        this.model.out = new ScilabDouble([ones(size(mo.outputs,"*"),1)]);
        exprs = [[string(this.Patm)],[string(this.A)],[string(this.ze1)],[string(this.ze2)],[string(this.zs1)],[string(this.zs2)],[string(this.z0)],[string(this.T0)],[string(this.p_rho)]];
        gr_i = [];
        this.x = standard_define([2,2],this.model,exprs,list(gr_i,0));
        this.x.graphics.in_implicit = [["I"],["I"]];
        this.x.graphics.out_implicit = [["I"],["I"],["E"]];
        return new BasicBlock(this.x);
    }
    Bache.prototype.details = function Bache() {
        return this.x;
    }
    Bache.prototype.get = function Bache() {
        var options = {
            Patm:["Pression dans le ciel de la bache : Patm (Pa)",this.Patm],
            A:["Section de la bache : A (m2)",this.A],
            ze1:["Altitude du piquage d entrée 1: ze1 (m)",this.ze1],
            ze2:["Altitude du piquage d entrée 2: ze2 (m)",this.ze2],
            zs1:["Altitude du piquage de sortie 1: zs1 (m)",this.zs1],
            zs2:["Altitude du piquage de sortie 2: zs2 (m)",this.zs2],
            z0:["Altitude initiale du fluide : z0 (m)",this.z0],
            T0:["Température initiale du fluide : T0 (K)",this.T0],
            p_rho:["Si >0, masse volumique imposée du fluide : p_rho (kg/m3)",this.p_rho],
        }
        return options;
    }
    Bache.prototype.set = function Bache() {
        this.Patm = parseFloat(arguments[0]["Patm"])
        this.A = parseFloat(arguments[0]["A"])
        this.ze1 = parseFloat(arguments[0]["ze1"])
        this.ze2 = parseFloat(arguments[0]["ze2"])
        this.zs1 = parseFloat(arguments[0]["zs1"])
        this.zs2 = parseFloat(arguments[0]["zs2"])
        this.z0 = parseFloat(arguments[0]["z0"])
        this.T0 = parseFloat(arguments[0]["T0"])
        this.p_rho = parseFloat(arguments[0]["p_rho"])
        this.x = arg1;
        graphics = arg1.graphics;
        exprs = graphics.exprs;
        this.model = arg1.model;
        while (true) {
            [ok,this.Patm,this.A,this.ze1,this.ze2,this.zs1,this.zs2,this.z0,this.T0,this.p_rho,exprs] = scicos_getvalue("Parametres de la bache",["Pression dans le ciel de la bache : Patm (Pa)","Section de la bache : A (m2)","Altitude du piquage d entrée 1: ze1 (m)","Altitude du piquage d entrée 2: ze2 (m)","Altitude du piquage de sortie 1: zs1 (m)","Altitude du piquage de sortie 2: zs2 (m)","Altitude initiale du fluide : z0 (m)","Température initiale du fluide : T0 (K)","Si >0, masse volumique imposée du fluide : p_rho (kg/m3)"],list("vec",-1,"vec",-1,"vec",-1,"vec",-1,"vec",-1,"vec",-1,"vec",-1,"vec",-1,"vec",-1),exprs);
            if (!ok) {
                break;
            }
            this.model.rpar = [[this.Patm],[this.A],[this.ze1],[this.ze2],[this.zs1],[this.zs2],[this.z0],[this.T0],[this.p_rho]];
            this.model.equations.parameters[2] = list(new ScilabDouble([this.Patm]), new ScilabDouble([this.A]), new ScilabDouble([this.ze1]), new ScilabDouble([this.ze2]), new ScilabDouble([this.zs1]), new ScilabDouble([this.zs2]), new ScilabDouble([this.z0]), new ScilabDouble([this.T0]), new ScilabDouble([this.p_rho]));
            graphics.exprs = exprs;
            this.x.graphics = graphics;
            this.x.model = this.model;
            break;
        }
        return new BasicBlock(this.x);
    }
}
