/* autogenerated from "macros/Misc/ENDBLK.sci" */
function ENDBLK() {
    ENDBLK.prototype.define = function ENDBLK() {
        var scs_m_1 = scicos_diagram(version="scicos4.2",props=scicos_params(wpar=[-159.096,811.104,-121.216,617.984,1323,1008,331,284,630,480,0,7,1.4],Title="ENDBLK",tol=[0.0001,0.000001,1.000e-10,100001,0,0],tf=100000,context=" ",void1=[],options=tlist(["scsopt","3D","Background","Link","ID","Cmap"],list(true,33),[8,1],[1,5],list([5,1],[4,1]),[0.8,0.8,0.8]),void2=[],void3=[],doc=list()));
        scs_m_1.objs[1-1] = scicos_block(gui="END_c",graphics=scicos_graphics(orig=[272.104,249.11733],sz=[40,40],flip=true,theta=0,exprs="1.000E+08",pin=[],pout=[],pein=2,peout=2,gr_i=[],id="",in_implicit=[],out_implicit=[]),model=scicos_model(sim=list("scicosexit",4),in1=[],in2=[],intyp=1,out=[],out2=[],outtyp=1,evtin=1,evtout=1,state=[],dstate=[],odstate=list(),rpar=[],ipar=[],opar=list(),blocktype="d",firing=1.000e+08,dep_ut=[false,false],label="",nzcross=0,nmode=0,equations=list()),doc=list());
        scs_m_1.objs[2-1] = scicos_link(xx=[[292.104],[292.104],[261.83733],[261.83733],[292.104],[292.104]],yy=[[243.40305],[234.45067],[234.45067],[305.584],[305.584],[294.83162]],id="drawlink",thick=[0,0],ct=[5,-1],from=[1,1,0],to=[1,1,1]);
        this.model = scicos_model(sim="csuper",in1=[],in2=[],intyp=1,out=[],out2=[],outtyp=1,evtin=[],evtout=[],state=[],dstate=[],odstate=list(),rpar=scs_m_1,ipar=[],opar=list(),blocktype="h",firing=[],dep_ut=[false,false],label="",nzcross=0,nmode=0,equations=list());
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"ENDBLK\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,2]),this.model,new ScilabDouble([]),gr_i);
        return new BasicBlock(this.x);
    }
    ENDBLK.prototype.details = function ENDBLK() {
        return this.x;
    }
    ENDBLK.prototype.get = function ENDBLK() {
        alert("parameters cannot be modified");
    }
    ENDBLK.prototype.set = function ENDBLK() {
        for (i=1;i<=length(this.model.rpar.objs);i+=1) {
            var o = this.model.rpar.objs[i-1];
            if (typeof(o)=="Block"&&o.gui=="END_c") {
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
            if (!isequalbitwise(this.xxn,xx)) {
                this.model = xx.model;
                var model_n = this.xxn.model;
                if (!is_modelica_block(xx)) {
                    var modified = or(this.model.sim!=model_n.sim)||!isequal(this.model.state,model_n.state)||!isequal(this.model.dstate,model_n.dstate)||!isequal(this.model.odstate,model_n.odstate)||!isequal(this.model.rpar,model_n.rpar)||!isequal(this.model.ipar,model_n.ipar)||!isequal(this.model.opar,model_n.opar)||!isequal(this.model.label,model_n.label);
                    if (or(this.model.in!=model_n.in)||or(this.model.out!=model_n.out)||or(this.model.in2!=model_n.in2)||or(this.model.out2!=model_n.out2)||or(this.model.outtyp!=model_n.outtyp)||or(this.model.intyp!=model_n.intyp)) {
                        var needcompile = 1;
                    }
                    if (or(this.model.firing!=model_n.firing)) {
                        var needcompile = 2;
                    }
                    if ((size(this.model.in,"*")!=size(model_n.in,"*"))||(size(this.model.out,"*")!=size(model_n.out,"*"))||(size(this.model.evtin,"*")!=size(model_n.evtin,"*"))) {
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
    ENDBLK.prototype.get_popup_title = function ENDBLK() {
        return;
    }
    ENDBLK.prototype.getContainer = function ENDBLK() { return new BasicBlock(this.x); }
}
