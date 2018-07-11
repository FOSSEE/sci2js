/* autogenerated from "macros/Linear/CLSS.sci" */
function CLSS() {
    CLSS.prototype.define = function CLSS() {
        this.x0 = 0;
        this.A = -1;
        this.B = 1;
        this.C = 1;
        this.D = 0;
        in1 = 1;
        out = 1;
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["csslti4"]), new ScilabDouble([4]));
        this.model.in1 = new ScilabDouble([in1]);
        this.model.out = new ScilabDouble([out]);
        this.model.state = new ScilabDouble([this.x0]);
        this.model.rpar = new ScilabDouble([this.A.slice()],[this.B.slice()],[this.C.slice()],[this.D.slice()]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = [false,true];
        exprs = [[strcat(sci2exp(this.A))],[strcat(sci2exp(this.B))],[strcat(sci2exp(this.C))],[strcat(sci2exp(this.D))],[strcat(sci2exp(this.x0))]];
        gr_i = [];
        this.x = standard_define([4,2],this.model,exprs,gr_i);
        return new BasicBlock(this.x);
    }
    CLSS.prototype.details = function CLSS() {
        return this.x;
    }
    CLSS.prototype.get = function CLSS() {
        var options = {
            A:["A matrix",this.A],
            B:["B matrix",this.B],
            C:["C matrix",this.C],
            D:["D matrix",this.D],
            x0:["Initial state",this.x0],
        }
        return options;
    }
    CLSS.prototype.set = function CLSS() {
        this.A = parseFloat(arguments[0]["A"])
        this.B = parseFloat(arguments[0]["B"])
        this.C = parseFloat(arguments[0]["C"])
        this.D = parseFloat(arguments[0]["D"])
        this.x0 = parseFloat(arguments[0]["x0"])
        this.x = arg1;
        graphics = arg1.graphics;
        exprs = graphics.exprs;
        if (size(exprs,"*")==7) {
            exprs = exprs[[1:4,7]-1];
        }
        this.model = arg1.model;
        while (true) {
            [ok,this.A,this.B,this.C,this.D,this.x0,exprs] = scicos_getvalue("Set continuous linear system parameters",["A matrix","B matrix","C matrix","D matrix","Initial state"],list("mat",[-1,-1],"mat",["size(%1,2)","-1"],"mat",["-1","size(%1,2)"],"mat",[-1,-1],"vec","size(%1,2)"),exprs);
            if (!ok) {
                break;
            }
            out = size(this.C,1);
            if (out==0) {
                out = [];
            }
            in1 = size(this.B,2);
            if (in1==0) {
                in1 = [];
            }
            [ms,ns] = size(this.A);
            okD = true;
            if (size(this.D,"*")!=size(this.C,1)*size(this.B,2)) {
                if (size(this.D,"*")==1) {
                    this.D = this.D*ones(this.C*this.B);
                } else if (size(this.D,"*")==0) {
                    this.D = zeros(this.C*this.B);
                } else {
                    okD = false;
                }
            }
            if (ms!=ns||!okD) {
                message(_("Matrix A is not square or D has wrong dimension"));
            } else {
                [this.model,graphics,ok] = check_io(this.model,graphics,in1,out,[],[]);
                if (ok) {
                    graphics.exprs = exprs;
                    rpar = [[this.A.slice()],[this.B.slice()],[this.C.slice()],[this.D.slice()]];
                    if (this.D!=[]) {
                        if (norm(this.D,1)!=0) {
                            mmm = [true,true];
                        } else {
                            mmm = [false,true];
                        }
                        if (or(this.model.dep_ut!=mmm)) {
                            this.model.dep_ut = mmm;
                        }
                    } else {
                        this.model.dep_ut = [false,true];
                    }
                    this.model.state = this.x0.slice();
                    this.model.rpar = new ScilabDouble(rpar);
                    this.x.graphics = graphics;
                    this.x.model = this.model;
                    break;
                }
            }
        }
        return new BasicBlock(this.x);
    }
}
