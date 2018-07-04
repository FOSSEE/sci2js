/* autogenerated from "macros/MatrixOp/MATSING.sci" */
function MATSING() {
    MATSING.prototype.define = function MATSING() {
        model = scicos_model();
        function_name = "mat_sing";
        funtyp = 4;
        model.sim = list(function_name,funtyp);
        model.in1 = -1;
        model.in2 = -2;
        model.intyp = 1;
        model.out = -1;
        model.out2 = 1;
        model.outtyp = 1;
        model.evtin = [];
        model.evtout = [];
        model.state = [];
        model.dstate = [];
        model.rpar = [];
        model.ipar = [];
        model.blocktype = "c";
        model.firing = [];
        model.dep_ut = [true,false];
        label = [[sci2exp(1)],[sci2exp(1)]];
        gr_i = [];
        this.x = standard_define([2,2],model,label,gr_i);
        return new BasicBlock(this.x);
    }
    MATSING.prototype.details = function MATSING() {
        return this.x;
    }
    MATSING.prototype.get = function MATSING() {
        var options = {
            typ:["Datatype(1=real double  2=Complex)",this.typ],
            decomptyp:["decomposition type (1=singular values  2=sing values+matrix U & V)",this.decomptyp],
        }
        return options;
    }
    MATSING.prototype.set = function MATSING() {
        this.typ = inverse((arguments[0]["typ"]))
        this.decomptyp = parseFloat((arguments[0]["decomptyp"]))
        this.lab = parseFloat((arguments[0]["lab"]))
        this.x = arg1;
        model = arg1.model;
        graphics = arg1.graphics;
        label = graphics.exprs;
        if (size(label,"*")==14) {
            label[9-1] = [];
        }
        while (true) {
            [ok,this.typ,this.decomptyp,this.lab] = scicos_getvalue("Set MATSVD block parameters",["Datatype(1=real double  2=Complex)","decomposition type (1=singular values  2=sing values+matrix U & V)"],list("vec",1,"vec",1),label);
            if (!ok) {
                break;
            }
            label = this.lab;
            if ((this.typ==1)) {
                if ((this.decomptyp==1)) {
                    function_name = "mat_sing";
                    in1 = [-1,-2];
                    out = [-1,1];
                    ot = 1;
                } else if ((this.decomptyp==2)) {
                    function_name = "mat_svd";
                    in1 = [-1,-2];
                    out = [[-1,-1],[-1,-2],[-2,-2]];
                    ot = [1,1,1];
                } else {
                    message("decomposition type is not supported");
                    ok = false;
                }
                it = 1;
            } else if ((this.typ==2)) {
                if ((this.decomptyp==1)) {
                    function_name = "matz_sing";
                    in1 = [-1,-2];
                    out = [-1,1];
                    ot = 1;
                } else if ((this.decomptyp==2)) {
                    function_name = "matz_svd";
                    in1 = [-1,-2];
                    out = [[-1,-1],[-1,-2],[-2,-2]];
                    ot = [2,1,2];
                } else {
                    message("decomposition type is not supported");
                    ok = false;
                }
                it = 2;
            } else {
                message("Datatype is not supported");
                ok = false;
            }
            funtyp = 4;
            if (ok) {
                [model,graphics,ok] = set_io(model,graphics,list(in1,it),list(out,ot),[],[]);
            }
            if (ok) {
                model.sim = list(function_name,funtyp);
                arg1.model = model;
                graphics.exprs = label;
                arg1.graphics = graphics;
                this.x = arg1;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
}
