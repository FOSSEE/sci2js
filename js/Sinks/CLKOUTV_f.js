/* autogenerated from "macros/Sinks/CLKOUTV_f.sci" */
function CLKOUTV_f() {
    CLKOUTV_f.prototype.define = function CLKOUTV_f() {
        this.prt = 1;
        this.model = scicos_model();
        this.model.sim = new ScilabString(["output"]);
        this.model.evtin = new ScilabDouble([1]);
        this.model.ipar = new ScilabDouble([this.prt]);
        this.model.blocktype = new ScilabString(["d"]);
        this.model.firing = [];
        this.model.dep_ut = [false,false];
        exprs = string(this.prt);
        this.x = standard_define([1,1],this.model,exprs," ");
        return new EventOutBlock(this.x);
    }
    CLKOUTV_f.prototype.details = function CLKOUTV_f() {
        return this.x;
    }
    CLKOUTV_f.prototype.get = function CLKOUTV_f() {
        var options = {
        }
        return options;
    }
    CLKOUTV_f.prototype.set = function CLKOUTV_f() {
        this.prt = arguments[0]["prt"]
        this.x = arg1;
        graphics = arg1.graphics;
        this.model = arg1.model;
        exprs = graphics.exprs;
        while (true) {
            [ok,this.prt,exprs] = scicos_getvalue([[msprintf("Set %s block parameters","CLKOUTV_f")],[" "],["Event output port"]],"Port number",list("vec",1),exprs);
            if (!ok) {
                break;
            }
            this.prt = int(this.prt);
            if (this.prt<=0) {
                block_parameter_error(msprintf("Wrong value for \'Port Number\' parameter: %d.",this.prt),"Strictly positive integer expected.");
            } else {
                this.model.ipar = new ScilabDouble([this.prt]);
                this.model.evtin = new ScilabDouble([1]);
                graphics.exprs = exprs;
                this.x.graphics = graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new EventOutBlock(this.x);
    }
    CLKOUTV_f.prototype.getinputs = function CLKOUTV_f() {
        orig = arg1.graphics.orig;
        sz = arg1.graphics.sz;
        this.x = orig[1-1]+sz[1-1]/2;
        y = orig[2-1]+sz[2-1];
        typ = -ones(this.x);
    }
    CLKOUTV_f.prototype.getorigin = function CLKOUTV_f() {
        [this.x,y] = this.standard_origin[arg1-1];
    }
    CLKOUTV_f.prototype.getoutputs = function CLKOUTV_f() {
        this.x = [];
        y = [];
        typ = [];
    }
    CLKOUTV_f.prototype.plot = function CLKOUTV_f() {
        xf = 60;
        yf = 40;
        orig = arg1.graphics.orig;
        sz = arg1.graphics.sz;
        orient = arg1.graphics.flip;
        this.prt = arg1.model.ipar;
        pat = xget("pattern");
        xset("pattern",this.default_color[-1-1]);
        thick = xget("thickness");
        xset("thickness",2);
        this.x = orig[1-1]+sz[1-1]*[[1/2],[1],[1],[0],[0]];
        y = orig[2-1]+sz[2-1]*[[0],[1/3],[1],[1],[1/3]];
        xo = orig[1-1];
        yo = orig[2-1]+sz[2-1]/3;
        gr_i = arg1.graphics.gr_i;
        if (this.type[gr_i-1]==15) {
            coli = gr_i[2-1];
            pcoli = xget("pattern");
            xfpolys(this.x,y,coli);
            xset("pattern",coli);
            xstringb(xo,yo,string(this.prt),sz[1-1],sz[2-1]/1.5);
            xset("pattern",pcoli);
            xstringb(xo,yo,string(this.prt),sz[1-1],sz[2-1]/1.5);
        } else {
            xstringb(xo,yo,string(this.prt),sz[1-1],sz[2-1]/1.5);
            xpoly(this.x,y,"lines",1);
        }
        in1 = [-1/14,1/7,0,0,1/14,1/7,-1/14,1/7]*this.diag[[xf,yf]-1];
        xfpoly(in1.slice()[1-1]+ones(4,1)*(orig[1-1]+sz[1-1]/2),in1.slice()[2-1]+ones(4,1)*(orig[2-1]+sz[2-1]),1);
        xset("thickness",thick);
        xset("pattern",pat);
        ident = arg1.graphics.id;
        if (ident!=[]&&ident!="") {
            font = xget("font");
            xset("font",this.options.ID[1-1][1-1],this.options.ID[1-1][2-1]);
            rectangle = xstringl(orig[1-1],orig[2-1],ident);
            w = rectangle[3-1];
            h = rectangle[4-1];
            xstringb(orig[1-1]+sz[1-1]/2-w/2,orig[2-1]-3*h/2,ident,w,h);
            xset("font",font[1-1],font[2-1]);
        }
        this.x = [];
        y = [];
    }
}
