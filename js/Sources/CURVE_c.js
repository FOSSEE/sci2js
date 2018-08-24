/* autogenerated from "macros/Sources/CURVE_c.sci" */
function CURVE_c() {
    CURVE_c.prototype.define = function CURVE_c() {
        this.model = scicos_model();
        this.xx = [0,1,2];
        this.yy = [10,20,-30];
        var N = 3;
        this.Method = 3;
        this.PeriodicOption = "y";
        var Graf = "n";
        this.model.sim = list(new ScilabString(["curve_c"]), new ScilabDouble([4]));
        this.model.in = new ScilabDouble([]);
        this.model.out = new ScilabDouble([1]);
        this.model.rpar = new ScilabDouble([this.xx.slice()],[this.yy.slice()]);
        this.model.ipar = new ScilabDouble([N],[this.Method],[1]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabBoolean([false,true]);
        this.model.evtin = new ScilabDouble([1]);
        this.model.evtout = new ScilabDouble([1]);
        this.model.firing = new ScilabDouble([0]);
        var exprs = [[sci2exp(this.Method)],[sci2exp(this.xx)],[sci2exp(this.yy)],[this.PeriodicOption],[Graf]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CURVE_c\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,2]),this.model,new ScilabDouble(exprs),gr_i);
        return new BasicBlock(this.x);
    }
    CURVE_c.prototype.details = function CURVE_c() {
        return this.x;
    }
    CURVE_c.prototype.get = function CURVE_c() {
        var options = {
            Method:["Spline Method (0..7)",this.Method],
            xx:["x",this.xx],
            yy:["y",this.yy],
            PeriodicOption:["Periodic signal(y/n)?",this.PeriodicOption],
            graf:["Launch graphic window(y/n)?",this.graf],
        }
        return options;
    }
    CURVE_c.prototype.set = function CURVE_c() {
        var exprs = this.graphics.exprs;
        var ok = false;
        var SaveExit = false;
        while (true) {
            var Ask_again = false;
            var ok = true;
            this.Method = parseFloat(arguments[0]["Method"]);
            this.xx = inverse(arguments[0]["xx"]);
            this.yy = inverse(arguments[0]["yy"]);
            this.PeriodicOption = arguments[0]["PeriodicOption"];
            this.graf = arguments[0]["graf"];
            if (!ok) {
                break;
            }
            if (this.PeriodicOption=="y"||this.PeriodicOption=="Y") {
                var PO = 1;
            } else {
                exprs[4-1] = "n";
                var PO = 0;
            }
            var mtd = int(this.Method);
            if (mtd<0) {
                var mtd = 0;
            }
            if (mtd>7) {
                var mtd = 7;
            }
            var METHOD = getmethod(mtd);
            if (!Ask_again) {
                this.xx = this.xx.slice();
                this.yy = this.yy.slice();
                var tmpvar0 = size(this.xx);
                var nx = tmpvar0[0];
                var mx = tmpvar0[1];
                var tmpvar1 = size(this.yy);
                var ny = tmpvar1[0];
                var my = tmpvar1[1];
                if (!((nx==ny)&&(mx==my))) {
                    messagebox("Incompatible size of [x] and [y]","modal","error");
                    var Ask_again = true;
                }
            }
            if (!Ask_again) {
                this.xy = [this.xx,this.yy];
                var tmpvar2 = cleandata(this.xy);
                this.xy = tmpvar2[0];
                var N = size(this.xy,"r");
                exprs[5-1] = "n";
                if (this.graf=="y"||this.graf=="Y") {
                    var ipar = [[N],[mtd],[PO]];
                    var rpar = [];
                    if ((winsid().length==0)) {
                        this.curwin = 0;
                    } else {
                        this.curwin = max(winsid())+1;
                    }
                    var tmpvar3 = poke_point(this.xy,ipar,rpar);
                    var orpar = tmpvar3[0];
                    var oipar = tmpvar3[1];
                    var ok = tmpvar3[2];
                    if (!ok) {
                        break;
                    }
                    var N2 = oipar[1-1];
                    var xy2 = [orpar.slice(1-1,N2),orpar.slice(N2+1-1,2*N2)];
                    var New_methhod = oipar[2-1];
                    var DChange = false;
                    var METHOD = getmethod(New_methhod);
                    if (or(this.xy.slice()[1-1]!=xy2.slice()[1-1])) {
                        var DChange = true;
                    }
                    if (or(this.xy.slice(1-1,N-1)[2-1]!=xy2.slice(1-1,N2-1)[2-1])) {
                        var DChange = true;
                    }
                    if ((this.xy[N-1][2-1]!=xy2[N2-1][2-1]&&(METHOD!="periodic"))) {
                        var DChange = true;
                    }
                    if (DChange) {
                        exprs[2-1] = strcat(sci2exp(xy2.slice()[1-1]));
                        exprs[3-1] = strcat(sci2exp(xy2.slice()[2-1]));
                    }
                    exprs[1-1] = sci2exp(New_methhod);
                    if (oipar[3-1]==1) {
                        var perop = "y";
                    } else {
                        var perop = "n";
                    }
                    exprs[4-1] = perop;
                    var SaveExit = true;
                } else {
                    var tmpvar4 = Do_Spline(N,mtd,this.xy.slice()[1-1],this.xy.slice()[2-1]);
                    var Xdummy = tmpvar4[0];
                    var Ydummy = tmpvar4[1];
                    var orpar = tmpvar4[2];
                    if ((METHOD=="periodic")) {
                        this.xy[N-1][2-1] = this.xy[1-1][2-1];
                    }
                    if ((METHOD=="order 2"||METHOD=="not_a_knot"||METHOD=="periodic"||METHOD=="monotone"||METHOD=="fast"||METHOD=="clamped")) {
                        var orpar = [[this.xy.slice()[1-1]],[this.xy.slice()[2-1]],[orpar]];
                    } else {
                        if ((METHOD=="zero order"||METHOD=="linear")) {
                            var orpar = [[this.xy.slice()[1-1]],[this.xy.slice()[2-1]]];
                        }
                    }
                    exprs[1-1] = sci2exp(mtd);
                    var oipar = [[N],[mtd],[PO]];
                    var SaveExit = true;
                }
            }
            if ((SaveExit)) {
                var xp = find(orpar.slice(1-1,oipar[1-1])>=0);
                if ((xp.length!=0)) {
                    this.model.firing = new ScilabDouble([orpar[xp[1-1]-1]]);
                } else {
                    this.model.firing = new ScilabDouble([-1]);
                }
                this.model.rpar = new ScilabDouble(orpar);
                this.model.ipar = new ScilabDouble(oipar);
                this.graphics.exprs = new ScilabDouble([exprs]);
                this.x.model = this.model;
                this.x.graphics = this.graphics;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
}
