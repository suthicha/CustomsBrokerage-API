var squel = require('squel');
var helper = require('../core/helper');
var httpMsg = require('../core/httpMsg');
var db = require('../core/db');
var settings = require('../settings');

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
            .where("JobNo = ?", jobno)
            .toString();
            
            sql += ";" + squel.select()
            .from("DTR_OrdInvoice")
            .where("JobNo = ?", jobno)
            .toString();

            sql += ";" + squel.select()
            .from("DTR_OrdInvDetail")
            .where("JobNo = ?", jobno)
            .toString();

        helper.execCommand(req, resp, sql);

    }catch (ex) {
        httpMsg.show500(req, resp, ex);
    }
}

function addInvoice(inv){
    var invDate = new Date(inv.InvDate);
    sql = squel.insert()
        .into("DTR_OrdInvoice")
        .set("JobNo", inv.JobNo)
        .set("InvNo", helper.StringNull(inv.InvNo))
        .set("InvDate", invDate.getFullYear() + "-" + (invDate.getMonth() + 1) +"-" + invDate.getDate())
        .set("CmpTaxNumber", helper.StringNull(inv.CmpTaxNumber))
        .set("CmpBranch", helper.StringNull(inv.CmpBranch))
        .set("BuyerCode", helper.StringNull(inv.BuyerCode))
        .set("BuyerName", helper.StringNull(inv.BuyerName))
        .set("Street", helper.StringNull(inv.Street))
        .set("District", helper.StringNull(inv.District))
        .set("SubProvince", helper.StringNull(inv.SubProvince))
        .set("Province", helper.StringNull(inv.Province))
        .set("PostCode", helper.StringNull(inv.PostCode))
        .set("OriginCountry", helper.StringNull(inv.OriginCountry))
        .set("NotifyPartyCode", helper.StringNull(inv.NotifyPartyCode))
        .set("NotifyPartyName", helper.StringNull(inv.NotifyPartyName))
        .set("NotifyPartyAddr", helper.StringNull(inv.NotifyPartyAddr))
        .set("DestinationCountry", helper.StringNull(inv.DestinationCountry))
        .set("IncoTerms", helper.StringNull(inv.IncoTerms))
        .set("InvCurrency", helper.StringNull(inv.InvCurrency))
        .set("TotalNetW", helper.NumberNull(inv.TotalNetW))
        .set("Totalinvoice", helper.NumberNull(inv.Totalinvoice))
        .set("CurExpShp", helper.StringNull(inv.CurExpShp))
        .set("CurExpFrg", helper.StringNull(inv.CurExpFrg))
        .set("CurExpIns", helper.StringNull(inv.CurExpIns))
        .set("TotalExpShipping", helper.NumberNull(inv.TotalExpShipping))
        .set("TotalExpFreight", helper.NumberNull(inv.TotalExpFreight))
        .set("TotalExpInsurance", helper.NumberNull(inv.TotalExpInsurance))
        .set("AvgExpShp", helper.StringNull(inv.AvgExpShp))
        .set("AvgExpFrg", helper.StringNull(inv.AvgExpFrg))
        .set("AvgExpIns", helper.StringNull(inv.AvgExpIns))
        .set("AvgExp2Free", helper.StringNull(inv.AvgExp2Free))
        .set("CurExpPacking", helper.StringNull(inv.CurExpPacking))
        .set("CurExpForInLand", helper.StringNull(inv.CurExpForInLand))
        .set("CurExpLanding", helper.StringNull(inv.CurExpLanding))
        .set("CurExpOther", helper.StringNull(inv.CurExpOther))
        .set("TotalExpPacking", helper.NumberNull(inv.TotalExpPacking))
        .set("TotalExpForInLand", helper.NumberNull(inv.TotalExpForInLand))
        .set("TotalExpLanding", helper.NumberNull(inv.TotalExpLanding))
        .set("TotalExpOther", helper.NumberNull(inv.TotalExpOther))
        .set("AvgExpPacking", helper.StringNull(inv.AvgExpPacking))
        .set("AvgExpForInLand", helper.StringNull(inv.AvgExpForInLand))
        .set("AvgExpLanding", helper.StringNull(inv.AvgExpLanding))
        .set("AvgExpOther", helper.StringNull(inv.AvgExpOther))
        .set("TermOfPayment", helper.StringNull(inv.TermOfPayment))
        .set("OtherRefNo", helper.StringNull(inv.OtherRefNo))
        .set("TransportMode", helper.StringNull(inv.TransportMode))
        .set("RefJobNo", helper.StringNull(inv.RefJobNo))
        .toString();
    db.executeSql(sql, function(data, err) {
        if (err) throw new Error("Found error Insert DTR_OrdInvoice " + err);
    })
}

function addInvoiceDetail(dtl){
    sql = squel.insert()
        .into("DTR_OrdInvDetail")
        .set("JobNo", dtl.JobNo)
        .set("InvNo", helper.StringNull(dtl.InvNo))
        .set("ItemNo", helper.NumberNull(dtl.ItemNo))
        .set("GroupCode", helper.StringNull(dtl.GroupCode))
        .set("PdtCode", helper.StringNull(dtl.PdtCode))
        .set("PdtSubCode", helper.StringNull(dtl.PdtSubCode))
        .set("BrandName", helper.StringNull(dtl.BrandName))
        .set("ShippingMark", helper.StringNull(dtl.ShippingMark))
        .set("PdtDescriptonEng", helper.StringNull(dtl.PdtDescription))
        .set("DRemark", helper.StringNull(dtl.DRemark))
        .set("SeperateItem", helper.NumberNull(dtl.SeperateItem))
        .set("GroupWithItem", helper.NumberNull(dtl.GroupWithItem))
        .set("IsFreeOfChage", helper.NumberNull(dtl.IsFreeOfChage))
        .set("TariffCode", helper.StringNull(dtl.TariffCode))
        .set("TariffSeq", helper.StringNull(dtl.TariffSeq))
        .set("StatCode", helper.StringNull(dtl.StatCode))
        .set("RTCProductCode", helper.StringNull(dtl.RTCProductCode))
        .set("ProductYear", helper.StringNull(dtl.ProductYear))
        .set("WeightUnit", helper.StringNull(dtl.WeightUnit))
        .set("NetWeight", helper.NumberNull(dtl.NetWeight))
        .set("GrossWeight", helper.NumberNull(dtl.GrossWeight))
        .set("TariffQty", helper.NumberNull(dtl.TariffQty))
        .set("TariffUnit", helper.StringNull(dtl.TariffUnit))
        .set("SalesPackUnit", helper.StringNull(dtl.SalesPackUnit))
        .set("SalesPackQty", helper.NumberNull(dtl.SalesPackQty))
        .set("SalesPrice", helper.NumberNull(dtl.SalesPrice))
        .set("SalesTotalPrice", helper.NumberNull(dtl.SalesTotalPrice))
        .set("PackAmount", helper.NumberNull(dtl.PackAmount))
        .set("PackUnit", helper.StringNull(dtl.PackUnit))
        .set("FormulaNo", helper.StringNull(dtl.FormulaNo))
        .set("BIS19TransferNo", helper.StringNull(dtl.BIS19TransferNo))
        .set("BOILicenseNo", helper.StringNull(dtl.BOILicenseNo))
        .set("PermitNo", helper.StringNull(dtl.PermitNo))
        .set("Privilege", helper.StringNull(dtl.Privilege))
        .set("PdtDescriptionThai", helper.StringNull(dtl.PdtDescriptionThai))
        .set("IsReImport", helper.NumberNull(dtl.IsReImport))
        .set("IsReExport", helper.NumberNull(dtl.IsReExport))
        .set("IsEPZ", helper.NumberNull(dtl.IsEPZ))
        .set("IsComp", helper.NumberNull(dtl.IsComp))
        .set("ImpDecNO", helper.StringNull(dtl.ImpDecNO))
        .set("ImpDecItem", helper.StringNull(dtl.ImpDecItem))
        .toString();
    db.executeSql(sql, function(data, err) {
    })
}

exports.add = function(req, resp) {
    try {
        if(!req.body) throw new Error("Input not valid");
        if (req.body.length > 1e7) throw new Error("Request Entity too Large");

        var jobno = "";
        var sql = squel.select()
            .from("v_buildJobControl")
            .field("JobNo")
            .toString();
        db.executeSql(sql, function(data, err) {
            if (err){
                httpMsg.show500(req, resp, err);
            }
            else {
                if (data){
                    jobno = settings.jobprefix + data[0].JobNo;
                }
            }
        });

        if (jobno) {
            if (jobno == "") throw new Error("System cannot build JobNo.");

            var ordctl = req.body[0];
            var arrivalDate = new Date(ordctl.ArrivalDate);
            sql = squel.insert()
                .into("DTR_OrdControl")
                .set("JobNo", jobno)
                .set("DecNo", "")
                .set("ShipmentType", helper.StringNull(ordctl.ShipmentType))
                .set("TaxNumber", helper.StringNull(ordctl.TaxNumber))
                .set("BranchNo", helper.StringNull(ordctl.BranchNo))
                .set("CompanyName", helper.StringNull(ordctl.CompanyName))
                .set("InvList", helper.StringNull(ordctl.InvList))
                .set("MasterBL", helper.StringNull(ordctl.MasterBL))
                .set("HouseBL", helper.StringNull(ordctl.HouseBL))
                .set("ArrivalDate", arrivalDate.getFullYear() + '-' + (arrivalDate.getMonth()+1) + '-' + arrivalDate.getDate())
                .set("TransportMode", helper.StringNull(ordctl.TransportMode))
                .set("IncoTerms", helper.StringNull(ordctl.IncoTerms))
                .set("ConsCode", helper.StringNull(ordctl.ConsCode))
                .set("ConsName", helper.StringNull(ordctl.ConsName))
                .set("TotalNetW", helper.NumberNull(ordctl.TotalNetW))
                .set("TotalGrossW", helper.NumberNull(ordctl.TotalGrossW))
                .set("WeightUnit", helper.StringNull(ordctl.WeightUnit))
                .set("PackAmount", helper.NumberNull(ordctl.PackAmount))
                .set("PackUnit", helper.StringNull(ordctl.PackUnit))
                .set("Totalinvoice", helper.NumberNull(ordctl.Totalinvoice))
                .set("InvCurrency", helper.StringNull(ordctl.InvCurrency))
                .set("JobStatus", "1")
                .set("Remark", helper.StringNull(ordctl.Remark))
                .set("CreateBy", helper.StringNull(ordctl.CreateBy))
                .set("CreateDate", "GETDATE()", { dontQuote: true })
                .set("UpdateBy", "")
                .set("UpdateDate", "19000101")
                .set("SendBy", "")
                .set("SendDate", "19000101")
                .toString();
            var ordctrlStatus = false;
            db.executeSql(sql, function(data, err) {
                if (err){
                    httpMsg.show500(req, resp, err);
                }
                else {
                    ordctrlStatus = true;
                }
            });
            
            if (ordctrlStatus){
                var inv = req.body[1];
                inv.JobNo = jobno;
                addInvoice(inv);
            
                var dtlArray = req.body[2];
                if (dtlArray){
                    
                    for (var i = 0; i < dtlArray.length; i++) {
                        var dtl = dtlArray[i];
                        dtl.JobNo = jobno;
                        addInvoiceDetail(dtl);
                    }

                } //end test invoice detail.

                httpMsg.show200(req, resp);
            } //end test insert order control complete.

        }
        
    }catch (ex){
        httpMsg.show500(req, resp, ex);
    }
}

exports.update = function(req, resp) {
    try {
        if (!req.body) throw new Error("Input not valid");
        var ordctl = req.body[0];
        var arrivalDate = new Date(ordctl.ArrivalDate);
        var sql = squel.update()
                .table("DTR_OrdControl")
                .set("DecNo", helper.StringNull(ordctl.DecNo))
                .set("ShipmentType", helper.StringNull(ordctl.ShipmentType))
                .set("TaxNumber", helper.StringNull(ordctl.TaxNumber))
                .set("BranchNo", helper.StringNull(ordctl.BranchNo))
                .set("CompanyName", helper.StringNull(ordctl.CompanyName))
                .set("InvList", helper.StringNull(ordctl.InvList))
                .set("MasterBL", helper.StringNull(ordctl.MasterBL))
                .set("HouseBL", helper.StringNull(ordctl.HouseBL))
                .set("ArrivalDate", arrivalDate.getFullYear() + '-' + (arrivalDate.getMonth()+1) + '-' + arrivalDate.getDate())
                .set("TransportMode", helper.StringNull(ordctl.TransportMode))
                .set("IncoTerms", helper.StringNull(ordctl.IncoTerms))
                .set("ConsCode", helper.StringNull(ordctl.ConsCode))
                .set("ConsName", helper.StringNull(ordctl.ConsName))
                .set("TotalNetW", helper.NumberNull(ordctl.TotalNetW))
                .set("TotalGrossW", helper.NumberNull(ordctl.TotalGrossW))
                .set("WeightUnit", helper.StringNull(ordctl.WeightUnit))
                .set("PackAmount", helper.NumberNull(ordctl.PackAmount))
                .set("PackUnit", helper.StringNull(ordctl.PackUnit))
                .set("Totalinvoice", helper.NumberNull(ordctl.Totalinvoice))
                .set("InvCurrency", helper.StringNull(ordctl.InvCurrency))
                .set("Remark", helper.StringNull(ordctl.Remark))
                .set("UpdateBy", helper.StringNull(ordctl.UpdateBy))
                .set("UpdateDate", "GETDATE()", { dontQuote: true })
                .where("JobNo = ?", ordctl.JobNo)
                .toString();

            var ordctlStatus = false;    
            db.executeSql(sql, function(data, err) {
                if (err) throw new Error("Update Error");
                ordctlStatus = true;
            }) 

            if (ordctlStatus){
                var inv = req.body[1];
                if (inv) {
                    // delete invoice before insert new data.
                    sql = squel.delete()
                        .from("DTR_OrdInvoice")
                        .where("JobNo = ?", inv.JobNo)
                        .toString();
                    db.executeSql(sql, function(data, err){
                        if (err) throw new Error("Delete Order Invoice Error");
                        addInvoice(inv);
                    })
                }

                var dtlArray = req.body[2];
                if (dtlArray){
                    // delete details before insert new data.
                    sql = squel.delete()
                        .from("DTR_OrdInvDetail")
                        .where("JobNo = ?", inv.JobNo)
                        .toString();
                    db.executeSql(sql, function(data, err){
                        if (err) throw new Error("Delete Order Invoice Detail Error");
                        
                        for (var i = 0; i < dtlArray.length; i++) {
                            addInvoiceDetail(dtlArray[i]);
                        }

                    });
                }
            }

    }catch (ex) {
        httpMsg.show500(req, resp, ex);
    }
}

exports.delete = function(req, resp) {
    try {
        if (!req.body) throw new Error("Input not valid");
        var ordctl = req.body[0];

        if(ordctl.JobNo){
            var sql = squel.update()
                .table("DTR_OrdControl")
                .set("JobStatus", "99")
                .where("JobNo = ?", ordctl.JobNo)
                .toString();
            helper.execCommand(req, resp, sql);
        }

    }catch (ex) {
        httpMsg.show500(req, resp, ex);
    }
}

exports.send = function(req, resp) {
    try {
        if (!req.body) throw new Error("Input not valid");
        var ordctl = req.body[0];

        if(ordctl.JobNo){
            var sql = squel.update()
                .table("DTR_OrdControl")
                .set("JobStatus", "2")
                .where("JobNo = ?", ordctl.JobNo)
                .toString();
            helper.execCommand(req, resp, sql);
        }

    }catch (ex) {
        httpMsg.show500(req, resp, ex);
    }
}