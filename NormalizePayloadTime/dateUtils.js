module.exports.getISODate = function (hoursToAdd) {
    var date =  new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var hour = hoursToAdd ? date.getHours() + hoursToAdd : date.getHours();
    return new Date(year, month, day, hour).toISOString();
}