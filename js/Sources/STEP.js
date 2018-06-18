/* autogenerated from "macros/Sources/STEP.sci" */
function STEP() {
STEP.prototype.define = function STEP() {
rpar=[0,1];
model=scicos_model();
model.sim=list("step_func",4);
model.evtin=1;
model.evtout=1;
model.out=1;
model.out2=1;
model.outtyp=1;
model.firing=1;
model.rpar=rpar;
model.blocktype="c";
model.dep_ut=[false,false];
exprs=[string(1),string(rpar)];
gr_i=[];
x=standard_define([2,2],model,exprs,gr_i);
}
STEP.prototype.details = function STEP() {
}
STEP.prototype.get = function STEP() {
}
STEP.prototype.set = function STEP() {
x=arg1;
graphics=arg1.graphics;
exprs=graphics.exprs;
model=arg1.model;
while (true) {
[ok,temps,in1,fi,exprs]=scicos_getvalue([msprintf(gettext("Set %s block parameters"),"STEP_FUNCTION")," ",gettext("Step Function")," "],[gettext("Step Time"),gettext("Initial Value"),gettext("Final Value")],list("vec",1,"vec",-1,"vec",-1),exprs);
if (!ok) {
break;
}
in1=in1.slice();
fi=fi.slice();
if (size(in1,"*")!=size(fi,"*")) {
if (size(in1,"*")==1) {
in1=in1*ones(fi);
} else if (size(fi,"*")==1) {
fi=fi*ones(in1);
} else {
block_parameter_error(msprintf(gettext("\'Initial Value\' and \'Final Value\': incompatible sizes: %d and %d."),size(in1,"*"),size(fi,"*")),gettext("Same sizes expected."));
ok=false;
}
}
if (ok) {
model.out2=1;
model.outtyp=1;
[model,graphics,ok]=check_io(model,graphics,[],size(fi,"*"),1,1);
}
if (ok) {
model.firing=temps;
if (temps==0) {
rpar=[fi,fi];
} else {
rpar=[in1,fi];
}
model.rpar=rpar;
graphics.exprs=exprs;
x.graphics=graphics;
x.model=model;
break;
}
}
}
}
