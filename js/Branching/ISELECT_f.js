/* autogenerated from "macros/Branching/ISELECT_f.sci" */
function ISELECT_f() {
    ISELECT_f.prototype.define = function ISELECT_f() {
        this.z0 = 0;
        out = [[-1],[-1]];
        this.nout = 2;
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["selector"]), new ScilabDouble([2]));
        this.model.in1 = new ScilabDouble([-1]);
        this.model.out = new ScilabDouble(out);
        this.model.evtin = new ScilabDouble([ones(out)]);
        this.model.dstate = new ScilabDouble([this.z0]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = [true,false];
        exprs = [[string(this.nout)],[string(this.z0+1)]];
        gr_i = [];
        this.x = standard_define([2,2],this.model,exprs,gr_i);
        return new BasicBlock(this.x);
    }
    ISELECT_f.prototype.details = function ISELECT_f() {
        return this.x;
    }
    ISELECT_f.prototype.get = function ISELECT_f() {
        var options = {
            nout:["number of outputs",this.nout],
            z0:["initial connected output",this.z0],
        }
        return options;
    }
    ISELECT_f.prototype.set = function ISELECT_f() {
        this.nout = parseFloat(arguments[0]["nout"])
        this.z0 = parseFloat(arguments[0]["z0"])
        this.x = arg1;
        graphics = arg1.graphics;
        exprs = graphics.exprs;
        this.model = arg1.model;
        while (true) {
            [ok,this.nout,this.z0,exprs] = scicos_getvalue("Set parameters",["number of outputs","initial connected output"],list("vec",1,"vec",1),exprs);
            if (!ok) {
                break;
            }
            if (this.z0>this.nout||this.z0<=0) {
                message("initial connected input is not a valid input port number");
            } else {
                [this.model,graphics,ok] = check_io(this.model,graphics,-1,-ones(this.nout,1),ones(this.nout,1),[]);
                if (ok) {
                    graphics.exprs = exprs;
                    this.model.dstate = new ScilabDouble([this.z0-1]);
                    this.x.graphics = graphics;
                    this.x.model = this.model;
                    break;
                }
            }
        }
        return new BasicBlock(this.x);
    }
}
