/* autogenerated from "macros/MatrixOp/MATCATV.sci" */
function MATCATV() {
    MATCATV.prototype.define = function MATCATV() {
        var l1 = [[2],[2]];
        this.model = scicos_model();
        var function_name = "mat_catv";
        var funtyp = 4;
        this.model.sim = list(new ScilabString([function_name]), new ScilabDouble([funtyp]));
        this.model.in2 = new ScilabDouble([-1],[-1]);
        this.model.in = new ScilabDouble([-2],[-3]);
        this.model.intyp = new ScilabDouble([-1,-1]);
        this.model.out = new ScilabDouble([0]);
        this.model.out2 = new ScilabDouble([-1]);
        this.model.outtyp = new ScilabDouble([-1]);
        this.model.evtin = new ScilabDouble([]);
        this.model.evtout = new ScilabDouble([]);
        this.model.state = new ScilabDouble([]);
        this.model.dstate = new ScilabDouble([]);
        this.model.rpar = new ScilabDouble([]);
        this.model.ipar = new ScilabDouble([]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.firing = new ScilabDouble([]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        var label = [sci2exp(2)];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATCATV\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,3]),this.model,new ScilabString(label),gr_i);
        return new BasicBlock(this.x);
    }
    MATCATV.prototype.details = function MATCATV() {
        return this.x;
    }
    MATCATV.prototype.get = function MATCATV() {
        var options = {
            nin:["Number od inputs",this.nin],
        }
        return options;
    }
    MATCATV.prototype.set = function MATCATV() {
        var label = this.graphics.exprs;
        if (size(label,"*")>1) {
            var label = "size(evstr("+label[2-1]+"),\'*\')";
        }
        while (true) {
            var ok = true;
            this.nin = arguments[0]["nin"];
            this.lab = arguments[0]["lab"];
            if (!ok) {
                break;
            }
            var label = this.lab;
            var in1 = [-(transpose([2:this.nin+1])),-ones(this.nin,1)];
            var it = -ones(this.nin,1);
            var ot = -1;
            var out = [0,-1];
            var tmpvar0 = set_io(this.model,this.graphics,list(in1,it),list(out,ot),[],[]);
            this.model = tmpvar0[0];
            this.graphics = tmpvar0[1];
            var ok = tmpvar0[2];
            if (ok) {
                var funtyp = 4;
                this.model.sim = list(new ScilabString(["mat_catv"]), new ScilabDouble([funtyp]));
                this.graphics.exprs = new ScilabDouble([label]);
                break;
            }
        }
        return new BasicBlock(this.x);
    }
    MATCATV.prototype.get_popup_title = function MATCATV() {
        var set_param_popup_title = "Set MATCATV block parameters";
        return set_param_popup_title;
    }
}
