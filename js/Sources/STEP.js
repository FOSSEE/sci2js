/* autogenerated from "macros/Sources/STEP.sci" */
function STEP() {
    STEP.prototype.define = function STEP() {
        var rpar = [[0],[1]];
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["step_func"]), new ScilabDouble([4]));
        this.model.evtin = new ScilabDouble([1]);
        this.model.evtout = new ScilabDouble([1]);
        this.model.out = new ScilabDouble([1]);
        this.model.out2 = new ScilabDouble([1]);
        this.model.outtyp = new ScilabDouble([1]);
        this.model.firing = new ScilabDouble([1]);
        this.model.rpar = new ScilabDouble(rpar);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabDouble([false,false]);
        this.exprs = [[string(1)],[string(rpar)]];
        this.gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"STEP\",sz(1),sz(2));"]);
        this.x = standard_define([2,2],this.model,this.exprs,this.gr_i);
        return new BasicBlock(this.x);
    }
    STEP.prototype.details = function STEP() {
        return this.x;
    }
    STEP.prototype.get = function STEP() {
        var options = {
            temps:["Step Time",this.temps],
            in1:["Initial Value",this.in1],
            fi:["Final Value",this.fi],
        }
        return options;
    }
    STEP.prototype.set = function STEP() {
        this.temps = arguments[0]["temps"]
        this.in1 = arguments[0]["in1"]
        this.fi = arguments[0]["fi"]
        this.exprs = arguments[0]["exprs"]
        this.x = arg1;
        this.graphics = arg1.graphics;
        this.exprs = this.graphics.exprs;
        this.model = arg1.model;
        while (true) {
            [ok,this.temps,this.in1,this.fi,this.exprs] = scicos_getvalue([[msprintf("Set %s block parameters","STEP_FUNCTION")],[" "],["Step Function"],[" "]],["Step Time","Initial Value","Final Value"],list("vec",1,"vec",-1,"vec",-1),this.exprs);
            if (!ok) {
                break;
            }
            this.in1 = this.in1.slice();
            this.fi = this.fi.slice();
            if (size(this.in1,"*")!=size(this.fi,"*")) {
                if (size(this.in1,"*")==1) {
                    this.in1 = this.in1*ones(this.fi);
                } else if (size(this.fi,"*")==1) {
                    this.fi = this.fi*ones(this.in1);
                } else {
                    block_parameter_error(msprintf("\'Initial Value\' and \'Final Value\': incompatible sizes: %d and %d.",size(this.in1,"*"),size(this.fi,"*")),"Same sizes expected.");
                    var ok = false;
                }
            }
            if (ok) {
                this.model.out2 = new ScilabDouble([1]);
                this.model.outtyp = new ScilabDouble([1]);
                var tmpvar0 = check_io(this.model,this.graphics,[],size(this.fi,"*"),1,1);
                this.model = tmpvar0[0];
                this.graphics = tmpvar0[1];
                var ok = tmpvar0[2];
            }
            if (ok) {
                this.model.firing = new ScilabDouble([this.temps]);
                if (this.temps==0) {
                    var rpar = [[this.fi],[this.fi]];
                } else {
                    var rpar = [[this.in1],[this.fi]];
                }
                this.model.rpar = new ScilabDouble(rpar);
                this.graphics.exprs = new ScilabDouble([this.exprs]);
                this.x.graphics = this.graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
}
