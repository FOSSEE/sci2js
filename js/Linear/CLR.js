/* autogenerated from "macros/Linear/CLR.sci" */
function CLR() {
    CLR.prototype.define = function CLR() {
        var x0 = 0;
        var A = -1;
        var B = 1;
        var C = 1;
        var D = 0;
        this.exprs = [["1"],["1+s"]];
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["csslti4"]), new ScilabDouble([4]));
        this.model.in1 = new ScilabDouble([1]);
        this.model.out = new ScilabDouble([1]);
        this.model.state = new ScilabDouble([x0]);
        this.model.rpar = new ScilabDouble([A.slice()],[B.slice()],[C.slice()],[D.slice()]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabDouble([false,true]);
        this.gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CLR\",sz(1),sz(2));"]);
        this.x = standard_define([3,2],this.model,this.exprs,this.gr_i);
        return new BasicBlock(this.x);
    }
    CLR.prototype.details = function CLR() {
        return this.x;
    }
    CLR.prototype.get = function CLR() {
        var options = {
            num:["Numerator (s)",this.num],
            den:["Denominator (s)",this.den],
        }
        return options;
    }
    CLR.prototype.set = function CLR() {
        this.num = arguments[0]["num"]
        this.den = arguments[0]["den"]
        this.exprs = arguments[0]["exprs"]
        this.x = arg1;
        this.graphics = arg1.graphics;
        this.exprs = this.graphics.exprs;
        this.model = arg1.model;
        var x0 = this.model.state;
        var rpar = this.model.rpar;
        var ns = prod(size(x0));
        var nin = 1;
        var nout = 1;
        var PREVAR_scicos_context = PREVAR_scicos_context;
        PREVAR_scicos_context.s = %s;
        while (true) {
            [ok,this.num,this.den,this.exprs] = scicos_getvalue("Set continuous SISO transfer parameters",["Numerator (s)","Denominator (s)"],list("pol",1,"pol",1),this.exprs);
            if (!ok) {
                break;
            }
            if (degree(this.num)>degree(this.den)) {
                message("Transfer function must be proper or strictly proper.");
                var ok = false;
            }
            if (ok) {
                var H = cont_frm(this.num,this.den);
                var tmpvar0 = H.slice(2-1,5);
                var A = tmpvar0[0];
                var B = tmpvar0[1];
                var C = tmpvar0[2];
                var D = tmpvar0[3];
                this.graphics.exprs = new ScilabDouble([this.exprs]);
                var tmpvar1 = size(A);
                var ns1 = tmpvar1[0];
                var ns1 = tmpvar1[1];
                var rpar = [[matrix(A,ns1*ns1,1)],[matrix(B,ns1,1)],[matrix(C,ns1,1)],[D]];
                if (norm(D,1)!=0) {
                    var mmm = [true,true];
                } else {
                    var mmm = [false,true];
                }
                if (or(this.model.dep_ut!=mmm)) {
                    this.model.dep_ut = new ScilabDouble(mmm);
                }
                if (ns1<=ns) {
                    var x0 = x0.slice(1-1,ns1);
                } else {
                    x0[ns1-1][1-1] = 0;
                }
                this.model.state = new ScilabDouble(x0);
                this.model.rpar = new ScilabDouble(rpar);
                this.x.graphics = this.graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
}
