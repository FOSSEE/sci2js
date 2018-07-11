/* autogenerated from "macros/Linear/CLR_f.sci" */
function CLR_f() {
    CLR_f.prototype.define = function CLR_f() {
        x0 = 0;
        A = -1;
        B = 1;
        C = 1;
        D = 0;
        exprs = [["1"],["1+s"]];
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["csslti"]), new ScilabDouble([1]));
        this.model.in1 = new ScilabDouble([1]);
        this.model.out = new ScilabDouble([1]);
        this.model.state = new ScilabDouble([x0]);
        this.model.rpar = new ScilabDouble([A.slice()],[B.slice()],[C.slice()],[D.slice()]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = [false,true];
        gr_i = [];
        this.x = standard_define([2.5,2.5],this.model,exprs,gr_i);
        return new BasicBlock(this.x);
    }
    CLR_f.prototype.details = function CLR_f() {
        return this.x;
    }
    CLR_f.prototype.get = function CLR_f() {
        var options = {
            num:["Numerator (s)",this.num],
            den:["Denominator (s)",this.den],
        }
        return options;
    }
    CLR_f.prototype.set = function CLR_f() {
        this.num = arguments[0]["num"]
        this.den = arguments[0]["den"]
        this.x = arg1;
        graphics = arg1.graphics;
        exprs = graphics.exprs;
        this.model = arg1.model;
        x0 = this.model.state;
        rpar = this.model.rpar;
        ns = prod(size(x0));
        nin = 1;
        nout = 1;
        PREVAR_scicos_context = PREVAR_scicos_context;
        PREVAR_scicos_context.s = %s;
        while (true) {
            [ok,this.num,this.den,exprs] = scicos_getvalue("Set continuous SISO transfer parameters",["Numerator (s)","Denominator (s)"],list("pol",1,"pol",1),exprs);
            if (!ok) {
                break;
            }
            if (degree(this.num)>degree(this.den)) {
                message("Transfer must be proper or strictly proper");
                ok = false;
            }
            if (ok) {
                H = cont_frm(this.num,this.den);
                [A,B,C,D] = H.slice(2-1,5);
                graphics.exprs = exprs;
                [ns1,ns1] = size(A);
                rpar = [[matrix(A,ns1*ns1,1)],[matrix(B,ns1,1)],[matrix(C,ns1,1)],[D]];
                if (norm(D,1)!=0) {
                    mmm = [true,true];
                } else {
                    mmm = [false,true];
                }
                if (or(this.model.dep_ut!=mmm)) {
                    this.model.dep_ut = mmm;
                }
                if (ns1<=ns) {
                    x0 = x0.slice(1-1,ns1);
                } else {
                    x0[ns1-1][1-1] = 0;
                }
                this.model.state = x0;
                this.model.rpar = new ScilabDouble(rpar);
                this.x.graphics = graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
}
