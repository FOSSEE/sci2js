/* autogenerated from "macros/Misc/MPBLOCK.sci" */
function MPBLOCK() {
    MPBLOCK.prototype.define = function MPBLOCK() {
        this.in1 = ["u"];
        this.intype = ["I"];
        this.out = [["y1"],["y2"]];
        this.outtype = [["I"],["I"]];
        var param = [];
        var paramv = list();
        var pprop = [];
        var nameF = "myModel";
        var exprs = tlist(["MPBLOCK","in","intype","out","outtype","param","paramv","pprop","nameF","funtxt"],sci2exp(this.in1.slice()),sci2exp(this.intype.slice()),sci2exp(this.out.slice()),sci2exp(this.outtype.slice()),sci2exp(param.slice()),list(string(0.1),string(.0001)),sci2exp(pprop.slice()),nameF,[]);
        this.model = scicos_model();
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabBoolean([true,true]);
        this.model.rpar = new ScilabDouble([]);
        for (i=1;i<=lstsize(paramv);i+=1) {
            this.model.rpar = new ScilabDouble([this.model.rpar],[paramv[i-1].slice()]);
        }
        var mo = modelica();
        mo.model = nameF;
        mo.parameters = list(param,paramv);
        this.model.sim = list(new ScilabString([mo.model]), new ScilabDouble([10004]));
        mo.inputs = this.in1;
        mo.outputs = this.out;
        this.model.in = new ScilabDouble([ones(size(mo.inputs,"r"),1)]);
        this.model.out = new ScilabDouble([ones(size(mo.outputs,"r"),1)]);
        this.model.equations = mo;
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MPBLOCK\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3,2]),this.model,new ScilabDouble([exprs]),gr_i);
        this.x.graphics.in_implicit = this.intype;
        this.x.graphics.out_implicit = this.outtype;
        return new BasicBlock(this.x);
    }
    MPBLOCK.prototype.details = function MPBLOCK() {
        return this.x;
    }
    MPBLOCK.prototype.get = function MPBLOCK() {
        alert("parameters cannot be modified");
    }
    MPBLOCK.prototype.set = function MPBLOCK() {
        var exprs = this.graphics.exprs;
        if (this.type[exprs-1]==15) {
            var paramv = list();
            var pprop = [];
            for (i=1;i<=size(this.model.rpar,"*");i+=1) {
                paramv[$+1-1] = string(this.model.rpar[i-1]);
                pprop[$+1-1] = 0;
            }
            var exprs = tlist(["MPBLOCK","in","intype","out","outtype","param","paramv","pprop","nameF","funtxt"],exprs[1-1][1-1],exprs[1-1][2-1],exprs[1-1][3-1],exprs[1-1][4-1],exprs[1-1][5-1],paramv,sci2exp(pprop.slice()),exprs[1-1][7-1],exprs[2-1]);
        }
        var lab_1 = list(exprs.in,exprs.intype,exprs.out,exprs.outtype,exprs.param,exprs.pprop,exprs.nameF);
        var lab_2 = exprs.paramv;
        while (true) {
            var tmpvar0 = getvalue("Set Modelica generic block parameters",[["Input variables:       "],["Input variables types: "],["Output variables:      "],["Output variables types:"],["Parameters in Modelica:"],["Parameters properties: "],["Model name in packages:"]],list("str",-1,"str",-1,"str",-1,"str",-1,"str",-1,"vec",-1,"str",-1),lab_1);
            var ok = tmpvar0[0];
            var Tin = tmpvar0[1];
            var Tintype = tmpvar0[2];
            var Tout = tmpvar0[3];
            var Touttype = tmpvar0[4];
            var Tparam = tmpvar0[5];
            var pprop = tmpvar0[6];
            var Tfunam = tmpvar0[7];
            var lab_1 = tmpvar0[8];
            if (!ok) {
                break;
            }
            var ierr = execstr("in=stripblanks(evstr(Tin));            intype=stripblanks(evstr(Tintype));            out=stripblanks(evstr(Tout));            outtype=stripblanks(evstr(Touttype));            param=stripblanks(evstr(Tparam));            funam=stripblanks(Tfunam)","errcatch");
            if (ierr!=0) {
                x_message("Error in evaluation of variables.");
                var ok = false;
            }
            if (ok) {
                for (i=1;i<=size(this.in1,"*");i+=1) {
                    var r = false;
                    var ierr = execstr("r=validvar(in(i))","errcatch");
                    if (!r) {
                        var ok = false;
                        break;
                    }
                }
                if (!ok) {
                    x_message([["Invalid variable name for the input "+string(i)+"."],["\""+this.in1[i-1]+"\""],["Please choose another variable name."]]);
                }
            }
            if (ok) {
                for (i=1;i<=size(this.out,"*");i+=1) {
                    var r = false;
                    var ierr = execstr("r=validvar(out(i))","errcatch");
                    if (!r) {
                        var ok = false;
                        break;
                    }
                }
                if (!ok) {
                    x_message([["Invalid variable name for the output "+string(i)+"."],["\""+this.out[i-1]+"\""],["Please choose another variable name."]]);
                }
            }
            if (ok) {
                var param = param.slice();
                for (i=1;i<=size(param,"*");i+=1) {
                    var r = false;
                    var ierr = execstr("r=validvar(param(i))","errcatch");
                    if (!r) {
                        var ok = false;
                        break;
                    }
                }
                if (!ok) {
                    x_message([["Invalid variable name for the parameter "+string(i)+"."],["\""+param[i-1]+"\""],["Please choose another variable name."]]);
                }
            }
            if (ok) {
                for (i=1;i<=size(this.intype,"*");i+=1) {
                    if (this.intype[i-1]!="E"&&this.intype[i-1]!="I") {
                        x_message("Input type should be \'E\' or \'I\'!");
                        var ok = false;
                        break;
                    }
                }
            }
            if (ok) {
                for (i=1;i<=size(this.outtype,"*");i+=1) {
                    if (this.outtype[i-1]!="E"&&this.outtype[i-1]!="I") {
                        x_message("Output type should be \'E\' or \'I\'!");
                        var ok = false;
                        break;
                    }
                }
            }
            if (ok) {
                if (or(size(this.intype)!=size(this.in1))) {
                    x_message("Input variables are not well defined!");
                    var ok = false;
                }
            }
            if (ok) {
                if (or(size(this.outtype)!=size(this.out))) {
                    x_message("Output variables are not well defined!");
                    var ok = false;
                }
            }
            if (ok) {
                var pprop = pprop.slice();
                if ((size(param,"*")!=size(pprop,"*"))) {
                    x_message([["There is differences in"],["size of param and size "],["of param properties."]]);
                    var ok = false;
                }
            }
            if (ok) {
                if (max(pprop)>2||min(pprop)<0) {
                    x_message([["Parameters properties must be :"],["0 : if it is a paramaters"],["1 : if it is an initial value of state,"],["2 : it it is a fixed initial state value."]]);
                    var ok = false;
                }
            }
            if (ok) {
                if (this.funam=="") {
                    x_message("The model name is not defined!");
                    var ok = false;
                }
            }
            if (ok) {
                var tmpvar1 = fileparts(this.funam);
                var dirF = tmpvar1[0];
                var nameF = tmpvar1[1];
                var extF = tmpvar1[2];
                if ((extF!="")||(dirF!="")) {
                    x_message("Invalid model name!");
                    var ok = false;
                }
            }
            if (ok) {
                var intypex = find(this.intype=="I");
                var outtypex = find(this.outtype=="I");
                var tmpvar2 = set_io(this.model,this.graphics,list([ones(this.in1),ones(this.in1)],ones(this.in1)),list([ones(this.out),ones(this.out)],ones(this.out)),[],[],intypex,outtypex);
                this.model = tmpvar2[0];
                this.graphics = tmpvar2[1];
                var ok = tmpvar2[2];
            }
            if (ok) {
                var Tparam_lab = evstr(Tparam);
                var Tparam_sz = size(Tparam_lab,"*");
                if (Tparam_sz>lstsize(lab_2)) {
                    for (i=1;i<=(Tparam_sz-lstsize(lab_2));i+=1) {
                        lab_2[$+1-1] = "0";
                    }
                } else if (Tparam_sz<lstsize(lab_2)) {
                    var lab_2_tmp = list();
                    if (Tparam_sz!=0) {
                        for (i=1;i<=Tparam_sz;i+=1) {
                            var ee = evstr(exprs.param);
                            for (j=1;j<=size(ee,"r");j+=1) {
                                if (ee[j-1]==Tparam_lab[i-1]) {
                                    lab_2_tmp[i-1] = lab_2[j-1];
                                }
                            }
                        }
                        var lab_2 = lab_2_tmp;
                    }
                }
                if (Tparam_sz!=0) {
                    var lhs_txt = "";
                    var lab_txt = "";
                    var rhs_txt = "";
                    for (i=1;i<=Tparam_sz;i+=1) {
                        var lhs_txt = lhs_txt+"%v"+string(i)+",";
                        if (pprop[i-1]==0) {
                            var lab_txt = lab_txt+"\'"+Tparam_lab[i-1]+"\';";
                        } else if (pprop[i-1]==1) {
                            var lab_txt = lab_txt+"\'"+Tparam_lab[i-1]+" (state) \';";
                        } else if (pprop[i-1]==2) {
                            var lab_txt = lab_txt+"\'"+Tparam_lab[i-1]+" (fixed state) \';";
                        }
                        var rhs_txt = rhs_txt+"\'vec\',-1,";
                    }
                    var lhs_txt = part(lhs_txt,1,length(lhs_txt)-1);
                    var lab_txt = part(lab_txt,1,length(lab_txt)-1);
                    var rhs_txt = part(rhs_txt,1,length(rhs_txt)-1);
                    var getvalue_txt = "[ok,"+lhs_txt+",lab_2]=scicos_getvalue(\'Set parameters values\',["+lab_txt+"],"+"list("+rhs_txt+"),lab_2)";
                    execstr(getvalue_txt);
                    if (!ok) {
                        var lab_2 = exprs.paramv;
                    }
                }
            }
            if (ok) {
                var paramv = list();
                for (i=1;i<=Tparam_sz;i+=1) {
                    execstr("paramv("+string(i)+")=%v"+string(i));
                }
            }
            if (ok) {
                var mo = modelica();
                mo.model = nameF;
                mo.inputs = this.in1;
                mo.outputs = this.out;
                if (pprop.length!=0) {
                    if (max(pprop)>0) {
                        mo.parameters = list(transpose(param),paramv,transpose(pprop));
                    } else {
                        mo.parameters = list(transpose(param),paramv);
                    }
                }
                this.model.equations = new ScilabDouble([mo]);
                this.model.rpar = new ScilabDouble([]);
                for (i=1;i<=lstsize(paramv);i+=1) {
                    this.model.rpar = new ScilabDouble([this.model.rpar],[double(paramv[i-1].slice())]);
                }
                this.model.sim[1-1] = new ScilabDouble([this.funam]);
                exprs.in = lab_1[1-1];
                exprs.intype = lab_1[2-1];
                exprs.out = lab_1[3-1];
                exprs.outtype = lab_1[4-1];
                exprs.param = lab_1[5-1];
                exprs.paramv = list();
                if (Tparam_sz!=0) {
                    if (this.type[lab_2-1]==15) {
                        for (i=1;i<=lstsize(lab_2);i+=1) {
                            exprs.paramv[i-1] = lab_2[i-1];
                        }
                    } else {
                        for (i=1;i<=size(lab_2,"*");i+=1) {
                            exprs.paramv[i-1] = lab_2[i-1];
                        }
                    }
                }
                exprs.pprop = lab_1[6-1];
                exprs.nameF = lab_1[7-1];
                exprs.funtxt = "";
                this.x.model = this.model;
                this.graphics.gr_i[1-1][1-1] = new ScilabString(["txt=[\' "+nameF+" \'];"]);
                this.graphics.in_implicit = new ScilabString(this.intype);
                this.graphics.out_implicit = new ScilabDouble(this.outtype);
                this.graphics.exprs = exprs;
                this.x.graphics = this.graphics;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
    MPBLOCK.prototype.get_popup_title = function MPBLOCK() {
        var set_param_popup_title = "Set parameters";
        return set_param_popup_title;
    }
}
