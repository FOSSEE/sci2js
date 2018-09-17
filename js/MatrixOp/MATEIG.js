/* autogenerated from "macros/MatrixOp/MATEIG.sci" */
function MATEIG() {
    MATEIG.prototype.define = function MATEIG() {
        this.model = scicos_model();
        var function_name = "mat_vps";
        var funtyp = 4;
        this.model.sim = list(new ScilabString([function_name]), new ScilabDouble([funtyp]));
        this.model.in = new ScilabDouble([-1]);
        this.model.in2 = new ScilabDouble([-1]);
        this.model.intyp = new ScilabDouble([1]);
        this.model.out = new ScilabDouble([-1]);
        this.model.out2 = new ScilabDouble([1]);
        this.model.outtyp = new ScilabDouble([2]);
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
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATEIG\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,2]),this.model,new ScilabDouble(label),gr_i);
        return new BasicBlock(this.x);
    }
    MATEIG.prototype.details = function MATEIG() {
        return this.x;
    }
    MATEIG.prototype.get = function MATEIG() {
        var label = this.graphics.exprs;
        if (size(label,"*")==14) {
            label[9-1] = [];
        }
        this.set_param_popup_title = "Set MATEIG block parameters";
        var options = {
            typ:["Datatype(1=real double  2=Complex)",this.typ],
            decomptyp:["decomposition type (1=eig values  2=eig values+eig vectors",this.decomptyp],
        }
        return options;
    }
    MATEIG.prototype.set = function MATEIG() {
        var label = this.graphics.exprs;
        if (size(label,"*")==14) {
            label[9-1] = [];
        }
        while (true) {
            var ok = true;
            this.typ = inverse(arguments[0]["typ"]);
            this.decomptyp = arguments[0]["decomptyp"];
            var lab = [arguments[0]["typ"], arguments[0]["decomptyp"]];
            if (!ok) {
                break;
            }
            var label = lab;
            if ((this.typ==1)) {
                if ((this.decomptyp==1)) {
                    var function_name = "mat_vps";
                    var out = [-1,1];
                    var ot = 2;
                } else if ((this.decomptyp==2)) {
                    var function_name = "mat_vpv";
                    var out = [[-1,-1],[-1,-1]];
                    var ot = [2,2];
                } else {
                    message("decomposition type is not supported");
                    throw "user error";
                    var ok = false;
                }
                var it = 1;
            } else if ((this.typ==2)) {
                if ((this.decomptyp==1)) {
                    var function_name = "matz_vps";
                    var out = [-1,1];
                    var ot = 2;
                } else if ((this.decomptyp==2)) {
                    var function_name = "matz_vpv";
                    var out = [[-1,-1],[-1,-1]];
                    var ot = [2,2];
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
            var in1 = [-1,-1];
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
    MATEIG.prototype.get_popup_title = function MATEIG() {
        return this.set_param_popup_title;
    }
    MATEIG.prototype.importset = function MATEIG() {
        var graphics = this.x.graphics;
        var ary = getData(graphics.exprs);
        this.typ = ary[0];
        this.decomptyp = ary[1];
    }
    MATEIG.prototype.getContainer = function MATEIG() { return new BasicBlock(this.x); }
}
