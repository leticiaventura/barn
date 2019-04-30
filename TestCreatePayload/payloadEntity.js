module.exports = function payloadEntity () {

    this.create = (decodedPayload, partitionkey, rowkey) => {
        var obj = {
            partitionkey : partitionkey,
            rowkey : rowkey
        };

        if (typeof decodedPayload.temperature !== 'undefined'){
            obj["temperature"] = decodedPayload.temperature,
            obj["temperature@odata.type"] = "Edm.Double";
        }
        if (typeof decodedPayload.co2 !== 'undefined'){
            obj["co2"] = decodedPayload.co2,
            obj["co2@odata.type"] = "Edm.Double";
        }
        if (typeof decodedPayload.motion !== 'undefined'){
            obj["motion"] = decodedPayload.motion,
            obj["motion@odata.type"] = "Edm.Double";
        }
        if (typeof decodedPayload.light !== 'undefined'){
            obj["light"] = decodedPayload.light,
            obj["light@odata.type"] = "Edm.Double";
        }
        if (typeof decodedPayload.humidity !== 'undefined'){
            obj["humidity"] = decodedPayload.humidity,
            obj["humidity@odata.type"] = "Edm.Double";
        }

        return obj;
    }    
}
