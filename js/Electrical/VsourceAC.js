/* autogenerated from "macros/Electrical/VsourceAC.sci" */
function VsourceAC() {
VsourceAC.prototype.define = function VsourceAC() {
model=scicos_model();
model.in1=[1];
model.out=[1];
VA=220;
FR=50;
model.rpar=[VA,FR];
model.sim="VsourceAC";
model.blocktype="c";
model.dep_ut=[true,false];
mo=modelica();
mo.model="VsourceAC";
mo.inputs="p";
mo.outputs="n";
mo.parameters=list(["VA","f"],list(VA,FR));
model.equations=mo;
exprs=[string(VA),string(FR)];
gr_i=[];
x=standard_define([2,2],model,exprs,list(gr_i,0));
x.graphics.in_implicit=["I"];
x.graphics.out_implicit=["I"];
}
VsourceAC.prototype.details = function VsourceAC() {
}
VsourceAC.prototype.get = function VsourceAC() {
}
VsourceAC.prototype.set = function VsourceAC() {
x=arg1;
graphics=arg1.graphics;
exprs=graphics.exprs;
model=arg1.model;
while (true) {
[ok,VA,FR,exprs]=scicos_getvalue("Set voltage source parameter",["Amplitude (Volt)","Frequency (Hz)"],list("vec",-1,"vec",-1),exprs);
if (!ok) {
break;
}
model.rpar=[VA,FR];
model.equations.parameters[2-1]=list(VA,FR);
graphics.exprs=exprs;
x.graphics=graphics;
x.model=model;
break;
}
}
}
