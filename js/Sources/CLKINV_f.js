/* autogenerated from "macros/Sources/CLKINV_f.sci" */
function CLKINV_f() {
CLKINV_f.prototype.define = function CLKINV_f() {
prt=1;
model=scicos_model();
model.sim="input";
model.evtout=1;
model.ipar=prt;
model.blocktype="d";
model.firing=-1;
model.dep_ut=[false,false];
exprs=string(prt);
gr_i=[];
x=standard_define([1,1],model,exprs,gr_i);
}
CLKINV_f.prototype.details = function CLKINV_f() {
}
CLKINV_f.prototype.get = function CLKINV_f() {
}
CLKINV_f.prototype.set = function CLKINV_f() {
x=arg1;
graphics=arg1.graphics;
model=arg1.model;
exprs=graphics.exprs;
exprs=exprs[1-1];
while (true) {
[ok,prt,exprs]=scicos_getvalue([msprintf(gettext("Set %s block parameters"),"CLKINV_f")," ",gettext("Event input port")," "],"Port Number",list("vec",1),exprs);
prt=int(prt);
if (!ok) {
break;
}
if (prt<=0) {
block_parameter_error(msprintf(gettext("Wrong values for \'Port Number\' parameter: %d."),prt),gettext("Strictly positive integer expected."));
} else {
model.ipar=prt;
model.evtout=1;
model.firing=-1;
graphics.exprs=exprs;
x.graphics=graphics;
x.model=model;
break;
}
}
}
}
