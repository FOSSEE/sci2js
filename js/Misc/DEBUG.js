/* autogenerated from "macros/Misc/DEBUG.sci" */
function DEBUG() {
    DEBUG.prototype.define = function DEBUG() {
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["%debug_scicos"]), new ScilabDouble([99]));
        this.model.blocktype = new ScilabString(["d"]);
        exprs = list("","xcos_debug_gui(flag,block);");
        gr_i = [];
        this.x = standard_define([8,2],this.model,exprs,gr_i);
        return new BasicBlock(this.x);
    }
    DEBUG.prototype.details = function DEBUG() {
        return this.x;
    }
    DEBUG.prototype.get = function DEBUG() {
        var options = {
        }
        return options;
    }
    DEBUG.prototype.set = function DEBUG() {
        this.x = arg1;
        graphics = arg1.graphics;
        exprs = graphics.exprs;
        textmp = exprs[2-1];
        ok = true;
        while (1==1) {
            [txt] = this.dialog[[["Enter scilab instructions for debugging."],[" Inputs are block and flag, output is block"]]-1][textmp-1];
            if (txt!=[]) {
                tt = ["block=debug_scicos(block,flag)"];
                if (execstr("deff(tt,txt)","errcatch")==0) {
                    warnMode = warning("query");
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
                }
            } else {
                ok = false;
                break;
            }
        }
        if (ok) {
            graphics.exprs = exprs;
            this.x.graphics = graphics;
        }
        return new BasicBlock(this.x);
    }
}
