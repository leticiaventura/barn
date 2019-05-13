const INITIAL_REDUCE_VALUE = null;
const PROPERTY_NAMES = ['temperature', 'co2', 'motion', 'light', 'humidity'];

module.exports = function (payloadArray, time){    
    var obj = {};
    obj.partitionkey = payloadArray[0].PartitionKey._;
    obj.rowkey = time;        

    PROPERTY_NAMES.forEach(propertyName => {
        var value = getPropertyAverage(payloadArray, propertyName);
        if (value !== null){
            obj[propertyName] = value.toFixed(1);
            obj[`${propertyName}@odata.type`] = "Edm.Double";
        }
    });

    return obj;
}
    
getPropertyAverage = (entriesArray, propertyName) => entriesArray
    .map(payload => getPropertyValue(payload, propertyName))
    .filter((n) => typeof n === "number")
    .reduce(calculateAvarage, INITIAL_REDUCE_VALUE);

getPropertyValue = (payload, propertyName) => (typeof payload[propertyName] === 'undefined') ? null : payload[propertyName]._;

calculateAvarage = function (accumulator, currentValue, index, array) {
    accumulator += currentValue;
    return (index === array.length-1) ? accumulator/array.length : accumulator;
}