/* autogenerated from "macros/MatrixOp/MATZREIM.sci" */
function MATZREIM() {
    MATZREIM.prototype.define = function MATZREIM() {
        this.model = scicos_model();
        function_name = "matz_reim";
        funtyp = 4;
        this.model.sim = list(new ScilabString([function_name]), new ScilabDouble([funtyp]));
        this.model.in1 = new ScilabDouble([-1]);
        this.model.in2 = new ScilabDouble([-2]);
        this.model.intyp = new ScilabDouble([2]);
        this.model.out = [[-1],[-1]];
        this.model.out2 = [[-2],[-2]];
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
        this.x = standard_define([3,2],this.model,label,gr_i);
        return new BasicBlock(this.x);
    }
    MATZREIM.prototype.details = function MATZREIM() {
        return this.x;
    }
    MATZREIM.prototype.get = function MATZREIM() {
        var options = {
            decomptyp:["decomposition type (1=Complex2Real&Imag 2=Real&Imag2Complex)",this.decomptyp],
        }
        return options;
    }
    MATZREIM.prototype.set = function MATZREIM() {
        this.decomptyp = arguments[0]["decomptyp"]
        this.lab = arguments[0]["lab"]
        this.x = arg1;
        this.model = arg1.model;
        graphics = arg1.graphics;
        label = graphics.exprs;
        if (size(label,"*")==14) {
            label[9-1] = [];
        }
        while (true) {
            [ok,this.decomptyp,this.lab] = scicos_getvalue("Set MATZREIM block parameters",["decomposition type (1=Complex2Real&Imag 2=Real&Imag2Complex)"],list("vec",1),label);
            if (!ok) {
                break;
            }
            label = this.lab;
            if ((this.decomptyp==1)) {
                function_name = "matz_reim";
                in1 = [-1,-2];
                it = 2;
                out = [[-1,-2],[-1,-2]];
                ot = [1,1];
            } else if ((this.decomptyp==2)) {
                function_name = "matz_reimc";
                in1 = [[-1,-2],[-1,-2]];
                it = [1,1];
                out = [-1,-2];
                ot = 2;
            } else {
                message("decomposition type is not supported");
                ok = false;
            }
            funtyp = 4;
            if (ok) {
                [model,graphics,ok] = set_io(this.model,graphics,list(in1,it),list(out,ot),[],[]);
            }
            if (ok) {
                this.model.sim = list(new ScilabString([function_name]), new ScilabDouble([funtyp]));
                arg1.model = this.model;
                graphics.exprs = label;
                arg1.graphics = graphics;
                this.x = arg1;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
}
