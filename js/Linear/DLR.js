/* autogenerated from "macros/Linear/DLR.sci" */
function DLR() {
    DLR.prototype.define = function DLR() {
        x0 = 0;
        A = -1;
        B = 1;
        C = 1;
        D = 0;
        exprs = [["1"],["1+z"]];
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["dsslti4"]), new ScilabDouble([4]));
        this.model.in1 = new ScilabDouble([1]);
        this.model.out = new ScilabDouble([1]);
        this.model.evtin = new ScilabDouble([1]);
        this.model.dstate = x0.slice();
        this.model.rpar = [[A.slice()],[B.slice()],[C.slice()],[D.slice()]];
        this.model.blocktype = new ScilabString(["d"]);
        this.model.dep_ut = [false,false];
        gr_i = [];
        this.x = standard_define([3,2],this.model,exprs,gr_i);
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
        this.x = arg1;
        graphics = arg1.graphics;
        exprs = graphics.exprs;
        this.model = arg1.model;
        x0 = this.model.dstate;
        ns = prod(size(x0));
        PREVAR_scicos_context = PREVAR_scicos_context;
        PREVAR_scicos_context.z = %z;
        while (true) {
            [ok,this.num,this.den,exprs] = scicos_getvalue("Set discrete SISO transfer parameters",["Numerator (z)","Denominator (z)"],list("pol",1,"pol",1),exprs);
            if (!ok) {
                break;
            }
            if (degree(this.num)>degree(this.den)) {
                message("Transfer function must be proper");
                ok = false;
            }
            if (ok) {
                H = cont_frm(this.num,this.den);
                [A,B,C,D] = H.slice(2-1,5);
                graphics.exprs = exprs;
                [ns1,ns1] = size(A);
                if (ns1<=ns) {
                    x0 = x0.slice(1-1,ns1);
                } else {
                    x0[ns1-1][1-1] = 0;
                }
                rpar = [[A.slice()],[B.slice()],[C.slice()],[D.slice()]];
                this.model.dstate = x0;
                this.model.rpar = rpar;
                if (norm(D,1)!=0) {
                    mmm = [true,false];
                } else {
                    mmm = [false,false];
                }
                if (or(this.model.dep_ut!=mmm)) {
                    this.model.dep_ut = mmm;
                }
                this.x.graphics = graphics;
                this.x.model = this.model;
                break;
            }
        }
        this.x.model.firing = [];
        return new BasicBlock(this.x);
    }
}
