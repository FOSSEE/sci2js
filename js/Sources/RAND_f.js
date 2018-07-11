/* autogenerated from "macros/Sources/RAND_f.sci" */
function RAND_f() {
    RAND_f.prototype.define = function RAND_f() {
        this.a = 0;
        this.b = 1;
        dt = 0;
        out = 1;
        this.flag = 0;
        this.model = scicos_model();
        this.model.sim = new ScilabString(["rndblk"]);
        this.model.out = new ScilabDouble([out]);
        this.model.evtin = new ScilabDouble([1]);
        this.model.dstate = new ScilabDouble([int(rand()*(10^7-1))],[0*this.a.slice()]);
        this.model.rpar = new ScilabDouble([this.a.slice()],[this.b.slice()]);
        this.model.ipar = new ScilabDouble([this.flag]);
        this.model.blocktype = new ScilabString(["d"]);
        this.model.dep_ut = [false,false];
        exprs = [[string(this.flag)],[sci2exp(this.a.slice())],[sci2exp(this.b.slice())],[string(this.model.dstate[1-1])]];
        gr_i = [];
        this.x = standard_define([3,2],this.model,exprs,gr_i);
        return new BasicBlock(this.x);
    }
    RAND_f.prototype.details = function RAND_f() {
        return this.x;
    }
    RAND_f.prototype.get = function RAND_f() {
        var options = {
            flag:["flag",this.flag],
            a:["A",this.a],
            b:["B",this.b],
            seed_c:["seed",this.seed_c],
        }
        return options;
    }
    RAND_f.prototype.set = function RAND_f() {
        this.flag = parseFloat(arguments[0]["flag"])
        this.a = parseFloat(arguments[0]["a"])
        this.b = parseFloat(arguments[0]["b"])
        this.seed_c = arguments[0]["seed_c"]
        this.x = arg1;
        graphics = arg1.graphics;
        exprs = graphics.exprs;
        this.model = arg1.model;
        if (size(exprs,"*")==5) {
            exprs = exprs.slice(1-1,3);
        }
        if (size(exprs,"*")==3) {
            exprs = [[exprs],[string(this.model.dstate[1-1])]];
        }
        while (true) {
            [ok,this.flag,this.a,this.b,this.seed_c,exprs] = scicos_getvalue([["Set Random generator block parameters"],["flag = 0 : Uniform distribution A is min and A+B max"],["flag = 1 : Normal distribution A is mean and B deviation"],[" "],["A and B must be vector with equal sizes"],["seed is the seed of random number generator (integer<2**31)"]],["flag","A","B","seed"],list("vec",1,"vec",-1,"vec","size(%2,\'*\')","vec",1),exprs);
            if (!ok) {
                break;
            }
            if (this.flag!=0&&this.flag!=1) {
                message("flag must be equal to 1 or 0");
            } else {
                nout = size(this.a,"*");
                graphics.exprs = exprs;
                this.model.out = new ScilabDouble([nout]);
                this.model.ipar = new ScilabDouble([this.flag]);
                this.model.rpar = new ScilabDouble([this.a.slice()],[this.b.slice()]);
                this.model.dstate = new ScilabDouble([this.seed_c],[0*this.a.slice()]);
                this.x.graphics = graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
}
