var util = require('util');
var db = require('../core/db');
var httpMsg = require('../core/httpMsg');
var helper = require('../core/helper');
var settings = require('../settings');


exports.getList = function(req, resp, taxno){

    try{
        if (!taxno) throw new Error("Input not valid");
        db.executeSql(`SELECT * FROM DTM_Product WHERE PdtStatus='A'`, function(data, err){
            if(err){
            httpMsg.show500(req, resp, err);
            }
            else {
            httpMsg.sendJson(req, resp, data);
            }
        });

    }catch(ex){
        httpMsg.show500(req, resp, ex);
    }

}

exports.getProduct = function(req, resp, taxno){

    try{
        if (!taxno) throw new Error("Input not valid");
        db.executeSql(`SELECT * FROM DTM_Product WHERE TaxNumber='A' AND PdtStatus='A'`, function(data, err){
            if(err){
            httpMsg.show500(req, resp, err);
            }
            else {
            httpMsg.sendJson(req, resp, data);
            }
        });

    }catch(ex){
        httpMsg.show500(req, resp, ex);
    }

}