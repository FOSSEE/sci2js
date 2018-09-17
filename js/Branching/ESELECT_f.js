/* autogenerated from "macros/Branching/ESELECT_f.sci" */
function ESELECT_f() {
    ESELECT_f.prototype.define = function ESELECT_f() {
        this.out = 2;
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["eselect"]), new ScilabDouble([-2]));
        this.model.in = new ScilabDouble([1]);
        this.model.in2 = new ScilabDouble([1]);
        this.model.intyp = new ScilabDouble([-1]);
        this.model.evtin = new ScilabDouble([1]);
        this.model.evtout = new ScilabDouble([ones(this.out,1)]);
        this.model.blocktype = new ScilabString(["l"]);
        this.model.firing = new ScilabDouble([-ones(this.out,1)]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        this.model.nmode = new ScilabDouble([0]);
        this.model.nzcross = new ScilabDouble([0]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"ESELECT_f\",sz(1),sz(2));"]);
        var exprs = [[string(this.out)],[string(1)],[string(this.model.nmode)]];
        this.x = new standard_define(new ScilabDouble([4,2]),this.model,new ScilabDouble(exprs),gr_i);
        return new BasicBlock(this.x);
    }
    ESELECT_f.prototype.details = function ESELECT_f() {
        return this.x;
    }
    ESELECT_f.prototype.get = function ESELECT_f() {
        var exprs = this.graphics.exprs;
        if (size(exprs,"*")==1) {
            exprs[2-1] = string(1);
        }
        if (size(exprs,"*")==2) {
            exprs[3-1] = string(0);
        }
        this.set_param_popup_title = "Set ESELECT block parameters";
        var options = {
            out:["number of output event ports",this.out],
            inh:["Inherit (1: no, 0: yes)",this.inh],
            nmod:["zero-crossing (0: no, 1: yes)",this.nmod],
        }
        return options;
    }
    ESELECT_f.prototype.set = function ESELECT_f() {
        var exprs = this.graphics.exprs;
        if (size(exprs,"*")==1) {
            exprs[2-1] = string(1);
        }
        if (size(exprs,"*")==2) {
            exprs[3-1] = string(0);
        }
        while (true) {
            var ok = true;
            this.out = parseFloat(arguments[0]["out"]);
            this.inh = parseFloat(arguments[0]["inh"]);
            this.nmod = parseFloat(arguments[0]["nmod"]);
            var exprs = [arguments[0]["out"], arguments[0]["inh"], arguments[0]["nmod"]];
            if (!ok) {
                break;
            }
            if (this.nmod!=0) {
                this.nmod = 1;
            }
            if (this.inh==0) {
                this.inh = [];
            } else {
                this.inh = 1;
            }
            this.out = int(this.out);
            if (this.out<2) {
                message("Block must have at least two output ports");
                throw "user error";
            } else {
                var tmpvar0 = check_io(this.model,this.graphics,1,[],this.inh,[ones(this.out,1)]);
                this.model = tmpvar0[0];
                this.graphics = tmpvar0[1];
                var ok = tmpvar0[2];
                if (ok) {
                    this.graphics.exprs = new ScilabDouble([exprs]);
                    this.model.evtout = new ScilabDouble([ones(this.out,1)]);
                    this.model.firing = new ScilabDouble([-ones(this.out,1)]);
                    this.x.graphics = this.graphics;
                    this.model.nmode = new ScilabDouble([this.nmod]);
                    this.model.nzcross = new ScilabDouble([this.nmod]);
                    this.x.model = this.model;
                    break;
                }
            }
        }
        return new BasicBlock(this.x);
    }
    ESELECT_f.prototype.get_popup_title = function ESELECT_f() {
        return this.set_param_popup_title;
    }
    ESELECT_f.prototype.importset = function ESELECT_f() {
        var graphics = this.x.graphics;
        var ary = getData(graphics.exprs);
        this.out = ary[0];
        this.inh = ary[1];
        this.nmod = ary[2];
    }
    ESELECT_f.prototype.getContainer = function ESELECT_f() { return new BasicBlock(this.x); }
}
