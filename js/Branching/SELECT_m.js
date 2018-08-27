/* autogenerated from "macros/Branching/SELECT_m.sci" */
function SELECT_m() {
    SELECT_m.prototype.define = function SELECT_m() {
        this.z0 = 1;
        this.nin = 2;
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["selector_m"]), new ScilabDouble([4]));
        this.model.in = new ScilabDouble([-1],[-1]);
        this.model.in2 = new ScilabDouble([-2],[-2]);
        this.model.intyp = new ScilabDouble([1]);
        this.model.out = new ScilabDouble([-1]);
        this.model.out2 = new ScilabDouble([-2]);
        this.model.outtyp = new ScilabDouble([1]);
        this.model.evtout = new ScilabDouble([]);
        this.model.state = new ScilabDouble([]);
        this.model.rpar = new ScilabDouble([]);
        this.model.ipar = new ScilabDouble([]);
        this.model.firing = new ScilabDouble([]);
        this.model.evtin = new ScilabDouble([ones(this.nin,1)]);
        this.model.dstate = new ScilabDouble([this.z0]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        var exprs = [[sci2exp(1)],[sci2exp(this.nin)],[sci2exp(this.z0)]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SELECT_m\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3,2]),this.model,new ScilabDouble(exprs),gr_i);
        return new BasicBlock(this.x);
    }
    SELECT_m.prototype.details = function SELECT_m() {
        return this.x;
    }
    SELECT_m.prototype.get = function SELECT_m() {
        var options = {
            typ:["Datatype(1= real double  2=Complex 3=int32 ..)",this.typ],
            nin:["number of inputs",this.nin],
            z0:["initial connected input",this.z0],
        }
        return options;
    }
    SELECT_m.prototype.set = function SELECT_m() {
        var exprs = this.graphics.exprs;
        while (true) {
            var ok = true;
            this.typ = inverse(arguments[0]["typ"]);
            this.nin = parseFloat(arguments[0]["nin"]);
            this.z0 = parseFloat(arguments[0]["z0"]);
            var exprs = [arguments[0]["typ"], arguments[0]["nin"], arguments[0]["z0"]];
            if (!ok) {
                break;
            }
            if (this.z0>this.nin||this.z0<=0) {
                message("initial connected input is not a valid input port number");
                throw "user error";
            } else if (((this.typ<1)||(this.typ>8))&&(this.typ!=-1)) {
                message("Datatype is not supported");
                throw "user error";
                var ok = false;
            } else {
                var it = this.typ*ones(1,this.nin);
                var ot = this.typ;
                if (ok) {
                    var in1 = [-ones(this.nin,1),-2*ones(this.nin,1)];
                    var out = [-1,-2];
                    var tmpvar0 = set_io(this.model,this.graphics,list(in1,it),list(out,ot),ones(this.nin,1),[]);
                    this.model = tmpvar0[0];
                    this.graphics = tmpvar0[1];
                    var ok = tmpvar0[2];
                    if (ok) {
                        this.graphics.exprs = new ScilabDouble([exprs]);
                        this.model.dstate = new ScilabDouble([this.z0]);
                        this.x.graphics = this.graphics;
                        this.x.model = this.model;
                        break;
                    }
                }
            }
        }
        return new BasicBlock(this.x);
    }
    SELECT_m.prototype.get_popup_title = function SELECT_m() {
        var set_param_popup_title = "Set parameters";
        return set_param_popup_title;
    }
}
