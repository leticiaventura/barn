const azure = require('azure-storage');

module.exports.getBySensorAndTime = function (start, end, sensorsArray) {
    var queries = [];
    sensorsArray.forEach(sensor => {
        queries.push(new azure.TableQuery().where(`RowKey ge '${start}' and RowKey lt '${end}' and PartitionKey eq '${sensor.RowKey}'`));
    });
    return queries;
}