/* autogenerated from "macros/Sources/FROMWS_c.sci" */
function FROMWS_c() {
    FROMWS_c.prototype.define = function FROMWS_c() {
        this.varnam = "V";
        this.Method = 1;
        this.ZC = 1;
        this.OutEnd = 0;
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["fromws_c"]), new ScilabDouble([4]));
        this.model.out = new ScilabDouble([-1]);
        this.model.out2 = new ScilabDouble([-2]);
        this.model.outtyp = new ScilabDouble([-1]);
        this.model.ipar = new ScilabDouble([length(this.varnam)],[this._str2code[this.varnam-1]],[this.Method],[this.ZC],[this.OutEnd]);
        this.model.evtin = new ScilabDouble([1]);
        this.model.evtout = new ScilabDouble([1]);
        this.model.firing = new ScilabDouble([0]);
        this.model.blocktype = new ScilabString(["d"]);
        this.model.dep_ut = new ScilabBoolean([false,true]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"FROMWS_c\",sz(1),sz(2));"]);
        var exprs = [[string(this.varnam)],[string(this.Method)],[string(this.ZC)],[string(this.OutEnd)]];
        this.x = new standard_define(new ScilabDouble([3.5,2]),this.model,new ScilabDouble(exprs),gr_i);
        return new BasicBlock(this.x);
    }
    FROMWS_c.prototype.details = function FROMWS_c() {
        return this.x;
    }
    FROMWS_c.prototype.get = function FROMWS_c() {
        var options = {
            varnam:["Variable name",this.varnam],
            Method:["Interpolation Method",this.Method],
            ZC:["Enable zero crossing(0:No, 1:Yes)?",this.ZC],
            OutEnd:["Output at end(0:Zero, 1:Hold, 2:Repeat)",this.OutEnd],
        }
        return options;
    }
    FROMWS_c.prototype.set = function FROMWS_c() {
        var exprs = this.graphics.exprs;
        while (true) {
            var ok = true;
            this.varnam = arguments[0]["varnam"];
            this.Method = parseFloat(arguments[0]["Method"]);
            this.ZC = parseFloat(arguments[0]["ZC"]);
            this.OutEnd = parseFloat(arguments[0]["OutEnd"]);
            var exprs = [arguments[0]["varnam"], arguments[0]["Method"], arguments[0]["ZC"], arguments[0]["OutEnd"]];
            if (!ok) {
                break;
            }
            if (!(this.Method==0||this.Method==1||this.Method==2||this.Method==3)) {
                message("Interpolation method should be chosen in [0,1,2,3]");
                throw "user error";
                var ok = false;
            }
            if (!(this.ZC==0||this.ZC==1)) {
                message("Zero crossing should be either 0 or 1");
                throw "user error";
                var ok = false;
            }
            if (!(this.OutEnd==0||this.OutEnd==1||this.OutEnd==2)) {
                message("Output at end option should be either 0 or 1");
                throw "user error";
                var ok = false;
            }
            var r = false;
            var ierr = execstr("r=validvar(varnam)","errcatch");
            if (!r) {
                message([["Invalid variable name."],["Please choose another variable name."]]);
                throw "user error";
                var ok = false;
            }
            if (ok) {
                this.model.ipar = new ScilabDouble([length(this.varnam)],[this._str2code[this.varnam-1]],[this.Method],[this.ZC],[this.OutEnd]);
                var tmpvar0 = set_io(this.model,this.graphics,list(),list([-1,-2],-1),1,1);
                this.model = tmpvar0[0];
                this.graphics = tmpvar0[1];
                var ok = tmpvar0[2];
                if (ok) {
                    this.graphics.exprs = new ScilabDouble([exprs]);
                    this.x.graphics = this.graphics;
                    this.x.model = this.model;
                    break;
                }
            }
        }
        return new BasicBlock(this.x);
    }
    FROMWS_c.prototype.get_popup_title = function FROMWS_c() {
        var set_param_popup_title = "Set From_Workspace block parameters";
        return set_param_popup_title;
    }
}
