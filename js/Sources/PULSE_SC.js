/* autogenerated from "macros/Sources/PULSE_SC.sci" */
function PULSE_SC() {
    PULSE_SC.prototype.define = function PULSE_SC() {
        var scs_m_1 = scicos_diagram(version="scicos4.2",props=scicos_params(wpar=[-162.7581,435.54369,67.607292,416.67644,827,479,0,15,827,480,715,167,1.4],Title=["SuperBlock","/home/fady/Scicos_examples/"],tol=[[0.0001],[0.000001],[1.000e-10],[100001],[0],[0],[0]],tf=10,context=[["E2=E+W/100*F"],["if (W<0 | W>100) then error(\'Width must be between 0 and 100\');end"],["if (E2 >= F) then error (\'Offset must be lower than (frequency*(1-Width/100))\'); end"]],void1=[],options=tlist(["scsopt","3D","Background","Link","ID","Cmap"],list(true,33),[8,1],[1,5],list([5,1],[4,1]),[0.8,0.8,0.8]),void2=[],void3=[],doc=list()));
        scs_m_1.objs[1-1] = scicos_block(gui="CONST_m",graphics=scicos_graphics(orig=[30.801202,158.91733],sz=[40,40],flip=true,theta=0,exprs="A",pin=[],pout=5,pein=[],peout=[],gr_i=[],id="",in_implicit=[],out_implicit="E"),model=scicos_model(sim=list("cstblk4_m",4),in1=[],in2=[],intyp=1,out=1,out2=1,outtyp=1,evtin=[],evtout=[],state=[],dstate=[],odstate=list(),rpar=[],ipar=[],opar=list(1),blocktype="d",firing=[],dep_ut=[false,false],label="",nzcross=0,nmode=0,equations=list()),doc=list());
        scs_m_1.objs[2-1] = scicos_block(gui="Ground_g",graphics=scicos_graphics(orig=[31.534535,215.384],sz=[40,40],flip=true,theta=0,exprs=[],pin=[],pout=4,pein=[],peout=[],gr_i=[],id="",in_implicit=[],out_implicit="E"),model=scicos_model(sim=list("cstblk4_m",4),in1=[],in2=[],intyp=1,out=1,out2=1,outtyp=-1,evtin=[],evtout=[],state=[],dstate=[],odstate=list(),rpar=[],ipar=[],opar=list(0),blocktype="d",firing=[],dep_ut=[false,false],label="",nzcross=0,nmode=0,equations=list()),doc=list());
        scs_m_1.objs[3-1] = scicos_block(gui="SELECT_m",graphics=scicos_graphics(orig=[106.00652,186.09381],sz=[40,40],flip=true,theta=0,exprs=[["-1"],["2"],["1"]],pin=[[4],[5]],pout=11,pein=[[9],[8]],peout=[],gr_i=[],id="",in_implicit=[["E"],["E"]],out_implicit="E"),model=scicos_model(sim=list("selector_m",4),in1=[[-1],[-1]],in2=[[-2],[-2]],intyp=[[-1],[-1]],out=-1,out2=-2,outtyp=-1,evtin=[[1],[1]],evtout=[],state=[],dstate=1,odstate=list(),rpar=[],ipar=[],opar=list(),blocktype="c",firing=[],dep_ut=[true,false],label="",nzcross=0,nmode=0,equations=list()),doc=list());
        scs_m_1.objs[4-1] = scicos_link(xx=[[80.105964],[97.43509],[97.43509]],yy=[[235.384],[235.384],[212.76048]],id="drawlink",thick=[0,0],ct=[1,1],from=[2,1,0],to=[3,1,1]);
        scs_m_1.objs[5-1] = scicos_link(xx=[[79.372631],[97.43509],[97.43509]],yy=[[178.91733],[178.91733],[199.42714]],id="drawlink",thick=[0,0],ct=[1,1],from=[1,1,0],to=[3,2,1]);
        scs_m_1.objs[6-1] = scicos_block(gui="SampleCLK",graphics=scicos_graphics(orig=[82.349744,274.21741],sz=[60,40],flip=true,theta=0,exprs=[["F"],["E2"]],pin=[],pout=[],pein=[],peout=9,gr_i=[],id="",in_implicit=[],out_implicit=[]),model=scicos_model(sim="sampleclk",in1=[],in2=[],intyp=1,out=[],out2=[],outtyp=1,evtin=[],evtout=1,state=[],dstate=[],odstate=list(),rpar=[[1],[0.4]],ipar=[],opar=list(),blocktype="d",firing=-1,dep_ut=[false,false],label="",nzcross=0,nmode=0,equations=list()),doc=list());
        scs_m_1.objs[7-1] = scicos_block(gui="SampleCLK",graphics=scicos_graphics(orig=[160.48879,274.21741],sz=[60,40],flip=true,theta=0,exprs=[["F"],["E"]],pin=[],pout=[],pein=[],peout=8,gr_i=[],id="",in_implicit=[],out_implicit=[]),model=scicos_model(sim="sampleclk",in1=[],in2=[],intyp=1,out=[],out2=[],outtyp=1,evtin=[],evtout=1,state=[],dstate=[],odstate=list(),rpar=[[1],[0.1]],ipar=[],opar=list(),blocktype="d",firing=-1,dep_ut=[false,false],label="",nzcross=0,nmode=0,equations=list()),doc=list());
        scs_m_1.objs[8-1] = scicos_link(xx=[[190.48879],[190.48879],[132.67318],[132.67318]],yy=[[274.21741],[240.99048],[240.99048],[231.80809]],id="drawlink",thick=[0,0],ct=[5,-1],from=[7,1,0],to=[3,2,1]);
        scs_m_1.objs[9-1] = scicos_link(xx=[[112.34974],[112.34974],[119.33985],[119.33985]],yy=[[274.21741],[248.21372],[248.21372],[231.80809]],id="drawlink",thick=[0,0],ct=[5,-1],from=[6,1,0],to=[3,1,1]);
        scs_m_1.objs[10-1] = scicos_block(gui="OUT_f",graphics=scicos_graphics(orig=[174.57795,196.09381],sz=[20,20],flip=true,theta=0,exprs="1",pin=11,pout=[],pein=[],peout=[],gr_i=[],id="",in_implicit="E",out_implicit=[]),model=scicos_model(sim="output",in1=-1,in2=-2,intyp=-1,out=[],out2=[],outtyp=1,evtin=[],evtout=[],state=[],dstate=[],odstate=list(),rpar=[],ipar=1,opar=list(),blocktype="c",firing=[],dep_ut=[false,false],label="",nzcross=0,nmode=0,equations=list()),doc=list());
        scs_m_1.objs[11-1] = scicos_link(xx=[[154.57795],[174.57795]],yy=[[206.09381],[206.09381]],id="drawlink",thick=[0,0],ct=[1,1],from=[3,1,0],to=[10,1,1]);
        this.model = scicos_model();
        this.model.sim = new ScilabString(["csuper"]);
        this.model.in = new ScilabDouble([]);
        this.model.in2 = new ScilabDouble([]);
        this.model.intyp = new ScilabDouble([1]);
        this.model.out = new ScilabDouble([-1]);
        this.model.out2 = new ScilabDouble([-2]);
        this.model.outtyp = new ScilabDouble([-1]);
        this.model.evtin = new ScilabDouble([]);
        this.model.evtout = new ScilabDouble([]);
        this.model.state = new ScilabDouble([]);
        this.model.dstate = new ScilabDouble([]);
        this.model.odstate = list();
        this.model.rpar = new ScilabDouble([scs_m_1]);
        this.model.ipar = new ScilabDouble([1]);
        this.model.opar = list();
        this.model.blocktype = new ScilabString(["h"]);
        this.model.firing = new ScilabDouble([]);
        this.model.dep_ut = new ScilabBoolean([false,false]);
        this.model.label = new ScilabString([""]);
        this.model.nzcross = new ScilabDouble([0]);
        this.model.nmode = new ScilabDouble([0]);
        this.model.equations = list();
        var E = 0.1;
        var W = 30;
        var F = 1;
        var A = 1;
        var exprs = [sci2exp(E),sci2exp(W),sci2exp(F),sci2exp(A)];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"PULSE_SC\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3,2]),this.model,new ScilabString(exprs),gr_i);
        return new BasicBlock(this.x);
    }
    PULSE_SC.prototype.details = function PULSE_SC() {
        return this.x;
    }
    PULSE_SC.prototype.get = function PULSE_SC() {
        var options = {
            scicos_context.E:["Phase delay (secs):",this.scicos_context.E],
            scicos_context.W:["Pulse Width (% of period):",this.scicos_context.W],
            scicos_context.F:["Period (secs):",this.scicos_context.F],
            scicos_context.A:["Amplitude:",this.scicos_context.A],
        }
        return options;
    }
    PULSE_SC.prototype.set = function PULSE_SC() {
        var y = this.needcompile;
        var typ = list();
        var exprs = this.graphics.exprs;
        var Btitre = "Set Pulse Generator parameters";
        var Exprs0 = [["E"],["W"],["F"],["A"]];
        this.Bitems = [["Phase delay (secs):"],["Pulse Width (% of period):"],["Period (secs):"],["Amplitude:"]];
        var Ss = list("pol",-1,"pol",-1,"pol",-1,"mat",[-1,-1]);
        var scicos_context = struct();
        var ok = false;
        while (!ok) {
            var ok = true;
            this.scicos_context.E = arguments[0]["scicos_context.E"];
            this.scicos_context.W = arguments[0]["scicos_context.W"];
            this.scicos_context.F = arguments[0]["scicos_context.F"];
            this.scicos_context.A = arguments[0]["scicos_context.A"];
            if (!ok) {
                return;
            }
            var PREVAR_scicos_context = scicos_context;
            var sblock = this.x.model.rpar;
            var tmpvar0 = script2var(sblock.props.context,PREVAR_scicos_context);
            var PREVAR_scicos_context = tmpvar0[0];
            var ierr = tmpvar0[1];
            if (ierr==0) {
                var tmpvar1 = do_eval(sblock,list());
                var sblock = tmpvar1[0];
                %w = tmpvar1[1];
                var needcompile2 = tmpvar1[2];
                var ok = tmpvar1[3];
                if (ok) {
                    var y = max(2,this.needcompile,needcompile2);
                    this.x.graphics.exprs = exprs;
                    this.x.model.rpar = sblock;
                    break;
                }
            } else {
                if ((lasterror().length!=0)) {
                    messagebox(lasterror());
                }
                var ok = false;
            }
        }
        return new BasicBlock(this.x);
    }
    PULSE_SC.prototype.get_popup_title = function PULSE_SC() {
        var set_param_popup_title = Btitre;
        return set_param_popup_title;
    }
}
