/* autogenerated from "macros/MatrixOp/EXTRACT.sci" */
function EXTRACT() {
    EXTRACT.prototype.define = function EXTRACT() {
        this.model = scicos_model();
        var function_name = "extract";
        var funtyp = 4;
        this.model.sim = list(new ScilabString([function_name]), new ScilabDouble([funtyp]));
        this.model.in = new ScilabDouble([-1]);
        this.model.in2 = new ScilabDouble([-2]);
        this.model.intyp = new ScilabDouble([1]);
        this.model.out = new ScilabDouble([1]);
        this.model.out2 = new ScilabDouble([1]);
        this.model.outtyp = new ScilabDouble([1]);
        this.model.evtin = new ScilabDouble([]);
        this.model.evtout = new ScilabDouble([]);
        this.model.state = new ScilabDouble([]);
        this.model.dstate = new ScilabDouble([]);
        this.model.rpar = new ScilabDouble([]);
        this.model.ipar = new ScilabDouble([1,1,1,1]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.firing = new ScilabDouble([]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        var label = [[sci2exp(1)],[sci2exp([1])],[sci2exp([1])]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"EXTRACT\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3,2]),this.model,new ScilabDouble(label),gr_i);
        return new BasicBlock(this.x);
    }
    EXTRACT.prototype.details = function EXTRACT() {
        return this.x;
    }
    EXTRACT.prototype.get = function EXTRACT() {
        var options = {
            typ:["Datatype (1=real double  2=Complex)",this.typ],
            a:["Lines to extract",this.a],
            b:["Columns to extract",this.b],
        }
        return options;
    }
    EXTRACT.prototype.set = function EXTRACT() {
        var label = this.graphics.exprs;
        if (size(label,"*")==14) {
            label[9-1] = [];
        }
        while (true) {
            var ok = true;
            this.typ = inverse(arguments[0]["typ"]);
            this.a = inverse(arguments[0]["a"]);
            this.b = inverse(arguments[0]["b"]);
            this.a = this.a.slice();
            this.b = this.b.slice();
            if (!ok) {
                break;
            }
            if ((this.typ==1)) {
                var function_name = "extract";
                var ot = 1;
                var it = 1;
            } else if ((this.typ==2)) {
                var function_name = "extractz";
                var ot = 2;
                var it = 2;
            } else {
                message("Datatype is not supported");
                throw "user error";
                var ok = false;
            }
            var ma = size(this.a,1);
            var mb = size(this.b,1);
            if ((ma==0||mb==0)) {
                message("empty field");
                throw "user error";
                var ok = false;
            }
            for (i=1;i<=ma;i+=1) {
                if ((this.a[i-1]<=0)) {
                    message("invalid index");
                    throw "user error";
                    var ok = false;
                }
            }
            for (j=1;j<=mb;j+=1) {
                if ((this.b[j-1]<=0)) {
                    message("invalid index");
                    throw "user error";
                    var ok = false;
                }
            }
            this.model.ipar = new ScilabDouble([this.a],[this.b],[ma],[mb]);
            var in1 = [this.model.in,this.model.in2];
            var out = [ma,mb];
            var funtyp = 4;
            if (ok) {
                var label = exprs;
                var tmpvar0 = set_io(this.model,this.graphics,list(in1,it),list(out,ot),[],[]);
                this.model = tmpvar0[0];
                this.graphics = tmpvar0[1];
                var ok = tmpvar0[2];
                this.model.sim = list(new ScilabString([function_name]), new ScilabDouble([funtyp]));
                this.graphics.exprs = new ScilabDouble([label]);
                break;
            }
        }
        return new BasicBlock(this.x);
    }
}
