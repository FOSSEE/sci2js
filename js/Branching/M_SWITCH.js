/* autogenerated from "macros/Branching/M_SWITCH.sci" */
function M_SWITCH() {
    M_SWITCH.prototype.define = function M_SWITCH() {
        in1 = [[1],[-1],[-1]];
        ipar = [[1],[3]];
        this.nin = 2;
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["mswitch"]), new ScilabDouble([4]));
        this.model.in1 = in1;
        this.model.out = new ScilabDouble([-1]);
        this.model.ipar = new ScilabDouble(ipar);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = [true,false];
        exprs = [[string(this.nin)],[string(ipar)]];
        gr_i = [];
        this.x = standard_define([2.5,2],this.model,exprs,gr_i);
        return new BasicBlock(this.x);
    }
    M_SWITCH.prototype.details = function M_SWITCH() {
        return this.x;
    }
    M_SWITCH.prototype.get = function M_SWITCH() {
        var options = {
            nin:["number of inputs",this.nin],
            base:["zero base indexing (0), otherwise 1",this.base],
            rule:["rounding rule: int (0), round (1), ceil (2), floor (3)",this.rule],
        }
        return options;
    }
    M_SWITCH.prototype.set = function M_SWITCH() {
        this.nin = parseFloat(arguments[0]["nin"])
        this.base = parseFloat(arguments[0]["base"])
        this.rule = arguments[0]["rule"]
        this.x = arg1;
        graphics = arg1.graphics;
        exprs = graphics.exprs;
        this.model = arg1.model;
        while (true) {
            [ok,this.nin,this.base,this.rule,exprs] = scicos_getvalue("Set parameters",["number of inputs","zero base indexing (0), otherwise 1","rounding rule: int (0), round (1), ceil (2), floor (3)"],list("vec",1,"vec",1,"vec",1),exprs);
            if (!ok) {
                break;
            }
            this.nin = int(this.nin);
            this.base = int(this.base);
            if (this.nin<1) {
                message("Number of inputs must be >=1 ");
            } else if (!((this.base==1)||(this.base==0))) {
                message("base indexing must be 1 or 0");
            } else if (!((this.rule==1)||(this.rule==0)||(this.rule==2)||(this.rule==3))) {
                message("incorrect rounding rule");
            } else {
                if (this.nin==1) {
                    in1 = [[1,1],[-1,1]];
                    out = [1,1];
                } else {
                    in1 = [[1],[-ones(this.nin,1)]];
                    in2 = [[1],[-2*ones(this.nin,1)]];
                    in1 = [in1,in2];
                    out = [-1,-2];
                }
                it = [[-1],[-2*ones(this.nin,1)]];
                ot = -2;
                [this.model,graphics,ok] = set_io(this.model,graphics,list(in1,it),list(out,ot),[],[]);
                if (ok) {
                    graphics.exprs = exprs;
                    this.model.ipar = new ScilabDouble([this.base],[this.rule]);
                    this.x.graphics = graphics;
                    this.x.model = this.model;
                    break;
                }
            }
        }
        return new BasicBlock(this.x);
    }
}
