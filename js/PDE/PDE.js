/* autogenerated from "macros/PDE/PDE.sci" */
function PDE() {
    PDE.prototype.define = function PDE() {
        model = scicos_model();
        model.state = zeros(10,1);
        model.sim = list("PDE",0);
        model.in1 = [[1],[1],[1],[1],[1]];
        model.out = [[10],[0]];
        model.blocktype = "c";
        model.dep_ut = [false,true];
        params_pde = tlist([["paramspde"],["a"],["b"],["txt_exp"],["check_op1"],["a1"],["b1"],["check_op2"],["a2"],["b2"],["check_op3"],["a3"],["b3"],["check_op4"],["a4"],["b4"],["check_op5"],["a5"],["b5"],["check_op6"],["a6"],["b6"],["check_op7"],["a7"],["b7"],["discr_cst"],["discr_non_cst"],["signe"],["rad_automatique"],["rad_manuel"],["methode"],["ord1"],["ord2"],["ord3"],["degre"],["nnode"],["txt_pas"],["CI"],["dCI"],["CLa"],["CLa_exp"],["CLb"],["CLb_exp"],["points"]],"","","","0","","IN_EDP1(t)","0","","IN_EDP2(t)","0","","IN_EDP3(t)","0","","IN_EDP4(t)","0","","IN_EDP5(t)","0","","IN_EDP6(t)","0","","IN_EDP7(t)","0","0","0","0","0","0","","","","","","","","","0","IN_CL1(t)","0","IN_CL2(t)","");
        label = list(params_pde,[],"");
        gr_i = [];
        this.x = standard_define([3,3],model,label,gr_i);
        return new BasicBlock(this.x);
    }
    PDE.prototype.details = function PDE() {
        return this.x;
    }
    PDE.prototype.get = function PDE() {
        var options = {
        }
        return options;
    }
    PDE.prototype.set = function PDE() {
        this.okk = parseBoolean((arguments[0]["okk"]))
        this.rdnom = parseFloat((arguments[0]["rdnom"]))
        this.lab = parseFloat((arguments[0]["lab"]))
        this.x = arg1;
        graphics = arg1.graphics;
        label = graphics.exprs;
        model = arg1.model;
        params_pde = label[1-1];
        while (true) {
            [ln,fun]=where()
            if (!or(fun=="do_eval")) {
                [ok,a_domaine,b_domaine,discr,signe,choix,type_meth,degre,Nbr_maillage,CI,CI1,CLa_type,CLa_exp,CLb_type,CLb_exp,oper,a1,b1,a2,b2,a3,b3,a4,b4,a5,b5,a6,b6,a7,b7,k,mesures,params_pde] = IHM_EDP(params_pde);
                if (ok) {
                    return;
                }
            } else {
                if (exists("%scicos_context")) {
                    [ok,a_domaine,b_domaine,discr,signe,choix,type_meth,degre,Nbr_maillage,CI,CI1,CLa_type,CLa_exp,CLb_type,CLb_exp,oper,a1,b1,a2,b2,a3,b3,a4,b4,a5,b5,a6,b6,a7,b7,k,mesures,params_pde] = setvalue_IHM_EDP(params_pde);
                }
            }
            this.okk = false;
            this.rdnom = "PDE";
            ok1 = true;
            while (true) {
                [this.okk,this.rdnom,this.lab] = scicos_getvalue("PLEASE, GIVE US THE BLOCK\'s NAME. ","New block\'s name :",list("str",1),label[3-1]);
                if (this.okk==false) {
                    ok1 = false;
                    return;
                }
                label[3-1] = this.lab;
                this.rdnom = stripblanks(this.rdnom);
                if (this.rdnom==emptystr()) {
                    ok1 = false;
                    x_message("sorry C file name not defined");
                }
                if (ok1) {
                    break;
                }
            }
            if ((choix==0)) {
                ind4 = strindex(a4,"x");
                ind1 = strindex(a1,"x");
                ind2 = strindex(a2,"x");
                if ((ind4!=[]||ind1!=[]||ind2!=[])) {
                    if ((signe==1)) {
                        delta = 1;
                    } else if ((signe==2)) {
                        delta = -1;
                    } else if ((signe==0)) {
                        delta = 0;
                    } else {
                        x_message([["le discriminant n\'est pas constant,"],["Vous devez choisir son signe dans l\'IHM"]]);
                        return;
                    }
                } else {
                    delta = evstr(a4)^2-4*evstr(a1)*evstr(a2);
                }
                if ((delta==[])) {
                    delta = 0;
                }
                type_meth = this.arbre_decision[delta-1];
            }
            [flag_type,this.rdnom,DF_type,tt] = translate(CI,CI1,CLa_type,CLa_exp,CLb_type,CLb_exp,oper,type_meth,degre,a_domaine,b_domaine,Nbr_maillage,a1,b1,a2,b2,a3,b3,a4,b4,a5,b5,a6,b6,a7,b7,this.rdnom,mesures);
            Nbr = Nbr_maillage;
            if (((CLa_type==1)&&(DF_type==0||DF_type==1))||((CLb_type==1)&&(DF_type==0||DF_type==2))) {
                Nbr = Nbr+1;
            }
            if ((mesures==[])) {
                out = Nbr_maillage;
            } else {
                out = [[Nbr_maillage],[size(mesures,"*")]];
            }
            if ((flag_type==1)) {
                model.sim = list(this.rdnom,2004);
                if ((find(oper==1)!=[])) {
                    model.state = zeros(2*Nbr_maillage,1);
                } else {
                    model.state = zeros(Nbr_maillage,1);
                }
            } else if ((flag_type==2)) {
                model.sim = list(this.rdnom,12004);
                if ((find(oper==1)!=[])) {
                    if ((type_meth==3&&(find(oper==2)!=[]||find(oper==4)!=[]))) {
                        model.state = zeros(6*Nbr_maillage,1);
                    } else if ((type_meth==1)) {
                        model.state = zeros(4*Nbr,1);
                    } else {
                        model.state = zeros(4*Nbr_maillage,1);
                    }
                } else {
                    if ((type_meth==3&&(find(oper==2)!=[]||find(oper==4)!=[]))) {
                        model.state = zeros(4*Nbr_maillage,1);
                    } else if ((type_meth==1)) {
                        model.state = zeros(2*Nbr,1);
                    } else {
                        model.state = zeros(2*Nbr_maillage,1);
                    }
                }
            }
            [ok1] = CFORTREDP(this.rdnom,tt);
            if (!ok1) {
                break;
            }
            if (!ok) {
                [model,graphics,ok] = check_io(model,graphics,ones(k,1),out.slice(),[],[]);
            }
            label[1-1] = params_pde;
            label[2-1] = tt;
            graphics.exprs = label;
            this.x.graphics = graphics;
            this.x.model = model;
            break;
        }
        return new BasicBlock(this.x);
    }
}
