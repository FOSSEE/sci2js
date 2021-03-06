/* autogenerated from "macros/MatrixOp/MATRESH.sci" */
function MATRESH() {
    MATRESH.prototype.define = function MATRESH() {
        this.model = scicos_model();
        var function_name = "mat_reshape";
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
        var label = [[sci2exp(1)],[sci2exp([1,1])],[sci2exp([1,1])]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATRESH\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3,2]),this.model,new ScilabDouble(label),gr_i);
        return new BasicBlock(this.x);
    }
    MATRESH.prototype.details = function MATRESH() {
        return this.x;
    }
    MATRESH.prototype.get = function MATRESH() {
        var label = this.graphics.exprs;
        if (size(label,"*")==14) {
            label[9-1] = [];
        }
        this.set_param_popup_title = "Set MATRESH block parameters";
        var options = {
            typ:["Datatype(1=real double  2=Complex)",this.typ],
            l1:["input size",this.l1],
            out:["output size desired",this.out],
        }
        return options;
    }
    MATRESH.prototype.set = function MATRESH() {
        var label = this.graphics.exprs;
        if (size(label,"*")==14) {
            label[9-1] = [];
        }
        while (true) {
            var ok = true;
            this.typ = inverse(arguments[0]["typ"]);
            this.l1 = arguments[0]["l1"];
            this.out = arguments[0]["out"];
            var lab = [arguments[0]["typ"], arguments[0]["l1"], arguments[0]["out"]];
            if (!ok) {
                break;
            }
            var nout = size(this.out);
            var nin = size(this.l1);
            if (nout==0) {
                message("output must have at least one element");
                throw "user error";
                var ok = false;
            }
            if (nin==0) {
                message("input must have at least one element");
                throw "user error";
                var ok = false;
            }
            if (ok) {
                if (((this.out[1-1]>(this.l1[1-1]*this.l1[2-1])))) {
                    message("the first dimension of the output is too big");
                    throw "user error";
                    var ok = false;
                }
                if (((this.out[2-1]>(this.l1[1-1]*this.l1[2-1])))) {
                    message("the second dimension of the output is too big");
                    throw "user error";
                    var ok = false;
                }
                if ((((this.out[2-1]*this.out[1-1])>(this.l1[1-1]*this.l1[2-1])))) {
                    message("the dimensions of the output are too big");
                    throw "user error";
                    var ok = false;
                }
            }
            if ((this.typ==1)) {
                var function_name = "mat_reshape";
                var ot = 1;
                var it = 1;
            } else if ((this.typ==2)) {
                var function_name = "matz_reshape";
                var ot = 2;
                var it = 2;
            } else {
                message("Datatype is not supported");
                throw "user error";
                var ok = false;
            }
            if (ok) {
                var label = lab;
                var tmpvar0 = set_io(this.model,this.graphics,list(this.l1,it),list(this.out,ot),[],[]);
                this.model = tmpvar0[0];
                this.graphics = tmpvar0[1];
                var ok = tmpvar0[2];
            }
            if (ok) {
                var funtyp = 4;
                this.model.sim = list(new ScilabString([function_name]), new ScilabDouble([funtyp]));
                this.graphics.exprs = new ScilabDouble([label]);
                break;
            }
        }
        needcompile = resume(needcompile)
        return new BasicBlock(this.x);
    }
    MATRESH.prototype.get_popup_title = function MATRESH() {
        return this.set_param_popup_title;
    }
    MATRESH.prototype.importset = function MATRESH() {
        var graphics = this.x.graphics;
        var ary = getData(graphics.exprs);
        this.typ = ary[0];
        this.l1 = ary[1];
        this.out = ary[2];
    }
    MATRESH.prototype.getContainer = function MATRESH() { return new BasicBlock(this.x); }
}
