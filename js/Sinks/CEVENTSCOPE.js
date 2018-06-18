/* autogenerated from "macros/Sinks/CEVENTSCOPE.sci" */
function CEVENTSCOPE() {
CEVENTSCOPE.prototype.define = function CEVENTSCOPE() {
nclock=1;
win=-1;
clrs=[[1],[3],[5],[7],[9],[11],[13],[15]];
wdim=[[600],[400]];
wpos=[[-1],[-1]];
per=30;
model=scicos_model();
model.sim=list("cevscpe",4);
model.evtin=1;
model.rpar=per;
model.ipar=[[win],[1],[clrs[nclock-1]],[wpos.slice()],[wdim.slice()]];
model.blocktype="d";
model.dep_ut=[false,false];
exprs=[[sci2exp(nclock)],[strcat(sci2exp(clrs[nclock-1])," ")],[string(win)],[sci2exp([])],[sci2exp(wdim)],[string(per)]];
gr_i=[];
x=standard_define([2,2],model,exprs,gr_i);
}
CEVENTSCOPE.prototype.details = function CEVENTSCOPE() {
}
CEVENTSCOPE.prototype.get = function CEVENTSCOPE() {
}
CEVENTSCOPE.prototype.set = function CEVENTSCOPE() {
x=arg1;
graphics=arg1.graphics;
exprs=graphics.exprs;
model=arg1.model;
while (true) {
[ok,nclock,clrs,win,wpos,wdim,per,exprs]=scicos_getvalue("Set Scope parameters",[["Number of event inputs"],["colors c (>0) or mark (<0)"],["Output window number (-1 for automatic)"],["Output window position"],["Output window sizes"],["Refresh period"]],list("vec",1,"vec",-1,"vec",1,"vec",-1,"vec",-1,"vec",1),exprs);
nclock=int(nclock);
clrs=int(clrs);
win=int(win);
if (!ok) {
break;
}
mess=[];
if (size(wpos,"*")!=0&&size(wpos,"*")!=2) {
mess=[[mess],["Window position must be [] or a 2 vector"],[" "]];
ok=false;
}
if (size(wdim,"*")!=0&&size(wdim,"*")!=2) {
mess=[[mess],["Window dim must be [] or a 2 vector"],[" "]];
ok=false;
}
if (nclock<=0) {
mess=[[mess],["Block must have at least one input event"],[" "]];
ok=false;
}
if (size(clrs,"*")!=nclock) {
mess=[[mess],["Inputs color c size must be equal to Number of inputs"],[" "]];
ok=false;
}
if (win<-1) {
mess=[[mess],["Window number cannot be inferior than -1"],[" "]];
ok=false;
}
if (per<=0) {
mess=[[mess],["Refresh period must be positive"],[" "]];
ok=false;
}
if (ok) {
[model,graphics,ok]=set_io(model,graphics,list(),list(),ones(nclock,1),[]);
} else {
message([["Some specified values are inconsistent:"],[" "],[mess]]);
}
if (ok) {
if (wpos==[]) {
wpos=[[-1],[-1]];
}
if (wdim==[]) {
wdim=[[-1],[-1]];
}
rpar=per;
ipar=[[win],[1],[clrs.slice()],[wpos.slice()],[wdim.slice()]];
model.rpar=rpar;
model.ipar=ipar;
graphics.exprs=exprs;
x.graphics=graphics;
x.model=model;
break;
}
}
}
}
