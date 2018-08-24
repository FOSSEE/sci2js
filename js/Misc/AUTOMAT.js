/* autogenerated from "macros/Misc/AUTOMAT.sci" */
function AUTOMAT() {
    AUTOMAT.prototype.define = function AUTOMAT() {
        var NMode = 2;
        this.Minitial = 1;
        var NX = 1;
        this.X0 = [0.0];
        this.XP = [[1],[1]];
        var C1 = [2];
        var C2 = [1];
        var exprs = [[string(NMode)],[string(this.Minitial)],[string(NX)],[sci2exp(this.X0)],[sci2exp(this.XP)],[sci2exp(C1)],[sci2exp(C2)]];
        var ipar = [[NMode],[this.Minitial],[NX],[this.XP],[C1],[C2]];
        var rpar = [this.X0];
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["automat"]), new ScilabDouble([10004]));
        this.model.in = new ScilabDouble([2*NX+1],[2*NX+1]);
        this.model.out = new ScilabDouble([2],[2*NX]);
        this.model.state = new ScilabDouble([ones(2*NX,1)]);
        this.model.nzcross = new ScilabDouble([1]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.evtout = new ScilabDouble([1]);
        this.model.firing = new ScilabDouble([-1]);
        this.model.dep_ut = new ScilabBoolean([false,true]);
        this.model.ipar = new ScilabDouble(ipar);
        this.model.rpar = new ScilabDouble(rpar);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"AUTOMAT\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4,2]),this.model,new ScilabDouble(exprs),gr_i);
        return new BasicBlock(this.x);
    }
    AUTOMAT.prototype.details = function AUTOMAT() {
        return this.x;
    }
    AUTOMAT.prototype.get = function AUTOMAT() {
        alert("parameters cannot be modified");
    }
    AUTOMAT.prototype.set = function AUTOMAT() {
        var exprs = this.graphics.exprs;
        var ipar = this.model.ipar;
        var NMode = ipar[1-1];
        var NX = ipar[3-1];
        while (true) {
            var CX = "C1";
            var MSG0 = "\'Jump from Mode ";
            var MSG2 = ":[..;M_final(Guard=In(";
            var MSG3 = ").i);..]\'";
            var MSG = MSG0+"1"+MSG2+"1"+MSG3;
            var VEC = "\'mat\',[-1,1]";
            for (i=2;i<=NMode;i+=1) {
                var CX = CX+","+"C"+string(i);
                var MSG = MSG+";"+MSG0+string(i)+MSG2+string(i)+MSG3;
                var VEC = VEC+","+"\'mat\',[-1,1]";
            }
            var GTV = "[ok,NMode,Minitial,NX,X0,XP,"+CX+",exprs]=scicos_getvalue(\'Set Finite state machine model\',            [\'Number (finite-state) Modes\';\'Initial Mode\';\'Number of continuous-time states\';\'Continuous-time states intial values\';\'Xproperties of continuous-time states in each Mode\';"+MSG+"],            list(\'vec\',1,\'vec\',1,\'vec\',1,\'mat\',[-1,-1],\'mat\',[-1,-1],"+VEC+"),exprs)";
            execstr(GTV);
            if (!this.ok) {
                break;
            }
            var NMode_old = size(exprs,"*")-5;
            var ModifEncore = false;
            if ((NMode_old>NMode)) {
                exprs.slice(NMode+6-1,NMode_old+5) = [];
                var ModifEncore = true;
            }
            if ((NMode_old<NMode)) {
                exprs.slice(NMode_old+6-1,NMode+5) = exprs[NMode_old+4-1];
                var ModifEncore = true;
            }
            if ((NX!=size(this.X0,"*"))) {
                messagebox("the size of intial continuous-time states should be NX="+string(NX),"modal","error");
                var ModifEncore = true;
            }
            var tmpvar0 = size(this.XP);
            var rXP = tmpvar0[0];
            var cXP = tmpvar0[1];
            if (cXP!=NX) {
                messagebox("Xproperty matrix is not valid: it should have NX="+string(NX)+" columns","modal","error");
                var ModifEncore = true;
            } else if (((rXP!=NMode)&&(rXP>1))) {
                messagebox("Xproperty matrix is not valid: it should have NMode="+string(NMode)+" or 1 row(s)","modal","error");
                var ModifEncore = true;
            } else if ((rXP==1)) {
                for (i=1;i<=NMode-1;i+=1) {
                    this.XP = [[this.XP],[this.XP[1-1].slice()]];
                }
            }
            if ((NMode_old==NMode)&&(!ModifEncore)) {
                this.XP = matrix(transpose(this.XP),NMode*NX,1);
                var ipar = [[NMode],[this.Minitial],[NX],[this.XP]];
                var rpar = matrix(this.X0,NX,1);
                var INP = ones(NMode,1);
                if (NX>0) {
                    var OUT = [[2],[2*NX]];
                } else {
                    var OUT = [2];
                }
                var MaxModes = 1;
                var nzcross = 0;
                for (i=1;i<=NMode;i+=1) {
                    var Ci = evstr(exprs[5+i-1]);
                    var ipar = [[ipar],[Ci]];
                    INP[i-1][1-1] = 2*NX+length(Ci);
                    if ((nzcross<length(Ci))) {
                        var nzcross = length(Ci);
                    }
                    if ((MaxModes<max(Ci))) {
                        var MaxModes = max(Ci);
                        var imax = i;
                    }
                }
                if (MaxModes>NMode) {
                    messagebox([["Number of Modes should be "+string(MaxModes)],["A destination Mode in Mode#"+string(imax)+"\'s targets is invalid!"]],"modal","error");
                    var ModifEncore = true;
                }
                if (MaxModes<NMode) {
                    messagebox(["There is an unused Mode or the Number of Modes should be "+string(MaxModes)],"modal","error");
                    var ModifEncore = true;
                }
            }
            if (!ModifEncore) {
                var tmpvar1 = check_io(this.model,this.graphics,INP,OUT,[],[1]);
                this.model = tmpvar1[0];
                this.graphics = tmpvar1[1];
                this.ok = tmpvar1[2];
                if (!this.ok) {
                    break;
                }
                this.model.nzcross = new ScilabDouble([nzcross]);
                this.model.state = new ScilabDouble([ones(2*NX,1)]);
                this.graphics.gr_i[1-1][1-1] = new ScilabString(["txt=[\'Automaton\';\'nM="+string(NMode)+",nX="+string(NX)+"\'];"]);
                this.graphics.exprs = new ScilabDouble([exprs]);
                this.x.graphics = this.graphics;
                this.model.ipar = new ScilabDouble(ipar);
                this.model.rpar = new ScilabDouble([rpar]);
                this.x.model = this.model;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
    AUTOMAT.prototype.get_popup_title = function AUTOMAT() {
        var set_param_popup_title = "Set parameters";
        return set_param_popup_title;
    }
}
