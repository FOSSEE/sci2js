/* autogenerated from "macros/Branching/SWITCH_f.sci" */
function SWITCH_f() {
    SWITCH_f.prototype.define = function SWITCH_f() {
        var i0 = 0;
        var in1 = [[-1],[-1]];
        this.nin = 2;
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["switchn"]), new ScilabDouble([2]));
        this.model.in = new ScilabDouble(in1);
        this.model.out = new ScilabDouble([-1]);
        this.model.ipar = new ScilabDouble([i0]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.firing = new ScilabDouble([]);
        this.model.dep_ut = new ScilabBoolean([true,true]);
        var exprs = [[string(this.nin)],[string(i0+1)]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SWITCH_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,2]),this.model,new ScilabDouble(exprs),gr_i);
        return new BasicBlock(this.x);
    }
    SWITCH_f.prototype.details = function SWITCH_f() {
        return this.x;
    }
    SWITCH_f.prototype.get = function SWITCH_f() {
        var options = {
            nin:["number of inputs",this.nin],
            z0:["connected input",this.z0],
        }
        return options;
    }
    SWITCH_f.prototype.set = function SWITCH_f() {
        var exprs = this.graphics.exprs;
        var ipar = this.model.ipar;
        while (true) {
            var ok = true;
            this.nin = parseFloat(arguments[0]["nin"]);
            this.z0 = arguments[0]["z0"];
            if (!ok) {
                break;
            }
            if (this.z0>this.nin||this.z0<=0) {
                message("initial connected input is not a valid input port number");
                throw "user error";
            } else {
                var tmpvar0 = check_io(this.model,this.graphics,-ones(this.nin,1),-1,[],[]);
                this.model = tmpvar0[0];
                this.graphics = tmpvar0[1];
                var ok = tmpvar0[2];
                if (ok) {
                    this.graphics.exprs = new ScilabDouble([exprs]);
                    this.model.ipar = new ScilabString([this.z0-1]);
                    this.x.graphics = this.graphics;
                    this.x.model = this.model;
                    break;
                }
            }
        }
        return new BasicBlock(this.x);
    }
}
