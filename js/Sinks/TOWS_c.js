/* autogenerated from "macros/Sinks/TOWS_c.sci" */
function TOWS_c() {
    TOWS_c.prototype.define = function TOWS_c() {
nu=-1;
nz=128;
varnam="A";
herit=0;
model=scicos_model();
model.sim=list("tows_c",4);
model.in1=[nu];
model.in2=-2;
model.intyp=-1;
model.out=[];
model.evtin=[1];
model.evtout=[];
model.rpar=[];
model.ipar=[[nz],[length(varnam)],[transpose(this.ascii[varnam-1])]];
model.blocktype="d";
model.firing=[];
model.dep_ut=[false,false];
gr_i=[];
exprs=[[string(nz)],[string(varnam)],[string(herit)]];
x=standard_define([4,2],model,exprs,gr_i);
    }
    TOWS_c.prototype.details = function TOWS_c() {
    }
    TOWS_c.prototype.get = function TOWS_c() {
    }
    TOWS_c.prototype.set = function TOWS_c() {
x=arg1;
graphics=arg1.graphics;
model=arg1.model;
exprs=graphics.exprs;
while (true) {
[ok,nz,varnam,herit,exprs]=scicos_getvalue("Set Xcos buffer block",[["Size of buffer"],["Scilab variable name"],["Inherit (no:0, yes:1)"]],list("vec",1,"str",1,"vec",1),exprs);
if (!ok) {
break;
}
if ((nz<=0)) {
message("Size of buffer must be positive");
ok=false;
}
r=false;
ierr=execstr("r = validvar(varnam)","errcatch");
if (!r||ierr!=0||length(varnam)>19) {
message([["Invalid variable name."],["Please choose another variable name."]]);
ok=false;
}
execstr("if type("+varnam+") <> 17 | or(fieldnames("+varnam+") <> [\"values\"; \"time\"]) then"+" message([\"Protected variable name.\"; \"Please choose another variable name.\"]);"+" ok = %f;"+" end","errcatch");
if (ok) {
[model,graphics,ok]=set_io(model,graphics,list([-1,-2],-1),list(),ones(1-herit,1),[]);
if (herit==1) {
model.blocktype="x";
} else {
model.blocktype="d";
}
model.ipar=[[nz],[length(varnam)],[transpose(this.ascii[varnam-1])]];
graphics.exprs=exprs;
x.graphics=graphics;
x.model=model;
break;
}
}
    }
}
