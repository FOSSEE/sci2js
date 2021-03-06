/* autogenerated from "macros/MatrixOp/CUMSUM.sci" */
function CUMSUM() {
    CUMSUM.prototype.define = function CUMSUM() {
        this.model = scicos_model();
        var function_name = "cumsum_m";
        var funtyp = 4;
        this.model.sim = list(new ScilabString([function_name]), new ScilabDouble([funtyp]));
        this.model.in = new ScilabDouble([-1]);
        this.model.in2 = new ScilabDouble([-2]);
        this.model.intyp = new ScilabDouble([1]);
        this.model.out = new ScilabDouble([-1]);
        this.model.out2 = new ScilabDouble([-2]);
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
        var label = [[sci2exp(1)],[sci2exp(0)]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CUMSUM\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3,2]),this.model,new ScilabDouble(label),gr_i);
        return new BasicBlock(this.x);
    }
    CUMSUM.prototype.details = function CUMSUM() {
        return this.x;
    }
    CUMSUM.prototype.get = function CUMSUM() {
        var label = this.graphics.exprs;
        if (size(label,"*")==14) {
            label[9-1] = [];
        }
        this.set_param_popup_title = "Set CUMSUM block parameters";
        var options = {
            typ:["Datatype(1=real double  2=Complex)",this.typ],
            decomptyp:["Sum along (0=the first non singleton dimension  1=Rows  2=Columns)",this.decomptyp],
        }
        return options;
    }
    CUMSUM.prototype.set = function CUMSUM() {
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
                if ((this.decomptyp==0)) {
                    var function_name = "cumsum_m";
                    var out = [-1,-2];
                } else if ((this.decomptyp==1)) {
                    var function_name = "cumsum_r";
                    var out = [-1,1];
                } else if ((this.decomptyp==2)) {
                    var function_name = "cumsum_c";
                    var out = [1,-2];
                } else {
                    message("decomposition type is not supported");
                    throw "user error";
                    var ok = false;
                }
                var it = 1;
                var ot = 1;
            } else if ((this.typ==2)) {
                if ((this.decomptyp==0)) {
                    var function_name = "cumsumz_m";
                } else if ((this.decomptyp==1)) {
                    var function_name = "cumsumz_r";
                } else if ((this.decomptyp==2)) {
                    var function_name = "cumsumz_c";
                } else {
                    message("decomposition type is not supported");
                    throw "user error";
                    var ok = false;
                }
                var it = 2;
                var ot = 2;
            } else {
                message("Datatype is not supported");
                throw "user error";
                var ok = false;
            }
            var in1 = [this.model.in,this.model.in2];
            var out = [this.model.out,this.model.out2];
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
    CUMSUM.prototype.get_popup_title = function CUMSUM() {
        return this.set_param_popup_title;
    }
    CUMSUM.prototype.importset = function CUMSUM() {
        var graphics = this.x.graphics;
        var ary = getData(graphics.exprs);
        this.typ = ary[0];
        this.decomptyp = ary[1];
    }
    CUMSUM.prototype.getContainer = function CUMSUM() { return new BasicBlock(this.x); }
}
