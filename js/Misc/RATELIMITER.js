/* autogenerated from "macros/Misc/RATELIMITER.sci" */
function RATELIMITER() {
RATELIMITER.prototype.define = function RATELIMITER() {
minp=-1;
maxp=1;
rpar=[maxp,minp];
model=scicos_model();
model.sim=list("ratelimiter",4);
model.in1=1;
model.out=1;
model.rpar=rpar;
model.blocktype="c";
model.dep_ut=[true,false];
exprs=[string(maxp),string(minp)];
gr_i=[];
x=standard_define([3.5,2],model,exprs,gr_i);
}
RATELIMITER.prototype.details = function RATELIMITER() {
}
RATELIMITER.prototype.get = function RATELIMITER() {
}
RATELIMITER.prototype.set = function RATELIMITER() {
x=arg1;
graphics=arg1.graphics;
exprs=graphics.exprs;
model=arg1.model;
while (true) {
[ok,maxp,minp,exprs]=scicos_getvalue("Set rate limiter parameters",["max slope","min slope"],list("vec",1,"vec",1),exprs);
if (!ok) {
break;
}
if (maxp<=minp||maxp<=0||minp>=0) {
message("We must have max_slope> 0 > min_slope.");
} else {
rpar=[maxp,minp];
model.rpar=rpar;
graphics.exprs=exprs;
x.graphics=graphics;
x.model=model;
break;
}
}
}
}
