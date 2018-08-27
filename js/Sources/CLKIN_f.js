/* autogenerated from "macros/Sources/CLKIN_f.sci" */
function CLKIN_f() {
    CLKIN_f.prototype.define = function CLKIN_f() {
        this.prt = 1;
        this.model = scicos_model();
        this.model.sim = new ScilabString(["input"]);
        this.model.evtout = new ScilabDouble([1]);
        this.model.ipar = new ScilabDouble([this.prt]);
        this.model.blocktype = new ScilabString(["d"]);
        this.model.firing = new ScilabDouble([-1]);
        this.model.dep_ut = new ScilabBoolean([false,false]);
        var exprs = string(this.prt);
        this.x = new standard_define(new ScilabDouble([1,1]),this.model,new ScilabString([exprs])," ");
        return new BasicBlock(this.x);
    }
    CLKIN_f.prototype.details = function CLKIN_f() {
        return this.x;
    }
    CLKIN_f.prototype.get = function CLKIN_f() {
        var options = {
            prt:["Port number",this.prt],
        }
        return options;
    }
    CLKIN_f.prototype.set = function CLKIN_f() {
        var exprs = this.graphics.exprs;
        var exprs = exprs[1-1];
        while (true) {
            var ok = true;
            this.prt = parseFloat(arguments[0]["prt"]);
            var exprs = [arguments[0]["prt"]];
            this.prt = int(this.prt);
            if (!ok) {
                break;
            }
            if (this.prt<=0) {
                message("Port number must be a positive integer");
                throw "user error";
            } else {
                this.model.ipar = new ScilabDouble([this.prt]);
                this.model.evtout = new ScilabDouble([1]);
                this.model.firing = new ScilabDouble([-1]);
                this.graphics.exprs = new ScilabDouble([exprs]);
                this.x.graphics = this.graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
    CLKIN_f.prototype.get_popup_title = function CLKIN_f() {
        var set_param_popup_title = "Set Event Input block parameters";
        return set_param_popup_title;
    }
}
