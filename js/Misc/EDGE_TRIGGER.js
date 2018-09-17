/* autogenerated from "macros/Misc/EDGE_TRIGGER.sci" */
function EDGE_TRIGGER() {
    EDGE_TRIGGER.prototype.define = function EDGE_TRIGGER() {
        var scs_m_1 = scicos_diagram();
        scs_m_1.objs[1-1] = EDGETRIGGER("define");
        scs_m_1.objs[2-1] = IFTHEL_f("define");
        scs_m_1.objs[3-1] = IN_f("define");
        scs_m_1.objs[4-1] = CLKOUTV_f("define");
        scs_m_1.objs[5-1] = scicos_link();
        scs_m_1.objs[6-1] = scicos_link();
        scs_m_1.objs[7-1] = scicos_link();
        var blk = scs_m_1.objs[1-1];
        this.graphics = blk.graphics;
        this.model = blk.model;
        this.graphics.orig = new ScilabDouble([60,0]);
        this.graphics.sz = new ScilabDouble([60,40]);
        this.graphics.exprs = new ScilabString(["0"]);
        this.model.ipar = new ScilabDouble([0]);
        this.graphics.pin = new ScilabDouble([5]);
        this.graphics.pout = new ScilabDouble([6]);
        blk.graphics = this.graphics;
        blk.model = this.model;
        scs_m_1.objs[1-1] = blk;
        var blk = scs_m_1.objs[2-1];
        this.graphics = blk.graphics;
        this.model = blk.model;
        this.graphics.orig = new ScilabDouble([160,0]);
        this.graphics.sz = new ScilabDouble([60,40]);
        this.graphics.exprs = new ScilabDouble(["0"],["0"]);
        this.model.evtin = new ScilabDouble([]);
        this.model.nzcross = new ScilabDouble([0]);
        this.model.nmode = new ScilabDouble([0]);
        this.graphics.pin = new ScilabDouble([6]);
        this.graphics.peout = new ScilabDouble([7],[0]);
        blk.graphics = this.graphics;
        blk.model = this.model;
        scs_m_1.objs[2-1] = blk;
        var blk = scs_m_1.objs[3-1];
        this.graphics = blk.graphics;
        this.model = blk.model;
        this.graphics.orig = new ScilabDouble([0,10]);
        this.graphics.sz = new ScilabDouble([20,20]);
        this.graphics.exprs = new ScilabString(["1"]);
        this.model.ipar = new ScilabDouble([1]);
        this.graphics.pout = new ScilabDouble([5]);
        blk.graphics = this.graphics;
        blk.model = this.model;
        scs_m_1.objs[3-1] = blk;
        var blk = scs_m_1.objs[4-1];
        this.graphics = blk.graphics;
        this.model = blk.model;
        this.graphics.orig = new ScilabDouble([170,-60]);
        this.graphics.sz = new ScilabDouble([20,20]);
        this.graphics.exprs = new ScilabString(["1"]);
        this.model.ipar = new ScilabDouble([1]);
        this.graphics.pein = new ScilabDouble([7]);
        blk.graphics = this.graphics;
        blk.model = this.model;
        scs_m_1.objs[4-1] = blk;
        var lnk = scs_m_1.objs[5-1];
        lnk.from = [3,1,0];
        lnk.to = [1,1,1];
        scs_m_1.objs[5-1] = lnk;
        var lnk = scs_m_1.objs[6-1];
        lnk.from = [1,1,0];
        lnk.to = [2,1,1];
        scs_m_1.objs[6-1] = lnk;
        var lnk = scs_m_1.objs[7-1];
        lnk.ct = [5,-1];
        lnk.from = [2,1,0];
        lnk.to = [4,1,1];
        scs_m_1.objs[7-1] = lnk;
        blk={};
        lnk={};
        this.model = scicos_model();
        this.model.sim = new ScilabString(["csuper"]);
        this.model.in = new ScilabDouble([1]);
        this.model.evtout = new ScilabDouble([1]);
        this.model.rpar = scs_m_1;
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"EDGE_TRIGGER\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3,2]),this.model,new ScilabDouble([]),gr_i);
        return new BasicBlock(this.x);
    }
    EDGE_TRIGGER.prototype.details = function EDGE_TRIGGER() {
        return this.x;
    }
    EDGE_TRIGGER.prototype.get = function EDGE_TRIGGER() {
        alert("parameters cannot be modified");
    }
    EDGE_TRIGGER.prototype.set = function EDGE_TRIGGER() {
        for (i=1;i<=length(this.model.rpar.objs);i+=1) {
            var o = this.model.rpar.objs[i-1];
            if (typeof(o)=="Block"&&o.gui=="EDGETRIGGER") {
                var ppath = list(i);
                break;
            }
        }
        var newpar = list();
        var y = 0;
        for (path in ppath) {
            var np = size(path,"*");
            var spath = list();
            for (k=1;k<=np;k+=1) {
                spath[$+1-1] = "model";
                spath[$+1-1] = "rpar";
                spath[$+1-1] = "objs";
                spath[$+1-1] = path[k-1];
            }
            var xx = getObjectFromKeyList(this, spath);
            execstr("xxn="+xx.gui+"(\'set\',xx)");
            if (diffobjs(this.xxn,xx)) {
                this.model = xx.model;
                var model_n = this.xxn.model;
                if (!is_modelica_block(xx)) {
                    var modified = or(this.model.sim!=model_n.sim)||!isequal(this.model.state,model_n.state)||!isequal(this.model.dstate,model_n.dstate)||!isequal(this.model.rpar,model_n.rpar)||!isequal(this.model.ipar,model_n.ipar)||!isequal(this.model.label,model_n.label);
                    if (or(this.model.in!=model_n.in)||or(this.model.out!=model_n.out)) {
                        var needcompile = 1;
                    }
                    if (or(this.model.firing!=model_n.firing)) {
                        var needcompile = 2;
                    }
                    if ((size(this.model.in,"*")!=size(model_n.in,"*"))||(size(this.model.out,"*")!=size(model_n.out,"*"))) {
                        var needcompile = 4;
                    }
                    if (this.model.sim=="input"||this.model.sim=="output") {
                        if (this.model.ipar!=model_n.ipar) {
                            var needcompile = 4;
                        }
                    }
                    if (or(this.model.blocktype!=model_n.blocktype)||or(this.model.dep_ut!=model_n.dep_ut)) {
                        var needcompile = 4;
                    }
                    if ((this.model.nzcross!=model_n.nzcross)||(this.model.nmode!=model_n.nmode)) {
                        var needcompile = 4;
                    }
                    if (prod(size(model_n.sim))>1) {
                        if (model_n.sim[2-1]>1000) {
                            if (this.model.sim[1-1]!=model_n.sim[1-1]) {
                                var needcompile = 4;
                            }
                        }
                    }
                } else {
                    var modified = or(model_n!=this.model);
                    var eq = this.model.equations;
                    var eqn = model_n.equations;
                    if (or(eq.model!=eqn.model)||or(eq.inputs!=eqn.inputs)||or(eq.outputs!=eqn.outputs)) {
                        var needcompile = 4;
                    }
                }
                getObjectFromKeyList(this, spath) = this.xxn;
                newpar[size(newpar)+1-1] = path;
                var y = max(y,needcompile);
            }
        }
        var typ = newpar;
        return new BasicBlock(this.x);
    }
    EDGE_TRIGGER.prototype.get_popup_title = function EDGE_TRIGGER() {
        return;
    }
    EDGE_TRIGGER.prototype.getContainer = function EDGE_TRIGGER() { return new BasicBlock(this.x); }
}
