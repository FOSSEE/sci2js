/* autogenerated from "macros/Sources/RAND_f.sci" */
function RAND_f() {
RAND_f.prototype.define = function RAND_f() {
a=0;
b=1;
dt=0;
out=1;
flag=0;
model=scicos_model();
model.sim="rndblk";
model.out=out;
model.evtin=1;
model.dstate=[int(rand()*(10^7-1)),0*a.slice()];
model.rpar=[a.slice(),b.slice()];
model.ipar=flag;
model.blocktype="d";
model.dep_ut=[false,false];
exprs=[string(flag),sci2exp(a.slice()),sci2exp(b.slice()),string(model.dstate(1))];
gr_i=[];
x=standard_define([3,2],model,exprs,gr_i);
}
RAND_f.prototype.details = function RAND_f() {
}
RAND_f.prototype.get = function RAND_f() {
}
RAND_f.prototype.set = function RAND_f() {
x=arg1;
graphics=arg1.graphics;
exprs=graphics.exprs;
model=arg1.model;
if (size(exprs,"*")==5) {
exprs=exprs.slice(1-1,3);
}
if (size(exprs,"*")==3) {
exprs=[exprs,string(model.dstate(1))];
}
while (true) {
[ok,flag,a,b,seed_c,exprs]=scicos_getvalue(["Set Random generator block parameters","flag = 0 : Uniform distribution A is min and A+B max","flag = 1 : Normal distribution A is mean and B deviation"," ","A and B must be vector with equal sizes","seed is the seed of random number generator (integer<2**31)"],["flag","A","B","seed"],list("vec",1,"vec",-1,"vec","size(%2,\'*\')","vec",1),exprs);
if (!ok) {
break;
}
if (flag!=0&&flag!=1) {
message("flag must be equal to 1 or 0");
} else {
nout=size(a,"*");
graphics.exprs=exprs;
model.out=nout;
model.ipar=flag;
model.rpar=[a.slice(),b.slice()];
model.dstate=[seed_c,0*a.slice()];
x.graphics=graphics;
x.model=model;
break;
}
}
}
}
