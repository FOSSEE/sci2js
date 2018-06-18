/* autogenerated from "macros/Sources/RAMP.sci" */
function RAMP() {
RAMP.prototype.define = function RAMP() {
slope=0;
iout=0;
stt=0;
rpar=[[slope],[stt],[iout]];
model=scicos_model();
model.sim=list("ramp",4);
model.in1=[];
model.out=1;
model.rpar=rpar;
model.blocktype="c";
model.nmode=1;
model.nzcross=1;
model.dep_ut=[false,true];
exprs=[string(rpar)];
gr_i=[];
x=standard_define([2,2],model,exprs,gr_i);
}
RAMP.prototype.details = function RAMP() {
}
RAMP.prototype.get = function RAMP() {
}
RAMP.prototype.set = function RAMP() {
x=arg1;
graphics=arg1.graphics;
exprs=graphics.exprs;
model=arg1.model;
while (true) {
[ok,slope,stt,iout,exprs]=scicos_getvalue([[msprintf(gettext("Set %s block parameters"),"RAMP")],[" "],[gettext("Ramp function")],[" "]],[[gettext("Slope")],[gettext("Start Time")],[gettext("Initial Value")]],list("vec",1,"vec",1,"vec",1),exprs);
if (!ok) {
break;
}
if (stt<0) {
block_parameter_error(msprintf(gettext("Wrong value for \'Start Time\' parameter: %e."),stt),gettext("Null or positive integer expected."));
} else {
model.rpar=[[slope],[stt],[iout]];
graphics.exprs=exprs;
x.graphics=graphics;
x.model=model;
break;
}
}
}
}
