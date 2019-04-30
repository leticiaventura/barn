module.exports = function(dict) {
    var obj = {
        PartitionKey : "101104",
        RowKey : dict.time
    };

    verifyAndCreateProperty = (value, propertyName) => {
        if (!isNaN(value)){
            obj[propertyName] = value;
            obj[`${propertyName}@odata.type`] = "Edm.Double";
        }
    }

    verifyAndCreateProperty(dict.n_man, "CloudAmount");
    verifyAndCreateProperty(dict.p_sea, "Pressure");
    verifyAndCreateProperty(dict.rh, "RelativeHumidity");
    verifyAndCreateProperty(dict.ri_10min, "PrecipitationIntensity");
    verifyAndCreateProperty(dict.snow_aws, "SnowDepth");
    verifyAndCreateProperty(dict.t2m, "AirTemperature");
    verifyAndCreateProperty(dict.td, "DewPointTemperature");
    verifyAndCreateProperty(dict.vis, "HorizontalVisibility");
    verifyAndCreateProperty(dict.wd_10min, "WindDirection");
    verifyAndCreateProperty(dict.wg_10min, "GustSpeed");
    verifyAndCreateProperty(dict.ws_10min, "WindSpeed");

    return obj;
};

