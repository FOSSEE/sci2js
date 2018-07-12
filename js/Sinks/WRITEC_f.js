/* autogenerated from "macros/Sinks/WRITEC_f.sci" */
function WRITEC_f() {
    WRITEC_f.prototype.define = function WRITEC_f() {
        this.in1 = 1;
        var nin = sum(this.in1);
        var frmt = "c  ";
        var fname = "foo";
        this.swap = 0;
        var lunit = 0;
        this.N = 2;
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["writec"]), new ScilabDouble([2]));
        this.model.in1 = new ScilabDouble([this.in1]);
        this.model.evtin = new ScilabDouble([1]);
        this.model.dstate = new ScilabDouble([-1],[lunit],[zeros((nin+1)*this.N,1)]);
        this.model.ipar = new ScilabDouble([length(fname)],[this._str2code[frmt-1]],[this.N],[this.swap],[this._str2code[fname-1]]);
        this.model.blocktype = new ScilabString(["d"]);
        this.model.dep_ut = new ScilabDouble([true,false]);
        this.exprs = [[sci2exp(this.in1)],[fname],[frmt],[string(this.N),string(this.swap)]];
        this.gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"WRITEC_f\",sz(1),sz(2));"]);
        this.x = standard_define([4,2],this.model,this.exprs,this.gr_i);
        return new BasicBlock(this.x);
    }
    WRITEC_f.prototype.details = function WRITEC_f() {
        return this.x;
    }
    WRITEC_f.prototype.get = function WRITEC_f() {
        var options = {
            in1:["Input Size",this.in1],
            fname1:["Output File Name",this.fname1],
            frmt1:["Output Format",this.frmt1],
            N:["Buffer Size",this.N],
            swap:["Swap Mode (0:No, 1:Yes)",this.swap],
        }
        return options;
    }
    WRITEC_f.prototype.set = function WRITEC_f() {
        this.in1 = parseFloat(arguments[0]["in1"])
        this.fname1 = parseFloat(arguments[0]["fname1"])
        this.frmt1 = arguments[0]["frmt1"]
        this.N = parseFloat(arguments[0]["N"])
        this.swap = parseFloat(arguments[0]["swap"])
        this.exprs = arguments[0]["exprs"]
        this.x = arg1;
        this.graphics = arg1.graphics;
        this.exprs = this.graphics.exprs;
        this.model = arg1.model;
        var ipar = this.model.ipar;
        var dstate = this.model.dstate;
        var lunit = dstate[2-1];
        var fname = this.exprs[2-1];
        var frmt = this.exprs[3-1];
        while (true) {
            [ok,this.in1,this.fname1,this.frmt1,this.N,this.swap,this.exprs] = scicos_getvalue([[msprintf("Set %s block parameters","WRITEC_f")],[" "],["Write to C binary file"]],["Input Size","Output File Name","Output Format","Buffer Size","Swap Mode (0:No, 1:Yes)"],list("vec",1,"str",1,"str",1,"vec",1,"vec",1),this.exprs);
            if (!ok) {
                break;
            }
            this.in1 = int(this.in1);
            var nin = this.in1;
            this.fname1 = pathconvert(stripblanks(this.fname1),false,true);
            this.frmt1 = stripblanks(this.frmt1);
            var fmts = ["s","l","d","f","c","us","ul","uc","ull","uls","ubl","ubs","dl","fl","ll","sl","db","fb","lb","sb"];
            if (and(this.frmt1!=fmts)) {
                block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %s.","Input Format",this.frmt1),"Valid formats are: "+strcat(fmts,", "));
                var ok = false;
            } else if (this.alreadyran&&this.fname1!=fname) {
                block_parameter_error(msprintf("You cannot modify \'%s\' when running","Input Format"),"End current simulation first.");
                var ok = false;
            } else if (this.alreadyran&&this.N!=ipar[5-1]) {
                block_parameter_error(msprintf("You cannot modify \'Buffer Size\' when running.","Buffer Size"),"End current simulation first");
                var ok = false;
            } else if (this.fname1=="") {
                block_parameter_error(msprintf("Wrong value for \'%s\' parameter.","Output File Name"),"You must provide a filename.");
            } else if (fileparts(this.fname1)!="") {
                var tmpvar0 = fileparts(this.fname1);
                var pa = tmpvar0[0];
                var fn = tmpvar0[1];
                var ex = tmpvar0[2];
                if (!this.isdir[pa-1]) {
                    block_parameter_error(msprintf("Wrong value for \'%s\' parameter.","Output File Name"),msprintf("Directory \'%s\' does not exist",pa));
                    var ok = false;
                }
            } else if (this.N<1) {
                block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %d.","Buffer Size",this.N),"Strictly positive integer expected.");
                var ok = false;
            } else if (this.in1<=0) {
                block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %d.","Input Size",this.in1),"Strictly positive integer expected.");
                var ok = false;
            } else if (this.swap!=0&&this.swap!=1) {
                block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %d.","Swap Mode",this.swap),msprintf("Must be in the interval %s.","[0, 1]"));
                var ok = false;
            }
            this.frmt1 = part(this.frmt1,1,3);
            if (ok) {
                var ipar = [[length(this.fname1)],[this._str2code[this.frmt1-1]],[this.N],[this.swap],[this._str2code[this.fname1-1]]];
                if (prod(size(dstate))!=(nin+1)*this.N+2) {
                    var dstate = [[-1],[lunit],[zeros((nin+1)*this.N,1)]];
                }
                this.model.in1 = new ScilabDouble([nin]);
                this.model.dstate = new ScilabDouble(dstate);
                this.model.ipar = new ScilabDouble(ipar);
                this.graphics.exprs = new ScilabDouble([this.exprs]);
                this.x.graphics = this.graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
}
