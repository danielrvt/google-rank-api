var request = require("request-promise");
var cheerio = require('cheerio');

module.exports = {
    search: function search (domain, kw, uri, page) {
        if (!page) page = 1;
        if (page && page > 10) return Promise.resolve({page: -1, pos: -1, domain: domain, kw: kw});

        return request({
            uri: "https://www.google.co.ve/" + uri,
            method: "GET",
            headers: {
                'Accept': '*/*',
                'Accept-Language': 'es,en-US;q=0.9,en;q=0.8,fr;q=0.7,it;q=0.6',
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
                hrefs.push({uri: selection[i].attribs.href, pos: i});
            }
            
            if (hrefs.filter((h) => h.uri.indexOf(domain) > 0).length > 0) {                
                var href =  hrefs.pop();
                console.log("Encontro", {page: page, pos: href.pos, domain: domain, kw: kw})
                return ({page: page, pos: href.pos, domain: domain, kw: kw});
            }

            var nextUri = $("#pnnext").attr(href);
            return search(domain, kw, nextUri, ++page);
        });
    },
}