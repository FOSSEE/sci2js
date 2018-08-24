/* autogenerated from "macros/IntegerOp/BITSET.sci" */
function BITSET() {
    BITSET.prototype.define = function BITSET() {
        this.model = scicos_model();
        this.model.sim = list(new ScilabString(["bit_set_32"]), new ScilabDouble([4]));
        this.model.in = new ScilabDouble([1]);
        this.model.in2 = new ScilabDouble([1]);
        this.model.out = new ScilabDouble([1]);
        this.model.out2 = new ScilabDouble([1]);
        this.model.intyp = new ScilabDouble([3]);
        this.model.outtyp = new ScilabDouble([3]);
        this.model.opar = list(new ScilabDouble([uint32(0)]));
        this.model.blocktype = new ScilabString(["c"]);
        this.model.dep_ut = new ScilabBoolean([true,false]);
        var exprs = [[sci2exp(3)],[sci2exp(0)]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"BITSET\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4,2]),this.model,new ScilabDouble(exprs),gr_i);
        return new BasicBlock(this.x);
    }
    BITSET.prototype.details = function BITSET() {
        return this.x;
    }
    BITSET.prototype.get = function BITSET() {
        var options = {
            Datatype:[msprintf("Data Type %s","(3:int32, 4:int16, 5:int8, ...)"),this.Datatype],
            bit:["Index of Bit (0 is least significant)",this.bit],
        }
        return options;
    }
    BITSET.prototype.set = function BITSET() {
        var exprs = this.graphics.exprs;
        while (true) {
            var ok = true;
            this.Datatype = arguments[0]["Datatype"];
            this.bit = parseFloat(arguments[0]["bit"]);
            if (!ok) {
                break;
            }
            var in1 = [this.model.in,this.model.in2];
            if (floor(this.bit)!=this.bit) {
                block_parameter_error(msprintf("Wrong type for \'%s\' parameter: %5.1f.","Index of Bit",this.bit),"Must be integer.");
                var ok = false;
            }
            if ((this.Datatype==3)||(this.Datatype==6)) {
                if (this.bit>31||this.bit<0) {
                    block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %d.","Index of Bit",this.bit),msprintf("Must be in the interval %s.","[0, 31]"));
                    var ok = false;
                }
                this.bit = uint32(this.bit);
                var n = 2^this.bit;
                var n = uint32(n);
                this.model.sim = list(new ScilabString(["bit_set_32"]), new ScilabDouble([4]));
            } else if ((this.Datatype==4)||(this.Datatype==7)) {
                if (this.bit>15||this.bit<0) {
                    block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %d.","Index of Bit",this.bit),msprintf("Must be in the interval %s.","[0, 15]"));
                    var ok = false;
                }
                this.bit = uint16(this.bit);
                var n = 2^this.bit;
                var n = uint16(n);
                this.model.sim = list(new ScilabString(["bit_set_16"]), new ScilabDouble([4]));
            } else if ((this.Datatype==5)||(this.Datatype==8)) {
                if (this.bit>7||this.bit<0) {
                    block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %d.","Index of Bit",this.bit),msprintf("Must be in the interval %s.","[0, 7]"));
                    var ok = false;
                }
                this.bit = uint8(this.bit);
                var n = 2^this.bit;
                var n = uint8(n);
                this.model.sim = list(new ScilabString(["bit_set_8"]), new ScilabDouble([4]));
            } else {
                block_parameter_error(msprintf("Wrong value for \'%s\' parameter: %d.","Data Type",this.Datatype),msprintf("Must be in the interval %s.","[3, 8]"));
                var ok = false;
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
                this.model.opar = list(new ScilabDouble([n]));
                this.x.graphics = this.graphics;
                this.x.model = this.model;
                break;
            }
        }
        return new BasicBlock(this.x);
    }
    BITSET.prototype.get_popup_title = function BITSET() {
        var set_param_popup_title = msprintf("Set %s block parameters","BITSET");
        return set_param_popup_title;
    }
}
