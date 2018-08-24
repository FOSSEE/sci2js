/* autogenerated from "macros/Sinks/WFILE_f.sci" */
function WFILE_f() {
    WFILE_f.prototype.define = function WFILE_f() {
        this.in1 = 1;
        var nin = sum(this.in1);
        var frmt = "(7(e10.3,1x))";
        var fname = "foo";
        var lunit = 0;
        this.N = 2;
        this.model = scicos_model();
        this.model.sim = new ScilabString(["writef"]);
        this.model.in = new ScilabDouble([this.in1]);
        this.model.evtin = new ScilabDouble([1]);
        this.model.dstate = new ScilabDouble([-1],[lunit],[zeros((nin+1)*this.N,1)]);
        this.model.ipar = new ScilabDouble([length(fname)],[length(frmt)],[0],[this.N],[this._str2code[fname-1]],[this._str2code[frmt-1]]);
        this.model.blocktype = new ScilabString(["d"]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        var exprs = [[sci2exp(this.in1)],[fname],[frmt],[string(this.N)]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"WFILE_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3,2]),this.model,new ScilabDouble(exprs),gr_i);
        return new BasicBlock(this.x);
    }
    WFILE_f.prototype.details = function WFILE_f() {
        return this.x;
    }
    WFILE_f.prototype.get = function WFILE_f() {
        var options = {
            in1:["Input Size",this.in1],
            fname1:["Output File Name",this.fname1],
            frmt1:["Output Format",this.frmt1],
            N:["Buffer Size",this.N],
        }
        return options;
    }
    WFILE_f.prototype.set = function WFILE_f() {
        warnobsolete("WRITEC_f","6.0.0");
        var warnMessage = msprintf("Feature %s is obsolete.","WFILE_f");
        var warnAdvise = msprintf("Please use %s instead.","WRITEC_f");
        var warnXcosMessage = msprintf("%s %s",warnMessage,warnAdvise);
        var exprs = this.graphics.exprs;
        var dstate = this.model.dstate;
        var lunit = dstate[2-1];
        var fname = exprs[2-1];
        var frmt = exprs[3-1];
        while (true) {
            var ok = true;
            this.in1 = parseFloat(arguments[0]["in1"]);
            this.fname1 = parseFloat(arguments[0]["fname1"]);
            this.frmt1 = parseFloat(arguments[0]["frmt1"]);
            this.N = parseFloat(arguments[0]["N"]);
            if (!ok) {
                break;
            }
            this.in1 = int(this.in1);
            var nin = this.in1;
            this.fname1 = pathconvert(stripblanks(this.fname1),false,true);
            this.frmt1 = stripblanks(this.frmt1);
            if (lunit>0&&min(length(frmt),1)!=min(length(this.frmt1),1)) {
                block_parameter_error("Simulation running !!! You cannot switch<br />between formatted and unformatted when running","End current simulation first.");
                var ok = false;
            } else if (lunit>0&&this.fname1!=fname) {
                block_parameter_error("You cannot modify \'Output File Name\' when running.","End current simulation first.");
                var ok = false;
            } else if (this.fname1=="") {
                block_parameter_error("Wrong value for \'Output File Name\' parameter","You must provide a filename.");
                var ok = false;
            } else if (fileparts(this.fname1)!="") {
                var tmpvar0 = fileparts(this.fname1);
                var pa = tmpvar0[0];
                var fn = tmpvar0[1];
                var ex = tmpvar0[2];
                if (!this.isdir[pa-1]) {
                    block_parameter_error(msprintf("Wrong value for \'%s\' parameter.","Output File Name"),msprintf("Directory \'%s\' does not exist",pa));
                    var ok = false;
                }
            } else if (this.frmt1!=""&&(part(this.frmt1,1)!="("||part(this.frmt1,length(this.frmt1))!=")")) {
                block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %s.","Input Format",this.frmt1),"You must enclose the format\'s string between parentheses.");
                var ok = false;
            } else if (this.N<2) {
                block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %d.","Buffer Size",this.N),"Must be greater than 1.");
                var ok = false;
            } else if (this.in1<=0) {
                block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %d.","Input Size",this.in1),"Strictly positive integer expected.");
                var ok = false;
            }
            if (ok) {
                var ipar = [[length(this.fname1)],[length(this.frmt1)],[0],[this.N],[this._str2code[this.fname1-1]],[this._str2code[this.frmt1-1]]];
                if (prod(size(dstate))!=(nin+1)*this.N+2) {
                    var dstate = [[-1],[lunit],[zeros((nin+1)*this.N,1)]];
                }
                this.model.in = new ScilabDouble([nin]);
                this.model.dstate = new ScilabDouble(dstate);
                this.model.ipar = new ScilabDouble(ipar);
                this.model.dep_ut = new ScilabBoolean([true,false]);
                this.graphics.exprs = new ScilabDouble([exprs]);
                this.x.graphics = this.graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
}
