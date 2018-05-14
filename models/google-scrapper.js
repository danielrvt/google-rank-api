var request = require("request-promise");
var cheerio = require('cheerio');

const baseURL = "https://www.google.com";

module.exports = {
    search: function search (domain, kw, uri, page) {
        if (!page) page = 1;
        if (page && page > 10) return Promise.resolve({page: -1, pos: -1, domain: domain, kw: kw, uri: null});

        return request({
            uri: baseURL + uri,
            method: "GET",
            headers: {
                'Accept': '*/*',
                'Accept-Language': 'es, es-VE, es-ES,en-US;q=0.9,en;q=0.8,fr;q=0.7,it;q=0.6',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Pragma': 'no-cache',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.167 Safari/537.36'
            }
        }).then((res) => {
            const $ = cheerio.load(res);
            var selection = $('h3 a');
            
            var hrefs = [];
            for (var i=0; i < selection.length; i++) {
                
                var a = selection[i];
                if (a.attribs.href.indexOf(domain) > -1) {
                    return ({page: page, pos: i + 1, domain: domain, kw: kw, uri: a.attribs.href});
                }
            }
            
            var nextUri = $("#pnnext").attr("href");            
            return search(domain, kw, nextUri, page + 1);
        });
    },
}
