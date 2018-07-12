/* autogenerated from "macros/IntegerOp/CONVERT.sci" */
function CONVERT() {
    CONVERT.prototype.define = function CONVERT() {
        var sgn = 2;
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["convert"]), new ScilabDouble([4]));
        this.model.in1 = new ScilabDouble([-1]);
        this.model.out = new ScilabDouble([-1]);
        this.model.in2 = new ScilabDouble([-2]);
        this.model.out2 = new ScilabDouble([-2]);
        this.model.intyp = new ScilabDouble([1]);
        this.model.outtyp = new ScilabDouble([3]);
        this.model.rpar = new ScilabDouble([]);
        this.model.ipar = new ScilabDouble([sgn]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabDouble([true,false]);
        this.exprs = [[sci2exp(1)],[sci2exp(3)],[sci2exp(0)]];
        this.gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CONVERT\",sz(1),sz(2));"]);
        this.x = standard_define([3,2],this.model,this.exprs,this.gr_i);
        return new BasicBlock(this.x);
    }
    CONVERT.prototype.details = function CONVERT() {
        return this.x;
    }
    CONVERT.prototype.get = function CONVERT() {
        var options = {
            it:["Input Type (1:double, 3:int32, 4:int16, 5:int8, ...)",this.it],
            ot:["Output Type (1:double, 3:int32, 4:int16, 5:int8, ...)",this.ot],
            np:["Do on Overflow (0:Nothing, 1:Saturate, 2:Error)",this.np],
        }
        return options;
    }
    CONVERT.prototype.set = function CONVERT() {
        this.it = parseFloat(arguments[0]["it"])
        this.ot = parseFloat(arguments[0]["ot"])
        this.np = arguments[0]["np"]
        this.exprs = arguments[0]["exprs"]
        this.x = arg1;
        this.graphics = arg1.graphics;
        this.model = arg1.model;
        this.exprs = this.graphics.exprs;
        while (true) {
            [ok,this.it,this.ot,this.np,this.exprs] = scicos_getvalue([[msprintf("Set %s block parameters","CONVERT")],[" "],["Type conversion"],[" "]],["Input Type (1:double, 3:int32, 4:int16, 5:int8, ...)","Output Type (1:double, 3:int32, 4:int16, 5:int8, ...)","Do on Overflow (0:Nothing, 1:Saturate, 2:Error)"],list("vec",1,"vec",1,"vec",1),this.exprs);
            if (!ok) {
                break;
            }
            if (this.it==2) {
                this.it = 1;
            }
            if (this.ot==2) {
                this.ot = 1;
            }
            if ((this.np!=0&&this.np!=1&&this.np!=2)) {
                block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %d.","Do on Overflow",this.np),msprintf("Must be in the interval %s.","[0, 2]"));
                var ok = false;
            } else if ((this.it>8||this.it<1)) {
                block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %d.","Input Type",this.it),msprintf("Must be in the interval %s.","[1, 8]"));
                var ok = false;
            } else if ((this.ot>8||this.ot<1)) {
                block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %d.","Output Type",this.ot),msprintf("Must be in the interval %s.","[1, 8]"));
                var ok = false;
            }
            this.model.sim = list(new ScilabString(["convert"]), new ScilabDouble([4]));
            if ((this.it==this.ot)) {
                this.model.ipar = new ScilabDouble([1]);
            } else {
                if ((this.np==0)) {
                    if ((this.it==1)) {
                        if ((this.ot==3)) {
                            this.model.ipar = new ScilabDouble([2]);
                        } else if ((this.ot==4)) {
                            this.model.ipar = new ScilabDouble([3]);
                        } else if ((this.ot==5)) {
                            this.model.ipar = new ScilabDouble([4]);
                        } else if ((this.ot==6)) {
                            this.model.ipar = new ScilabDouble([5]);
                        } else if ((this.ot==7)) {
                            this.model.ipar = new ScilabDouble([6]);
                        } else if ((this.ot==8)) {
                            this.model.ipar = new ScilabDouble([7]);
                        }
                    } else if ((this.it==3)) {
                        if ((this.ot==1)) {
                            this.model.ipar = new ScilabDouble([8]);
                        } else if ((this.ot==4)) {
                            this.model.ipar = new ScilabDouble([9]);
                        } else if ((this.ot==5)) {
                            this.model.ipar = new ScilabDouble([10]);
                        } else if ((this.ot==6)) {
                            this.model.ipar = new ScilabDouble([1]);
                        } else if ((this.ot==7)) {
                            this.model.ipar = new ScilabDouble([11]);
                        } else if ((this.ot==8)) {
                            this.model.ipar = new ScilabDouble([12]);
                        }
                    } else if ((this.it==4)) {
                        if ((this.ot==1)) {
                            this.model.ipar = new ScilabDouble([13]);
                        } else if ((this.ot==3)) {
                            this.model.ipar = new ScilabDouble([14]);
                        } else if ((this.ot==5)) {
                            this.model.ipar = new ScilabDouble([15]);
                        } else if ((this.ot==6)) {
                            this.model.ipar = new ScilabDouble([16]);
                        } else if ((this.ot==7)) {
                            this.model.ipar = new ScilabDouble([1]);
                        } else if ((this.ot==8)) {
                            this.model.ipar = new ScilabDouble([17]);
                        }
                    } else if ((this.it==5)) {
                        if ((this.ot==1)) {
                            this.model.ipar = new ScilabDouble([18]);
                        } else if ((this.ot==3)) {
                            this.model.ipar = new ScilabDouble([19]);
                        } else if ((this.ot==4)) {
                            this.model.ipar = new ScilabDouble([20]);
                        } else if ((this.ot==6)) {
                            this.model.ipar = new ScilabDouble([21]);
                        } else if ((this.ot==7)) {
                            this.model.ipar = new ScilabDouble([22]);
                        } else if ((this.ot==8)) {
                            this.model.ipar = new ScilabDouble([1]);
                        }
                    } else if ((this.it==6)) {
                        if ((this.ot==1)) {
                            this.model.ipar = new ScilabDouble([23]);
                        } else if ((this.ot==3)) {
                            this.model.ipar = new ScilabDouble([1]);
                        } else if ((this.ot==4)) {
                            this.model.ipar = new ScilabDouble([24]);
                        } else if ((this.ot==5)) {
                            this.model.ipar = new ScilabDouble([25]);
                        } else if ((this.ot==7)) {
                            this.model.ipar = new ScilabDouble([26]);
                        } else if ((this.ot==8)) {
                            this.model.ipar = new ScilabDouble([27]);
                        }
                    } else if ((this.it==7)) {
                        if ((this.ot==1)) {
                            this.model.ipar = new ScilabDouble([28]);
                        } else if ((this.ot==3)) {
                            this.model.ipar = new ScilabDouble([29]);
                        } else if ((this.ot==4)) {
                            this.model.ipar = new ScilabDouble([1]);
                        } else if ((this.ot==5)) {
                            this.model.ipar = new ScilabDouble([30]);
                        } else if ((this.ot==6)) {
                            this.model.ipar = new ScilabDouble([31]);
                        } else if ((this.ot==8)) {
                            this.model.ipar = new ScilabDouble([32]);
                        }
                    } else if ((this.it==8)) {
                        if ((this.ot==1)) {
                            this.model.ipar = new ScilabDouble([33]);
                        } else if ((this.ot==3)) {
                            this.model.ipar = new ScilabDouble([34]);
                        } else if ((this.ot==4)) {
                            this.model.ipar = new ScilabDouble([35]);
                        } else if ((this.ot==5)) {
                            this.model.ipar = new ScilabDouble([1]);
                        } else if ((this.ot==6)) {
                            this.model.ipar = new ScilabDouble([36]);
                        } else if ((this.ot==7)) {
                            this.model.ipar = new ScilabDouble([37]);
                        }
                    }
                } else if ((this.np==1)) {
                    if ((this.it==1)) {
                        if ((this.ot==3)) {
                            this.model.ipar = new ScilabDouble([38]);
                        } else if ((this.ot==4)) {
                            this.model.ipar = new ScilabDouble([39]);
                        } else if ((this.ot==5)) {
                            this.model.ipar = new ScilabDouble([40]);
                        } else if ((this.ot==6)) {
                            this.model.ipar = new ScilabDouble([41]);
                        } else if ((this.ot==7)) {
                            this.model.ipar = new ScilabDouble([42]);
                        } else if ((this.ot==8)) {
                            this.model.ipar = new ScilabDouble([43]);
                        }
                    } else if ((this.it==3)) {
                        if ((this.ot==1)) {
                            this.model.ipar = new ScilabDouble([8]);
                        } else if ((this.ot==4)) {
                            this.model.ipar = new ScilabDouble([44]);
                        } else if ((this.ot==5)) {
                            this.model.ipar = new ScilabDouble([45]);
                        } else if ((this.ot==6)) {
                            this.model.ipar = new ScilabDouble([46]);
                        } else if ((this.ot==7)) {
                            this.model.ipar = new ScilabDouble([47]);
                        } else if ((this.ot==8)) {
                            this.model.ipar = new ScilabDouble([48]);
                        }
                    } else if ((this.it==4)) {
                        if ((this.ot==1)) {
                            this.model.ipar = new ScilabDouble([13]);
                        } else if ((this.ot==3)) {
                            this.model.ipar = new ScilabDouble([14]);
                        } else if ((this.ot==5)) {
                            this.model.ipar = new ScilabDouble([49]);
                        } else if ((this.ot==6)) {
                            this.model.ipar = new ScilabDouble([50]);
                        } else if ((this.ot==7)) {
                            this.model.ipar = new ScilabDouble([51]);
                        } else if ((this.ot==8)) {
                            this.model.ipar = new ScilabDouble([52]);
                        }
                    } else if ((this.it==5)) {
                        if ((this.ot==1)) {
                            this.model.ipar = new ScilabDouble([18]);
                        } else if ((this.ot==3)) {
                            this.model.ipar = new ScilabDouble([19]);
                        } else if ((this.ot==4)) {
                            this.model.ipar = new ScilabDouble([20]);
                        } else if ((this.ot==6)) {
                            this.model.ipar = new ScilabDouble([53]);
                        } else if ((this.ot==7)) {
                            this.model.ipar = new ScilabDouble([54]);
                        } else if ((this.ot==8)) {
                            this.model.ipar = new ScilabDouble([55]);
                        }
                    } else if ((this.it==6)) {
                        if ((this.ot==1)) {
                            this.model.ipar = new ScilabDouble([23]);
                        } else if ((this.ot==3)) {
                            this.model.ipar = new ScilabDouble([56]);
                        } else if ((this.ot==4)) {
                            this.model.ipar = new ScilabDouble([57]);
                        } else if ((this.ot==5)) {
                            this.model.ipar = new ScilabDouble([58]);
                        } else if ((this.ot==7)) {
                            this.model.ipar = new ScilabDouble([59]);
                        } else if ((this.ot==8)) {
                            this.model.ipar = new ScilabDouble([60]);
                        }
                    } else if ((this.it==7)) {
                        if ((this.ot==1)) {
                            this.model.ipar = new ScilabDouble([28]);
                        } else if ((this.ot==3)) {
                            this.model.ipar = new ScilabDouble([29]);
                        } else if ((this.ot==4)) {
                            this.model.ipar = new ScilabDouble([61]);
                        } else if ((this.ot==5)) {
                            this.model.ipar = new ScilabDouble([62]);
                        } else if ((this.ot==6)) {
                            this.model.ipar = new ScilabDouble([31]);
                        } else if ((this.ot==8)) {
                            this.model.ipar = new ScilabDouble([63]);
                        }
                    } else if ((this.it==8)) {
                        if ((this.ot==1)) {
                            this.model.ipar = new ScilabDouble([33]);
                        } else if ((this.ot==3)) {
                            this.model.ipar = new ScilabDouble([34]);
                        } else if ((this.ot==4)) {
                            this.model.ipar = new ScilabDouble([35]);
                        } else if ((this.ot==5)) {
                            this.model.ipar = new ScilabDouble([64]);
                        } else if ((this.ot==6)) {
                            this.model.ipar = new ScilabDouble([36]);
                        } else if ((this.ot==7)) {
                            this.model.ipar = new ScilabDouble([37]);
                        }
                    }
                } else if ((this.np==2)) {
                    if ((this.it==1)) {
                        if ((this.ot==3)) {
                            this.model.ipar = new ScilabDouble([65]);
                        } else if ((this.ot==4)) {
                            this.model.ipar = new ScilabDouble([66]);
                        } else if ((this.ot==5)) {
                            this.model.ipar = new ScilabDouble([67]);
                        } else if ((this.ot==6)) {
                            this.model.ipar = new ScilabDouble([68]);
                        } else if ((this.ot==7)) {
                            this.model.ipar = new ScilabDouble([69]);
                        } else if ((this.ot==8)) {
                            this.model.ipar = new ScilabDouble([70]);
                        }
                    } else if ((this.it==3)) {
                        if ((this.ot==1)) {
                            this.model.ipar = new ScilabDouble([8]);
                        } else if ((this.ot==4)) {
                            this.model.ipar = new ScilabDouble([71]);
                        } else if ((this.ot==5)) {
                            this.model.ipar = new ScilabDouble([72]);
                        } else if ((this.ot==6)) {
                            this.model.ipar = new ScilabDouble([73]);
                        } else if ((this.ot==7)) {
                            this.model.ipar = new ScilabDouble([74]);
                        } else if ((this.ot==8)) {
                            this.model.ipar = new ScilabDouble([75]);
                        }
                    } else if ((this.it==4)) {
                        if ((this.ot==1)) {
                            this.model.ipar = new ScilabDouble([13]);
                        } else if ((this.ot==3)) {
                            this.model.ipar = new ScilabDouble([14]);
                        } else if ((this.ot==5)) {
                            this.model.ipar = new ScilabDouble([76]);
                        } else if ((this.ot==6)) {
                            this.model.ipar = new ScilabDouble([77]);
                        } else if ((this.ot==7)) {
                            this.model.ipar = new ScilabDouble([78]);
                        } else if ((this.ot==8)) {
                            this.model.ipar = new ScilabDouble([79]);
                        }
                    } else if ((this.it==5)) {
                        if ((this.ot==1)) {
                            this.model.ipar = new ScilabDouble([18]);
                        } else if ((this.ot==3)) {
                            this.model.ipar = new ScilabDouble([19]);
                        } else if ((this.ot==4)) {
                            this.model.ipar = new ScilabDouble([20]);
                        } else if ((this.ot==6)) {
                            this.model.ipar = new ScilabDouble([80]);
                        } else if ((this.ot==7)) {
                            this.model.ipar = new ScilabDouble([81]);
                        } else if ((this.ot==8)) {
                            this.model.ipar = new ScilabDouble([82]);
                        }
                    } else if ((this.it==6)) {
                        if ((this.ot==1)) {
                            this.model.ipar = new ScilabDouble([23]);
                        } else if ((this.ot==3)) {
                            this.model.ipar = new ScilabDouble([83]);
                        } else if ((this.ot==4)) {
                            this.model.ipar = new ScilabDouble([84]);
                        } else if ((this.ot==5)) {
                            this.model.ipar = new ScilabDouble([85]);
                        } else if ((this.ot==7)) {
                            this.model.ipar = new ScilabDouble([86]);
                        } else if ((this.ot==8)) {
                            this.model.ipar = new ScilabDouble([87]);
                        }
                    } else if ((this.it==7)) {
                        if ((this.ot==1)) {
                            this.model.ipar = new ScilabDouble([28]);
                        } else if ((this.ot==3)) {
                            this.model.ipar = new ScilabDouble([29]);
                        } else if ((this.ot==4)) {
                            this.model.ipar = new ScilabDouble([88]);
                        } else if ((this.ot==5)) {
                            this.model.ipar = new ScilabDouble([89]);
                        } else if ((this.ot==6)) {
                            this.model.ipar = new ScilabDouble([31]);
                        } else if ((this.ot==8)) {
                            this.model.ipar = new ScilabDouble([90]);
                        }
                    } else if ((this.it==8)) {
                        if ((this.ot==1)) {
                            this.model.ipar = new ScilabDouble([33]);
                        } else if ((this.ot==3)) {
                            this.model.ipar = new ScilabDouble([34]);
                        } else if ((this.ot==4)) {
                            this.model.ipar = new ScilabDouble([35]);
                        } else if ((this.ot==5)) {
                            this.model.ipar = new ScilabDouble([91]);
                        } else if ((this.ot==6)) {
                            this.model.ipar = new ScilabDouble([36]);
                        } else if ((this.ot==7)) {
                            this.model.ipar = new ScilabDouble([37]);
                        }
                    }
                }
            }
            var in1 = [this.model.in1,this.model.in2];
            var out = [this.model.out,this.model.out2];
            if (ok) {
                var tmpvar0 = set_io(this.model,this.graphics,list(in1,this.it),list(out,this.ot),[],[]);
                this.model = tmpvar0[0];
                this.graphics = tmpvar0[1];
                var ok = tmpvar0[2];
            }
            if (ok) {
                this.graphics.exprs = new ScilabDouble([this.exprs]);
                this.x.graphics = this.graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
}
