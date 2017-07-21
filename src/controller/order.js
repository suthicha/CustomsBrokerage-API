var squel = require('squel');
var helper = require('../core/helper');
var httpMsg = require('../core/httpMsg');

exports.getList = function(req, resp) {
    
    var sql = squel.select()
        .from("DTR_OrdControl")
        .where("JobStatus >= 1")
        .where("JobStatus <= 3")
        .toString();
    helper.execCommand(req, resp, sql);
}

exports.get = function(req, resp, jobno) {
    try {
        if (!jobno) throw new Error("Input not valid");

        var sql = squel.select()
            .from("DTR_OrdControl")
            .where("JobStatus >= 1")
            .where("JobStatus <= 3")
            .toString();
        helper.execCommand(req, resp, sql);

    }catch (ex) {
        httpMsg.show500(req, resp, ex);
    }
    

}