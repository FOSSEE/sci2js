/* autogenerated from "macros/Events/ANDLOG_f.sci" */
function ANDLOG_f() {
    ANDLOG_f.prototype.define = function ANDLOG_f() {
        this.model = scicos_model();
        this.model.sim = new ScilabString(["andlog"]);
        this.model.out = new ScilabDouble([1]);
        this.model.evtin = [[1],[1]];
        this.model.blocktype = new ScilabString(["d"]);
        this.model.firing = [];
        this.model.dep_ut = [false,false];
        gr_i = [];
        this.x = standard_define([3,3],this.model,[],gr_i);
        return new BasicBlock(this.x);
    }
    ANDLOG_f.prototype.details = function ANDLOG_f() {
        return this.x;
    }
    ANDLOG_f.prototype.get = function ANDLOG_f() {
        var options = {
        }
        return options;
    }
    ANDLOG_f.prototype.set = function ANDLOG_f() {
        this.x = arg1;
        return new BasicBlock(this.x);
    }
}
