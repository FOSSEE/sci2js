/* autogenerated from "macros/Branching/RELAY_f.sci" */
function RELAY_f() {
    RELAY_f.prototype.define = function RELAY_f() {
        var i0 = 0;
        var in1 = [[-1],[-1]];
        this.nin = 2;
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["relay"]), new ScilabDouble([2]));
        this.model.in = new ScilabDouble(in1);
        this.model.out = new ScilabDouble([-1]);
        this.model.evtin = new ScilabDouble([ones(in1)]);
        this.model.dstate = new ScilabDouble([i0]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.firing = new ScilabDouble([]);
        this.model.dep_ut = new ScilabBoolean([true,true]);
        var exprs = [[string(this.nin)],[string(i0+1)]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"RELAY_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,2]),this.model,new ScilabDouble(exprs),gr_i);
        return new BasicBlock(this.x);
    }
    RELAY_f.prototype.details = function RELAY_f() {
        return this.x;
    }
    RELAY_f.prototype.get = function RELAY_f() {
        var exprs = this.graphics.exprs;
        var ipar = this.model.ipar;
        this.set_param_popup_title = "Set parameters";
        var options = {
            nin:["number of inputs",this.nin],
            z0:["initial connected input",this.z0],
        }
        return options;
    }
    RELAY_f.prototype.set = function RELAY_f() {
        var exprs = this.graphics.exprs;
        var ipar = this.model.ipar;
        while (true) {
            var ok = true;
            this.nin = parseFloat(arguments[0]["nin"]);
            this.z0 = arguments[0]["z0"];
            var exprs = [arguments[0]["nin"], arguments[0]["z0"]];
            if (!ok) {
                break;
            }
            if (this.z0>this.nin||this.z0<=0) {
                message("initial connected input is not a valid input port number");
                throw "user error";
            } else {
                var tmpvar0 = check_io(this.model,this.graphics,-ones(this.nin,1),-1,ones(this.nin,1),[]);
                this.model = tmpvar0[0];
                this.graphics = tmpvar0[1];
                var ok = tmpvar0[2];
                if (ok) {
                    this.graphics.exprs = new ScilabDouble([exprs]);
                    this.model.dstate = new ScilabString([this.z0-1]);
                    this.x.graphics = this.graphics;
                    this.x.model = this.model;
                    break;
                }
            }
        }
        return new BasicBlock(this.x);
    }
    RELAY_f.prototype.get_popup_title = function RELAY_f() {
        return this.set_param_popup_title;
    }
    RELAY_f.prototype.importset = function RELAY_f() {
        var graphics = this.x.graphics;
        var ary = getData(graphics.exprs);
        this.nin = ary[0];
        this.z0 = ary[1];
    }
    RELAY_f.prototype.getContainer = function RELAY_f() { return new BasicBlock(this.x); }
}
