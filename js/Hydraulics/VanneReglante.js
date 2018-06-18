/* autogenerated from "macros/Hydraulics/VanneReglante.sci" */
function VanneReglante() {
VanneReglante.prototype.define = function VanneReglante() {
model=scicos_model();
model.in1=[1,1];
model.out=[1];
Cvmax=8005.42;
p_rho=0;
model.rpar=[Cvmax,p_rho];
model.sim="VanneReglante";
model.blocktype="c";
model.dep_ut=[true,false];
mo=modelica();
mo.model="VanneReglante";
mo.inputs=["C1","Ouv"];
mo.outputs="C2";
mo.parameters=list(["Cvmax","p_rho"],[Cvmax,p_rho]);
model.equations=mo;
model.in1=ones(size(mo.inputs,"*"),1);
model.out=ones(size(mo.outputs,"*"),1);
exprs=[string(Cvmax),string(p_rho)];
gr_i=[];
x=standard_define([2,2],model,exprs,list(gr_i,0));
x.graphics.in_implicit=["I","E"];
x.graphics.out_implicit=["I"];
}
VanneReglante.prototype.details = function VanneReglante() {
}
VanneReglante.prototype.get = function VanneReglante() {
}
VanneReglante.prototype.set = function VanneReglante() {
x=arg1;
graphics=arg1.graphics;
exprs=graphics.exprs;
model=arg1.model;
while (true) {
[ok,Cvmax,p_rho,exprs]=scicos_getvalue("Paramètres de la vanne reglante",["Cvmax","p_rho"],list("vec",-1,"vec",-1),exprs);
if (!ok) {
break;
}
model.rpar=[Cvmax,p_rho];
model.equations.parameters[2-1]=list(Cvmax,p_rho);
graphics.exprs=exprs;
x.graphics=graphics;
x.model=model;
break;
}
}
}
