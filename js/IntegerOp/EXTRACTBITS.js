/* autogenerated from "macros/IntegerOp/EXTRACTBITS.sci" */
function EXTRACTBITS() {
    EXTRACTBITS.prototype.define = function EXTRACTBITS() {
        var numb = [];
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["extract_bit_32_UH0"]), new ScilabDouble([4]));
        this.model.in = new ScilabDouble([1]);
        this.model.in2 = new ScilabDouble([1]);
        this.model.out = new ScilabDouble([1]);
        this.model.out2 = new ScilabDouble([1]);
        this.model.intyp = new ScilabDouble([3]);
        this.model.outtyp = new ScilabDouble([3]);
        this.model.ipar = new ScilabDouble([0,numb]);
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        var exprs = [[sci2exp(3)],[sci2exp(1)],[sci2exp(0)],[sci2exp(0)]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"EXTRACTBITS\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4,2]),this.model,new ScilabDouble(exprs),gr_i);
        return new BasicBlock(this.x);
    }
    EXTRACTBITS.prototype.details = function EXTRACTBITS() {
        return this.x;
    }
    EXTRACTBITS.prototype.get = function EXTRACTBITS() {
        var options = {
            Datatype:[msprintf("Data Type %s","(3:int32, 4:int16, 5:int8, ...)"),this.Datatype],
            rule:["Bits to extract",this.rule],
            bit:["Number of Bits or Index of Bit",this.bit],
            scal:["Treat Bit Field as an Integer (0:No, 1:Yes)",this.scal],
        }
        return options;
    }
    EXTRACTBITS.prototype.set = function EXTRACTBITS() {
        var exprs = this.graphics.exprs;
        while (true) {
            var ok = true;
            this.Datatype = arguments[0]["Datatype"];
            this.rule = parseFloat(arguments[0]["rule"]);
            this.bit = parseFloat(arguments[0]["bit"]);
            this.scal = arguments[0]["scal"];
            if (!ok) {
                break;
            }
            var bitstr = strcat(string(this.bit.slice())," ");
            if ((this.rule<1)||(this.rule>5)) {
                block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %d.","Bits to Extract",this.rule),msprintf("Must be in the interval %s.","[1, 5]"));
                var ok = false;
            } else if (this.scal<0||this.scal>1) {
                block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %d.","Treat Bit Field as an Integer",this.scal),msprintf("Must be in the interval %s.","[0, 1]"));
                var ok = false;
            } else {
                var in1 = [this.model.in,this.model.in2];
                this.bit = int(this.bit);
                this.rule = int(this.rule);
                if ((this.rule==3)||(this.rule==4)) {
                    if ((size(this.bit,"*")!=1)) {
                        block_parameter_error(msprintf("Wrong size for \'%s\' parameter: %s.","Number of Bits or Index of Bit",bitstr),"Must be a single value.");
                        var ok = false;
                    } else {
                        var numb = this.bit;
                    }
                } else if ((this.rule==5)) {
                    if ((size(this.bit,"*")!=2)) {
                        block_parameter_error(msprintf("Wrong size for \'%s\' parameter: %s.","Number of Bits or Index of Bit",bitstr),"Must have this form: [Start, End].");
                        var ok = false;
                    } else if (this.bit[1-1]>this.bit[2-1]) {
                        block_parameter_error(msprintf("Wrong values for \'%s\' parameter: %s.","Number of Bits or Index of Bit",bitstr),msprintf("\'Start\' must be less than \'End\'."));
                        var ok = false;
                    } else {
                        var numb = this.bit[2-1]-this.bit[1-1];
                    }
                } else {
                    this.bit = 0;
                    var numb = [];
                }
            }
            if (ok) {
                if ((this.Datatype==3||this.Datatype==6)) {
                    if (or(this.bit.slice()>31)||or(this.bit.slice()<0)) {
                        block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %s.","Number of Bits or Index of Bit",bitstr),msprintf("Indexes must be in the interval %s.","[0, 31]"));
                        var ok = false;
                    }
                    switch (this.rule) {
                    case 1:
                        switch (this.scal) {
                        case 0:
                            this.model.sim = list(new ScilabString(["extract_bit_32_UH0"]), new ScilabDouble([4]));
                        case 1:
                            switch (this.Datatype) {
                            case 3:
                                this.model.sim = list(new ScilabString(["extract_bit_32_UH1"]), new ScilabDouble([4]));
                            case 6:
                                this.model.sim = list(new ScilabString(["extract_bit_u32_UH1"]), new ScilabDouble([4]));
                            }
                        }
                    case 2:
                        this.model.sim = list(new ScilabString(["extract_bit_32_LH"]), new ScilabDouble([4]));
                    case 3:
                        switch (this.scal) {
                        case 0:
                            this.model.sim = list(new ScilabString(["extract_bit_32_MSB0"]), new ScilabDouble([4]));
                        case 1:
                            switch (this.Datatype) {
                            case 3:
                                this.model.sim = list(new ScilabString(["extract_bit_32_MSB1"]), new ScilabDouble([4]));
                            case 6:
                                this.model.sim = list(new ScilabString(["extract_bit_u32_MSB1"]), new ScilabDouble([4]));
                            }
                        }
                    case 4:
                        this.model.sim = list(new ScilabString(["extract_bit_32_LSB"]), new ScilabDouble([4]));
                    case 5:
                        switch (this.scal) {
                        case 0:
                            this.model.sim = list(new ScilabString(["extract_bit_32_RB0"]), new ScilabDouble([4]));
                        case 1:
                            switch (this.Datatype) {
                            case 3:
                                this.model.sim = list(new ScilabString(["extract_bit_32_RB1"]), new ScilabDouble([4]));
                            case 6:
                                this.model.sim = list(new ScilabString(["extract_bit_u32_RB1"]), new ScilabDouble([4]));
                            }
                        }
                    }
                } else if ((this.Datatype==4||this.Datatype==7)) {
                    if (or(this.bit.slice()>15)||or(this.bit.slice()<0)) {
                        block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %s.","Number of Bits or Index of Bit",bitstr),msprintf("Indexes must be in the interval %s.","[0, 15]"));
                        var ok = false;
                    }
                    switch (this.rule) {
                    case 1:
                        switch (this.scal) {
                        case 0:
                            this.model.sim = list(new ScilabString(["extract_bit_16_UH0"]), new ScilabDouble([4]));
                        case 1:
                            switch (this.Datatype) {
                            case 4:
                                this.model.sim = list(new ScilabString(["extract_bit_16_UH1"]), new ScilabDouble([4]));
                            case 7:
                                this.model.sim = list(new ScilabString(["extract_bit_u16_UH1"]), new ScilabDouble([4]));
                            }
                        }
                    case 2:
                        this.model.sim = list(new ScilabString(["extract_bit_16_LH"]), new ScilabDouble([4]));
                    case 3:
                        switch (this.scal) {
                        case 0:
                            this.model.sim = list(new ScilabString(["extract_bit_16_MSB0"]), new ScilabDouble([4]));
                        case 1:
                            switch (this.Datatype) {
                            case 4:
                                this.model.sim = list(new ScilabString(["extract_bit_16_MSB1"]), new ScilabDouble([4]));
                            case 7:
                                this.model.sim = list(new ScilabString(["extract_bit_u16_MSB1"]), new ScilabDouble([4]));
                            }
                        }
                    case 4:
                        this.model.sim = list(new ScilabString(["extract_bit_16_LSB"]), new ScilabDouble([4]));
                    case 5:
                        switch (this.scal) {
                        case 0:
                            this.model.sim = list(new ScilabString(["extract_bit_16_RB0"]), new ScilabDouble([4]));
                        case 1:
                            switch (this.Datatype) {
                            case 4:
                                this.model.sim = list(new ScilabString(["extract_bit_16_RB1"]), new ScilabDouble([4]));
                            case 7:
                                this.model.sim = list(new ScilabString(["extract_bit_u16_RB1"]), new ScilabDouble([4]));
                            }
                        }
                    }
                } else if ((this.Datatype==5||this.Datatype==8)) {
                    if (or(this.bit.slice()>7)||or(this.bit.slice()<0)) {
                        block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %s.","Number of Bits or Index of Bit",bitstr),msprintf("Indexes must be in the interval %s.","[0, 7]"));
                        var ok = false;
                    }
                    switch (this.rule) {
                    case 1:
                        switch (this.scal) {
                        case 0:
                            this.model.sim = list(new ScilabString(["extract_bit_8_UH0"]), new ScilabDouble([4]));
                        case 1:
                            switch (this.Datatype) {
                            case 5:
                                this.model.sim = list(new ScilabString(["extract_bit_8_UH1"]), new ScilabDouble([4]));
                            case 8:
                                this.model.sim = list(new ScilabString(["extract_bit_u8_UH1"]), new ScilabDouble([4]));
                            }
                        }
                    case 2:
                        this.model.sim = list(new ScilabString(["extract_bit_8_LH"]), new ScilabDouble([4]));
                    case 3:
                        switch (this.scal) {
                        case 0:
                            this.model.sim = list(new ScilabString(["extract_bit_8_MSB0"]), new ScilabDouble([4]));
                        case 1:
                            switch (this.Datatype) {
                            case 5:
                                this.model.sim = list(new ScilabString(["extract_bit_8_MSB1"]), new ScilabDouble([4]));
                            case 8:
                                this.model.sim = list(new ScilabString(["extract_bit_u8_MSB1"]), new ScilabDouble([4]));
                            }
                        }
                    case 4:
                        this.model.sim = list(new ScilabString(["extract_bit_8_LSB"]), new ScilabDouble([4]));
                    case 5:
                        switch (this.scal) {
                        case 0:
                            this.model.sim = list(new ScilabString(["extract_bit_8_RB0"]), new ScilabDouble([4]));
                        case 1:
                            switch (this.Datatype) {
                            case 5:
                                this.model.sim = list(new ScilabString(["extract_bit_8_RB1"]), new ScilabDouble([4]));
                            case 8:
                                this.model.sim = list(new ScilabString(["extract_bit_u8_RB1"]), new ScilabDouble([4]));
                            }
                        }
                    }
                } else {
                    block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %d.","Data Type",this.Datatype),msprintf("Must be in the interval %s.","[3, 8]"));
                    var ok = false;
                }
            }
            if (ok) {
                var it = this.Datatype;
                var ot = this.Datatype;
                var out = [1,1];
                var tmpvar0 = set_io(this.model,this.graphics,list(in1,it),list(out,ot),[],[]);
                this.model = tmpvar0[0];
                this.graphics = tmpvar0[1];
                var ok = tmpvar0[2];
            }
            if (ok) {
                this.graphics.exprs = new ScilabDouble([exprs]);
                this.model.ipar = new ScilabDouble([int(this.bit.slice())],[int(numb.slice())]);
                this.x.graphics = this.graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
}
