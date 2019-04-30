var decode = require("./decoder");
var payloadEntity = require("./payloadEntity");

var activeSensorsDevEUI = ['A81758FFFE03580A', 'A81758FFFE03580B', 'A81758FFFE03580C', 'A81758FFFE03580D'];


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');    

    var data = req.body.DevEUI_uplink;

    if (data.payload_hex && activeSensorsDevEUI.includes(data.DevEUI)  && data.Time) {
        var decodedHex = decode(data.payload_hex);
        
        var result =  new payloadEntity().create(decodedHex, data.DevEUI, data.Time);
        context.bindings.tableBinding = result;

        var json = JSON.stringify(result,null,4);
        context.res = {
            body: json
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Invalid payload or device not allowed. Please pass a valid payload on the request body."
        };
    }
};