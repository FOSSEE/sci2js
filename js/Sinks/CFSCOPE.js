/* autogenerated from "macros/Sinks/CFSCOPE.sci" */
function CFSCOPE() {
CFSCOPE.prototype.define = function CFSCOPE() {
win=-1;
wdim=[[600],[400]];
wpos=[[-1],[-1]];
clrs=[[1],[3],[5],[7],[9],[11],[13],[15]];
N=2;
ymin=-15;
ymax=+15;
per=30;
model=scicos_model();
model.sim=list("cfscope",4);
model.evtin=1;
model.rpar=[[0],[ymin],[ymax],[per]];
model.ipar=[[win],[1],[N],[clrs],[wpos],[wdim],[1],[1]];
model.blocktype="c";
model.dep_ut=[true,false];
exprs=[[strcat(string(clrs)," ")],[string(win)],[sci2exp([])],[sci2exp(wdim)],[string(ymin)],[string(ymax)],[string(per)],[string(N)],[string([1])]];
gr_i=[];
x=standard_define([2,2],model,exprs,gr_i);
}
CFSCOPE.prototype.details = function CFSCOPE() {
}
CFSCOPE.prototype.get = function CFSCOPE() {
}
CFSCOPE.prototype.set = function CFSCOPE() {
x=arg1;
graphics=arg1.graphics;
exprs=graphics.exprs;
model=arg1.model;
while (true) {
[ok,clrs,win,wpos,wdim,ymin,ymax,per,N,wu,exprs]=scicos_getvalue("Set Scope parameters",[["Color (>0) or mark (<0) vector (8 entries)"],["Output window number (-1 for automatic)"],["Output window position"],["Output window sizes"],["Ymin"],["Ymax"],["Refresh period"],["Buffer size","Links to view"]],list("vec",8,"vec",1,"vec",-1,"vec",-1,"vec",1,"vec",1,"vec",1,"vec",1,"vec",-1),exprs);
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
if (win<-1) {
mess=[[mess],["Window number cannot be inferior than -1"],[" "]];
ok=false;
}
if (per<=0) {
mess=[[mess],["Refresh period must be positive"],[" "]];
ok=false;
}
if (N<2) {
mess=[[mess],["Buffer size must be at least 2"],[" "]];
ok=false;
}
if (ymin>=ymax) {
mess=[[mess],["Ymax must be greater than Ymin"],[" "]];
ok=false;
}
if (wu<0) {
mess=[[mess],["Link to view must be positive"],[" "]];
ok=false;
}
if (!ok) {
message([["Some specified values are inconsistent:"],[" "],[mess]]);
}
if (ok) {
if (wpos==[]) {
wpos=[[-1],[-1]];
}
if (wdim==[]) {
wdim=[[-1],[-1]];
}
rpar=[[0],[ymin],[ymax],[per]];
if (size(clrs,"*")>8) {
clrs=clrs.slice(1-1,8);
}
if (size(clrs,"*")<8) {
clrs[8-1]=0;
}
ipar=[[win],[1],[N],[clrs.slice()],[wpos.slice()],[wdim.slice()],[size(wu,"*")],[wu.slice()]];
model.rpar=rpar;
model.ipar=ipar;
model.firing=[];
model.dep_ut=[true,false];
graphics.exprs=exprs;
x.graphics=graphics;
x.model=model;
break;
}
}
}
}
