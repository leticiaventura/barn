const weatherEntity = require("./weatherEntity");
const xmlRequest = require("./xmlRequest");
const xmlParser = require("./xmlParser");

const RETRY_INTERVAL = 5000;      
module.exports = async function () {
    xmlRequest.setDatetime();
    var retries = 5;                   

    return new Promise((resolve, reject) => {
        var process = function (){
            var dict = xmlParser.parse(xmlRequest.getResponse());      
            if(checkDictEmpty(dict) && retries--){                     
                setTimeout(() => process(), RETRY_INTERVAL);           
            }
            else if(!checkDictEmpty(dict)){                            
                var result = new weatherEntity(dict);                 
                resolve(result);
            }else{
                reject("index.mainProcess.error: XML file invalid");               
            };
        };
        process();  
    });
};

function checkDictEmpty(dict){
    var countEmpty = 0;
    for (var key in dict){
        if(isNaN(dict[key])) countEmpty = countEmpty + 1;
    }
    return (countEmpty >= 11 || !dict) ? true : false;
};   