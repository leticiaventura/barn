const INITIAL_REDUCE_VALUE = null;

module.exports = function (payloadArray, time){    
    var obj = {};
    obj.partitionkey = payloadArray[0].PartitionKey._;
    obj.rowkey = time;        
    verifyAndCreateProperty(obj, payloadArray, 'temperature');
    verifyAndCreateProperty(obj, payloadArray, 'co2');
    verifyAndCreateProperty(obj, payloadArray, 'motion');
    verifyAndCreateProperty(obj, payloadArray, 'light');
    verifyAndCreateProperty(obj, payloadArray, 'humidity');
    return obj;
}

verifyAndCreateProperty = (obj, array, propertyName) => {
    var value = getPropertyAvarage(array, propertyName);
    if (value !== null){
        obj[propertyName] = value.toFixed(1);
        obj[`${propertyName}@odata.type`] = "Edm.Double";
    }
}
    
getPropertyAvarage = (entriesArray, propertyName) => entriesArray
    .map(payload => getPropertyValue(payload, propertyName))
    .filter((n) => typeof n === "number")
    .reduce(calculateAvarage, INITIAL_REDUCE_VALUE);

getPropertyValue = (payload, prop) => {
    return(typeof payload[prop] === 'undefined' ? null : payload[prop]._ );
}

calculateAvarage = (accumulator, currentValue, index, array) => {
    accumulator += currentValue;
    return (index === array.length-1) ? accumulator/array.length : accumulator;
}