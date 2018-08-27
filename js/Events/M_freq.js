/* autogenerated from "macros/Events/M_freq.sci" */
function M_freq() {
    M_freq.prototype.define = function M_freq() {
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["m_frequ"]), new ScilabDouble([4]));
        this.model.evtout = new ScilabDouble([1],[1],[1]);
        this.model.evtin = new ScilabDouble([1]);
        this.model.rpar = new ScilabDouble([]);
        this.model.opar = list([[1,1,0],[1,1,1],[1,3,2]], new ScilabDouble([1]), new ScilabDouble([0]), new ScilabDouble([0]));
        this.model.blocktype = new ScilabString(["d"]);
        this.model.firing = new ScilabDouble([0,-1,-1]);
        this.model.dep_ut = new ScilabBoolean([false,false]);
        var exprs = [[sci2exp([[1],[2]])],[sci2exp([[0],[0]])]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"M_freq\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3,2]),this.model,new ScilabDouble(exprs),gr_i);
        return new BasicBlock(this.x);
    }
    M_freq.prototype.details = function M_freq() {
        return this.x;
    }
    M_freq.prototype.get = function M_freq() {
        var options = {
            frequ:["Sample time",this.frequ],
            offset:["Offset",this.offset],
        }
        return options;
    }
    M_freq.prototype.set = function M_freq() {
        var exprs = this.graphics.exprs;
        while (true) {
            var ok = true;
            this.frequ = inverse(arguments[0]["frequ"]);
            this.offset = inverse(arguments[0]["offset"]);
            var exprs = [arguments[0]["frequ"], arguments[0]["offset"]];
            if (!ok) {
                break;
            }
            this.offset = this.offset.slice();
            this.frequ = this.frequ.slice();
            if ((size(this.frequ,"*"))!=(size(this.offset,"*"))) {
                message("offset and frequency must have the same size");
                throw "user error";
                var ok = false;
            } else if (or(this.frequ<0)) {
                message("Frequency must be a positif number");
                throw "user error";
                var ok = false;
            } else if (or(abs(this.offset)>this.frequ)) {
                message("The |Offset| must be less than the Frequency");
                throw "user error";
                var ok = false;
            }
            if (ok) {
                var tmpvar0 = mfrequ_clk(this.frequ,this.offset);
                var m = tmpvar0[0];
                var den = tmpvar0[1];
                var off = tmpvar0[2];
                var count = tmpvar0[3];
                var m1 = tmpvar0[4];
                var fir = tmpvar0[5];
                this.frequ = tmpvar0[6];
                this.offset = tmpvar0[7];
                var ok = tmpvar0[8];
            }
            if (ok) {
                this.model.opar = list(m, new ScilabDouble([double(den)]), new ScilabDouble([off]), new ScilabDouble([count]));
                var mn = (2^size(m1,"*"))-1;
                var tmpvar1 = set_io(this.model,this.graphics,list(),list(),1,ones(mn,1));
                this.model = tmpvar1[0];
                this.graphics = tmpvar1[1];
                var ok = tmpvar1[2];
                if (mn>3) {
                    this.graphics.sz = new ScilabDouble([40+(mn-3)*10,40]);
                } else {
                    this.graphics.sz = new ScilabDouble([50,40]);
                }
                this.model.firing = new ScilabDouble([fir]);
                this.graphics.exprs = new ScilabDouble([exprs]);
                this.x.graphics = this.graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
    M_freq.prototype.get_popup_title = function M_freq() {
        var set_param_popup_title = "Set block parameters";
        return set_param_popup_title;
    }
}
