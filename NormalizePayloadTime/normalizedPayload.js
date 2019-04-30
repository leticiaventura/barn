const INITIAL_REDUCE_VALUE = null;
const PROPERTY_NAMES = ['temperature', 'co2', 'motion', 'light', 'humidity'];

module.exports = function (payloadArray, time){    
    var obj = {};
    obj.partitionkey = payloadArray[0].PartitionKey._;
    obj.rowkey = time;        

    verifyAndCreateProperty = function (propertyName) {
        var value = getPropertyAvarage(payloadArray, propertyName);
        if (value !== null){
            obj[propertyName] = value.toFixed(1);
            obj[`${propertyName}@odata.type`] = "Edm.Double";
        }
    }

    PROPERTY_NAMES.forEach(property => verifyAndCreateProperty(property));

    return obj;
}
    
getPropertyAvarage = (entriesArray, propertyName) => entriesArray
    .map(payload => getPropertyValue(payload, propertyName))
    .filter((n) => typeof n === "number")
    .reduce(calculateAvarage, INITIAL_REDUCE_VALUE);

getPropertyValue = (payload, prop) => (typeof payload[prop] === 'undefined') ? null : payload[prop]._;

calculateAvarage = function (accumulator, currentValue, index, array) {
    accumulator += currentValue;
    return (index === array.length-1) ? accumulator/array.length : accumulator;
}