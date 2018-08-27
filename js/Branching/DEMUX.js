/* autogenerated from "macros/Branching/DEMUX.sci" */
function DEMUX() {
    DEMUX.prototype.define = function DEMUX() {
        this.out = 2;
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["multiplex"]), new ScilabDouble([4]));
        this.model.in = new ScilabDouble([0]);
        this.model.out = new ScilabDouble(-transpose([1:this.out]));
        this.model.ipar = new ScilabDouble([this.out]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.firing = new ScilabDouble([]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        var exprs = string(this.out);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DEMUX\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([.5,2]),this.model,new ScilabString([exprs]),gr_i);
        return new BasicBlock(this.x);
    }
    DEMUX.prototype.details = function DEMUX() {
        return this.x;
    }
    DEMUX.prototype.get = function DEMUX() {
        var options = {
            out:["number of output ports or vector of sizes",this.out],
        }
        return options;
    }
    DEMUX.prototype.set = function DEMUX() {
        var exprs = this.graphics.exprs;
        while (true) {
            var ok = true;
            this.out = parseFloat(arguments[0]["out"]);
            var exprs = [arguments[0]["out"]];
            if (!ok) {
                break;
            }
            if (size(this.out,"*")==1) {
                if (this.out<2||this.out>31) {
                    message("Block must have at least 2 and at most 31 output ports");
                    throw "user error";
                    var ok = false;
                } else {
                    var tmpvar0 = check_io(this.model,this.graphics,0,-transpose([1:this.out]),[],[]);
                    this.model = tmpvar0[0];
                    this.graphics = tmpvar0[1];
                    var ok = tmpvar0[2];
                }
            } else {
                if (size(this.out,"*")<2||or(this.out==0)||size(this.out,"*")>31) {
                    message([["Block must have at least 2 and at most 31 output ports"],["size 0 is not allowed"]]);
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
    DEMUX.prototype.get_popup_title = function DEMUX() {
        var set_param_popup_title = "Set DEMUX block parameters";
        return set_param_popup_title;
    }
}
