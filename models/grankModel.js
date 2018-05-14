var request = require("request-promise");
var cheerio = require('cheerio');
var scrapper = require("./google-scrapper");
var _ = require("lodash");
var Promise = require('bluebird')

module.exports = {
    getRankForKWList: function(domain, kwList) {

        if (!kwList) kwList = [""];
        if (!domain) domain = "";
        if (typeof(kwList) == "string") kwList = [kwList];

        kw = kwList[0];

        var promises = [];
        for(var i=0; i < kwList.length; i++) {
            promises.push(scrapper.search(domain, kwList[i], '/search?q=' + kwList[i]));
        }

        //return Promise.all(promises);
        Promise.resolve({chupar: "totonita mojadita"});
    }
}
