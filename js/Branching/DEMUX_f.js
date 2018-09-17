/* autogenerated from "macros/Branching/DEMUX_f.sci" */
function DEMUX_f() {
    DEMUX_f.prototype.define = function DEMUX_f() {
        this.out = 2;
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["demux"]), new ScilabDouble([1]));
        this.model.in = new ScilabDouble([0]);
        this.model.out = new ScilabDouble(-transpose([1:this.out]));
        this.model.ipar = new ScilabDouble([this.out]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.firing = new ScilabDouble([]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        var exprs = string(this.out);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DEMUX_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([.5,2]),this.model,new ScilabString([exprs]),gr_i);
        return new BasicBlock(this.x);
    }
    DEMUX_f.prototype.details = function DEMUX_f() {
        return this.x;
    }
    DEMUX_f.prototype.get = function DEMUX_f() {
        var exprs = this.graphics.exprs;
        this.set_param_popup_title = "Set DEMUX block parameters";
        var options = {
            out:["number of output ports or vector of sizes",this.out],
        }
        return options;
    }
    DEMUX_f.prototype.set = function DEMUX_f() {
        var exprs = this.graphics.exprs;
        while (true) {
            var ok = true;
            this.out = parseFloat(arguments[0]["out"]);
            var exprs = [arguments[0]["out"]];
            if (!ok) {
                break;
            }
            if (size(this.out,"*")==1) {
                if (this.out<2||this.out>8) {
                    message("Block must have at least 2 and at most 8 output ports");
                    throw "user error";
                    var ok = false;
                } else {
                    var tmpvar0 = check_io(this.model,this.graphics,0,-transpose([1:this.out]),[],[]);
                    this.model = tmpvar0[0];
                    this.graphics = tmpvar0[1];
                    var ok = tmpvar0[2];
                }
            } else {
                if (size(this.out,"*")<2||size(this.out,"*")>8||or(this.out==0)) {
                    message([["Block must have at least 2 and at most 8 output ports"],["and size 0 is not allowed"]]);
                    throw "user error";
                    var ok = false;
                } else {
                    if (min(this.out)<0) {
                        var nin = 0;
                    } else {
                        var nin = sum(this.out);
                    }
                    var tmpvar1 = check_io(this.model,this.graphics,nin,this.out.slice(),[],[]);
                    this.model = tmpvar1[0];
                    this.graphics = tmpvar1[1];
                    var ok = tmpvar1[2];
                    if (ok) {
                        this.out = size(this.out,"*");
                    }
                }
            }
            if (ok) {
                this.graphics.exprs = new ScilabDouble([exprs]);
                this.model.ipar = new ScilabDouble([this.out]);
                this.x.graphics = this.graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
    DEMUX_f.prototype.get_popup_title = function DEMUX_f() {
        return this.set_param_popup_title;
    }
    DEMUX_f.prototype.importset = function DEMUX_f() {
        var graphics = this.x.graphics;
        var ary = getData(graphics.exprs);
        this.out = ary[0];
    }
    DEMUX_f.prototype.getContainer = function DEMUX_f() { return new BasicBlock(this.x); }
}
