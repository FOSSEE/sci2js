/* autogenerated from "macros/Sources/SampleCLK.sci" */
function SampleCLK() {
    SampleCLK.prototype.define = function SampleCLK() {
        this.model = scicos_model();
        this.model.sim = new ScilabString(["sampleclk"]);
        this.model.evtout = new ScilabDouble([1]);
        this.model.rpar = new ScilabDouble([1,0]);
        this.model.blocktype = new ScilabString(["d"]);
        this.model.firing = new ScilabDouble([-1]);
        this.model.dep_ut = new ScilabBoolean([false,false]);
        var exprs = [[sci2exp(1)],[sci2exp(0)]];
        this.x = new standard_define(new ScilabDouble([2,2]),this.model,new ScilabDouble(exprs)," ");
        return new BasicBlock(this.x);
    }
    SampleCLK.prototype.details = function SampleCLK() {
        return this.x;
    }
    SampleCLK.prototype.get = function SampleCLK() {
        var options = {
            frequ:["Sample time",this.frequ],
            offset:["Offset",this.offset],
        }
        return options;
    }
    SampleCLK.prototype.set = function SampleCLK() {
        var exprs = this.graphics.exprs;
        while (true) {
            var ok = true;
            this.frequ = arguments[0]["frequ"];
            this.offset = arguments[0]["offset"];
            var exprs = [arguments[0]["frequ"], arguments[0]["offset"]];
            if (!ok) {
                break;
            }
            if (this.frequ<0) {
                message("Frequency must be a positif number");
                throw "user error";
                var ok = false;
            }
            if (abs(this.offset)>this.frequ) {
                message("The |Offset| must be less than the Frequency");
                throw "user error";
                var ok = false;
            }
            if (ok) {
                if (or(this.model.rpar.slice()!=[[this.frequ],[this.offset]])) {
                    var needcompile = 4;
                    var y = needcompile;
                }
                this.model.rpar = new ScilabDouble([this.frequ],[this.offset]);
                this.model.evtout = new ScilabDouble([1]);
                this.model.firing = new ScilabDouble([-1]);
                this.graphics.exprs = new ScilabDouble([exprs]);
                this.x.graphics = this.graphics;
                this.x.model = this.model;
                break;
            }
        }
        needcompile = resume(needcompile)
        return new BasicBlock(this.x);
    }
    SampleCLK.prototype.get_popup_title = function SampleCLK() {
        var set_param_popup_title = "Set block parameters";
        return set_param_popup_title;
    }
}
