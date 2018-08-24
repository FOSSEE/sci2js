/* autogenerated from "macros/Electrical/VsourceAC.sci" */
function VsourceAC() {
    VsourceAC.prototype.define = function VsourceAC() {
        this.model = scicos_model();
        this.model.in = new ScilabDouble([1]);
        this.model.out = new ScilabDouble([1]);
        this.VA = 220;
        this.FR = 50;
        this.model.rpar = new ScilabDouble([this.VA],[this.FR]);
        this.model.sim = new ScilabString(["VsourceAC"]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        var mo = modelica();
        mo.model = "VsourceAC";
        mo.inputs = "p";
        mo.outputs = "n";
        mo.parameters = list([["VA"],["f"]],list(this.VA,this.FR));
        this.model.equations = new ScilabDouble([mo]);
        var exprs = [[string(this.VA)],[string(this.FR)]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"VsourceAC\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,2]),this.model,new ScilabDouble(exprs),list(gr_i,0));
        this.x.graphics.in_implicit = ["I"];
        this.x.graphics.out_implicit = ["I"];
        return new BasicBlock(this.x);
    }
    VsourceAC.prototype.details = function VsourceAC() {
        return this.x;
    }
    VsourceAC.prototype.get = function VsourceAC() {
        var options = {
            VA:["Amplitude (Volt)",this.VA],
            FR:["Frequency (Hz)",this.FR],
        }
        return options;
    }
    VsourceAC.prototype.set = function VsourceAC() {
        var exprs = this.graphics.exprs;
        while (true) {
            var ok = true;
            this.VA = parseFloat(arguments[0]["VA"]);
            this.FR = parseFloat(arguments[0]["FR"]);
            if (!ok) {
                break;
            }
            this.model.rpar = new ScilabDouble([this.VA],[this.FR]);
            this.model.equations.parameters[2-1] = list(new ScilabDouble([this.VA]), new ScilabDouble([this.FR]));
            this.graphics.exprs = new ScilabDouble([exprs]);
            this.x.graphics = this.graphics;
            this.x.model = this.model;
            break;
        }
        return new BasicBlock(this.x);
    }
    VsourceAC.prototype.get_popup_title = function VsourceAC() {
        var set_param_popup_title = "Set voltage source parameter";
        return set_param_popup_title;
    }
}
