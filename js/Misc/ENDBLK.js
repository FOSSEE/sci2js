/* autogenerated from "macros/Misc/ENDBLK.sci" */
function ENDBLK() {
ENDBLK.prototype.define = function ENDBLK() {
scs_m_1=scicos_diagram(version="scicos4.2",props=scicos_params(wpar=[-159.096,811.104,-121.216,617.984,1323,1008,331,284,630,480,0,7,1.4],Title="ENDBLK",tol=[0.0001,0.000001,1.000e-10,100001,0,0],tf=100000,context=" ",void1=[],options=tlist(["scsopt","3D","Background","Link","ID","Cmap"],list(true,33),[8,1],[1,5],list([5,1],[4,1]),[0.8,0.8,0.8]),void2=[],void3=[],doc=list()));
scs_m_1.objs[1-1]=scicos_block(gui="END_c",graphics=scicos_graphics(orig=[272.104,249.11733],sz=[40,40],flip=true,theta=0,exprs="1.000E+08",pin=[],pout=[],pein=2,peout=2,gr_i=[],id="",in_implicit=[],out_implicit=[]),model=scicos_model(sim=list("scicosexit",4),in1=[],in2=[],intyp=1,out=[],out2=[],outtyp=1,evtin=1,evtout=1,state=[],dstate=[],odstate=list(),rpar=[],ipar=[],opar=list(),blocktype="d",firing=1.000e+08,dep_ut=[false,false],label="",nzcross=0,nmode=0,equations=list()),doc=list());
scs_m_1.objs[2-1]=scicos_link(xx=[292.104,292.104,261.83733,261.83733,292.104,292.104],yy=[243.40305,234.45067,234.45067,305.584,305.584,294.83162],id="drawlink",thick=[0,0],ct=[5,-1],from=[1,1,0],to=[1,1,1]);
model=scicos_model(sim="csuper",in1=[],in2=[],intyp=1,out=[],out2=[],outtyp=1,evtin=[],evtout=[],state=[],dstate=[],odstate=list(),rpar=scs_m_1,ipar=[],opar=list(),blocktype="h",firing=[],dep_ut=[false,false],label="",nzcross=0,nmode=0,equations=list());
gr_i=[];
x=standard_define([2,2],model,[],gr_i);
}
ENDBLK.prototype.details = function ENDBLK() {
}
ENDBLK.prototype.get = function ENDBLK() {
}
ENDBLK.prototype.set = function ENDBLK() {
for (i=1;i<=length(arg1.model.rpar.objs);i+=1) {
o=arg1.model.rpar.objs(i);
if (typeof(o)=="Block"&&o.gui=="END_c") {
ppath=list(i);
break;
}
}
newpar=list();
y=0;
for (path in ppath) {
np=size(path,"*");
spath=list();
for (k=1;k<=np;k+=1) {
spath[$+1-1]="model";
spath[$+1-1]="rpar";
spath[$+1-1]="objs";
spath[$+1-1]=path(k);
}
xx=arg1(spath);
execstr("xxn="+xx.gui+"(\'set\',xx)");
if (!isequalbitwise(xxn,xx)) {
model=xx.model;
model_n=xxn.model;
if (!is_modelica_block(xx)) {
modified=or(model.sim!=model_n.sim)||!isequal(model.state,model_n.state)||!isequal(model.dstate,model_n.dstate)||!isequal(model.odstate,model_n.odstate)||!isequal(model.rpar,model_n.rpar)||!isequal(model.ipar,model_n.ipar)||!isequal(model.opar,model_n.opar)||!isequal(model.label,model_n.label);
if (or(model.in1!=model_n.in1)||or(model.out!=model_n.out)||or(model.in2!=model_n.in2)||or(model.out2!=model_n.out2)||or(model.outtyp!=model_n.outtyp)||or(model.intyp!=model_n.intyp)) {
needcompile=1;
}
if (or(model.firing!=model_n.firing)) {
needcompile=2;
}
if ((size(model.in1,"*")!=size(model_n.in1,"*"))||(size(model.out,"*")!=size(model_n.out,"*"))||(size(model.evtin,"*")!=size(model_n.evtin,"*"))) {
needcompile=4;
}
if (model.sim=="input"||model.sim=="output") {
if (model.ipar!=model_n.ipar) {
needcompile=4;
}
}
if (or(model.blocktype!=model_n.blocktype)||or(model.dep_ut!=model_n.dep_ut)) {
needcompile=4;
}
if ((model.nzcross!=model_n.nzcross)||(model.nmode!=model_n.nmode)) {
needcompile=4;
}
if (prod(size(model_n.sim))>1) {
if (model_n.sim(2)>1000) {
if (model.sim(1)!=model_n.sim(1)) {
needcompile=4;
}
}
}
} else {
modified=or(model_n!=model);
eq=model.equations;
eqn=model_n.equations;
if (or(eq.model!=eqn.model)||or(eq.inputs!=eqn.inputs)||or(eq.outputs!=eqn.outputs)) {
needcompile=4;
}
}
arg1[spath-1]=xxn;
newpar[size(newpar)+1-1]=path;
y=max(y,needcompile);
}
}
x=arg1;
typ=newpar;
}
}
