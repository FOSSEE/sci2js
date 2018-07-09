/* autogenerated from "macros/Sources/FROMWS_c.sci" */
function FROMWS_c() {
    FROMWS_c.prototype.define = function FROMWS_c() {
        this.varnam = "V";
        this.Method = 1;
        this.ZC = 1;
        this.OutEnd = 0;
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["fromws_c"]), new ScilabDouble([4]));
        this.model.out = new ScilabDouble([-1]);
        this.model.out2 = new ScilabDouble([-2]);
        this.model.outtyp = new ScilabDouble([-1]);
        this.model.ipar = [[length(this.varnam)],[this._str2code[this.varnam-1]],[this.Method],[this.ZC],[this.OutEnd]];
        this.model.evtin = [1];
        this.model.evtout = [1];
        this.model.firing = [0];
        this.model.blocktype = new ScilabString(["d"]);
        this.model.dep_ut = [false,true];
        gr_i = [];
        exprs = [[string(this.varnam)],[string(this.Method)],[string(this.ZC)],[string(this.OutEnd)]];
        this.x = standard_define([3.5,2],this.model,exprs,gr_i);
        return new BasicBlock(this.x);
    }
    FROMWS_c.prototype.details = function FROMWS_c() {
        return this.x;
    }
    FROMWS_c.prototype.get = function FROMWS_c() {
        var options = {
            varnam:["Variable name",this.varnam],
            Method:["Interpolation Method",this.Method],
            ZC:["Enable zero crossing(0:No, 1:Yes)?",this.ZC],
            OutEnd:["Output at end(0:Zero, 1:Hold, 2:Repeat)",this.OutEnd],
        }
        return options;
    }
    FROMWS_c.prototype.set = function FROMWS_c() {
        this.varnam = arguments[0]["varnam"]
        this.Method = parseFloat(arguments[0]["Method"])
        this.ZC = parseFloat(arguments[0]["ZC"])
        this.OutEnd = parseFloat(arguments[0]["OutEnd"])
        this.x = arg1;
        graphics = arg1.graphics;
        exprs = graphics.exprs;
        this.model = arg1.model;
        while (true) {
            [ok,this.varnam,this.Method,this.ZC,this.OutEnd,exprs] = scicos_getvalue("Set From_Workspace block parameters",["Variable name","Interpolation Method","Enable zero crossing(0:No, 1:Yes)?","Output at end(0:Zero, 1:Hold, 2:Repeat)"],list("str",1,"vec",1,"vec",1,"vec",1),exprs);
            if (!ok) {
                break;
            }
            if (!(this.Method==0||this.Method==1||this.Method==2||this.Method==3)) {
                message("Interpolation method should be chosen in [0,1,2,3]");
                ok = false;
            }
            if (!(this.ZC==0||this.ZC==1)) {
                message("Zero crossing should be either 0 or 1");
                ok = false;
            }
            if (!(this.OutEnd==0||this.OutEnd==1||this.OutEnd==2)) {
                message("Output at end option should be either 0 or 1");
                ok = false;
            }
            r = false;
            ierr = execstr("r=validvar(varnam)","errcatch");
            if (!r) {
                message([["Invalid variable name."],["Please choose another variable name."]]);
                ok = false;
            }
            if (ok) {
                this.model.ipar = [[length(this.varnam)],[this._str2code[this.varnam-1]],[this.Method],[this.ZC],[this.OutEnd]];
                [model,graphics,ok] = set_io(this.model,graphics,list(),list([-1,-2],-1),1,1);
                if (ok) {
                    graphics.exprs = exprs;
                    this.x.graphics = graphics;
                    this.x.model = this.model;
                    break;
                }
            }
        }
        return new BasicBlock(this.x);
    }
}
