/* autogenerated from "macros/Sources/CLKINV_f.sci" */
function CLKINV_f() {
    CLKINV_f.prototype.define = function CLKINV_f() {
        this.prt = 1;
        this.model = scicos_model();
        this.model.sim = new ScilabString(["input"]);
        this.model.evtout = new ScilabDouble([1]);
        this.model.ipar = new ScilabDouble([this.prt]);
        this.model.blocktype = new ScilabString(["d"]);
        this.model.firing = new ScilabDouble([-1]);
        this.model.dep_ut = new ScilabBoolean([false,false]);
        var exprs = string(this.prt);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CLKINV_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([1,1]),this.model,new ScilabString([exprs]),gr_i);
        return new EventInBlock(this.x);
    }
    CLKINV_f.prototype.details = function CLKINV_f() {
        return this.x;
    }
    CLKINV_f.prototype.get = function CLKINV_f() {
        var exprs = this.graphics.exprs;
        var exprs = exprs[1-1];
        this.set_param_popup_title = msprintf("Set %s block parameters","CLKINV_f");
        var options = {
            prt:["Port Number",this.prt],
        }
        return options;
    }
    CLKINV_f.prototype.set = function CLKINV_f() {
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
                block_parameter_error(msprintf("Wrong values for \'Port Number\' parameter: %d.",this.prt),"Strictly positive integer expected.");
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
        return new EventInBlock(this.x);
    }
    CLKINV_f.prototype.get_popup_title = function CLKINV_f() {
        return this.set_param_popup_title;
    }
    CLKINV_f.prototype.importset = function CLKINV_f() {
        var graphics = this.x.graphics;
        var ary = getData(graphics.exprs);
        this.prt = ary[0];
    }
    CLKINV_f.prototype.getContainer = function CLKINV_f() { return new EventInBlock(this.x); }
}
