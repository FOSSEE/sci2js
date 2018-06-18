/* autogenerated from "macros/Sources/CURV_f.sci" */
function CURV_f() {
CURV_f.prototype.define = function CURV_f() {
xx=[0,1,2];
yy=[-5,5,0];
rect=[0,-5,2,5];
axisdata=[2,10,2,10];
ipar=[size(xx,1),axisdata.slice()];
rpar=[xx,yy,rect.slice()];
model=scicos_model();
model.sim="intplt";
model.in1=[];
model.out=1;
model.rpar=[xx,yy,rect.slice()];
model.ipar=[size(xx,1),axisdata.slice()];
model.blocktype="c";
model.dep_ut=[false,true];
gr_i=[];
x=standard_define([2,2],model,[],gr_i);
}
CURV_f.prototype.details = function CURV_f() {
}
CURV_f.prototype.get = function CURV_f() {
}
CURV_f.prototype.set = function CURV_f() {
x=arg1;
model=arg1.model;
graphics=arg1.graphics;
rpar=model.rpar;
ipar=model.ipar;
n=ipar(1);
xx=rpar.slice(1-1,n);
yy=rpar.slice(n+1-1,2*n);
gc=list(rpar.slice(2*n+1-1,2*n+4),ipar.slice(2-1,5));
while (true) {
[ln,fun]=where()
if (!or(fun=="do_eval")) {
[xx,yy,ok,gc]=edit_curv(xx,yy,"axy",[" "," "," "],gc);
} else {
ok=true;
}
if (!ok) {
break;
}
n=size(xx,"*");
if (or(xx.slice(2-1,n)-xx.slice(1-1,n-1)<0)) {
message("You have not defined a function");
ok=false;
}
if (ok) {
model.sim="intplt";
model.firing=[];
rect=gc(1);
model.rpar=[xx.slice(),yy.slice(),rect.slice()];
axisdata=gc(2);
model.ipar=[size(xx,"*"),axisdata.slice()];
x.graphics=graphics;
x.model=model;
break;
}
}
}
}
