/* autogenerated from "macros/Sources/IN_f.sci" */
function IN_f() {
    IN_f.prototype.define = function IN_f() {
        prt = 1;
        this.model = scicos_model();
        this.model.sim = new ScilabString(["input"]);
        this.model.out = new ScilabDouble([-1]);
        this.model.out2 = new ScilabDouble([-2]);
        this.model.outtyp = new ScilabDouble([-1]);
        this.model.ipar = new ScilabDouble([prt]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = [false,false];
        exprs = sci2exp(prt);
        gr_i = [];
        this.x = standard_define([1,1],this.model,exprs,gr_i);
        return new ExplicitInBlock(this.x);
    }
    IN_f.prototype.details = function IN_f() {
        return this.x;
    }
    IN_f.prototype.get = function IN_f() {
        var options = {
        }
        return options;
    }
    IN_f.prototype.set = function IN_f() {
        this.x = arg1;
        graphics = arg1.graphics;
        this.model = arg1.model;
        exprs = graphics.exprs;
        if (size(exprs,"*")==2) {
            exprs = exprs[1-1];
        }
        if (size(exprs,"*")==1) {
            exprs = [[exprs[1-1]],["[-1 -2]"],["-1"]];
        }
        while (true) {
            [ok,prt,otsz,ot,exprs] = getvalue(_("Set Input block parameters"),[[_("Port number")],[_("Outport size ([-1 -2] for inherit)")],[_("Outport Type (-1 for inherit)")]],list("vec",1,"vec",-1,"vec",1),exprs);
            if (!ok) {
                break;
            }
            prt = int(prt);
            if (prt<=0) {
                message(_("Port number must be a positive integer"));
            } else if (!isequal(size(otsz,"*"),2)) {
                message(_("Outport Size must be a 2 elements vector"));
            } else if (((ot<1||ot>9)&&(ot!=-1))) {
                message(_("Outport type must be a number between 1 and 9, or -1 for inheritance."));
            } else {
                if (this.model.ipar!=prt) {
                    needcompile = 4;
                    y = needcompile;
                }
                this.model.ipar = new ScilabDouble([prt]);
                this.model.firing = [];
                this.model.out = new ScilabDouble([otsz[1-1]]);
                this.model.out2 = new ScilabDouble([otsz[2-1]]);
                this.model.outtyp = new ScilabDouble([ot]);
                graphics.exprs = exprs;
                this.x.graphics = graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new ExplicitInBlock(this.x);
    }
}
