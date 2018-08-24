/* autogenerated from "macros/Sinks/WRITEAU_f.sci" */
function WRITEAU_f() {
    WRITEAU_f.prototype.define = function WRITEAU_f() {
        var in1 = 1;
        var nin = sum(in1);
        var frmt = "uc ";
        var fname = "/dev/audio";
        this.swap = 0;
        var lunit = 0;
        this.N = 2;
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["writeau"]), new ScilabDouble([2]));
        this.model.in = new ScilabDouble([in1]);
        this.model.evtin = new ScilabDouble([1]);
        this.model.dstate = new ScilabDouble([-1],[lunit],[zeros((nin+1)*this.N,1)]);
        this.model.ipar = new ScilabDouble([length(fname)],[this._str2code[frmt-1]],[this.N],[this.swap],[this._str2code[fname-1]]);
        this.model.blocktype = new ScilabString(["d"]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        var exprs = [string(this.N),string(this.swap)];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"WRITEAU_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4,2]),this.model,new ScilabString(exprs),gr_i);
        return new BasicBlock(this.x);
    }
    WRITEAU_f.prototype.details = function WRITEAU_f() {
        return this.x;
    }
    WRITEAU_f.prototype.get = function WRITEAU_f() {
        var options = {
            N:["Buffer Size",this.N],
            swap:["Swap Mode (0:No, 1:Yes)",this.swap],
        }
        return options;
    }
    WRITEAU_f.prototype.set = function WRITEAU_f() {
        var exprs = this.graphics.exprs;
        var ipar = this.model.ipar;
        var dstate = this.model.dstate;
        var lunit = dstate[2-1];
        while (true) {
            var ok = true;
            this.N = parseFloat(arguments[0]["N"]);
            this.swap = parseFloat(arguments[0]["swap"]);
            if (!ok) {
                break;
            }
            var nin = 1;
            var fname1 = "/dev/audio";
            var frmt1 = "uc ";
            if (this.alreadyran&&(this.N!=ipar[5-1])) {
                block_parameter_error(msprintf("You cannot modify \'%s\' when running.","Buffer Size"),"End current simulation first");
                var ok = false;
            } else if (this.N<1) {
                block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %d.","Buffer Size",this.N),"Strictly positive integer expected.");
                var ok = false;
            }
            if (this.swap!=0&&this.swap!=1) {
                block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %d.","Swap Mode",this.swap),msprintf("Must be in the interval %s.","[0, 1]"));
                var ok = false;
            }
            if (ok) {
                var ipar = [[length(fname1)],[this._str2code[frmt1-1]],[this.N],[this.swap],[this._str2code[fname1-1]]];
                if (prod(size(dstate))!=(nin+1)*this.N+2) {
                    var dstate = [[-1],[lunit],[zeros((nin+1)*this.N,1)]];
                }
                this.model.in = new ScilabDouble([1]);
                this.model.dstate = new ScilabDouble(dstate);
                this.model.ipar = new ScilabDouble(ipar);
                this.graphics.exprs = new ScilabDouble([exprs]);
                this.x.graphics = this.graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
    WRITEAU_f.prototype.get_popup_title = function WRITEAU_f() {
        var set_param_popup_title = msprintf("Set %s block parameters","WRITEAU_f");
        return set_param_popup_title;
    }
}
