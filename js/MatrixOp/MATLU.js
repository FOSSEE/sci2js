/* autogenerated from "macros/MatrixOp/MATLU.sci" */
function MATLU() {
MATLU.prototype.define = function MATLU() {
model=scicos_model();
function_name="mat_lu";
funtyp=4;
model.sim=list(function_name,funtyp);
model.in1=-1;
model.in2=-1;
model.intyp=1;
model.out=[[-1],[-1]];
model.out2=[[-1],[-1]];
model.outtyp=[1,1];
model.evtin=[];
model.evtout=[];
model.state=[];
model.dstate=[];
model.rpar=[];
model.ipar=[];
model.blocktype="c";
model.firing=[];
model.dep_ut=[true,false];
label=sci2exp(1);
gr_i=[];
x=standard_define([2,2],model,label,gr_i);
}
MATLU.prototype.details = function MATLU() {
}
MATLU.prototype.get = function MATLU() {
}
MATLU.prototype.set = function MATLU() {
x=arg1;
model=arg1.model;
graphics=arg1.graphics;
label=graphics.exprs;
if (size(label,"*")==14) {
label[9-1]=[];
}
while (true) {
[ok,typ,lab]=scicos_getvalue("Set MATLU block parameters",["Datatype(1=real double  2=Complex)"],list("vec",1),label);
if (!ok) {
break;
}
if ((typ==1)) {
function_name="mat_lu";
ot=[1,1];
it=1;
} else if ((typ==2)) {
function_name="matz_lu";
ot=[2,2];
it=2;
} else {
message("Datatype is not supported");
ok=false;
}
if (ok) {
[model,graphics,ok]=set_io(model,graphics,list([model.in1,model.in2],it),list([model.out,model.out2],ot),[],[]);
}
if (ok) {
funtyp=4;
model.sim=list(function_name,funtyp);
graphics.exprs=lab;
x.graphics=graphics;
x.model=model;
break;
}
}
}
}
