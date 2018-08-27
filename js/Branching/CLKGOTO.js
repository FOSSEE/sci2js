/* autogenerated from "macros/Branching/CLKGOTO.sci" */
function CLKGOTO() {
    CLKGOTO.prototype.define = function CLKGOTO() {
        this.model = scicos_model();
        this.model.sim = new ScilabString(["clkgoto"]);
        this.model.evtin = new ScilabDouble([1]);
        this.model.opar = list(new ScilabString(["A"]));
        this.model.ipar = new ScilabDouble([int(1)]);
        this.model.blocktype = new ScilabString(["d"]);
        this.model.firing = new ScilabDouble([-1]);
        this.model.dep_ut = new ScilabBoolean([false,false]);
        var exprs = [["A"],[sci2exp(1)]];
        this.x = new standard_define(new ScilabDouble([2,1]),this.model,new ScilabDouble(exprs)," ");
        this.x.graphics.id = "Goto";
        return new BasicBlock(this.x);
    }
    CLKGOTO.prototype.details = function CLKGOTO() {
        return this.x;
    }
    CLKGOTO.prototype.get = function CLKGOTO() {
        var options = {
            tag:["Tag",this.tag],
            tagvis:["Tag Visibility (1=Local 2=Scoped 3=Global)",this.tagvis],
        }
        return options;
    }
    CLKGOTO.prototype.set = function CLKGOTO() {
        var exprs = this.graphics.exprs;
        while (true) {
            var ok = true;
            this.tag = arguments[0]["tag"];
            this.tagvis = parseFloat(arguments[0]["tagvis"]);
            var exprs = [arguments[0]["tag"], arguments[0]["tagvis"]];
            if (!ok) {
                break;
            }
            if (((this.tagvis<1)||(this.tagvis>3))) {
                message("Tag Visibility must be between 1 and 3");
                throw "user error";
                var ok = false;
            }
            this.tagvis = int(this.tagvis);
            if (ok) {
                if (((this.model.opar!=list(this.tag))||(this.model.ipar!=this.tagvis))) {
                    var needcompile = 4;
                    var y = needcompile;
                }
                this.model.opar = list(new ScilabDouble([this.tag]));
                this.model.ipar = new ScilabDouble([this.tagvis]);
                this.model.evtin = new ScilabDouble([1]);
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
    CLKGOTO.prototype.get_popup_title = function CLKGOTO() {
        var set_param_popup_title = "Set block parameters";
        return set_param_popup_title;
    }
}
