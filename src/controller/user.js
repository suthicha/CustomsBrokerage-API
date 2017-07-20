var jwt = require('jsonwebtoken');
var util = require('util');
var db = require('../core/db');
var httpMsg = require('../core/httpMsg');
var helper = require('../core/helper');
var settings = require('../settings');

exports.authenticate = function(req, resp) {
    try{
        if (!req.body) throw new Error("Input not valid");
        var data = {
            Username: req.body.Username,
            UPassword: req.body.Password
        }
        
        if(data){
            var sql = "SELECT Username, Fullname FROM DTM_Users ";
            sql += util.format("WHERE Username='%s' AND UPassword='%s' AND UserStatus='A'", data.Username, data.UPassword);
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
    db.executeSql(`SELECT * FROM DTM_Users WHERE UserStatus='A'`, function(data, err){
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
        db.executeSql(`SELECT * FROM DTM_Users WHERE UserStatus='A' AND TrxId=` + userId, function(data, err){
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
          var sql = "INSERT INTO DTM_Users (Username, UPassword, Fullname, Email, Phone, Department, Location, RegisterDate, ExpiredDate, UserStatus) values ";
          sql += util.format("('%s', '%s', '%s', '%s', '%s', '%s', '%s', GETDATE(), DATEADD(year,10,GETDATE()), 'A' )", 
                helper.QuoteEncoding(data.Username), 
                helper.QuoteEncoding(data.UPassword), 
                helper.QuoteEncoding(data.FullName), 
                helper.QuoteEncoding(data.Email), 
                helper.QuoteEncoding(data.Phone), 
                helper.QuoteEncoding(data.Department), 
                helper.QuoteEncoding(data.Location));

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
        var sql = "UPDATE DTM_Users SET";

        if (data.UPassword){
            sql += " UPassword = '"+ helper.QuoteEncoding(data.UPassword) +"',";
        }

        if (data.FullName){
            sql += " Fullname = '"+ helper.QuoteEncoding(data.FullName) +"',";
        }

        if (data.Email){
            sql += " Email = '"+ helper.QuoteEncoding(data.Email) +"',";            
        }

        if (data.Phone){
            sql += " Phone = '"+ helper.QuoteEncoding(data.Phone) +"',";            
        }

        if (data.Department){
            sql += " Department = '"+ helper.QuoteEncoding(data.Department) +"',";            
        }

        if (data.Location){
            sql += " Location = '"+ helper.QuoteEncoding(data.Location) +"',";            
        }

        sql = sql.slice(0,-1);
        sql += " WHERE TrxId=" + data.TrxId;
        
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
        var sql = "UPDATE DTM_Users SET UserStatus='I', ExpiredDate=(SELECT GETDATE()) WHERE TrxId=" + data.TrxId;

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