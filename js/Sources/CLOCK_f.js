/* autogenerated from "macros/Sources/CLOCK_f.sci" */
function CLOCK_f() {
    CLOCK_f.prototype.define = function CLOCK_f() {
        var evtdly = EVTDLY_f("define");
        evtdly.graphics.orig = [320,232];
        evtdly.graphics.sz = [40,40];
        evtdly.graphics.flip = true;
        evtdly.graphics.exprs = [["0.1"],["0.1"]];
        evtdly.graphics.pein = 6;
        evtdly.graphics.peout = 3;
        evtdly.model.rpar = 0.1;
        evtdly.model.firing = 0.1;
        var output_port = CLKOUT_f("define");
        output_port.graphics.orig = [399,162];
        output_port.graphics.sz = [20,20];
        output_port.graphics.flip = true;
        output_port.graphics.exprs = "1";
        output_port.graphics.pein = 5;
        output_port.model.ipar = 1;
        var split = CLKSPLIT_f("define");
        split.graphics.orig = [[380.71066],[172]];
        split.graphics.pein = 3;
        split.graphics.peout = [[5],[6]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CLOCK_f\",sz(1),sz(2));"]);
        var diagram = scicos_diagram();
        diagram.objs[1-1] = output_port;
        diagram.objs[2-1] = evtdly;
        diagram.objs[3-1] = scicos_link(xx=[[340],[340],[380.71]],yy=[[226.29],[172],[172]],ct=[5,-1],from=[2,1],to=[4,1]);
        diagram.objs[4-1] = split;
        diagram.objs[5-1] = scicos_link(xx=[[380.71],[399]],yy=[[172],[172]],ct=[5,-1],from=[4,1],to=[1,1]);
        diagram.objs[6-1] = scicos_link(xx=[[380.71],[380.71],[340],[340]],yy=[[172],[302],[302],[277.71]],ct=[5,-1],from=[4,2],to=[2,1]);
        this.x = scicos_block();
        this.x.gui = "CLOCK_f";
        this.x.graphics.sz = [2,2];
        this.x.graphics.gr_i = gr_i;
        this.x.graphics.peout = 0;
        this.x.model.sim = "csuper";
        this.x.model.evtout = 1;
        this.x.model.blocktype = "h";
        this.x.model.firing = false;
        this.x.model.dep_ut = [false,false];
        this.x.model.rpar = diagram;
        return new BasicBlock(this.x);
    }
    CLOCK_f.prototype.details = function CLOCK_f() {
        return this.x;
    }
    CLOCK_f.prototype.get = function CLOCK_f() {
        var options = {
            dt:["Period",this.dt],
            t0:["Init time",this.t0],
        }
        return options;
    }
    CLOCK_f.prototype.set = function CLOCK_f() {
            if (typeof(o)=="Block"&&o.gui=="EVTDLY_f") {
                var path = i;
                break;
            }
        }
        var newpar = list();
        var exprs = xx.graphics.exprs;
        this.model = xx.model;
        var t0_old = this.model.firing;
        var dt_old = this.model.rpar;
        var model_n = this.model;
        while (true) {
            var ok = true;
            this.dt = arguments[0]["dt"];
            this.t0 = arguments[0]["t0"];
            this.exprs0 = arguments[0]["exprs0"];
            if (!ok) {
                break;
            }
            if (this.dt<=0) {
                message("period must be positive");
                throw "user error";
                var ok = false;
            }
            if (ok) {
                xx.graphics.exprs = this.exprs0;
                this.model.rpar = new ScilabDouble([this.dt]);
                this.model.firing = new ScilabDouble([this.t0]);
                xx.model = this.model;
                break;
            }
        }
        if (!and([t0_old,dt_old]==[this.t0,this.dt])||!and(this.exprs0==exprs)) {
            newpar[size(newpar)+1-1] = path;
        }
        if (t0_old!=this.t0) {
            var needcompile = 2;
        } else {
            var needcompile = 0;
        }
        var y = needcompile;
        var typ = newpar;
        return new BasicBlock(this.x);
    }
}
