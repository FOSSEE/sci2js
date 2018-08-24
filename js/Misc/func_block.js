/* autogenerated from "macros/Misc/func_block.sci" */
function func_block() {
    func_block.prototype.define = function func_block() {
        this.model = scicos_model();
        this.model.sim = new ScilabString([" "]);
        this.model.in = new ScilabDouble([1]);
        this.model.out = new ScilabDouble([1]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        var exprs = "v=sin(u);y=u*v";
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"func_block\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,2]),this.model,new ScilabString([exprs]),gr_i);
        return new BasicBlock(this.x);
    }
    func_block.prototype.details = function func_block() {
        return this.x;
    }
    func_block.prototype.get = function func_block() {
        alert("parameters cannot be modified");
    }
    func_block.prototype.set = function func_block() {
        var exprs = this.graphics.exprs;
        this.model = this.x.model;
        var tmpvar0 = genfunc(exprs);
        var ok = tmpvar0[0];
        var mac = tmpvar0[1];
        var exprs = tmpvar0[2];
        if (ok) {
            this.model.sim = new ScilabDouble([mac]);
            this.graphics.exprs = new ScilabDouble([exprs]);
            this.x.model = this.model;
            this.x.graphics = this.graphics;
        }
        return new BasicBlock(this.x);
    }
}
