/* autogenerated from "macros/Sinks/OUT_f.sci" */
function OUT_f() {
    OUT_f.prototype.define = function OUT_f() {
        var n = -1;
        this.prt = 1;
        this.model = scicos_model();
        this.model.sim = new ScilabString(["output"]);
        this.model.in = new ScilabDouble([-1]);
        this.model.in2 = new ScilabDouble([-2]);
        this.model.intyp = new ScilabDouble([-1]);
        this.model.ipar = new ScilabDouble([this.prt]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabBoolean([false,false]);
        var exprs = string(this.prt);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"OUT_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([1,1]),this.model,new ScilabString([exprs]),gr_i);
        return new ExplicitOutBlock(this.x);
    }
    OUT_f.prototype.details = function OUT_f() {
        return this.x;
    }
    OUT_f.prototype.get = function OUT_f() {
        var options = {
            prt:["Port number",this.prt],
        }
        return options;
    }
    OUT_f.prototype.set = function OUT_f() {
        var exprs = this.graphics.exprs;
        if (size(exprs,"*")==2) {
            var exprs = exprs[1-1];
        }
        while (true) {
            var ok = true;
            this.prt = parseFloat(arguments[0]["prt"]);
            if (!ok) {
                break;
            }
            this.prt = int(this.prt);
            if (this.prt<=0) {
                block_parameter_error(msprintf("Wrong value for \'Port Number\' parameter: %d.",this.prt),"Strictly positive integer expected.");
            } else {
                this.model.ipar = new ScilabDouble([this.prt]);
                this.graphics.exprs = new ScilabDouble([exprs]);
                this.x.graphics = this.graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new ExplicitOutBlock(this.x);
    }
}
