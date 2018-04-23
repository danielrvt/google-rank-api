var request = require("request-promise");
var cheerio = require('cheerio');

module.exports = {
    getRankForKWList: function (domain, kwList) {

        if (typeof(kwList) == "string") kwList = [kwList];

        var promises = kwList.map((kw, i) => request({
            uri: "https://www.google.co.ve/search?q=" + kw,
            headers: { 
            'Accept':'*/*',
            'Accept-Language':'es,en-US;q=0.9,en;q=0.8,fr;q=0.7,it;q=0.6',
            'Cache-Control':'no-cache',
            'Connection':'keep-alive',
            'Pragma':'no-cache',
            'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.167 Safari/537.36'
        },
            transform: body => {
                console.log(body);
            }
        }));
    }
}