/* autogenerated from "macros/Sinks/CSCOPXY3D.sci" */
function CSCOPXY3D() {
    CSCOPXY3D.prototype.define = function CSCOPXY3D() {
        this.win = -1;
        this.clrs = [[1],[2],[3],[4],[5],[6],[7],[13]];
        this.siz = [[1],[1],[1],[1],[1],[1],[1],[1]];
        this.wdim = [[600],[400]];
        this.wpos = [[-1],[-1]];
        this.N = 2;
        this.param3ds = [[50],[280]];
        this.vec_x = [[-15],[15]];
        this.vec_y = [[-15],[15]];
        this.vec_z = [[-15],[15]];
        this.nbr_curves = 1;
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["cscopxy3d"]), new ScilabDouble([4]));
        this.model.in = new ScilabDouble([1],[1],[1]);
        this.model.in2 = new ScilabDouble([1],[1],[1]);
        this.model.intyp = new ScilabDouble([1],[1],[1]);
        this.model.evtin = new ScilabDouble([1]);
        this.model.rpar = new ScilabDouble([this.vec_x.slice()],[this.vec_y.slice()],[this.vec_z.slice()],[this.param3ds.slice()]);
        this.model.ipar = new ScilabDouble([this.win],[8],[this.N],[this.clrs.slice()],[this.siz.slice()],[8],[this.wpos.slice()],[this.wdim.slice()],[this.nbr_curves]);
        this.model.blocktype = new ScilabString(["d"]);
        this.model.dep_ut = new ScilabBoolean([false,false]);
        var exprs = [[string(this.nbr_curves)],[strcat(string(this.clrs)," ")],[strcat(string(this.siz)," ")],[string(this.win)],[sci2exp([])],[sci2exp(this.wdim)],[strcat(string(this.vec_x)," ")],[strcat(string(this.vec_y)," ")],[strcat(string(this.vec_z)," ")],[strcat(string(this.param3ds)," ")],[string(this.N)]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CSCOPXY3D\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,2]),this.model,new ScilabDouble(exprs),gr_i);
        return new BasicBlock(this.x);
    }
    CSCOPXY3D.prototype.details = function CSCOPXY3D() {
        return this.x;
    }
    CSCOPXY3D.prototype.get = function CSCOPXY3D() {
        var options = {
            nbr_curves:["Number of curves",this.nbr_curves],
            clrs:["color (>0) or mark (<0)",this.clrs.toString().replace(/,/g," ")],
            siz:["Line or Mark Size",this.siz.toString().replace(/,/g," ")],
            win:["Output window number (-1 for automatic)",this.win],
            wpos:["Output window position",this.wpos.toString().replace(/,/g," ")],
            wdim:["Output window sizes",this.wdim.toString().replace(/,/g," ")],
            vec_x:["Xmin and Xmax",this.vec_x.toString().replace(/,/g," ")],
            vec_y:["Ymin and Ymax",this.vec_y.toString().replace(/,/g," ")],
            vec_z:["Zmin and Zmax",this.vec_z.toString().replace(/,/g," ")],
            param3ds:["Alpha and Theta",this.param3ds.toString().replace(/,/g," ")],
            N:["Buffer size",this.N],
        }
        return options;
    }
    CSCOPXY3D.prototype.set = function CSCOPXY3D() {
        var exprs = this.graphics.exprs;
        while (true) {
            var ok = true;
            this.nbr_curves = parseFloat(arguments[0]["nbr_curves"]);
            this.clrs = inverse(arguments[0]["clrs"]);
            this.siz = inverse(arguments[0]["siz"]);
            this.win = parseFloat(arguments[0]["win"]);
            this.wpos = inverse(arguments[0]["wpos"]);
            this.wdim = inverse(arguments[0]["wdim"]);
            this.vec_x = inverse(arguments[0]["vec_x"]);
            this.vec_y = inverse(arguments[0]["vec_y"]);
            this.vec_z = inverse(arguments[0]["vec_z"]);
            this.param3ds = inverse(arguments[0]["param3ds"]);
            this.N = parseFloat(arguments[0]["N"]);
            if (!ok) {
                break;
            }
            var mess = [];
            if (size(this.wpos,"*")!=0&&size(this.wpos,"*")!=2) {
                var mess = [[mess],["Window position must be [] or a 2 vector"],[" "]];
                var ok = false;
            }
            if (size(this.wdim,"*")!=0&&size(this.wdim,"*")!=2) {
                var mess = [[mess],["Window dim must be [] or a 2 vector"],[" "]];
                var ok = false;
            }
            if (size(this.clrs,"*")!=size(this.siz,"*")) {
                var mess = [[mess],["Colors and Size must have same size"],[" "]];
                var ok = false;
            }
            if (this.nbr_curves<=0) {
                var mess = [[mess],["Number of curves cannot be negative or null"],[" "]];
                var ok = false;
            }
            if (this.win<-1) {
                var mess = [[mess],["Window number cannot be inferior than -1"],[" "]];
                var ok = false;
            }
            if (this.N<1) {
                var mess = [[mess],["Buffer size must be at least 1"],[" "]];
                var ok = false;
            }
            if (this.N<2) {
                for (i=1;i<=size(this.clrs,"*");i+=1) {
                    if (this.clrs[i-1]>0) {
                        var mess = [[mess],["Buffer size must be at least 2 or Change a color (must be >0)"],[" "]];
                        var ok = false;
                    }
                }
            }
            if (this.vec_y[1-1]>=this.vec_y[2-1]) {
                var mess = [[mess],["Ymax must be higher than Ymin"],[" "]];
                var ok = false;
            }
            if (this.vec_x[1-1]>=this.vec_x[2-1]) {
                var mess = [[mess],["Xmax must be higher than Xmin"],[" "]];
                var ok = false;
            }
            if (this.vec_z[1-1]>=this.vec_z[2-1]) {
                var mess = [[mess],["Zmax must be higher than Zmin"],[" "]];
                var ok = false;
            }
            if (ok) {
                var in1 = this.nbr_curves*ones(3,1);
                var in2 = ones(3,1);
                var tmpvar0 = set_io(this.model,this.graphics,list([in1,in2],ones(3,1)),list(),ones(1,1),[]);
                this.model = tmpvar0[0];
                this.graphics = tmpvar0[1];
                var ok = tmpvar0[2];
                if (this.wpos.length==0) {
                    this.wpos = [[-1],[-1]];
                }
                if (this.wdim.length==0) {
                    this.wdim = [[-1],[-1]];
                }
                var rpar = [[this.vec_x.slice()],[this.vec_y.slice()],[this.vec_z.slice()],[this.param3ds.slice()]];
                var size_siz = size(this.siz,"*");
                var ipar = [[this.win],[size_siz],[this.N],[this.clrs.slice()],[this.siz.slice()],[1],[this.wpos.slice()],[this.wdim.slice()],[this.nbr_curves]];
                this.model.rpar = new ScilabDouble(rpar);
                this.model.ipar = new ScilabDouble(ipar);
                this.graphics.exprs = new ScilabDouble([exprs]);
                this.x.graphics = this.graphics;
                this.x.model = this.model;
                break;
            } else {
                message(mess);
                throw "user error";
            }
        }
        return new BasicBlock(this.x);
    }
    CSCOPXY3D.prototype.get_popup_title = function CSCOPXY3D() {
        var set_param_popup_title = "Set Scope parameters";
        return set_param_popup_title;
    }
}
