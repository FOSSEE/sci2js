/* autogenerated from "macros/Sinks/OUT_f.sci" */
function OUT_f() {
    OUT_f.prototype.define = function OUT_f() {
        n = -1;
        this.prt = 1;
        this.model = scicos_model();
        this.model.sim = new ScilabString(["output"]);
        this.model.in1 = new ScilabDouble([-1]);
        this.model.in2 = new ScilabDouble([-2]);
        this.model.intyp = new ScilabDouble([-1]);
        this.model.ipar = new ScilabDouble([this.prt]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = [false,false];
        exprs = string(this.prt);
        gr_i = [];
        this.x = standard_define([1,1],this.model,exprs,gr_i);
        return new ExplicitOutBlock(this.x);
    }
    OUT_f.prototype.details = function OUT_f() {
        return this.x;
    }
    OUT_f.prototype.get = function OUT_f() {
        var options = {
        }
        return options;
    }
    OUT_f.prototype.set = function OUT_f() {
        this.prt = parseFloat(arguments[0]["prt"])
        this.x = arg1;
        graphics = arg1.graphics;
        this.model = arg1.model;
        exprs = graphics.exprs;
        if (size(exprs,"*")==2) {
            exprs = exprs[1-1];
        }
        while (true) {
            [ok,this.prt,exprs] = scicos_getvalue([[msprintf("Set %s block parameters","OUT_f")],[" "],["Regular output port"]],"Port number",list("vec",1),exprs);
            if (!ok) {
                break;
            }
            this.prt = int(this.prt);
            if (this.prt<=0) {
                block_parameter_error(msprintf("Wrong value for \'Port Number\' parameter: %d.",this.prt),"Strictly positive integer expected.");
            } else {
                this.model.ipar = new ScilabDouble([this.prt]);
                graphics.exprs = exprs;
                this.x.graphics = graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new ExplicitOutBlock(this.x);
    }
}
