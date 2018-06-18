/* autogenerated from "macros/MatrixOp/EXTRACT.sci" */
function EXTRACT() {
EXTRACT.prototype.define = function EXTRACT() {
model=scicos_model();
function_name="extract";
funtyp=4;
model.sim=list(function_name,funtyp);
model.in1=-1;
model.in2=-2;
model.intyp=1;
model.out=1;
model.out2=1;
model.outtyp=1;
model.evtin=[];
model.evtout=[];
model.state=[];
model.dstate=[];
model.rpar=[];
model.ipar=[1,1,1,1];
model.blocktype="c";
model.firing=[];
model.dep_ut=[true,false];
label=[sci2exp(1),sci2exp([1]),sci2exp([1])];
gr_i=[];
x=standard_define([3,2],model,label,gr_i);
}
EXTRACT.prototype.details = function EXTRACT() {
}
EXTRACT.prototype.get = function EXTRACT() {
}
EXTRACT.prototype.set = function EXTRACT() {
x=arg1;
graphics=arg1.graphics;
label=graphics.exprs;
model=arg1.model;
if (size(label,"*")==14) {
label[9-1]=[];
}
while (true) {
[ok,typ,a,b,exprs]=scicos_getvalue("Set EXTRACT Block",["Datatype (1=real double  2=Complex)","Lines to extract","Columns to extract"],list("vec",1,"mat",[1,-1],"mat",[1,-1]),label);
a=a.slice();
b=b.slice();
if (!ok) {
break;
}
if ((typ==1)) {
function_name="extract";
ot=1;
it=1;
} else if ((typ==2)) {
function_name="extractz";
ot=2;
it=2;
} else {
message("Datatype is not supported");
ok=false;
}
ma=size(a,1);
mb=size(b,1);
if ((ma==0||mb==0)) {
message("empty field");
ok=false;
}
for (i=1;i<=ma;i+=1) {
if ((a[i-1]<=0)) {
message("invalid index");
ok=false;
}
}
for (j=1;j<=mb;j+=1) {
if ((b[j-1]<=0)) {
message("invalid index");
ok=false;
}
}
model.ipar=[a,b,ma,mb];
in1=[model.in1,model.in2];
out=[ma,mb];
funtyp=4;
if (ok) {
label=exprs;
[model,graphics,ok]=set_io(model,graphics,list(in1,it),list(out,ot),[],[]);
model.sim=list(function_name,funtyp);
graphics.exprs=label;
arg1.graphics=graphics;
arg1.model=model;
x=arg1;
break;
}
}
}
}
