/* autogenerated from "macros/NonLinear/LOOKUP2D.sci" */
function LOOKUP2D() {
    LOOKUP2D.prototype.define = function LOOKUP2D() {
        this.model = scicos_model();
        this.xx = [1:4];
        this.yy = [1:3];
        this.zz = [[4,5,6],[16,19,20],[10,18,23],[6,3,-1]];
        this.Method = 1;
        var Graf = "n";
        var Nx = length(this.xx);
        var Ny = length(this.yy);
        this.model.sim = list(new ScilabString(["lookup2d"]), new ScilabDouble([4]));
        this.model.in = new ScilabDouble([1],[1]);
        this.model.out = new ScilabDouble([1]);
        this.model.rpar = new ScilabDouble([this.xx.slice()],[this.yy.slice()],[this.zz.slice()]);
        this.model.ipar = new ScilabDouble([Nx],[Ny],[this.Method]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        var exprs = list(strcat(sci2exp(this.xx)),strcat(sci2exp(this.yy)),strcat(sci2exp(this.zz)),sci2exp(this.Method),Graf);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"LOOKUP2D\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2.5,2]),this.model,exprs,gr_i);
        return new BasicBlock(this.x);
    }
    LOOKUP2D.prototype.details = function LOOKUP2D() {
        return this.x;
    }
    LOOKUP2D.prototype.get = function LOOKUP2D() {
        var options = {
            xx:["Row index input values",this.xx],
            yy:["Column index input values",this.yy],
            zz:["Table data",this.zz.toString().replace(/,/g," ")],
            Method:["Lookup method(1..5)",this.Method],
            graf:["Launch graphic window(y/n)?",this.graf],
        }
        return options;
    }
    LOOKUP2D.prototype.set = function LOOKUP2D() {
        var exprs = this.graphics.exprs;
        var ok = false;
        var SaveExit = false;
        while (true) {
            var Ask_again = false;
            var ok = true;
            this.xx = inverse(arguments[0]["xx"]);
            this.yy = inverse(arguments[0]["yy"]);
            this.zz = inverse(arguments[0]["zz"]);
            this.Method = parseFloat(arguments[0]["Method"]);
            this.graf = arguments[0]["graf"];
            if (!ok) {
                break;
            }
            var mtd = int(this.Method);
            if (mtd<1) {
                var mtd = 1;
            }
            if (mtd>6) {
                var mtd = 6;
            }
            if (this.graf!="y"&&this.graf!="Y") {
                this.graf = "n";
            }
            exprs[5-1] = "n";
            exprs[4-1] = sci2exp(mtd);
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
                var tmpvar2 = size(this.zz);
                var nz = tmpvar2[0];
                var mz = tmpvar2[1];
                if (((nx<=1)||(ny<=1))) {
                    x_message("input row/column data size should be greater than one");
                    var Ask_again = true;
                }
                if (!((nx==nz)&&(ny==mz))) {
                    x_message("incompatible size of x and y");
                    var Ask_again = true;
                }
                var tmpvar3 = test_increasing(this.xx);
                var ok = tmpvar3[0];
                if ((!ok)) {
                    x_message("Row input values must be monotonically increasing");
                    var Ask_again = true;
                }
                var tmpvar4 = test_increasing(this.yy);
                var ok = tmpvar4[0];
                if ((!ok)) {
                    x_message("Column input values must be monotonically increasing");
                    var Ask_again = true;
                }
            }
            if (!Ask_again) {
                if ((this.graf=="Y"||this.graf=="y")) {
                    var gh = gcf();
                    var curwin = gh.figure_id;
                    var save_curwin = curwin;
                    var gh2 = scf();
                    var curwin = max(winsid())+1;
                    plot3d(this.xx,this.yy,this.zz,35,45,"X@Y@Z",[5,2,4]);
                    var curwin = save_curwin;
                    gh.figure_id = curwin;
                }
                this.model.rpar = new ScilabDouble([this.xx.slice()],[this.yy.slice()],[this.zz.slice()]);
                this.model.ipar = new ScilabDouble([nx],[ny],[mtd]);
                this.graphics.exprs = new ScilabDouble([exprs]);
                this.x.model = this.model;
                this.x.graphics = this.graphics;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
    LOOKUP2D.prototype.get_popup_title = function LOOKUP2D() {
        var set_param_popup_title = "2D Lookup table parameters";
        return set_param_popup_title;
    }
}
