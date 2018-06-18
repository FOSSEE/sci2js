/* autogenerated from "macros/Branching/SELECT_f.sci" */
function SELECT_f() {
SELECT_f.prototype.define = function SELECT_f() {
z0=0;
in1=[-1,-1];
nin=2;
model=scicos_model();
model.sim=list("selector",2);
model.in1=in1;
model.out=-1;
model.evtin=ones(in1);
model.dstate=z0;
model.blocktype="c";
model.dep_ut=[true,false];
exprs=[string(nin),string(z0+1)];
gr_i=[];
x=standard_define([2,2],model,exprs,gr_i);
}
SELECT_f.prototype.details = function SELECT_f() {
}
SELECT_f.prototype.get = function SELECT_f() {
}
SELECT_f.prototype.set = function SELECT_f() {
x=arg1;
graphics=arg1.graphics;
exprs=graphics.exprs;
model=arg1.model;
while (true) {
[ok,nin,z0,exprs]=scicos_getvalue("Set parameters",["number of inputs","initial connected input"],list("vec",1,"vec",1),exprs);
if (!ok) {
break;
}
if (z0>nin||z0<=0) {
message("initial connected input is not a valid input port number");
} else {
[model,graphics,ok]=check_io(model,graphics,-ones(nin,1),-1,ones(nin,1),[]);
if (ok) {
graphics.exprs=exprs;
model.dstate=z0-1;
x.graphics=graphics;
x.model=model;
break;
}
}
}
}
}
