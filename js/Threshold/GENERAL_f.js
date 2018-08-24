/* autogenerated from "macros/Threshold/GENERAL_f.sci" */
function GENERAL_f() {
    GENERAL_f.prototype.define = function GENERAL_f() {
        var rpar = [[0],[0],[0],[0]];
        this.in1 = 1;
        this.out = 1;
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["zcross"]), new ScilabDouble([1]));
        this.model.nzcross = new ScilabDouble([this.in1]);
        this.model.in = new ScilabDouble([this.in1]);
        this.model.evtout = new ScilabDouble([ones(this.out,1)]);
        this.model.rpar = new ScilabDouble([0],[0],[0],[0]);
        this.model.blocktype = new ScilabString(["z"]);
        this.model.firing = new ScilabDouble([-ones(this.out,1)]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        var exprs = [[strcat(sci2exp(this.in1))],[strcat(sci2exp(this.out))]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"GENERAL_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3,2]),this.model,new ScilabDouble(exprs),gr_i);
        return new BasicBlock(this.x);
    }
    GENERAL_f.prototype.details = function GENERAL_f() {
        return this.x;
    }
    GENERAL_f.prototype.get = function GENERAL_f() {
        var options = {
        in1:["Input size",this.in1],
        out:["Number of event output",this.out],
        }
        return options;
    }
    GENERAL_f.prototype.set = function GENERAL_f() {
        var exprs = this.graphics.exprs;
        var rpar = this.model.rpar;
        this.in1 = this.model.in;
        this.out = this.model.evtout;
        var nin = sum(this.in1);
        var nout = sum(this.out);
        var ok = true;
        this.in1 = parseFloat(arguments[0]["in1"]);
        this.out = parseFloat(arguments[0]["out"]);
        if (ok) {
            var tmpvar0 = check_io(this.model,this.graphics,this.in1,[],[],ones(this.out,1));
            this.model = tmpvar0[0];
            this.graphics = tmpvar0[1];
            var ok = tmpvar0[2];
            if (ok) {
                var nout1 = this.out;
                var nin1 = this.in1;
                if (nout==nout1&&nin==nin1) {
                    var rp = matrix(rpar,nout,2^(2*nin));
                } else {
                    var rp = -1*ones(nout1,2^(2*nin1));
                }
                var n = size(rp,2)/2;
                var result = x_mdialog("routing matrix",string(1,nout1),string(1,2^(2*nin1)),string(rp.slice().slice()));
                if (result.length!=0) {
                    rp.slice(1-1,nout1).slice(1-1,2*n) = evstr(result);
                    this.model.nzcross = new ScilabDouble([this.in1]);
                    this.model.rpar = new ScilabDouble(rp.slice());
                    this.model.firing = new ScilabDouble([-ones(this.out,1)]);
                    this.graphics.exprs = new ScilabDouble([exprs]);
                    this.x.graphics = this.graphics;
                    this.x.model = this.model;
                }
            }
        }
        return new BasicBlock(this.x);
    }
    GENERAL_f.prototype.get_popup_title = function GENERAL_f() {
        var set_param_popup_title = "Set General Zero-Crossing parameters";
        return set_param_popup_title;
    }
}
