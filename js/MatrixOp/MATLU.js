/* autogenerated from "macros/MatrixOp/MATLU.sci" */
function MATLU() {
    MATLU.prototype.define = function MATLU() {
        this.model = scicos_model();
        function_name = "mat_lu";
        funtyp = 4;
        this.model.sim = list(new ScilabString([function_name]), new ScilabDouble([funtyp]));
        this.model.in1 = new ScilabDouble([-1]);
        this.model.in2 = new ScilabDouble([-1]);
        this.model.intyp = new ScilabDouble([1]);
        this.model.out = [[-1],[-1]];
        this.model.out2 = [[-1],[-1]];
        this.model.outtyp = [1,1];
        this.model.evtin = [];
        this.model.evtout = [];
        this.model.state = [];
        this.model.dstate = [];
        this.model.rpar = [];
        this.model.ipar = [];
        this.model.blocktype = new ScilabString(["c"]);
        this.model.firing = [];
        this.model.dep_ut = [true,false];
        label = sci2exp(1);
        gr_i = [];
        this.x = standard_define([2,2],this.model,label,gr_i);
        return new BasicBlock(this.x);
    }
    MATLU.prototype.details = function MATLU() {
        return this.x;
    }
    MATLU.prototype.get = function MATLU() {
        var options = {
            typ:["Datatype(1=real double  2=Complex)",this.typ],
        }
        return options;
    }
    MATLU.prototype.set = function MATLU() {
        this.typ = inverse(arguments[0]["typ"])
        this.lab = arguments[0]["lab"]
        this.x = arg1;
        this.model = arg1.model;
        graphics = arg1.graphics;
        label = graphics.exprs;
        if (size(label,"*")==14) {
            label[9-1] = [];
        }
        while (true) {
            [ok,this.typ,this.lab] = scicos_getvalue("Set MATLU block parameters",["Datatype(1=real double  2=Complex)"],list("vec",1),label);
            if (!ok) {
                break;
            }
            if ((this.typ==1)) {
                function_name = "mat_lu";
                ot = [1,1];
                it = 1;
            } else if ((this.typ==2)) {
                function_name = "matz_lu";
                ot = [2,2];
                it = 2;
            } else {
                message("Datatype is not supported");
                ok = false;
            }
            if (ok) {
                [model,graphics,ok] = set_io(this.model,graphics,list([this.model.in1,this.model.in2],it),list([this.model.out,this.model.out2],ot),[],[]);
            }
            if (ok) {
                funtyp = 4;
                this.model.sim = list(new ScilabString([function_name]), new ScilabDouble([funtyp]));
                graphics.exprs = this.lab;
                this.x.graphics = graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
}
