/* autogenerated from "macros/Misc/HYSTHERESIS.sci" */
function HYSTHERESIS() {
    HYSTHERESIS.prototype.define = function HYSTHERESIS() {
in1=1;
ipar=[0];
nzz=2;
rpar=[[1],[0],[1],[0]];
model=scicos_model();
model.sim=list("hystheresis",4);
model.in1=in1;
model.out=1;
model.rpar=rpar;
model.nzcross=nzz;
model.nmode=1;
model.blocktype="c";
model.dep_ut=[true,false];
exprs=[[string(rpar)],[string(sign(nzz))]];
gr_i=[];
x=standard_define([2,2],model,exprs,gr_i);
    }
    HYSTHERESIS.prototype.details = function HYSTHERESIS() {
    }
    HYSTHERESIS.prototype.get = function HYSTHERESIS() {
    }
    HYSTHERESIS.prototype.set = function HYSTHERESIS() {
x=arg1;
graphics=arg1.graphics;
exprs=graphics.exprs;
model=arg1.model;
while (true) {
[ok,high_lim,low_lim,out_high,out_low,nzz,exprs]=scicos_getvalue("Set parameters",[["switch on at"],["switch off at"],["output when on"],["output when off"],["use zero crossing: yes (1), no (0)"]],list("vec",1,"vec",1,"vec",1,"vec",1,"vec",1),exprs);
if (!ok) {
break;
}
if (low_lim>high_lim) {
message("switch on value must be larger than switch off value");
} else {
graphics.exprs=exprs;
model.rpar=transpose([high_lim,low_lim,out_high,out_low]);
if (nzz>0) {
nzz=2;
}
model.nzcross=nzz;
x.graphics=graphics;
x.model=model;
break;
}
}
    }
}
