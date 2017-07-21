'use strict';

var squel = require('squel');
var db = require('../core/db');
var httpMsg = require('../core/httpMsg');
var helper = require('../core/helper');

exports.getList = function (req, resp) {
    var sql = squel.select().from("DTM_Companies").order("CustName", true).toString();

    db.executeSql(sql, function (data, err) {
        if (err) {
            httpMsg.show500(req, resp, err);
        } else {
            httpMsg.sendJson(req, resp, data);
        }
    });
};

exports.get = function (req, resp, id) {
    try {
        if (!id) throw new Error("Input not valid");
        var sql = squel.select().from("DTM_Companies").where("TrxId = ?", id).toString();

        db.executeSql(sql, function (data, err) {
            if (err) {
                httpMsg.show500(req, resp, err);
            } else {
                httpMsg.sendJson(req, resp, data);
            }
        });
    } catch (ex) {
        httpMsg.show500(req, resp, ex);
    }
};

exports.add = function (req, resp) {
    try {
        if (!req.body) throw new Error("Input not valid");
        var data = req.body;

        if (data) {
            var sql = squel.insert().into("DTM_Companies").set("CustCode", helper.StringNull(data.CustCode)).set("TaxNumber", helper.StringNull(data.TaxNumber)).set("BranchNo", helper.StringNull(data.BranchNo)).set("CustName", helper.StringNull(data.CustName)).set("Street", helper.StringNull(data.Street)).set("District", helper.StringNull(data.District)).set("SubProvince", helper.StringNull(data.SubProvince)).set("Province", helper.StringNull(data.Province)).set("PostCode", helper.StringNull(data.PostCode)).set("Phone", helper.StringNull(data.Phone)).set("CountryCode", helper.StringNull(data.CountryCode)).set("Email", helper.StringNull(data.Email)).set("TagCode", helper.StringNull(data.TagCode)).set("CustStatus", "A").toString();

            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsg.show500(req, resp, err);
                } else {
                    httpMsg.sendJson(req, resp, data);
                }
            });
        }
    } catch (ex) {
        httpMsg.show500(req, resp, ex);
    }
};

exports.update = function (req, resp) {
    try {
        if (!req.body) throw new Error("Input not valid");
        var data = req.body;

        if (data) {
            var sql = squel.update().table("DTM_Companies").set("CustCode", helper.StringNull(data.CustCode)).set("TaxNumber", helper.StringNull(data.TaxNumber)).set("BranchNo", helper.StringNull(data.BranchNo)).set("CustName", helper.StringNull(data.CustName)).set("Street", helper.StringNull(data.Street)).set("District", helper.StringNull(data.District)).set("SubProvince", helper.StringNull(data.SubProvince)).set("Province", helper.StringNull(data.Province)).set("PostCode", helper.StringNull(data.PostCode)).set("Phone", helper.StringNull(data.Phone)).set("CountryCode", helper.StringNull(data.CountryCode)).set("Email", helper.StringNull(data.Email)).set("TagCode", helper.StringNull(data.TagCode)).where("TrxId = ?", data.TrxId).toString();

            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsg.show500(req, resp, err);
                } else {
                    httpMsg.sendJson(req, resp, data);
                }
            });
        }
    } catch (ex) {
        httpMsg.show500(req, resp, ex);
    }
};

exports.delete = function (req, resp) {
    try {
        if (!req.body) throw new Error("Input not valid");
        var data = req.body;

        if (data) {
            var sql = squel.delete().from("DTM_Companies").where("TrxId = ?", data.TrxId).toString();

            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsg.show500(req, resp, err);
                } else {
                    httpMsg.sendJson(req, resp, data);
                }
            });
        }
    } catch (ex) {
        httpMsg.show500(req, resp, ex);
    }
};
//# sourceMappingURL=company.js.map