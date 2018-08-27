/* autogenerated from "macros/Linear/TCLSS_f.sci" */
function TCLSS_f() {
    TCLSS_f.prototype.define = function TCLSS_f() {
        this.x0 = 0;
        this.A = 0;
        this.B = 1;
        this.C = 1;
        this.D = 0;
        var in1 = 1;
        var nx = size(this.x0,"*");
        var out = 1;
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["tcslti"]), new ScilabDouble([1]));
        this.model.in = new ScilabDouble([in1],[nx]);
        this.model.out = new ScilabDouble([out]);
        this.model.evtin = new ScilabDouble([1]);
        this.model.state = new ScilabDouble([this.x0]);
        this.model.rpar = new ScilabDouble([this.A.slice()],[this.B.slice()],[this.C.slice()],[this.D.slice()]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabBoolean([false,true]);
        var exprs = [[strcat(sci2exp(this.A))],[strcat(sci2exp(this.B))],[strcat(sci2exp(this.C))],[strcat(sci2exp(this.D))],[strcat(sci2exp(this.x0))]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"TCLSS_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3,2]),this.model,new ScilabDouble(exprs),gr_i);
        return new BasicBlock(this.x);
    }
    TCLSS_f.prototype.details = function TCLSS_f() {
        return this.x;
    }
    TCLSS_f.prototype.get = function TCLSS_f() {
        var options = {
            A:["A matrix",this.A],
            B:["B matrix",this.B],
            C:["C matrix",this.C],
            D:["D matrix",this.D],
            x0:["Initial state",this.x0],
        }
        return options;
    }
    TCLSS_f.prototype.set = function TCLSS_f() {
        var exprs = this.graphics.exprs;
        if (size(exprs,"*")==7) {
            var exprs = exprs[[1:4,7]-1];
        }
        while (true) {
            var ok = true;
            this.A = parseFloat(arguments[0]["A"]);
            this.B = parseFloat(arguments[0]["B"]);
            this.C = parseFloat(arguments[0]["C"]);
            this.D = parseFloat(arguments[0]["D"]);
            this.x0 = parseFloat(arguments[0]["x0"]);
            var exprs = [arguments[0]["A"], arguments[0]["B"], arguments[0]["C"], arguments[0]["D"], arguments[0]["x0"]];
            if (!ok) {
                break;
            }
            var out = size(this.C,1);
            if (out==0) {
                var out = [];
            }
            var in1 = size(this.B,2);
            if (in1==0) {
                var in1 = [];
            }
            var tmpvar0 = size(this.A);
            var ms = tmpvar0[0];
            var ns = tmpvar0[1];
            if (ms!=ns) {
                message("A matrix must be square");
                throw "user error";
            } else {
                var tmpvar1 = check_io(this.model,this.graphics,[[in1],[ms]],out,1,[]);
                this.model = tmpvar1[0];
                this.graphics = tmpvar1[1];
                var ok = tmpvar1[2];
                if (ok) {
                    this.graphics.exprs = new ScilabDouble([exprs]);
                    var rpar = [[this.A.slice()],[this.B.slice()],[this.C.slice()],[this.D.slice()]];
                    if (this.D.length!=0) {
                        if (norm(this.D,1)!=0) {
                            var mmm = [true,true];
                        } else {
                            var mmm = [false,true];
                        }
                        if (or(this.model.dep_ut!=mmm)) {
                            this.model.dep_ut = new ScilabBoolean(mmm);
                        }
                    } else {
                        this.model.dep_ut = new ScilabBoolean([false,true]);
                    }
                    this.model.state = new ScilabDouble(this.x0.slice());
                    this.model.rpar = new ScilabDouble(rpar);
                    if (this.D.length!=0) {
                        this.model.sim = list(new ScilabString(["tcslti"]), new ScilabDouble([1]));
                    } else {
                        this.model.sim = list(new ScilabString(["tcsltj"]), new ScilabDouble([1]));
                    }
                    this.x.graphics = this.graphics;
                    this.x.model = this.model;
                    break;
                }
            }
        }
        return new BasicBlock(this.x);
    }
    TCLSS_f.prototype.get_popup_title = function TCLSS_f() {
        var set_param_popup_title = "Set continuous linear system parameters";
        return set_param_popup_title;
    }
}
