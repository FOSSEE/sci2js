/* autogenerated from "macros/Misc/DEBUG.sci" */
function DEBUG() {
    DEBUG.prototype.define = function DEBUG() {
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["%debug_scicos"]), new ScilabDouble([99]));
        this.model.blocktype = new ScilabString(["d"]);
        var exprs = list("","xcos_debug_gui(flag,block);");
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DEBUG\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([8,2]),this.model,exprs,gr_i);
        return new BasicBlock(this.x);
    }
    DEBUG.prototype.details = function DEBUG() {
        return this.x;
    }
    DEBUG.prototype.get = function DEBUG() {
        alert("parameters cannot be modified");
    }
    DEBUG.prototype.set = function DEBUG() {
        var exprs = this.graphics.exprs;
        var textmp = exprs[2-1];
        var ok = true;
        while (1==1) {
            var tmpvar0 = dialog([["Enter scilab instructions for debugging."],[" Inputs are block and flag, output is block"]],textmp);
            var txt = tmpvar0[0];
            if (txt.length!=0) {
                var tt = ["block=debug_scicos(block,flag)"];
                if (execstr("deff(tt,txt)","errcatch")==0) {
                    var warnMode = warning("query");
                    warning("off");
                    save(this.TMPDIR+"/debug_scicos",this.debug_scicos);
                    warning(warnMode);
                    exprs[2-1] = txt;
                    if ((scicos_debug()!=2&&scicos_debug()!=3)) {
                        scicos_debug(2);
                    }
                    break;
                } else {
                    message([["Error in the instructions"],[lasterror()]]);
                    throw "user error";
                }
            } else {
                var ok = false;
                break;
            }
        }
        if (ok) {
            this.graphics.exprs = new ScilabDouble([exprs]);
            this.x.graphics = this.graphics;
        }
        return new BasicBlock(this.x);
    }
    DEBUG.prototype.get_popup_title = function DEBUG() {
        var set_param_popup_title = "Set parameters";
        return set_param_popup_title;
    }
}
