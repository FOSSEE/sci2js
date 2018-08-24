/* autogenerated from "macros/IntegerOp/DLATCH.sci" */
function DLATCH() {
    DLATCH.prototype.define = function DLATCH() {
        var scs_m = scicos_diagram(version="scicos4.2",props=scicos_params(wpar=[600,450,0,0,600,450],Title=["DLATCH"],tol=[0.0001,0.000001,1.000e-10,100001,0,0],tf=100000,context=" ",void1=[],options=tlist(["scsopt","3D","Background","Link","ID","Cmap"],list(true,33),[8,1],[1,5],list([5,1],[4,1]),[0.8,0.8,0.8]),void2=[],void3=[],doc=list()));
        scs_m.objs[1-1] = scicos_block(gui="CONST_m",graphics=scicos_graphics(orig=[109.62561,263.44465],sz=[[20],[20]],flip=true,theta=0,exprs="int8(0)",pin=[],pout=7,pein=[],peout=[],gr_i=[],id="",in_implicit=[],out_implicit="E"),model=scicos_model(sim=list("cstblk4_m",4),in1=[],in2=[],intyp=1,out=1,out2=1,outtyp=5,evtin=[],evtout=[],state=[],dstate=[],odstate=list(),rpar=[],ipar=[],opar=list(int8(0)),blocktype="d",firing=[],dep_ut=[false,false],label="",nzcross=0,nmode=0,equations=list()),doc=list());
        scs_m.objs[2-1] = scicos_block(gui="IFTHEL_f",graphics=scicos_graphics(orig=[233.37693,320.30536],sz=[60,60],flip=true,theta=0,exprs=[["0"],["1"]],pin=13,pout=[],pein=[],peout=[[6],[0]],gr_i=list([["txt=[\'If in>0\';\' \';\' then    else\'];"],["xstringb(orig(1),orig(2),txt,sz(1),sz(2),\'fill\');"]],8),id="",in_implicit="E",out_implicit=[]),model=scicos_model(sim=list("ifthel",-1),in1=1,in2=1,intyp=-1,out=[],out2=[],outtyp=1,evtin=[],evtout=[[1],[1]],state=[],dstate=[],odstate=list(),rpar=[],ipar=[],opar=list(),blocktype="l",firing=[-1,-1],dep_ut=[true,false],label="",nzcross=1,nmode=1,equations=list()),doc=list());
        scs_m.objs[3-1] = scicos_block(gui="LOGICAL_OP",graphics=scicos_graphics(orig=[152.88902,260.24498],sz=[60,40],flip=true,theta=0,exprs=[["2"],["1"],["5"],["0"]],pin=[[15],[7]],pout=5,pein=[],peout=[],gr_i=list("xstringb(orig(1),orig(2),[\'Logical Op \';OPER],sz(1),sz(2),\'fill\');",8),id="",in_implicit=[["E"],["E"]],out_implicit="E"),model=scicos_model(sim=list("logicalop_i8",4),in1=[[-1],[-1]],in2=[[-2],[-2]],intyp=[[5],[5]],out=-1,out2=-2,outtyp=5,evtin=[],evtout=[],state=[],dstate=[],odstate=list(),rpar=[],ipar=[[1],[0]],opar=list(),blocktype="c",firing=[],dep_ut=[true,false],label="",nzcross=0,nmode=0,equations=list()),doc=list());
        scs_m.objs[4-1] = scicos_block(gui="SAMPHOLD_m",graphics=scicos_graphics(orig=[233.72156,260.24498],sz=[40,40],flip=true,theta=0,exprs="5",pin=5,pout=9,pein=6,peout=[],gr_i=list("xstringb(orig(1),orig(2),\'S/H\',sz(1),sz(2),\'fill\')",8),id="",in_implicit="E",out_implicit="E"),model=scicos_model(sim=list("samphold4_m",4),in1=-1,in2=-2,intyp=5,out=-1,out2=-2,outtyp=5,evtin=1,evtout=[],state=[],dstate=[],odstate=list(),rpar=[],ipar=[],opar=list(),blocktype="d",firing=[],dep_ut=[true,false],label="",nzcross=0,nmode=0,equations=list()),doc=list());
        scs_m.objs[5-1] = scicos_link(xx=[[221.46044],[225.15013]],yy=[[280.24498],[280.24498]],id="drawlink",thick=[0,0],ct=[1,1],from=[3,1,0],to=[4,1,1]);
        scs_m.objs[6-1] = scicos_link(xx=[[253.37693],[253.72156]],yy=[[314.59108],[305.95927]],id="drawlink",thick=[0,0],ct=[5,-1],from=[2,1,0],to=[4,1,1]);
        scs_m.objs[7-1] = scicos_link(xx=[[138.19704],[144.31759]],yy=[[273.44465],[273.57832]],id="drawlink",thick=[0,0],ct=[1,1],from=[1,1,0],to=[3,2,1]);
        scs_m.objs[8-1] = scicos_block(gui="LOGICAL_OP",graphics=scicos_graphics(orig=[317.46698,309.46812],sz=[60,40],flip=true,theta=0,exprs=[["1"],["5"],["5"],["0"]],pin=11,pout=17,pein=[],peout=[],gr_i=list("xstringb(orig(1),orig(2),[\'Logical Op \';OPER],sz(1),sz(2),\'fill\');",8),id="",in_implicit="E",out_implicit="E"),model=scicos_model(sim=list("logicalop_i8",4),in1=-1,in2=-2,intyp=5,out=-1,out2=-2,outtyp=5,evtin=[],evtout=[],state=[],dstate=[],odstate=list(),rpar=[],ipar=[[5],[0]],opar=list(),blocktype="c",firing=[],dep_ut=[true,false],label="",nzcross=0,nmode=0,equations=list()),doc=list());
        scs_m.objs[9-1] = scicos_link(xx=[[282.29299],[305.09603],[305.09603]],yy=[[280.24498],[280.52797],[280.83282]],id="drawlink",thick=[0,0],ct=[1,1],from=[4,1,0],to=[10,1,1]);
        scs_m.objs[10-1] = scicos_block(gui="SPLIT_f",graphics=scicos_graphics(orig=[305.09603,280.83282],sz=[0.3333333,0.3333333],flip=true,theta=0,exprs=[],pin=9,pout=[[11],[19]],pein=[],peout=[],gr_i=list([],8),id="",in_implicit="E",out_implicit=[["E"],["E"],["E"]]),model=scicos_model(sim="lsplit",in1=-1,in2=[],intyp=1,out=[[-1],[-1],[-1]],out2=[],outtyp=1,evtin=[],evtout=[],state=[],dstate=[],odstate=list(),rpar=[],ipar=[],opar=list(),blocktype="c",firing=[],dep_ut=[true,false],label="",nzcross=0,nmode=0,equations=list()),doc=list());
        scs_m.objs[11-1] = scicos_link(xx=[[305.09603],[305.09603],[308.89555]],yy=[[280.83282],[329.46812],[329.46812]],id="drawlink",thick=[0,0],ct=[1,1],from=[10,1,0],to=[8,1,1]);
        scs_m.objs[12-1] = scicos_block(gui="IN_f",graphics=scicos_graphics(orig=[184.8055,340.30536],sz=[20,20],flip=true,theta=0,exprs="2",pin=[],pout=13,pein=[],peout=[],gr_i=list(" ",8),id="",in_implicit=[],out_implicit="E"),model=scicos_model(sim="input",in1=[],in2=[],intyp=1,out=-1,out2=[],outtyp=-1,evtin=[],evtout=[],state=[],dstate=[],odstate=list(),rpar=[],ipar=2,opar=list(),blocktype="c",firing=[],dep_ut=[false,false],label="",nzcross=0,nmode=0,equations=list()),doc=list());
        scs_m.objs[13-1] = scicos_link(xx=[[204.8055],[224.8055]],yy=[[350.30536],[350.30536]],id="drawlink",thick=[0,0],ct=[1,1],from=[12,1,0],to=[2,1,1]);
        scs_m.objs[14-1] = scicos_block(gui="IN_f",graphics=scicos_graphics(orig=[104.31759,276.91165],sz=[20,20],flip=true,theta=0,exprs="1",pin=[],pout=15,pein=[],peout=[],gr_i=list(" ",8),id="",in_implicit=[],out_implicit="E"),model=scicos_model(sim="input",in1=[],in2=[],intyp=1,out=-1,out2=[],outtyp=-1,evtin=[],evtout=[],state=[],dstate=[],odstate=list(),rpar=[],ipar=1,opar=list(),blocktype="c",firing=[],dep_ut=[false,false],label="",nzcross=0,nmode=0,equations=list()),doc=list());
        scs_m.objs[15-1] = scicos_link(xx=[[124.31759],[144.31759]],yy=[[286.91165],[286.91165]],id="drawlink",thick=[0,0],ct=[1,1],from=[14,1,0],to=[3,1,1]);
        scs_m.objs[16-1] = scicos_block(gui="OUT_f",graphics=scicos_graphics(orig=[406.03841,319.46812],sz=[20,20],flip=true,theta=0,exprs="2",pin=17,pout=[],pein=[],peout=[],gr_i=list(" ",8),id="",in_implicit="E",out_implicit=[]),model=scicos_model(sim="output",in1=-1,in2=[],intyp=-1,out=[],out2=[],outtyp=1,evtin=[],evtout=[],state=[],dstate=[],odstate=list(),rpar=[],ipar=2,opar=list(),blocktype="c",firing=[],dep_ut=[false,false],label="",nzcross=0,nmode=0,equations=list()),doc=list());
        scs_m.objs[17-1] = scicos_link(xx=[[386.03841],[406.03841]],yy=[[329.46812],[329.46812]],id="drawlink",thick=[0,0],ct=[1,1],from=[8,1,0],to=[16,1,1]);
        scs_m.objs[18-1] = scicos_block(gui="OUT_f",graphics=scicos_graphics(orig=[325.09603,270.83282],sz=[20,20],flip=true,theta=0,exprs="1",pin=19,pout=[],pein=[],peout=[],gr_i=list(" ",8),id="",in_implicit="E",out_implicit=[]),model=scicos_model(sim="output",in1=-1,in2=[],intyp=-1,out=[],out2=[],outtyp=1,evtin=[],evtout=[],state=[],dstate=[],odstate=list(),rpar=[],ipar=1,opar=list(),blocktype="c",firing=[],dep_ut=[false,false],label="",nzcross=0,nmode=0,equations=list()),doc=list());
        scs_m.objs[19-1] = scicos_link(xx=[[305.09603],[325.09603]],yy=[[280.83282],[280.83282]],id="drawlink",thick=[0,0],ct=[1,1],from=[10,2,0],to=[18,1,1]);
        this.model = scicos_model();
        this.model.sim = new ScilabString(["csuper"]);
        this.model.in = new ScilabDouble([1],[1]);
        this.model.in2 = new ScilabDouble([1],[1]);
        this.model.out = new ScilabDouble([1],[1]);
        this.model.out2 = new ScilabDouble([1],[1]);
        this.model.intyp = new ScilabDouble([5,-1]);
        this.model.outtyp = new ScilabDouble([5,5]);
        this.model.blocktype = new ScilabString(["h"]);
        this.model.firing = new ScilabBoolean([false]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        this.model.rpar = new ScilabDouble([scs_m]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DLATCH\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,3]),this.model,new ScilabDouble([]),gr_i);
        return new BasicBlock(this.x);
    }
    DLATCH.prototype.details = function DLATCH() {
        return this.x;
    }
    DLATCH.prototype.get = function DLATCH() {
        alert("parameters cannot be modified");
    }
    DLATCH.prototype.set = function DLATCH() {
        return new BasicBlock(this.x);
    }
    DLATCH.prototype.get_popup_title = function DLATCH() {
        var set_param_popup_title = "Set parameters";
        return set_param_popup_title;
    }
}
