/* autogenerated from "macros/Linear/DLR.sci" */
function DLR() {
    DLR.prototype.define = function DLR() {
        var x0 = 0;
        var A = -1;
        var B = 1;
        var C = 1;
        var D = 0;
        this.exprs = [["1"],["1+z"]];
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["dsslti4"]), new ScilabDouble([4]));
        this.model.in1 = new ScilabDouble([1]);
        this.model.out = new ScilabDouble([1]);
        this.model.evtin = new ScilabDouble([1]);
        this.model.dstate = new ScilabDouble(x0.slice());
        this.model.rpar = new ScilabDouble([A.slice()],[B.slice()],[C.slice()],[D.slice()]);
        this.model.blocktype = new ScilabString(["d"]);
        this.model.dep_ut = new ScilabDouble([false,false]);
        this.gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DLR\",sz(1),sz(2));"]);
        this.x = standard_define([3,2],this.model,this.exprs,this.gr_i);
        return new BasicBlock(this.x);
    }
    DLR.prototype.details = function DLR() {
        return this.x;
    }
    DLR.prototype.get = function DLR() {
        var options = {
            num:["Numerator (z)",this.num],
            den:["Denominator (z)",this.den],
        }
        return options;
    }
    DLR.prototype.set = function DLR() {
        this.num = arguments[0]["num"]
        this.den = arguments[0]["den"]
        this.exprs = arguments[0]["exprs"]
        this.x = arg1;
        this.graphics = arg1.graphics;
        this.exprs = this.graphics.exprs;
        this.model = arg1.model;
        var x0 = this.model.dstate;
        var ns = prod(size(x0));
        var PREVAR_scicos_context = PREVAR_scicos_context;
        PREVAR_scicos_context.z = %z;
        while (true) {
            [ok,this.num,this.den,this.exprs] = scicos_getvalue("Set discrete SISO transfer parameters",["Numerator (z)","Denominator (z)"],list("pol",1,"pol",1),this.exprs);
            if (!ok) {
                break;
            }
            if (degree(this.num)>degree(this.den)) {
                message("Transfer function must be proper");
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
                if (ns1<=ns) {
                    var x0 = x0.slice(1-1,ns1);
                } else {
                    x0[ns1-1][1-1] = 0;
                }
                var rpar = [[A.slice()],[B.slice()],[C.slice()],[D.slice()]];
                this.model.dstate = new ScilabDouble(x0);
                this.model.rpar = new ScilabDouble(rpar);
                if (norm(D,1)!=0) {
                    var mmm = [true,false];
                } else {
                    var mmm = [false,false];
                }
                if (or(this.model.dep_ut!=mmm)) {
                    this.model.dep_ut = new ScilabDouble(mmm);
                }
                this.x.graphics = this.graphics;
                this.x.model = this.model;
                break;
            }
        }
        this.x.model.firing = [];
        return new BasicBlock(this.x);
    }
}
