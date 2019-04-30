const azure = require('azure-storage');
const normalizedPayload = require('./normalizedPayload');
const dateUtils = require('./dateUtils');
const queryFactory = require('./queryFactory');

const DECODED_PAYLOAD_TABLE = "DecodedPayload";
const MINUS_ONE_HOUR = -1;

module.exports = async function (context) {
    var tableService = azure.createTableService();
    var start = dateUtils.getISODate(MINUS_ONE_HOUR);
    var end = dateUtils.getISODate();
    var queries = queryFactory.getBySensorAndTime(start, end, context.bindings.activeSensors);
    
    var promises = [];
    queries.forEach(query => {
        promises.push(new Promise((resolve, reject) => {
            tableService.queryEntities(DECODED_PAYLOAD_TABLE, query, null, function(error, result, response){
                if (error) {
                    reject(error);                   
                } else {
                    var normalizedPayloadEntity = {};
                    if(result.entries.length){
                        normalizedPayloadEntity = new normalizedPayload(result.entries, start);
                    }                            
                    resolve(normalizedPayloadEntity);  
                }                         
            })
        }));
    });    
        
    return Promise.all(promises)
    .then((values) => removeEmptyObjects(values));
};

removeEmptyObjects = (array) => array.filter(value => Object.keys(value).length !== 0);