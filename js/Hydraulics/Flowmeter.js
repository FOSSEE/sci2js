/* autogenerated from "macros/Hydraulics/Flowmeter.sci" */
function Flowmeter() {
Flowmeter.prototype.define = function Flowmeter() {
ModelName="Flowmeter";
PrametersValue=1;
ParametersName="Qini";
model=scicos_model();
Typein=[];
Typeout=[];
MI=[];
MO=[];
P=[50,105,-1,90,0,10,2,0,101,10,-2,0];
PortName=["Mesure","C1","C2"];
for (i=1;i<=size(P,"r");i+=1) {
if (P(i,3)==1) {
Typein=[Typein,"E"];
MI=[MI,PortName(i)];
}
if (P(i,3)==2) {
Typein=[Typein,"I"];
MI=[MI,PortName(i)];
}
if (P(i,3)==-1) {
Typeout=[Typeout,"E"];
MO=[MO,PortName(i)];
}
if (P(i,3)==-2) {
Typeout=[Typeout,"I"];
MO=[MO,PortName(i)];
}
}
model=scicos_model();
mo=modelica();
model.sim=ModelName;
mo.inputs=MI;
mo.outputs=MO;
model.rpar=PrametersValue;
mo.parameters=list(ParametersName,PrametersValue,zeros(ParametersName));
exprs="1";
gr_i=[];
model.blocktype="c";
model.dep_ut=[false,true];
mo.model=ModelName;
model.equations=mo;
model.in1=ones(size(MI,"*"),1);
model.out=ones(size(MO,"*"),1);
x=standard_define([2,2],model,exprs,list(gr_i,0));
x.graphics.in_implicit=Typein;
x.graphics.out_implicit=Typeout;
}
Flowmeter.prototype.details = function Flowmeter() {
}
Flowmeter.prototype.get = function Flowmeter() {
}
Flowmeter.prototype.set = function Flowmeter() {
x=arg1;
graphics=arg1.graphics;
exprs=graphics.exprs;
model=arg1.model;
x=arg1;
exprs=x.graphics.exprs;
while (false) {
[ok,Qini,exprs]=scicos_getvalue(["Set Flowmeter block parameters:","","Qini: "],"Qini",list("vec",1),exprs);
if (!ok) {
break;
}
x.model.equations.parameters[2-1]=list(Qini);
x.graphics.exprs=exprs;
break;
}
}
}
