/* autogenerated from "macros/Threshold/ZCROSS_f.sci" */
function ZCROSS_f() {
ZCROSS_f.prototype.define = function ZCROSS_f() {
rpar=[-1,-1,0,0];
in1=1;
model=scicos_model();
model.sim=list("zcross",1);
model.in1=in1;
model.nzcross=in1;
model.evtout=1;
model.rpar=[-1,-1,0,0];
model.blocktype="z";
model.firing=-1;
model.dep_ut=[true,false];
exprs=strcat(sci2exp(in1));
gr_i=[];
x=standard_define([2,2],model,exprs,gr_i);
}
ZCROSS_f.prototype.details = function ZCROSS_f() {
}
ZCROSS_f.prototype.get = function ZCROSS_f() {
}
ZCROSS_f.prototype.set = function ZCROSS_f() {
x=arg1;
graphics=arg1.graphics;
exprs=graphics.exprs;
model=arg1.model;
while (true) {
[ok,in1,exprs]=scicos_getvalue(["Set Zero-Crossing parameters","All surfaces must cross together"],"Input size",list("vec",1),exprs);
if (!ok) {
break;
}
in1=int(in1);
if (in1<=0) {
message("Block must have at least one input");
} else {
kk=0;
for (jj=1;jj<=in1;jj+=1) {
kk=kk+2^(in1+jj-1);
}
model.rpar=[-ones(kk,1),zeros(2^(2*in1)-kk,1)];
graphics.exprs=exprs;
model.in1=in1;
model.nzcross=in1;
model.firing=-1;
x.graphics=graphics;
x.model=model;
break;
}
}
}
}
