
exports.QuoteEncoding = function(strvalue) {
    var strquotes = /(')/g;
    return strvalue.replace(strquotes, "''");
};

exports.NumberNull = function(value){
    return value == null? 0 : value;
}

exports.StringNull = function(value){
   return value == null || value == undefined || value == ""? "": FixQuote(value);
}

function FixQuote(strvalue){
     var strquotes = /(')/g;
    return strvalue.replace(strquotes, "''");
}