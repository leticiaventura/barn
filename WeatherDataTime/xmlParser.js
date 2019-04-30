var parseString = require('xml2js').parseString;
module.exports.parse = function (xml) {
    var jsonObj = [];
    parseString(xml, function (err, result) {
        jsonObj = result;
    });
    try{
        dict = {
            time: jsonObj["wfs:FeatureCollection"]["wfs:member"][0]["BsWfs:BsWfsElement"][0]["BsWfs:Time"][0]
        };
        jsonObj["wfs:FeatureCollection"]["wfs:member"].forEach(member => {
            member["BsWfs:BsWfsElement"].forEach(element => {
                    dict[element["BsWfs:ParameterName"][0]] = parseFloat(element["BsWfs:ParameterValue"][0]);
            });
        });
        return dict;
    }
    catch(e){
        throw new Error("xmlParser.parse.error: Couldnt parse XML file"); 
    };
};