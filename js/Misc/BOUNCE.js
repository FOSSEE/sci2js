/* autogenerated from "macros/Misc/BOUNCE.sci" */
function BOUNCE() {
    BOUNCE.prototype.define = function BOUNCE() {
        var n = 2;
        var k = 1;
        var ipar = [];
        for (i=1;i<=n;i+=1) {
            for (j=i+1;j<=n;j+=1) {
                ipar[k-1] = i;
                var k = k+1;
                ipar[k-1] = j;
                var k = k+1;
            }
        }
        this.walls = [[0],[5],[0],[5]];
        this.x = [[2],[2.5]];
        this.xd = [[0],[0]];
        this.y = [[3],[5]];
        this.yd = [[0],[0]];
        this.g = 9.81;
        this.C = 0;
        this.rpar1 = ones(n,1);
        this.rpar2 = this.rpar1;
        var state = [this.x,this.xd,this.y,this.yd];
        var state = transpose(state);
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["bounce_ball"]), new ScilabDouble([4]));
        this.model.in = new ScilabDouble([]);
        this.model.out = new ScilabDouble([n],[n]);
        this.model.state = new ScilabDouble(state.slice());
        this.model.rpar = new ScilabDouble([this.rpar1],[this.rpar2],[this.walls],[this.g],[this.C]);
        this.model.ipar = new ScilabDouble(ipar);
        this.model.nzcross = new ScilabDouble([n*(n-1)/2+4*n]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabBoolean([false,true]);
        var exprs = [[strcat(sci2exp(this.rpar1))],[strcat(sci2exp(this.rpar2))],[strcat(sci2exp(this.walls))],[strcat(sci2exp(this.x))],[strcat(sci2exp(this.xd))],[strcat(sci2exp(this.y))],[strcat(sci2exp(this.yd))]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"BOUNCE\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3,2]),this.model,new ScilabDouble(exprs),gr_i);
        return new BasicBlock(this.x);
    }
    BOUNCE.prototype.details = function BOUNCE() {
        return this.x;
    }
    BOUNCE.prototype.get = function BOUNCE() {
        var options = {
            rpar1:["Mass",this.rpar1],
            rpar2:["Radius",this.rpar2],
            walls:["[xmin,xmax,ymin,ymax]",this.walls.toString().replace(/,/g," ")],
            xt:["xpos",this.xt],
            xd:["xdpos",this.xd.toString().replace(/,/g," ")],
            y:["ypos",this.y],
            yd:["ydpos",this.yd.toString().replace(/,/g," ")],
            g:["g (gravity)",this.g],
            C:["C (aerodynamic coeff",this.C],
        }
        return options;
    }
    BOUNCE.prototype.set = function BOUNCE() {
        var exprs = this.graphics.exprs;
        if (size(exprs,"*")<9) {
            exprs[8-1] = "9.81";
            exprs[9-1] = "0";
        }
        while (true) {
            var ok = true;
            this.rpar1 = parseFloat(arguments[0]["rpar1"]);
            this.rpar2 = parseFloat(arguments[0]["rpar2"]);
            this.walls = inverse(arguments[0]["walls"]);
            this.xt = inverse(arguments[0]["xt"]);
            this.xd = inverse(arguments[0]["xd"]);
            this.y = inverse(arguments[0]["y"]);
            this.yd = inverse(arguments[0]["yd"]);
            this.g = parseFloat(arguments[0]["g"]);
            this.C = parseFloat(arguments[0]["C"]);
            if (!ok) {
                break;
            }
            this.xt = this.xt.slice();
            this.y = this.y.slice();
            this.xd = this.xd.slice();
            this.yd = this.yd.slice();
            this.rpar1 = this.rpar1.slice();
            this.rpar2 = this.rpar2.slice();
            var n = size(this.xt,"*");
            this.walls = this.walls.slice();
            if (this.walls[1-1]>this.walls[2-1]) {
                this.walls = this.walls[[2,1]-1];
            }
            if (this.walls[3-1]>this.walls[3-1]) {
                this.walls = this.walls[[3,4]-1];
            }
            if (n!=size(this.y,"*")||n!=size(this.rpar1,"*")||n!=size(this.rpar2,"*")||n!=size(this.xd,"*")||n!=size(this.yd,"*")) {
                message("All vectors must have equal size");
                throw "user error";
                var ok = false;
            } else if (!(min([[this.rpar1],[this.rpar2]])>0)) {
                message("Mass and radius must be >0");
                throw "user error";
                var ok = false;
            }
            if (!ok) {
                break;
            }
            var tmpvar0 = check_io(this.model,this.graphics,[],[n,n],[],[]);
            this.model = tmpvar0[0];
            this.graphics = tmpvar0[1];
            var ok = tmpvar0[2];
            if (ok) {
                var k = 1;
                var ipar = [];
                for (i=1;i<=n;i+=1) {
                    for (j=i+1;j<=n;j+=1) {
                        ipar[k-1] = i;
                        var k = k+1;
                        ipar[k-1] = j;
                        var k = k+1;
                    }
                }
                this.model.rpar = new ScilabDouble([this.rpar1],[this.rpar2],[this.walls],[this.g],[this.C]);
                this.model.ipar = new ScilabDouble(ipar);
                var state = [this.xt,this.xd,this.y,this.yd];
                var state = transpose(state);
                this.model.state = new ScilabDouble(state.slice());
                this.model.nzcross = new ScilabDouble([n*(n-1)/2+4*n]);
                this.graphics.exprs = new ScilabDouble([exprs]);
                this.x.graphics = this.graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
}
