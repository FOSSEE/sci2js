/* autogenerated from "macros/MatrixOp/MATSING.sci" */
function MATSING() {
    MATSING.prototype.define = function MATSING() {
        this.model = scicos_model();
        var function_name = "mat_sing";
        var funtyp = 4;
        this.model.sim = list(new ScilabString([function_name]), new ScilabDouble([funtyp]));
        this.model.in = new ScilabDouble([-1]);
        this.model.in2 = new ScilabDouble([-2]);
        this.model.intyp = new ScilabDouble([1]);
        this.model.out = new ScilabDouble([-1]);
        this.model.out2 = new ScilabDouble([1]);
        this.model.outtyp = new ScilabDouble([1]);
        this.model.evtin = new ScilabDouble([]);
        this.model.evtout = new ScilabDouble([]);
        this.model.state = new ScilabDouble([]);
        this.model.dstate = new ScilabDouble([]);
        this.model.rpar = new ScilabDouble([]);
        this.model.ipar = new ScilabDouble([]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.firing = new ScilabDouble([]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        var label = [[sci2exp(1)],[sci2exp(1)]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATSING\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,2]),this.model,new ScilabDouble(label),gr_i);
        return new BasicBlock(this.x);
    }
    MATSING.prototype.details = function MATSING() {
        return this.x;
    }
    MATSING.prototype.get = function MATSING() {
        var options = {
            typ:["Datatype(1=real double  2=Complex)",this.typ],
            decomptyp:["decomposition type (1=singular values  2=sing values+matrix U & V)",this.decomptyp],
        }
        return options;
    }
    MATSING.prototype.set = function MATSING() {
        var label = this.graphics.exprs;
        if (size(label,"*")==14) {
            label[9-1] = [];
        }
        while (true) {
            var ok = true;
            this.typ = inverse(arguments[0]["typ"]);
            this.decomptyp = arguments[0]["decomptyp"];
            this.lab = arguments[0]["lab"];
            if (!ok) {
                break;
            }
            var label = this.lab;
            if ((this.typ==1)) {
                if ((this.decomptyp==1)) {
                    var function_name = "mat_sing";
                    var in1 = [-1,-2];
                    var out = [-1,1];
                    var ot = 1;
                } else if ((this.decomptyp==2)) {
                    var function_name = "mat_svd";
                    var in1 = [-1,-2];
                    var out = [[-1,-1],[-1,-2],[-2,-2]];
                    var ot = [1,1,1];
                } else {
                    message("decomposition type is not supported");
                    throw "user error";
                    var ok = false;
                }
                var it = 1;
            } else if ((this.typ==2)) {
                if ((this.decomptyp==1)) {
                    var function_name = "matz_sing";
                    var in1 = [-1,-2];
                    var out = [-1,1];
                    var ot = 1;
                } else if ((this.decomptyp==2)) {
                    var function_name = "matz_svd";
                    var in1 = [-1,-2];
                    var out = [[-1,-1],[-1,-2],[-2,-2]];
                    var ot = [2,1,2];
                } else {
                    message("decomposition type is not supported");
                    throw "user error";
                    var ok = false;
                }
                var it = 2;
            } else {
                message("Datatype is not supported");
                throw "user error";
                var ok = false;
            }
            var funtyp = 4;
            if (ok) {
                var tmpvar0 = set_io(this.model,this.graphics,list(in1,it),list(out,ot),[],[]);
                this.model = tmpvar0[0];
                this.graphics = tmpvar0[1];
                var ok = tmpvar0[2];
            }
            if (ok) {
                this.model.sim = list(new ScilabString([function_name]), new ScilabDouble([funtyp]));
                this.graphics.exprs = new ScilabDouble([label]);
                break;
            }
        }
        return new BasicBlock(this.x);
    }
}
