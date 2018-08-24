/* autogenerated from "macros/Sources/READC_f.sci" */
function READC_f() {
    READC_f.prototype.define = function READC_f() {
        var frmt = "d  ";
        var fname = "foo";
        var lunit = 0;
        this.N = 20;
        this.M = 1;
        var rpar = [];
        var tmask = 0;
        this.swap = 0;
        this.offset = 1;
        this.outmask = 1;
        var ievt = 0;
        var nout = size(this.outmask,"*");
        var ipar = [[length(fname)],[this._str2code[frmt-1]],[ievt],[this.N],[this.M],[this.swap],[this.offset],[this._str2code[fname-1]],[tmask],[this.outmask]];
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["readc"]), new ScilabDouble([2]));
        this.model.out = new ScilabDouble([nout]);
        this.model.evtin = new ScilabDouble([1]);
        this.model.evtout = new ScilabDouble([]);
        this.model.dstate = new ScilabDouble([1],[1],[lunit],[zeros(this.N*this.M,1)]);
        this.model.ipar = new ScilabDouble([length(fname)],[this._str2code[frmt-1]],[ievt],[this.N],[this.M],[this.swap],[this.offset],[this._str2code[fname-1]],[tmask],[this.outmask]);
        this.model.blocktype = new ScilabString(["d"]);
        this.model.firing = new ScilabDouble([-1]);
        this.model.dep_ut = new ScilabBoolean([false,false]);
        var exprs = [["[]"],[sci2exp(this.outmask)],[fname],[frmt],[string(this.M)],[string(this.N)],[string(this.offset)],[string(this.swap)]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"READC_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4,2]),this.model,new ScilabDouble(exprs),gr_i);
        return new BasicBlock(this.x);
    }
    READC_f.prototype.details = function READC_f() {
        return this.x;
    }
    READC_f.prototype.get = function READC_f() {
        var options = {
            tmask1:["Time Record Selection",this.tmask1],
            outmask:["Outputs Record Selection",this.outmask],
            fname1:["Input File Name",this.fname1],
            frmt1:["Input Format",this.frmt1],
            M:["Record Size",this.M],
            N:["Buffer Size",this.N],
            offset:["Initial Record Index",this.offset],
            swap:["Swap Mode (0:No, 1:Yes)",this.swap],
        }
        return options;
    }
    READC_f.prototype.set = function READC_f() {
        this.model = this.x.model;
        var exprs = this.graphics.exprs;
        var out = this.model.out;
        var dstate = this.model.dstate;
        var ipar = this.model.ipar;
        var imask = 9+ipar[1-1];
        var tmask = ipar[imask-1];
        var lunit = dstate[3-1];
        var fname = exprs[3-1];
        var frmt = exprs[4-1];
        while (true) {
            var ok = true;
            this.tmask1 = parseFloat(arguments[0]["tmask1"]);
            this.outmask = parseFloat(arguments[0]["outmask"]);
            this.fname1 = parseFloat(arguments[0]["fname1"]);
            this.frmt1 = arguments[0]["frmt1"];
            this.M = parseFloat(arguments[0]["M"]);
            this.N = parseFloat(arguments[0]["N"]);
            this.offset = parseFloat(arguments[0]["offset"]);
            this.swap = parseFloat(arguments[0]["swap"]);
            if (!ok) {
                break;
            }
            this.fname1 = pathconvert(stripblanks(this.fname1),false,true);
            this.frmt1 = stripblanks(this.frmt1);
            var fmts = ["s","l","d","f","c","us","ul","uc","ull","uls","ubl","ubs","dl","fl","ll","sl","db","fb","lb","sb"];
            var nout = size(this.outmask,"*");
            if (prod(size(this.tmask1))>1) {
                block_parameter_error(msprintf("Wrong value for \'%s\' parameter.","Time Record Selection"),"Must be a scalar or an empty matrix.");
            } else if (and(this.frmt1!=fmts)) {
                block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %s.","Input Format",this.frmt1),"Valid formats are: "+strcat(fmts,", "));
            } else if (this.alreadyran&&this.fname1!=fname) {
                block_parameter_error(msprintf("You cannot modify \'%s\' when running","Input File Name"),"End current simulation first.");
            } else if (this.N!=ipar[6-1]&&this.alreadyran) {
                block_parameter_error(msprintf("You cannot modify \'%s\' when running.","Buffer Size"),"End current simulation first");
            } else if (this.alreadyran&&size(this.tmask1)!=size(tmask)) {
                block_parameter_error(msprintf("You cannot modify \'%s\' when running.","Time Record Selection"),"End current simulation first.");
            } else if (this.fname1=="") {
                block_parameter_error(msprintf("Wrong value for \'%s\' parameter.","Input File Name"),"You must provide a file name.");
            } else if (this.M<1) {
                block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %d.","Record Size",this.M),"Strictly positive integer expected.");
            } else if (this.tmask1.length!=0&&(this.tmask1<1||this.tmask1>this.M)) {
                block_parameter_error(msprintf("Wrong value for  \'%s\' parameter: %d.","Time Record Selection",this.tmask1),msprintf("Must be in the interval %s.","[1, Record Size = "+string(this.M)+"]"));
            } else if (nout==0) {
                block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %d.","Outputs Record Selection",nout),"Strictly positive integer expected.");
            } else if (nout>this.M) {
                block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %d.","Outputs Record Selection",nout),msprintf("Must be in the interval %s.","[1, Record Size = "+string(this.M)+"]"));
            } else if (max(this.outmask)>this.M||min(this.outmask)<1) {
                block_parameter_error(msprintf("Wrong value for indexes in \'%s\' parameter: %s.","Outputs Record Selection",strcat(string(this.outmask.slice())," ")),msprintf("Must be in the interval %s.","[1, Record Size = "+string(this.M)+"]"));
            } else if (this.N<1) {
                block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %d.","Buffer Size",this.N),"Strictly positive integer expected.");
            } else if (this.swap!=0&&this.swap!=1) {
                block_parameter_error(msprintf("Wrong value for  \'%s\' parameter: %d.","Swap Mode",this.swap),msprintf("Must be in the interval %s.","[0, 1]"));
            } else if (this.offset<1) {
                block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %d.","Initial Record Index",this.offset),"Strictly positive integer expected.");
            } else {
                if (this.tmask1.length==0) {
                    var ievt = 0;
                    this.tmask1 = 0;
                    var outpt = [];
                } else {
                    var ievt = 1;
                    var outpt = 1;
                }
                var out = size(this.outmask,"*");
                var tmpvar0 = check_io(this.model,this.graphics,[],out,1,outpt);
                this.model = tmpvar0[0];
                this.graphics = tmpvar0[1];
                var ok = tmpvar0[2];
                this.frmt1 = part(this.frmt1,1,3);
                if (ok) {
                    if (ievt==0) {
                        this.model.firing = new ScilabDouble([-1]);
                    } else {
                        this.model.firing = new ScilabDouble([0]);
                    }
                    var ipar = [[length(this.fname1)],[this._str2code[this.frmt1-1]],[ievt],[this.N],[this.M],[this.swap],[this.offset],[this._str2code[this.fname1-1]],[this.tmask1],[this.outmask.slice()]];
                    if (prod(size(dstate))!=(this.N*this.M)+3) {
                        var dstate = [[-1],[-1],[lunit],[zeros(this.N*this.M,1)]];
                    }
                    this.model.dstate = new ScilabDouble(dstate);
                    this.model.ipar = new ScilabDouble(ipar);
                    this.graphics.exprs = new ScilabDouble([exprs]);
                    this.x.graphics = this.graphics;
                    this.x.model = this.model;
                    break;
                }
            }
        }
        return new BasicBlock(this.x);
    }
    READC_f.prototype.get_popup_title = function READC_f() {
        var set_param_popup_title = msprintf("Set %s block parameters","READC_f");
        return set_param_popup_title;
    }
}
