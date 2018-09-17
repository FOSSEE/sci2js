/* autogenerated from "macros/Misc/CONSTRAINT2_c.sci" */
function CONSTRAINT2_c() {
    CONSTRAINT2_c.prototype.define = function CONSTRAINT2_c() {
        this.x0 = [0];
        this.xd0 = [0];
        this.id = [0];
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["constraint_c"]), new ScilabDouble([10004]));
        this.model.in = new ScilabDouble([1]);
        this.model.out = new ScilabDouble([1],[1]);
        this.model.state = new ScilabDouble([this.x0],[this.xd0]);
        this.model.ipar = new ScilabDouble(this.id);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabBoolean([false,true]);
        var exprs = list(strcat(sci2exp(this.x0)),strcat(sci2exp(this.xd0)),strcat(sci2exp(this.id)));
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CONSTRAINT2_c\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3,2]),this.model,exprs,gr_i);
        return new BasicBlock(this.x);
    }
    CONSTRAINT2_c.prototype.details = function CONSTRAINT2_c() {
        return this.x;
    }
    CONSTRAINT2_c.prototype.get = function CONSTRAINT2_c() {
        var exprs = this.graphics.exprs;
        this.set_param_popup_title = "Set Constraint block parameters";
        var options = {
            x0:["Initial guess values of states x",this.x0],
            xd0:["Initial guess values of derivative x\'",this.xd0],
            id:["Id(i)=1: if x\'(i) is present in the feedback, else Id(i)=0",this.id],
        }
        return options;
    }
    CONSTRAINT2_c.prototype.set = function CONSTRAINT2_c() {
        var exprs = this.graphics.exprs;
        while (true) {
            var ask_again = false;
            var ok = true;
            this.x0 = inverse(arguments[0]["x0"]);
            this.xd0 = inverse(arguments[0]["xd0"]);
            this.id = inverse(arguments[0]["id"]);
            var exprs = [arguments[0]["x0"], arguments[0]["xd0"], arguments[0]["id"]];
            if (!ok) {
                break;
            }
            this.x0 = this.x0.slice();
            var N = size(this.x0,"*");
            this.xd0 = this.xd0.slice();
            var Nxd = size(this.xd0,"*");
            this.id = this.id.slice();
            var Nid = size(this.id,"*");
            if ((N!=Nxd)||(N!=Nid)) {
                message("incompatible sizes, states, their derivatives, and ID should be the same size ");
                throw "user error";
                var ask_again = true;
            }
            if ((N<=0&&!ask_again)) {
                x_message("number of states (constraints) must be > 0 ");
                var ask_again = true;
            }
            if ((!ask_again)) {
                for (i=1;i<=N;i+=1) {
                    if (!((this.id[i-1]==0)||(this.id[i-1]==1))) {
                        var ask_again = true;
                        x_message([["Id(i) must be either"],["0 when x\'(i) is not present in the feedback"],["1: when x\'(i) is present in the feedback"]]);
                        break;
                    }
                    if ((this.id[i-1]==0)) {
                        this.id[i-1] = -1;
                    }
                }
            }
            if (!ask_again) {
                this.graphics.exprs = new ScilabDouble([exprs]);
                this.model.state = new ScilabDouble([this.x0],[this.xd0]);
                this.model.out = new ScilabDouble([N],[N]);
                this.model.in = new ScilabDouble([N]);
                this.model.ipar = new ScilabDouble(this.id);
                this.x.graphics = this.graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
    CONSTRAINT2_c.prototype.get_popup_title = function CONSTRAINT2_c() {
        return this.set_param_popup_title;
    }
    CONSTRAINT2_c.prototype.importset = function CONSTRAINT2_c() {
        var graphics = this.x.graphics;
        var ary = getData(graphics.exprs);
        this.x0 = ary[0];
        this.xd0 = ary[1];
        this.id = ary[2];
    }
    CONSTRAINT2_c.prototype.getContainer = function CONSTRAINT2_c() { return new BasicBlock(this.x); }
}
