/* autogenerated from "macros/Misc/HYSTHERESIS.sci" */
function HYSTHERESIS() {
    HYSTHERESIS.prototype.define = function HYSTHERESIS() {
        var in1 = 1;
        var ipar = [0];
        this.nzz = 2;
        var rpar = [[1],[0],[1],[0]];
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["hystheresis"]), new ScilabDouble([4]));
        this.model.in = new ScilabDouble([in1]);
        this.model.out = new ScilabDouble([1]);
        this.model.rpar = new ScilabDouble(rpar);
        this.model.nzcross = new ScilabDouble([this.nzz]);
        this.model.nmode = new ScilabDouble([1]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        var exprs = [[string(rpar)],[string(sign(this.nzz))]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"HYSTHERESIS\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,2]),this.model,new ScilabDouble(exprs),gr_i);
        return new BasicBlock(this.x);
    }
    HYSTHERESIS.prototype.details = function HYSTHERESIS() {
        return this.x;
    }
    HYSTHERESIS.prototype.get = function HYSTHERESIS() {
        var options = {
            high_lim:["switch on at",this.high_lim],
            low_lim:["switch off at",this.low_lim],
            out_high:["output when on",this.out_high],
            out_low:["output when off",this.out_low],
            nzz:["use zero crossing: yes (1), no (0)",this.nzz],
        }
        return options;
    }
    HYSTHERESIS.prototype.set = function HYSTHERESIS() {
        var exprs = this.graphics.exprs;
        while (true) {
            var ok = true;
            this.high_lim = arguments[0]["high_lim"];
            this.low_lim = arguments[0]["low_lim"];
            this.out_high = arguments[0]["out_high"];
            this.out_low = arguments[0]["out_low"];
            this.nzz = parseFloat(arguments[0]["nzz"]);
            if (!ok) {
                break;
            }
            if (this.low_lim>this.high_lim) {
                message("switch on value must be larger than switch off value");
                throw "user error";
            } else {
                this.graphics.exprs = new ScilabDouble([exprs]);
                this.model.rpar = new ScilabDouble(transpose([this.high_lim,this.low_lim,this.out_high,this.out_low]));
                if (this.nzz>0) {
                    this.nzz = 2;
                }
                this.model.nzcross = new ScilabDouble([this.nzz]);
                this.x.graphics = this.graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
}
