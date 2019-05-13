const PROPERTY_NAMES = ['temperature', 'co2', 'motion', 'light', 'humidity'];

module.exports = function payloadEntity (decodedPayload, partitionkey, rowkey) {
    var obj = {
        partitionkey : partitionkey,
        rowkey : rowkey
    };

    verifyAndCreateProperty = (propertyName) => {
        if (typeof decodedPayload[propertyName] !== 'undefined'){
            obj[propertyName] = decodedPayload[propertyName];
            obj[`${propertyName}@odata.type`] = "Edm.Double";
        }
    }

    PROPERTY_NAMES.forEach(property => verifyAndCreateProperty(property));

    return obj;
}