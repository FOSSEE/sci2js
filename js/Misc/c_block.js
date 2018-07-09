/* autogenerated from "macros/Misc/c_block.sci" */
function c_block() {
    c_block.prototype.define = function c_block() {
        in1 = 1;
        out = 1;
        clkin = [];
        clkout = [];
        x0 = [];
        z0 = [];
        typ = "c";
        auto = [];
        this.rpar = [];
        this.funam = "toto";
        this.model = scicos_model();
        this.model.sim = list(new ScilabString([" "]), new ScilabDouble([2001]));
        this.model.in1 = new ScilabDouble([in1]);
        this.model.out = new ScilabDouble([out]);
        this.model.evtin = clkin;
        this.model.evtout = clkout;
        this.model.state = x0;
        this.model.dstate = z0;
        this.model.rpar = this.rpar;
        this.model.ipar = new ScilabDouble([0]);
        this.model.blocktype = new ScilabString([typ]);
        this.model.firing = auto;
        this.model.dep_ut = [true,false];
        label = list([[sci2exp(in1)],[sci2exp(out)],[strcat(sci2exp(this.rpar))],[this.funam]],list([]));
        gr_i = [];
        this.x = standard_define([3,2],this.model,label,gr_i);
        return new BasicBlock(this.x);
    }
    c_block.prototype.details = function c_block() {
        return this.x;
    }
    c_block.prototype.get = function c_block() {
        var options = {
            i:["input ports sizes",this.i],
            o:["output port sizes",this.o],
            rpar:["System parameters vector",this.rpar],
            funam:["function name",this.funam],
        }
        return options;
    }
    c_block.prototype.set = function c_block() {
        this.i = parseFloat(arguments[0]["i"])
        this.o = parseFloat(arguments[0]["o"])
        this.rpar = inverse(arguments[0]["rpar"])
        this.funam = arguments[0]["funam"]
        this.lab = arguments[0]["lab"]
        this.x = arg1;
        this.model = arg1.model;
        graphics = arg1.graphics;
        label = graphics.exprs;
        while (true) {
            [ok,this.i,this.o,this.rpar,this.funam,this.lab] = scicos_getvalue("Set C_block parameters",["input ports sizes","output port sizes","System parameters vector","function name"],list("vec",-1,"vec",-1,"vec",-1,"str",-1),label[1-1]);
            if (!ok) {
                break;
            }
            if (this.funam==" ") {
                break;
            }
            label[1-1] = this.lab;
            this.rpar = this.rpar.slice();
            this.i = int(this.i.slice());
            ni = size(this.i,1);
            this.o = int(this.o.slice());
            no = size(this.o,1);
            tt = label[2-1];
            if (this.model.sim[1-1]!=this.funam||size(this.model.in1,"*")!=size(this.i,"*")||size(this.model.out,"*")!=size(this.o,"*")) {
                tt = [];
            }
            [ok,tt] = CFORTR(this.funam,tt,this.i,this.o);
            if (!ok) {
                break;
            }
            [model,graphics,ok] = check_io(this.model,graphics,this.i,this.o,[],[]);
            if (ok) {
                this.model.sim[1] = new ScilabString([this.funam]);
                this.model.rpar = this.rpar;
                label[2-1] = tt;
                this.x.model = this.model;
                graphics.exprs = label;
                this.x.graphics = graphics;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
}
