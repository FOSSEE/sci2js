/* autogenerated from "macros/Misc/generic_block2.sci" */
function generic_block2() {
generic_block2.prototype.define = function generic_block2() {
model=scicos_model();
function_name="sinblk";
funtyp=1;
model.sim=list(function_name,funtyp);
model.in1=1;
model.out=1;
model.evtin=[];
model.evtout=[];
model.state=[];
model.dstate=[];
model.rpar=[];
model.ipar=[];
model.blocktype="c";
model.firing=[];
model.dep_ut=[true,false];
label=[[function_name],[sci2exp(funtyp)],[sci2exp(model.in1)],[sci2exp(model.out)],[sci2exp(model.evtin)],[sci2exp(model.evtout)],[sci2exp(model.state)],[sci2exp(model.dstate)],[sci2exp(model.rpar)],[sci2exp(model.ipar)],[sci2exp(model.nmode)],[sci2exp(model.nzcross)],[sci2exp(model.firing)],["y"],["n"]];
gr_i=[];
x=standard_define([2,2],model,label,gr_i);
}
generic_block2.prototype.details = function generic_block2() {
}
generic_block2.prototype.get = function generic_block2() {
}
generic_block2.prototype.set = function generic_block2() {
x=arg1;
model=arg1.model;
graphics=arg1.graphics;
label=graphics.exprs;
if (size(label,"*")==14) {
label[9-1]=[];
}
while (true) {
[ok,function_name,funtyp,i,o,ci,co,xx,z,rpar,ipar,nmode,nzcr,auto0,depu,dept,lab]=scicos_getvalue("Set GENERIC block parameters",[["simulation function"],["function type (0,1,2,..)"],["input ports sizes"],["output port sizes"],["input event ports sizes"],["output events ports sizes"],["initial continuous state"],["initial discrete state"],["Real parameters vector"],["Integer parameters vector"],["number of modes"],["number of zero_crossings"],["initial firing vector (<0 for no firing)"],["direct feedthrough (y or n)"],["time dependence (y or n)"]],list("str",1,"vec",1,"vec",-1,"vec",-1,"vec",-1,"vec",-1,"vec",-1,"vec",-1,"vec",-1,"vec",-1,"vec",1,"vec",1,"vec","sum(%6)","str",1,"str",1),label);
if (!ok) {
break;
}
label=lab;
function_name=stripblanks(function_name);
xx=xx.slice();
z=z.slice();
rpar=rpar.slice();
ipar=int(ipar.slice());
i=int(i.slice());
o=int(o.slice());
ci=int(ci.slice());
co=int(co.slice());
funtyp=int(funtyp);
if (funtyp<0) {
message("function type cannot be negative");
ok=false;
}
if ([[ci],[co]]!=[]) {
if (max([[ci],[co]])>1) {
message("vector event links not supported");
ok=false;
}
}
depu=stripblanks(depu);
if (part(depu,1)=="y") {
depu=true;
} else {
depu=false;
}
dept=stripblanks(dept);
if (part(dept,1)=="y") {
dept=true;
} else {
dept=false;
}
dep_ut=[depu,dept];
if (ok) {
[model,graphics,ok]=check_io(model,graphics,i,o,ci,co);
}
if (ok) {
if (funtyp==3) {
needcompile=4;
}
model.sim=list(function_name,funtyp);
model.state=xx;
model.dstate=z;
model.rpar=rpar;
model.ipar=ipar;
model.firing=auto0;
model.nzcross=nzcr;
model.nmode=nmode;
model.dep_ut=dep_ut;
arg1.model=model;
graphics.exprs=label;
arg1.graphics=graphics;
x=arg1;
break;
}
}
needcompile=resume(needcompile)
}
}
