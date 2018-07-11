/* autogenerated from "macros/NonLinear/INTRP2BLK_f.sci" */
function INTRP2BLK_f() {
    INTRP2BLK_f.prototype.define = function INTRP2BLK_f() {
        this.a = [[0],[1]];
        this.b = [[0],[1]];
        this.c = [[0,1],[1,2]];
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["intrp2"]), new ScilabDouble([1]));
        this.model.in1 = [[1],[1]];
        this.model.out = new ScilabDouble([1]);
        this.model.rpar = new ScilabDouble([this.a],[this.b],[this.c.slice()]);
        this.model.ipar = new ScilabDouble([2],[2]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = [true,false];
        exprs = [[strcat(sci2exp(this.a))],[strcat(sci2exp(this.b))],[strcat(sci2exp(this.c,0))]];
        gr_i = [];
        this.x = standard_define([3,2],this.model,exprs,gr_i);
        return new BasicBlock(this.x);
    }
    INTRP2BLK_f.prototype.details = function INTRP2BLK_f() {
        return this.x;
    }
    INTRP2BLK_f.prototype.get = function INTRP2BLK_f() {
        var options = {
            a:["X coord.",this.a.toString().replace(/,/g," ")],
            b:["Y coord.",this.b.toString().replace(/,/g," ")],
            c:["Z values",this.c.toString().replace(/,/g," ")],
        }
        return options;
    }
    INTRP2BLK_f.prototype.set = function INTRP2BLK_f() {
        this.a = inverse(arguments[0]["a"])
        this.b = inverse(arguments[0]["b"])
        this.c = inverse(arguments[0]["c"])
        this.x = arg1;
        graphics = arg1.graphics;
        exprs = graphics.exprs;
        this.model = arg1.model;
        while (true) {
            [ok,this.a,this.b,this.c,exprs] = scicos_getvalue("Set Interpolation block parameters",["X coord.","Y coord.","Z values"],list("vec",-1,"vec",-1,"mat",[-1,-1]),exprs);
            if (!ok) {
                break;
            }
            if (size(this.a,"*")!=size(this.c,"c")||size(this.b,"*")!=size(this.c,"r")) {
                message("incompatible dimension");
            } else if (min(this.a.slice(2-1,$)-this.a.slice(1-1,$-1))<=0||min(this.b.slice(2-1,$)-this.b.slice(1-1,$-1))<=0) {
                message("X and Y must be strictly increasing");
            } else {
                if (ok) {
                    graphics.exprs = exprs;
                    this.model.rpar = new ScilabDouble([this.a.slice()],[this.b.slice()],[this.c.slice()]);
                    this.model.ipar = new ScilabDouble([size(this.a,"*")],[size(this.b,"*")]);
                    this.x.graphics = graphics;
                    this.x.model = this.model;
                    break;
                }
            }
        }
        return new BasicBlock(this.x);
    }
}
