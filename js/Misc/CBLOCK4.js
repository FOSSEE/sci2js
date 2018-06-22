/* autogenerated from "macros/Misc/CBLOCK4.sci" */
function CBLOCK4() {
    CBLOCK4.prototype.define = function CBLOCK4() {
funam="toto";
model=scicos_model();
model.sim=list(" ",2004);
model.in1=1;
model.in2=1;
model.intyp=1;
model.out=1;
model.out2=1;
model.outtyp=1;
model.dep_ut=[true,false];
label=list([[funam],["n"],[sci2exp([model.in1,model.in2])],[sci2exp(model.intyp)],[sci2exp([model.out,model.out2])],[sci2exp(model.outtyp)],[sci2exp(model.evtin)],[sci2exp(model.evtout)],[sci2exp(model.state)],[sci2exp(model.dstate)],[sci2exp(model.odstate)],[sci2exp(model.rpar)],[sci2exp(model.ipar)],[sci2exp(model.opar)],[sci2exp(model.nmode)],[sci2exp(model.nzcross)],[sci2exp(model.firing)],["y"],["n"]],[]);
gr_i=[];
x=standard_define([4,2],model,label,gr_i);
    }
    CBLOCK4.prototype.details = function CBLOCK4() {
    }
    CBLOCK4.prototype.get = function CBLOCK4() {
    }
    CBLOCK4.prototype.set = function CBLOCK4() {
x=arg1;
model=arg1.model;
graphics=arg1.graphics;
label=graphics.exprs;
while (true) {
[ok,function_name,impli,in1,it,out,ot,ci,co,xx,z,oz,rpar,ipar,opar,nmode,nzcr,auto0,depu,dept,lab]=scicos_getvalue("Set C-Block4 block parameters",[["Simulation function"],["Is block implicit? (y,n)"],["Input ports sizes"],["Input ports type"],["Output port sizes"],["Output ports type"],["Input event ports sizes"],["Output events ports sizes"],["Initial continuous state"],["Initial discrete state"],["Initial object state"],["Real parameters vector"],["Integer parameters vector"],["Object parameters list"],["Number of modes"],["Number of zero crossings"],["Initial firing vector (<0 for no firing)"],["Direct feedthrough (y or n)"],["Time dependence (y or n)"]],list("str",1,"str",1,"mat",[-1,2],"vec",-1,"mat",[-1,2],"vec",-1,"vec",-1,"vec",-1,"vec",-1,"vec",-1,"lis",-1,"vec",-1,"vec",-1,"lis",-1,"vec",1,"vec",1,"vec","sum(%8)","str",1,"str",1),label[1-1]);
if (!ok) {
break;
}
label[1-1]=lab;
funam=stripblanks(function_name);
xx=xx.slice();
z=z.slice();
rpar=rpar.slice();
ipar=int(ipar.slice());
nx=size(xx,1);
nz=size(z,1);
ci=int(ci.slice());
nevin=size(ci,1);
co=int(co.slice());
nevout=size(co,1);
if (part(impli,1)=="y") {
funtyp=12004;
} else {
funtyp=2004;
}
if ([[ci],[co]]!=[]) {
if (max([[ci],[co]])>1) {
message("vector event links not supported");
ok=false;
}
}
if (ok) {
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
if (funam==" ") {
break;
}
if (model.sim[1-1]!=funam||sign(size(model.state,"*"))!=sign(nx)||sign(size(model.dstate,"*"))!=sign(nz)||model.nzcross!=nzcr||sign(size(model.evtout,"*"))!=sign(nevout)) {
tt=[];
}
tt=label[2-1];
[model,graphics,ok]=set_io(model,graphics,list(in1,it),list(out,ot),ci,co);
}
if (ok) {
while (true) {
[ok,tt,cancel]=this.CC4[funam-1][tt-1];
if (!ok) {
if (cancel) {
break;
}
} else {
model.sim=list(funam,funtyp);
model.state=xx;
model.dstate=z;
model.odstate=oz;
model.rpar=rpar;
model.ipar=ipar;
model.opar=opar;
model.firing=auto0;
model.nzcross=nzcr;
model.nmode=nmode;
model.dep_ut=dep_ut;
label[2-1]=tt;
x.model=model;
graphics.exprs=label;
x.graphics=graphics;
break;
}
}
if (ok||cancel) {
break;
}
}
}
    }
}
