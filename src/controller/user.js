var jwt = require('jsonwebtoken');
var squel = require('squel');
var util = require('util');
var db = require('../core/db');
var httpMsg = require('../core/httpMsg');
var helper = require('../core/helper');
var settings = require('../settings');

exports.authenticate = function(req, resp) {
    try{
        if (!req.body) throw new Error("Input not valid");
        var data = req.body;

        if(data){

            var sql = squel.select()
                    .from("DTM_Users")
                    .field("Username")
                    .field("Fullname")
                    .where("Username = ?", data.Username)
                    .where("UPassword = ?", data.Password)
                    .where("UserStatus = ?", "A")
                    .toString();
            
            db.executeSql(sql, function(callback, err) { 
                if (err){
                    httpMsg.show500(req, resp, err);
                }else {
                    if (data && callback.length > 0){
                        var user = callback[0];
                        if (user.Username === req.body.Username)
                        {
                            var token = jwt.sign({ 
                                Username: user.Username, 
                                FullName: user.Fullname
                                }, settings.secert, {
                                expiresIn: 86400 // expires in 24 hours
                            });
                        
                            resp.writeHead(200, {"Content-Type":"application/json"});                        
                            resp.write(JSON.stringify({
                                success: true, 
                                Fullname: user.Fullname, 
                                token: token}));
                            resp.end();

                        }else{
                            httpMsg.sendAuthFail(req, resp, "Username not match.");
                        }
                    }
                    else {
                        httpMsg.sendAuthFail(req, resp, "Find not found Username: " + data.Username + " or Password incorrect.");
                    }
                }
            });
        }
        else {
            throw new Error("Input not valid");
        }

    }catch (ex) {
        httpMsg.show500(req, resp, ex);
    }
};

exports.getList = function(req, resp){
    
    var sql = squel.select()
        .from("DTM_Users")
        .where("UserStatus = ?", "A")
        .toString();

    db.executeSql(sql, function(data, err){
        if(err){
          httpMsg.show500(req, resp, err);
        }
        else {
          httpMsg.sendJson(req, resp, data);
        }
    });
}

exports.get = function(req, resp, id){
    try{
        if (!id) throw new Error("Input not valid");
        var userId = parseInt(id);
        var sql = squel.select()
            .from("DTM_Users")
            .where("UserStatus = ?", "A")
            .where("TrxId = ?", userId)
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
      
      if (data){

          var sql = squel.insert()
                .into("DMT_Users")
                .set("Username", helper.StringNull(data.Username))
                .set("UPassword", helper.StringNull(data.UPassword))
                .set("FullName", helper.StringNull(data.FullName))
                .set("Email", helper.StringNull(data.Email))
                .set("Phone", helper.StringNull(data.Phone))
                .set("Department", helper.StringNull(data.Department))
                .set("Location", helper.StringNull(data.Location))
                .set("RegisterDate", "GETDATE()", { dontQuote: true })
                .set("ExpiredDate", "DATEADD(year,10,GETDATE())", { dontQuote: true })
                .set("UserStatus", "A")
                .toString();

          db.executeSql(sql, function(data, err){
              if(err){
                httpMsg.show500(req, resp, err);
              }
              else {
                httpMsg.show200(req, resp);
              }
          });
      }
      else {
        throw new Error("Input not valid");
      }

    }
    catch (ex) {
        httpMsg.show500(req, resp, ex);
    }
}

exports.update = function(req, resp){
    try{
      if (!req.body) throw new Error("Input not valid");
      var data = req.body;
      
      if (data){
        if(!data.TrxId) throw new Error("UserId not provide");
        var sql = squel.update()
            .table("DTM_Users")
            .set("UPassword", helper.StringNull(data.UPassword))
            .set("FullName", helper.StringNull(data.FullName))
            .set("Email", helper.StringNull(data.Email))
            .set("Phone", helper.StringNull(data.Phone))
            .set("Department", helper.StringNull(data.Department))
            .set("Location", helper.StringNull(data.Location))
            .where("TrxId = ?", data.TrxId)

        db.executeSql(sql, function(data, err){
            if(err){
                httpMsg.show500(req, resp, err);
            }
            else {
                httpMsg.show200(req, resp);
            }
        });
      }
      else {
        throw new Error("Input not valid");
      }

    }
    catch (ex) {
        httpMsg.show500(req, resp, ex);
    }
}

exports.delete = function(req, resp){
    try{
      if (!req.body) throw new Error("Input not valid");
      var data = req.body;
      
      if (data){
        if(!data.TrxId) throw new Error("UserId not provide");
        var sql = squel.update()
            .table("DTM_Users")
            .set("UserStatus", "I")
            .set("ExpiredDate", "GETDATE()", { dontQuote: true })
            .where("TrxId = ?", data.TrxId)
            
        db.executeSql(sql, function(data, err){
            if(err){
                httpMsg.show500(req, resp, err);
            }
            else {
                httpMsg.show200(req, resp);
            }
        });
      }
      else {
        throw new Error("Input not valid");
      }
    }
    catch (ex) {
        httpMsg.show500(req, resp, ex);
    }
}