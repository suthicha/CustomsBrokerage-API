
exports.QuoteEncoding = function(strvalue) {
    var strquotes = /(')/g;
    return strvalue.replace(strquotes, "''");
};