var squel = require('squel');
var db = require('../core/db');
var httpMsg = require('../core/httpMsg');
var helper = require('../core/helper');

exports.getList = function(req, resp){

    try{
        
        var sql = squel.select()
                .from("DTM_Product")
                .where("PdtStatus='A'")
                .toString();
        db.executeSql(sql, function(data, err){
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
        var sql = squel.select()
                .from("DTM_Product")
                .where("PdtStatus='A'")
                .where("TaxNumber = ?", taxno)
                .toString();
        
        db.executeSql(sql, function(data, err){
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

exports.get = function(req, resp, taxno, id){
    try{
        if (!id) throw new Error("Input not valid");
        if (!taxno) throw new Error("Input not valid");
        
        var sql = squel.select()
                .from("DTM_Product")
                .where("PdtStatus='A'")
                .where("TrxId = ?", id)
                .toString();
        
        db.executeSql(sql, function(data, err){
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

exports.add = function(req, resp){
    try{
        if (!req.body) throw new Error("Input not valid");
        var data = req.body;

        var sql = squel.insert()
            .into("DTM_Product")
            .set("TaxNumber", helper.StringNull(data.TaxNumber))
            .set("GroupCode", helper.StringNull(data.GroupCode))
            .set("Code", helper.StringNull(data.Code))
            .set("TariffClass", helper.StringNull(data.TariffClass))
            .set("TariffSeq", helper.StringNull(data.TariffSeq))
            .set("TariffStatCode", helper.StringNull(data.TariffStatCode))
            .set("InvDesc", helper.StringNull(data.InvDesc))
            .set("DecDesc1", helper.StringNull(data.DecDesc1))
            .set("DecDesc2", helper.StringNull(data.DecDesc2))
            .set("DecDesc3", helper.StringNull(data.DecDesc3))
            .set("DecDesc4", helper.StringNull(data.DecDesc4))
            .set("DecDesc5", helper.StringNull(data.DecDesc5))
            .set("Degree", helper.NumberNull(data.Degree))
            .set("CC", helper.NumberNull(data.CC))
            .set("CardAmt", helper.NumberNull(data.CardAmt))
            .set("Remark", helper.StringNull(data.Remark))
            .set("AFTACode", helper.StringNull(data.AFTACode))
            .set("ExciseNo", helper.StringNull(data.ExciseNo))
            .set("LastUpdate", "19000101")
            .set("AnnPrice", helper.NumberNull(data.AnnPrice))
            .set("IsRawmat", helper.NumberNull(data.IsRawmat))
            .set("RawCode", helper.StringNull(data.RawCode))
            .set("RawUnit", helper.StringNull(data.RawUnit))
            .set("FormulaNo", helper.StringNull(data.FormulaNo))
            .set("BondNo", helper.StringNull(data.BondNo))
            .set("BOINo", helper.StringNull(data.BOINo))
            .set("BOIQuotaCode", helper.StringNull(data.BOIQuotaCode))
            .set("BOIQuotaNo", helper.StringNull(data.BOIQuotaNo))
            .set("BOIType", helper.NumberNull(data.BOIType))
            .set("Compen", helper.NumberNull(data.Compen))
            .set("Announce1", helper.StringNull(data.Announce1))
            .set("Announce2", helper.StringNull(data.Announce2))
            .set("PermitNo", helper.StringNull(data.PermitNo))
            .set("CommodityAWB", helper.StringNull(data.CommodityAWB))
            .set("RTCCode", helper.StringNull(data.RTCCode))
            .set("ProductYear", helper.StringNull(data.ProductYear))
            .set("PrivilegeCode", helper.StringNull(data.PrivilegeCode))
            .set("ExportTariff", helper.StringNull(data.ExportTariff))
            .set("UNDGNumber", helper.StringNull(data.UNDGNumber))
            .set("PdtUnitCode", helper.StringNull(data.PdtUnitCode))
            .set("Prate", helper.NumberNull(data.Prate))
            .set("Srate", helper.NumberNull(data.Srate))
            .set("Ispermit", helper.NumberNull(data.Ispermit))
            .set("Isreexport", helper.NumberNull(data.Isreexport))
            .set("IsReImport", helper.NumberNull(data.IsReImport))
            .set("IsFreeofChage", helper.NumberNull(data.IsFreeofChage))
            .set("IsFreeZone", helper.NumberNull(data.IsFreeZone))
            .set("IsEPZ", helper.NumberNull(data.IsEPZ))
            .set("PdtAttribute1", helper.StringNull(data.PdtAttribute1))
            .set("PdtAttribute2", helper.StringNull(data.PdtAttribute2))
            .set("IsBOND", helper.NumberNull(data.ISBOND))
            .set("IsBOI", helper.NumberNull(data.IsBOI))
            .set("FormulaVersion", helper.StringNull(data.FormulaVersion))
            .set("FormulaCompanyTax", helper.StringNull(data.FormulaCompanyTax))
            .set("POrigin", helper.StringNull(data.POrigin))
            .set("ExemtionDutyRate", helper.NumberNull(data.ExemtionDutyRate))
            .set("ExemtionVATRate", helper.NumberNull(data.ExemtionVATRate))
            .set("RawCodeEx", helper.StringNull(data.RawCodeEx))
            .set("FormulaVersion19Tavi", helper.StringNull(data.FormulaVersion19Tavi))
            .set("FormulaCompanyTax19Tavi", helper.StringNull(data.FormulaCompanyTax19Tavi))
            .set("CreateBy", helper.StringNull(data.CreateBy))
            .set("CreateDate", "GETDATE()", { dontQuote: true })
            .set("UpdateBy", "")
            .set("UpdateDate", "19000101")
            .set("PdtStatus", "A")
            .toString();

            db.executeSql(sql, function(data, err){
              if(err){
                httpMsg.show500(req, resp, err);
              }
              else {
                httpMsg.show200(req, resp);
              }
            });


    }catch(ex){
        httpMsg.show500(req, resp, ex);
    }
}

exports.update = function(req, resp){

    try{
        if (!req.body) throw new Error("Input not valid");
        
        if (req.body.length > 1e7) throw new Error("Request Entity too Large");

        var data = req.body;
        var id = parseInt(data.TrxId);

        var sql = squel.update()
            .table("DTM_Product")
            .set("TaxNumber", helper.StringNull(data.TaxNumber))
            .set("GroupCode", helper.StringNull(data.GroupCode))
            .set("Code", helper.StringNull(data.Code))
            .set("TariffClass", helper.StringNull(data.TariffClass))
            .set("TariffSeq", helper.StringNull(data.TariffSeq))
            .set("TariffStatCode", helper.StringNull(data.TariffStatCode))
            .set("InvDesc", helper.StringNull(data.InvDesc))
            .set("DecDesc1", helper.StringNull(data.DecDesc1))
            .set("DecDesc2", helper.StringNull(data.DecDesc2))
            .set("DecDesc3", helper.StringNull(data.DecDesc3))
            .set("DecDesc4", helper.StringNull(data.DecDesc4))
            .set("DecDesc5", helper.StringNull(data.DecDesc5))
            .set("Degree", helper.NumberNull(data.Degree))
            .set("CC", helper.NumberNull(data.CC))
            .set("CardAmt", helper.NumberNull(data.CardAmt))
            .set("Remark", helper.StringNull(data.Remark))
            .set("AFTACode", helper.StringNull(data.AFTACode))
            .set("ExciseNo", helper.StringNull(data.ExciseNo))
            .set("LastUpdate", "GETDATE()", { dontQuote: true })
            .set("AnnPrice", helper.NumberNull(data.AnnPrice))
            .set("IsRawmat", helper.NumberNull(data.IsRawmat))
            .set("RawCode", helper.StringNull(data.RawCode))
            .set("RawUnit", helper.StringNull(data.RawUnit))
            .set("FormulaNo", helper.StringNull(data.FormulaNo))
            .set("BondNo", helper.StringNull(data.BondNo))
            .set("BOINo", helper.StringNull(data.BOINo))
            .set("BOIQuotaCode", helper.StringNull(data.BOIQuotaCode))
            .set("BOIQuotaNo", helper.StringNull(data.BOIQuotaNo))
            .set("BOIType", helper.NumberNull(data.BOIType))
            .set("Compen", helper.NumberNull(data.Compen))
            .set("Announce1", helper.StringNull(data.Announce1))
            .set("Announce2", helper.StringNull(data.Announce2))
            .set("PermitNo", helper.StringNull(data.PermitNo))
            .set("CommodityAWB", helper.StringNull(data.CommodityAWB))
            .set("RTCCode", helper.StringNull(data.RTCCode))
            .set("ProductYear", helper.StringNull(data.ProductYear))
            .set("PrivilegeCode", helper.StringNull(data.PrivilegeCode))
            .set("ExportTariff", helper.StringNull(data.ExportTariff))
            .set("UNDGNumber", helper.StringNull(data.UNDGNumber))
            .set("PdtUnitCode", helper.StringNull(data.PdtUnitCode))
            .set("Prate", helper.NumberNull(data.Prate))
            .set("Srate", helper.NumberNull(data.Srate))
            .set("Ispermit", helper.NumberNull(data.Ispermit))
            .set("Isreexport", helper.NumberNull(data.Isreexport))
            .set("IsReImport", helper.NumberNull(data.IsReImport))
            .set("IsFreeofChage", helper.NumberNull(data.IsFreeofChage))
            .set("IsFreeZone", helper.NumberNull(data.IsFreeZone))
            .set("IsEPZ", helper.NumberNull(data.IsEPZ))
            .set("PdtAttribute1", helper.StringNull(data.PdtAttribute1))
            .set("PdtAttribute2", helper.StringNull(data.PdtAttribute2))
            .set("IsBOND", helper.NumberNull(data.ISBOND))
            .set("IsBOI", helper.NumberNull(data.IsBOI))
            .set("FormulaVersion", helper.StringNull(data.FormulaVersion))
            .set("FormulaCompanyTax", helper.StringNull(data.FormulaCompanyTax))
            .set("POrigin", helper.StringNull(data.POrigin))
            .set("ExemtionDutyRate", helper.NumberNull(data.ExemtionDutyRate))
            .set("ExemtionVATRate", helper.NumberNull(data.ExemtionVATRate))
            .set("RawCodeEx", helper.StringNull(data.RawCodeEx))
            .set("FormulaVersion19Tavi", helper.StringNull(data.FormulaVersion19Tavi))
            .set("FormulaCompanyTax19Tavi", helper.StringNull(data.FormulaCompanyTax19Tavi))
            .set("UpdateBy", data.UpdateBy)
            .set("UpdateDate", "GETDATE()", { dontQuote: true })
            .where("TrxId = ?", id)
            .toString();

            db.executeSql(sql, function(data, err){
              if(err){
                httpMsg.show500(req, resp, err);
              }
              else {
                httpMsg.show200(req, resp);
              }
            });

    }catch (ex) {
        httpMsg.show500(req, resp, ex);
    }
}

exports.delete = function(req, resp){
    try{
        if (!req.body) throw new Error("Input not valid");
        var data = req.body;

        var sql = squel.delete()
            .from("DTM_Product")
            .where("TrxId = ?", data.TrxId)
            .toString();

        db.executeSql(sql, function(data, err){
            if(err){
            httpMsg.show500(req, resp, err);
            }
            else {
            httpMsg.show200(req, resp);
            }
        });  


    }catch(ex){
        httpMsg.show500(req, resp, ex);
    }
}