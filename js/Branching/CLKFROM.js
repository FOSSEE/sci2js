/* autogenerated from "macros/Branching/CLKFROM.sci" */
function CLKFROM() {
    CLKFROM.prototype.define = function CLKFROM() {
        this.model = scicos_model();
        this.model.sim = new ScilabString(["clkfrom"]);
        this.model.evtout = new ScilabDouble([1]);
        this.model.opar = list(new ScilabString(["A"]));
        this.model.blocktype = new ScilabString(["d"]);
        this.model.firing = new ScilabDouble([-1]);
        this.model.dep_ut = new ScilabDouble([false,false]);
        this.exprs = "A";
        this.x = standard_define([2,1],this.model,this.exprs," ");
        this.x.graphics.id = "From";
        return new BasicBlock(this.x);
    }
    CLKFROM.prototype.details = function CLKFROM() {
        return this.x;
    }
    CLKFROM.prototype.get = function CLKFROM() {
        var options = {
        }
        return options;
    }
    CLKFROM.prototype.set = function CLKFROM() {
        this.tag = arguments[0]["tag"]
        this.exprs = arguments[0]["exprs"]
        this.x = arg1;
        this.graphics = arg1.graphics;
        this.model = arg1.model;
        this.exprs = this.graphics.exprs;
        while (true) {
            [ok,this.tag,this.exprs] = scicos_getvalue("Set block parameters","Tag",list("str",-1),this.exprs);
            if (!ok) {
                break;
            }
            if (this.model.opar!=list(this.tag)) {
                var needcompile = 4;
                var y = needcompile;
            }
            this.model.opar = list(new ScilabDouble([this.tag]));
            this.model.evtout = new ScilabDouble([1]);
            this.model.firing = new ScilabDouble([-1]);
            this.graphics.exprs = new ScilabDouble([this.exprs]);
            this.x.graphics = this.graphics;
            this.x.model = this.model;
            break;
        }
        needcompile = resume(needcompile)
        return new BasicBlock(this.x);
    }
}
