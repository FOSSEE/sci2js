/* autogenerated from "macros/MatrixOp/MATCATH.sci" */
function MATCATH() {
MATCATH.prototype.define = function MATCATH() {
model=scicos_model();
function_name="mat_cath";
funtyp=4;
model.sim=list(function_name,funtyp);
model.in1=[-1,-1];
model.in2=[-2,-3];
model.intyp=[1,1];
model.out=-1;
model.out2=0;
model.outtyp=-1;
model.evtin=[];
model.evtout=[];
model.state=[];
model.dstate=[];
model.rpar=[];
model.ipar=[];
model.blocktype="c";
model.firing=[];
model.dep_ut=[true,false];
label=[sci2exp(2)];
gr_i=[];
x=standard_define([2,3],model,label,gr_i);
}
MATCATH.prototype.details = function MATCATH() {
}
MATCATH.prototype.get = function MATCATH() {
}
MATCATH.prototype.set = function MATCATH() {
x=arg1;
model=arg1.model;
graphics=arg1.graphics;
label=graphics.exprs;
if (size(label,"*")>1) {
label="size(evstr("+label(2)+"),\'*\')";
}
while (true) {
[ok,nin,lab]=scicos_getvalue("Set MATCATH block parameters",["Number of input"],list("vec",1),label);
if (!ok) {
break;
}
label=lab;
in1=[-1*(ones(nin,1)),-(transpose([2:nin+1]))];
out=[-1,0];
it=-1*(ones(nin,1));
ot=-1;
[model,graphics,ok]=set_io(model,graphics,list(in1,it),list(out,ot),[],[]);
if (ok) {
funtyp=4;
model.sim=list("mat_cath",funtyp);
graphics.exprs=label;
arg1.graphics=graphics;
arg1.model=model;
x=arg1;
break;
}
}
}
}
