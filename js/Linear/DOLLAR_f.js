/* autogenerated from "macros/Linear/DOLLAR_f.sci" */
function DOLLAR_f() {
    DOLLAR_f.prototype.define = function DOLLAR_f() {
        var z = 0;
        this.inh = 0;
        var in1 = 1;
        var exprs = string([[z],[this.inh]]);
        this.model = scicos_model();
        this.model.sim = new ScilabString(["dollar"]);
        this.model.in = new ScilabDouble([in1]);
        this.model.out = new ScilabDouble([in1]);
        this.model.evtin = new ScilabDouble([1-this.inh]);
        this.model.dstate = new ScilabDouble([z]);
        this.model.blocktype = new ScilabString(["d"]);
        this.model.dep_ut = new ScilabBoolean([false,false]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DOLLAR_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,2]),this.model,new ScilabString([exprs]),gr_i);
        return new BasicBlock(this.x);
    }
    DOLLAR_f.prototype.details = function DOLLAR_f() {
        return this.x;
    }
    DOLLAR_f.prototype.get = function DOLLAR_f() {
        var options = {
            a:["initial condition",this.a],
            inh:["Inherit (no:0, yes:1)",this.inh],
        }
        return options;
    }
    DOLLAR_f.prototype.set = function DOLLAR_f() {
        var exprs = this.graphics.exprs;
        if (size(exprs,"*")<2) {
            exprs[2-1] = "0";
        }
        while (true) {
            var ok = true;
            this.a = arguments[0]["a"];
            this.inh = parseFloat(arguments[0]["inh"]);
            var exprs = [arguments[0]["a"], arguments[0]["inh"]];
            if (!ok) {
                break;
            }
            var out = size(this.a,"*");
            if (out==0) {
                var out = [];
            }
            var in1 = out;
            if (ok) {
                var tmpvar0 = check_io(this.model,this.graphics,-1,-1,ones(1-this.inh,1),[]);
                this.model = tmpvar0[0];
                this.graphics = tmpvar0[1];
                var ok = tmpvar0[2];
            }
            if (ok) {
                this.graphics.exprs = new ScilabDouble([exprs]);
                this.model.dstate = new ScilabDouble([this.a]);
                this.model.in = new ScilabDouble(in1);
                this.model.out = new ScilabDouble(out);
                this.x.graphics = this.graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
    DOLLAR_f.prototype.get_popup_title = function DOLLAR_f() {
        var set_param_popup_title = "Set 1/z block parameters";
        return set_param_popup_title;
    }
}
