/* autogenerated from "macros/Sources/READAU_f.sci" */
function READAU_f() {
    READAU_f.prototype.define = function READAU_f() {
        var frmt = "uc ";
        var fname = "test.au";
        var lunit = 0;
        this.N = 20;
        var M = 1;
        var tmask = [];
        this.swap = 0;
        var offset = 1;
        var outmask = 1;
        var ievt = 0;
        var nout = size(outmask,"*");
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["readau"]), new ScilabDouble([2]));
        this.model.out = new ScilabDouble([nout]);
        this.model.evtin = new ScilabDouble([1]);
        this.model.dstate = new ScilabDouble([1],[1],[lunit],[zeros(this.N*M,1)]);
        this.model.ipar = new ScilabDouble([length(fname)],[this._str2code[frmt-1]],[ievt],[this.N],[M],[this.swap],[offset],[this._str2code[fname-1]],[tmask],[outmask]);
        this.model.blocktype = new ScilabString(["d"]);
        this.model.dep_ut = new ScilabBoolean([false,false]);
        var exprs = [[fname],[string(this.N)],[string(this.swap)]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"READAU_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([5,2]),this.model,new ScilabDouble(exprs),gr_i);
        return new BasicBlock(this.x);
    }
    READAU_f.prototype.details = function READAU_f() {
        return this.x;
    }
    READAU_f.prototype.get = function READAU_f() {
        var exprs = this.graphics.exprs;
        var out = this.model.out;
        var dstate = this.model.dstate;
        var ipar = this.model.ipar;
        var imask = 9+ipar[1-1];
        var tmask = ipar[imask-1];
        var lunit = dstate[3-1];
        var fname = exprs[1-1];
        this.set_param_popup_title = msprintf("Set %s block parameters","READAU_f");
        var options = {
            fname1:["Input File Name",this.fname1],
            N:["Buffer size",this.N],
            swap:["Swap Mode (0:No, 1:Yes)",this.swap],
        }
        return options;
    }
    READAU_f.prototype.set = function READAU_f() {
        var exprs = this.graphics.exprs;
        var out = this.model.out;
        var dstate = this.model.dstate;
        var ipar = this.model.ipar;
        var imask = 9+ipar[1-1];
        var tmask = ipar[imask-1];
        var lunit = dstate[3-1];
        var fname = exprs[1-1];
        while (true) {
            var ok = true;
            this.fname1 = parseFloat(arguments[0]["fname1"]);
            this.N = parseFloat(arguments[0]["N"]);
            this.swap = parseFloat(arguments[0]["swap"]);
            var exprs = [arguments[0]["fname1"], arguments[0]["N"], arguments[0]["swap"]];
            var tmask1 = [];
            var outmask = 1;
            var frmt1 = "uc";
            var M = 1;
            var offset = 1;
            if (!ok) {
                break;
            }
            this.fname1 = stripblanks(this.fname1);
            var frmt1 = stripblanks(frmt1);
            if (this.alreadyran&&this.fname1!=fname) {
                block_parameter_error("Simulation running !!! You cannot modify Input file name","End current simulation first.");
            } else if (this.fname1=="") {
                block_parameter_error(msprintf("Wrong value for \'%s\' parameter.","Input File Name"),"You must provide a filename.");
            } else if (this.N<1) {
                block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %d.","Buffer size",this.N),msprintf("Must be greater than %d.",1));
            } else if (this.alreadyran&&(this.N!=ipar[6-1])) {
                block_parameter_error(msprintf("You cannot modify \'%s\' when running.","Buffer Size"),"End current simulation first.");
            } else if (this.swap!=0&&this.swap!=1) {
                block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %d.","Swap Mode",this.swap),msprintf("Must be in the interval %s.","[0, 1]"));
            } else {
                var tmpvar0 = check_io(this.model,this.graphics,[],1,1,[]);
                this.model = tmpvar0[0];
                this.graphics = tmpvar0[1];
                var ok = tmpvar0[2];
                var frmt1 = part(frmt1,1,3);
                if (ok) {
                    var ipar = [[length(this.fname1)],[this._str2code[frmt1-1]],[0],[this.N],[M],[this.swap],[offset,this._str2code[this.fname1-1]],[tmask1,outmask.slice()]];
                    if (prod(size(dstate))!=(this.N*M)+3) {
                        var dstate = [[-1],[-1],[lunit],[zeros(this.N*M,1)]];
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
    READAU_f.prototype.get_popup_title = function READAU_f() {
        return this.set_param_popup_title;
    }
    READAU_f.prototype.importset = function READAU_f() {
        var graphics = this.x.graphics;
        var ary = getData(graphics.exprs);
        this.fname1 = ary[0];
        this.N = ary[1];
        this.swap = ary[2];
    }
    READAU_f.prototype.getContainer = function READAU_f() { return new BasicBlock(this.x); }
}
