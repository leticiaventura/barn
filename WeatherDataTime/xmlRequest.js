var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

module.exports.setDatetime = function() {
        var date = new Date();
        const TEN_MINUTES = 10;
        this.starttime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes() - TEN_MINUTES);
        this.endtime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
};

module.exports.getResponse = function() {
    var httpRequest = new XMLHttpRequest();

    var url = "http://opendata.fmi.fi/wfs?service=WFS";
    var version = "&version=2.0.0";
    var request = "&request=getFeature";
    var storedQueryId = "&storedquery_id=fmi::observations::weather::simple";
    var startTime = "&starttime="+this.starttime.toISOString();
    var endTime = "&endtime="+this.endtime.toISOString();
    var timestep = "&timestep=10";
    var param = "&parameters=t2m,ws_10min,wg_10min,wd_10min,rh,td,ri_10min,snow_aws,p_sea,vis,n_man";
    var fmisId = "&fmisid=101104";
    var parameters = version + request + storedQueryId + startTime + endTime + timestep + param + fmisId;

    httpRequest.open("GET", url + parameters, false);
    httpRequest.send(null);

    if(httpRequest.status == 200)
        return httpRequest.responseText;
    else
        throw new Error("xmlRequest.response.error: Error " + httpRequest.status);
}   