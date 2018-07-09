/* autogenerated from "macros/NonLinear/QUANT_f.sci" */
function QUANT_f() {
    QUANT_f.prototype.define = function QUANT_f() {
        this.pas = 0.1;
        this.meth = 1;
        this.model = scicos_model();
        this.model.sim = new ScilabString(["qzrnd"]);
        this.model.in1 = new ScilabDouble([-1]);
        this.model.out = new ScilabDouble([-1]);
        this.model.rpar = new ScilabDouble([this.pas]);
        this.model.ipar = new ScilabDouble([this.meth]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = [true,false];
        exprs = [[string(this.pas)],[string(this.meth)]];
        gr_i = [];
        this.x = standard_define([2,2],this.model,exprs,gr_i);
        return new BasicBlock(this.x);
    }
    QUANT_f.prototype.details = function QUANT_f() {
        return this.x;
    }
    QUANT_f.prototype.get = function QUANT_f() {
        var options = {
            pas:["Step",this.pas],
            meth:["Quantization Type (1-4)",this.meth],
        }
        return options;
    }
    QUANT_f.prototype.set = function QUANT_f() {
        this.pas = parseFloat(arguments[0]["pas"])
        this.meth = parseFloat(arguments[0]["meth"])
        this.x = arg1;
        graphics = arg1.graphics;
        exprs = graphics.exprs;
        this.model = arg1.model;
        while (true) {
            [ok,this.pas,this.meth,exprs] = scicos_getvalue("Set parameters",["Step","Quantization Type (1-4)"],list("vec",1,"vec",1),exprs);
            if (!ok) {
                break;
            }
            if (this.meth<1||this.meth>4) {
                message("Quantization Type must be from 1 to 4");
            } else {
                rpar = this.pas;
                this.model.rpar = new ScilabDouble([rpar]);
                this.model.ipar = new ScilabDouble([this.meth]);
                switch (this.meth) {
                case 1:
                    this.model.sim = new ScilabString(["qzrnd"]);
                case 2:
                    this.model.sim = new ScilabString(["qztrn"]);
                case 3:
                    this.model.sim = new ScilabString(["qzflr"]);
                case 4:
                    this.model.sim = new ScilabString(["qzcel"]);
                }
                graphics.exprs = exprs;
                this.x.graphics = graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
}
