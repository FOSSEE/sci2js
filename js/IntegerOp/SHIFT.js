/* autogenerated from "macros/IntegerOp/SHIFT.sci" */
function SHIFT() {
    SHIFT.prototype.define = function SHIFT() {
        sgn = [[0],[0]];
        OPER = 0;
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["shift_32_LA"]), new ScilabDouble([4]));
        this.model.in1 = new ScilabDouble([-1]);
        this.model.out = new ScilabDouble([-1]);
        this.model.in2 = new ScilabDouble([-2]);
        this.model.out2 = new ScilabDouble([-2]);
        this.model.intyp = new ScilabDouble([3]);
        this.model.outtyp = new ScilabDouble([3]);
        this.model.rpar = [];
        this.model.ipar = sgn;
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = [true,false];
        exprs = [[sci2exp(3)],[sci2exp(0)],[sci2exp(0)]];
        gr_i = [];
        this.x = standard_define([3,2],this.model,exprs,gr_i);
        return new BasicBlock(this.x);
    }
    SHIFT.prototype.details = function SHIFT() {
        return this.x;
    }
    SHIFT.prototype.get = function SHIFT() {
        var options = {
            Datatype:[msprintf("Data Type %s","(3:int32, 4:int16, 5:int8, ...)"),this.Datatype],
            nb:["Number of Bits to Shift Left (Negative number to shift right)",this.nb],
            np:["Shift Type (0:Arithmetic, 1:Circular)",this.np],
        }
        return options;
    }
    SHIFT.prototype.set = function SHIFT() {
        this.Datatype = arguments[0]["Datatype"]
        this.nb = arguments[0]["nb"]
        this.np = arguments[0]["np"]
        this.x = arg1;
        graphics = arg1.graphics;
        this.model = arg1.model;
        exprs = graphics.exprs;
        while (true) {
            [ok,this.Datatype,this.nb,this.np,exprs] = scicos_getvalue([[msprintf("Set %s block parameters","SHIFT")],[" "],["Shift/Rotates bits"]],[msprintf("Data Type %s","(3:int32, 4:int16, 5:int8, ...)"),"Number of Bits to Shift Left (Negative number to shift right)","Shift Type (0:Arithmetic, 1:Circular)"],list("vec",1,"vec",1,"vec",1),exprs);
            if (!ok) {
                break;
            }
            if ((this.np!=0&&this.np!=1)) {
                block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %d.","Shift Type",this.np),msprintf("Must be in the interval %s.","[0, 1]"));
                ok = false;
            }
            it = this.Datatype;
            ot = this.Datatype;
            if ((this.Datatype==3||this.Datatype==6)) {
                if (this.nb>0) {
                    switch (this.np) {
                    case 0:
                        this.model.sim = list(new ScilabString(["shift_32_LA"]), new ScilabDouble([4]));
                    case 1:
                        this.model.sim = list(new ScilabString(["shift_32_LC"]), new ScilabDouble([4]));
                    }
                } else if (this.nb<0) {
                    switch (this.np) {
                    case 0:
                        switch (this.Datatype) {
                        case 3:
                            this.model.sim = list(new ScilabString(["shift_32_RA"]), new ScilabDouble([4]));
                        case 6:
                            this.model.sim = list(new ScilabString(["shift_u32_RA"]), new ScilabDouble([4]));
                        }
                    case 1:
                        this.model.sim = list(new ScilabString(["shift_32_RC"]), new ScilabDouble([4]));
                    }
                }
            } else if ((this.Datatype==4||this.Datatype==7)) {
                if (this.nb>0) {
                    switch (this.np) {
                    case 0:
                        this.model.sim = list(new ScilabString(["shift_16_LA"]), new ScilabDouble([4]));
                    case 1:
                        this.model.sim = list(new ScilabString(["shift_16_LC"]), new ScilabDouble([4]));
                    }
                } else if (this.nb<0) {
                    switch (this.np) {
                    case 0:
                        switch (this.Datatype) {
                        case 4:
                            this.model.sim = list(new ScilabString(["shift_16_RA"]), new ScilabDouble([4]));
                        case 7:
                            this.model.sim = list(new ScilabString(["shift_u16_RA"]), new ScilabDouble([4]));
                        }
                    case 1:
                        this.model.sim = list(new ScilabString(["shift_16_RC"]), new ScilabDouble([4]));
                    }
                }
            } else if ((this.Datatype==5||this.Datatype==8)) {
                if (this.nb>0) {
                    switch (this.np) {
                    case 0:
                        this.model.sim = list(new ScilabString(["shift_8_LA"]), new ScilabDouble([4]));
                    case 1:
                        this.model.sim = list(new ScilabString(["shift_8_LC"]), new ScilabDouble([4]));
                    }
                } else if (this.nb<0) {
                    switch (this.np) {
                    case 0:
                        switch (this.Datatype) {
                        case 5:
                            this.model.sim = list(new ScilabString(["shift_8_RA"]), new ScilabDouble([4]));
                        case 8:
                            this.model.sim = list(new ScilabString(["shift_u8_RA"]), new ScilabDouble([4]));
                        }
                    case 1:
                        this.model.sim = list(new ScilabString(["shift_8_RC"]), new ScilabDouble([4]));
                    }
                }
            } else {
                block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %d.","Data Type",this.Datatype),msprintf("Must be in the interval %s.","[3, 8]"));
                ok = false;
            }
            if (ok) {
                [model,graphics,ok] = set_io(this.model,graphics,list([-1,-2],it),list([-1,-2],ot),[],[]);
            }
            if (ok) {
                this.model.ipar = new ScilabDouble([this.nb]);
                graphics.exprs = exprs;
                this.x.graphics = graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
}
