/* autogenerated from "macros/NonLinear/DLRADAPT_f.sci" */
function DLRADAPT_f() {
    DLRADAPT_f.prototype.define = function DLRADAPT_f() {
        this.p = [[0],[1]];
        this.rn = [];
        this.rd = [[math.complex(0.2,0.8),math.complex(0.2,-0.8)],[math.complex(0.3,0.7),math.complex(0.3,-0.7)]];
        this.g = [[1],[1]];
        this.last_u = [];
        this.last_y = [[0],[0]];
        this.model = scicos_model();
        this.model.sim = new ScilabString(["dlradp"]);
        this.model.in = new ScilabDouble([1],[1]);
        this.model.out = new ScilabDouble([1]);
        this.model.evtin = new ScilabDouble([1]);
        this.model.dstate = new ScilabDouble([this.last_u],[this.last_y]);
        this.model.rpar = new ScilabDouble([this.p.slice()],[real(this.rn.slice())],[imag(this.rn.slice())],[real(this.rd.slice())],[imag(this.rd.slice())],[this.g.slice()]);
        this.model.ipar = new ScilabDouble([0],[2],[2]);
        this.model.blocktype = new ScilabString(["d"]);
        this.model.firing = new ScilabDouble([]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        var exprs = [[sci2exp(this.p)],[sci2exp(this.rn)],[sci2exp(this.rd,0)],[sci2exp(this.g)],[sci2exp(this.last_u)],[sci2exp(this.last_y)]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DLRADAPT_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,2]),this.model,new ScilabDouble(exprs),gr_i);
        return new BasicBlock(this.x);
    }
    DLRADAPT_f.prototype.details = function DLRADAPT_f() {
        return this.x;
    }
    DLRADAPT_f.prototype.get = function DLRADAPT_f() {
        var exprs = this.graphics.exprs;
        this.set_param_popup_title = "Set block parameters";
        var options = {
            p:["Vector of p mesh points",this.p.toString().replace(/,/g," ")],
            rn:["Numerator roots (one line for each mesh)",this.rn],
            rd:["Denominator roots (one line for each mesh)",this.rd.toString().replace(/,/g," ")],
            g:["Vector of gain at mesh points",this.g.toString().replace(/,/g," ")],
            last_u:["past inputs (Num degree values)",this.last_u],
            last_y:["past outputs (Den degree values)",this.last_y.toString().replace(/,/g," ")],
        }
        return options;
    }
    DLRADAPT_f.prototype.set = function DLRADAPT_f() {
        var exprs = this.graphics.exprs;
        while (true) {
            var ok = true;
            this.p = inverse(arguments[0]["p"]);
            this.rn = inverse(arguments[0]["rn"]);
            this.rd = inverse(arguments[0]["rd"]);
            this.g = inverse(arguments[0]["g"]);
            this.last_u = inverse(arguments[0]["last_u"]);
            this.last_y = inverse(arguments[0]["last_y"]);
            var exprs = [arguments[0]["p"], arguments[0]["rn"], arguments[0]["rd"], arguments[0]["g"], arguments[0]["last_u"], arguments[0]["last_y"]];
            if (!ok) {
                break;
            }
            var m = size(this.rn,2);
            var tmpvar0 = size(this.rd);
            var npt = tmpvar0[0];
            var n = tmpvar0[1];
            if (m>=n) {
                message("Transfer must be strictly proper");
                throw "user error";
            } else if (size(this.rn,1)!=0&&size(this.rn,1)!=size(this.p,"*")) {
                message("Numerator roots matrix row size\'s is incorrect");
                throw "user error";
            } else {
                var rpar = [[this.p.slice()],[real(this.rn.slice())],[imag(this.rn.slice())],[real(this.rd.slice())],[imag(this.rd.slice())],[this.g.slice()]];
                var ipar = [[m],[n],[npt]];
                this.model.dstate = new ScilabDouble([this.last_u.slice()],[this.last_y.slice()]);
                this.model.rpar = new ScilabDouble(rpar);
                this.model.ipar = new ScilabDouble(ipar);
                this.graphics.exprs = new ScilabDouble([exprs]);
                this.x.graphics = this.graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
    DLRADAPT_f.prototype.get_popup_title = function DLRADAPT_f() {
        return this.set_param_popup_title;
    }
    DLRADAPT_f.prototype.importset = function DLRADAPT_f() {
        var graphics = this.x.graphics;
        var ary = getData(graphics.exprs);
        this.p = ary[0];
        this.rn = ary[1];
        this.rd = ary[2];
        this.g = ary[3];
        this.last_u = ary[4];
        this.last_y = ary[5];
    }
    DLRADAPT_f.prototype.getContainer = function DLRADAPT_f() { return new BasicBlock(this.x); }
}
