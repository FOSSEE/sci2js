/* autogenerated from "macros/NonLinear/TrigFun.sci" */
function TrigFun() {
    TrigFun.prototype.define = function TrigFun() {
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["sin_blk"]), new ScilabDouble([4]));
        this.model.in1 = new ScilabDouble([-1]);
        this.model.out = new ScilabDouble([-1]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = [true,false];
        exprs = "sin";
        gr_i = [];
        this.x = standard_define([4,2],this.model,exprs,gr_i);
        return new BasicBlock(this.x);
    }
    TrigFun.prototype.details = function TrigFun() {
        return this.x;
    }
    TrigFun.prototype.get = function TrigFun() {
        var options = {
        }
        return options;
    }
    TrigFun.prototype.set = function TrigFun() {
        this.fun = arguments[0]["fun"]
        this.x = arg1;
        graphics = arg1.graphics;
        exprs = graphics.exprs;
        this.model = arg1.model;
        PREVAR_FF = [["sin"],["cos"],["tan"],["asin"],["acos"],["atan"],["sinh"],["cosh"],["tanh"],["asinh"],["acosh"],["atanh"]];
        PREVAR_GG = [["Choose among "+strcat(PREVAR_FF.slice(1-1,4),", ")],[strcat(PREVAR_FF.slice(5-1,$),", ")]];
        while (true) {
            [ok,this.fun,exprs] = scicos_getvalue(PREVAR_GG,"Function",list("str",1),exprs);
            if (!ok) {
                break;
            }
            if (find(PREVAR_FF==this.fun)==[]) {
                message("Sorry but "+this.fun+" is not in the list!");
            } else {
                graphics.exprs = exprs;
                execstr("model.sim=list(\'"+this.fun+"_blk\',4)");
                this.x.graphics = graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
}
