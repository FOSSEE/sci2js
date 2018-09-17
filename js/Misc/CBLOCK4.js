/* autogenerated from "macros/Misc/CBLOCK4.sci" */
function CBLOCK4() {
    CBLOCK4.prototype.define = function CBLOCK4() {
        var funam = "toto";
        this.model = scicos_model();
        this.model.sim = list(new ScilabString([" "]), new ScilabDouble([2004]));
        this.model.in = new ScilabDouble([1]);
        this.model.in2 = new ScilabDouble([1]);
        this.model.intyp = new ScilabDouble([1]);
        this.model.out = new ScilabDouble([1]);
        this.model.out2 = new ScilabDouble([1]);
        this.model.outtyp = new ScilabDouble([1]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        var label = list([[funam],["n"],[sci2exp([this.model.in,this.model.in2])],[sci2exp(this.model.intyp)],[sci2exp([this.model.out,this.model.out2])],[sci2exp(this.model.outtyp)],[sci2exp(this.model.evtin)],[sci2exp(this.model.evtout)],[sci2exp(this.model.state)],[sci2exp(this.model.dstate)],[sci2exp(this.model.odstate)],[sci2exp(this.model.rpar)],[sci2exp(this.model.ipar)],[sci2exp(this.model.opar)],[sci2exp(this.model.nmode)],[sci2exp(this.model.nzcross)],[sci2exp(this.model.firing)],["y"],["n"]],[]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CBLOCK4\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4,2]),this.model,label,gr_i);
        return new BasicBlock(this.x);
    }
    CBLOCK4.prototype.details = function CBLOCK4() {
        return this.x;
    }
    CBLOCK4.prototype.get = function CBLOCK4() {
        var label = this.graphics.exprs;
        this.set_param_popup_title = "Set C-Block4 block parameters";
        var options = {
            function_name:["Simulation function",this.function_name],
            impli:["Is block implicit? (y,n)",this.impli],
            in1:["Input ports sizes",this.in1],
            it:["Input ports type",this.it],
            out:["Output port sizes",this.out],
            ot:["Output ports type",this.ot],
            ci:["Input event ports sizes",this.ci],
            co:["Output events ports sizes",this.co],
            xx:["Initial continuous state",this.xx],
            z:["Initial discrete state",this.z],
            oz:["Initial object state",this.oz],
            rpar:["Real parameters vector",this.rpar],
            ipar:["Integer parameters vector",this.ipar],
            opar:["Object parameters list",this.opar],
            nmode:["Number of modes",this.nmode],
            nzcr:["Number of zero crossings",this.nzcr],
            auto0:["Initial firing vector (<0 for no firing)",this.auto0],
            depu:["Direct feedthrough (y or n)",this.depu],
            dept:["Time dependence (y or n)",this.dept],
        }
        return options;
    }
    CBLOCK4.prototype.set = function CBLOCK4() {
        var label = this.graphics.exprs;
        while (true) {
            var ok = true;
            this.function_name = arguments[0]["function_name"];
            this.impli = arguments[0]["impli"];
            this.in1 = arguments[0]["in1"];
            this.it = arguments[0]["it"];
            this.out = arguments[0]["out"];
            this.ot = arguments[0]["ot"];
            this.ci = parseFloat(arguments[0]["ci"]);
            this.co = parseFloat(arguments[0]["co"]);
            this.xx = inverse(arguments[0]["xx"]);
            this.z = inverse(arguments[0]["z"]);
            this.oz = arguments[0]["oz"];
            this.rpar = inverse(arguments[0]["rpar"]);
            this.ipar = parseFloat(arguments[0]["ipar"]);
            this.opar = arguments[0]["opar"];
            this.nmode = arguments[0]["nmode"];
            this.nzcr = arguments[0]["nzcr"];
            this.auto0 = arguments[0]["auto0"];
            this.depu = parseBoolean(arguments[0]["depu"]);
            this.dept = parseBoolean(arguments[0]["dept"]);
            var lab = [arguments[0]["function_name"], arguments[0]["impli"], arguments[0]["in1"], arguments[0]["it"], arguments[0]["out"], arguments[0]["ot"], arguments[0]["ci"], arguments[0]["co"], arguments[0]["xx"], arguments[0]["z"], arguments[0]["oz"], arguments[0]["rpar"], arguments[0]["ipar"], arguments[0]["opar"], arguments[0]["nmode"], arguments[0]["nzcr"], arguments[0]["auto0"], arguments[0]["depu"], arguments[0]["dept"]];
            if (!ok) {
                break;
            }
            label[1-1] = lab;
            var funam = stripblanks(this.function_name);
            this.xx = this.xx.slice();
            this.z = this.z.slice();
            this.rpar = this.rpar.slice();
            this.ipar = int(this.ipar.slice());
            var nx = size(this.xx,1);
            var nz = size(this.z,1);
            this.ci = int(this.ci.slice());
            var nevin = size(this.ci,1);
            this.co = int(this.co.slice());
            var nevout = size(this.co,1);
            if (part(this.impli,1)=="y") {
                var funtyp = 12004;
            } else {
                var funtyp = 2004;
            }
            if ([[this.ci],[this.co]].length!=0) {
                if (max([[this.ci],[this.co]])>1) {
                    message("vector event links not supported");
                    throw "user error";
                    var ok = false;
                }
            }
            if (ok) {
                this.depu = stripblanks(this.depu);
                if (part(this.depu,1)=="y") {
                    this.depu = true;
                } else {
                    this.depu = false;
                }
                this.dept = stripblanks(this.dept);
                if (part(this.dept,1)=="y") {
                    this.dept = true;
                } else {
                    this.dept = false;
                }
                var dep_ut = [this.depu,this.dept];
                if (funam==" ") {
                    break;
                }
                if (this.model.sim[1-1]!=funam||sign(size(this.model.state,"*"))!=sign(nx)||sign(size(this.model.dstate,"*"))!=sign(nz)||this.model.nzcross!=this.nzcr||sign(size(this.model.evtout,"*"))!=sign(nevout)) {
                    var tt = [];
                }
                var tt = label[2-1];
                var tmpvar0 = set_io(this.model,this.graphics,list(this.in1,this.it),list(this.out,this.ot),this.ci,this.co);
                this.model = tmpvar0[0];
                this.graphics = tmpvar0[1];
                var ok = tmpvar0[2];
            }
            if (ok) {
                while (true) {
                    var tmpvar1 = CC4(funam,tt);
                    var ok = tmpvar1[0];
                    var tt = tmpvar1[1];
                    var cancel = tmpvar1[2];
                    if (!ok) {
                        if (cancel) {
                            break;
                        }
                    } else {
                        this.model.sim = list(new ScilabDouble([funam]), new ScilabDouble([funtyp]));
                        this.model.state = new ScilabDouble(this.xx);
                        this.model.dstate = new ScilabDouble(this.z);
                        this.model.odstate = new ScilabDouble([this.oz]);
                        this.model.rpar = new ScilabDouble(this.rpar);
                        this.model.ipar = new ScilabDouble([this.ipar]);
                        this.model.opar = new ScilabDouble([this.opar]);
                        this.model.firing = new ScilabDouble([this.auto0]);
                        this.model.nzcross = new ScilabDouble([this.nzcr]);
                        this.model.nmode = new ScilabDouble([this.nmode]);
                        this.model.dep_ut = new ScilabBoolean(dep_ut);
                        label[2-1] = tt;
                        this.x.model = this.model;
                        this.graphics.exprs = new ScilabDouble([label]);
                        this.x.graphics = this.graphics;
                        break;
                    }
                }
                if (ok||cancel) {
                    break;
                }
            }
        }
        return new BasicBlock(this.x);
    }
    CBLOCK4.prototype.get_popup_title = function CBLOCK4() {
        return this.set_param_popup_title;
    }
    CBLOCK4.prototype.importset = function CBLOCK4() {
        var graphics = this.x.graphics;
        var ary = getData(graphics.exprs);
        this.function_name = ary[0];
        this.impli = ary[1];
        this.in1 = ary[2];
        this.it = ary[3];
        this.out = ary[4];
        this.ot = ary[5];
        this.ci = ary[6];
        this.co = ary[7];
        this.xx = ary[8];
        this.z = ary[9];
        this.oz = ary[10];
        this.rpar = ary[11];
        this.ipar = ary[12];
        this.opar = ary[13];
        this.nmode = ary[14];
        this.nzcr = ary[15];
        this.auto0 = ary[16];
        this.depu = ary[17];
        this.dept = ary[18];
    }
    CBLOCK4.prototype.getContainer = function CBLOCK4() { return new BasicBlock(this.x); }
}
