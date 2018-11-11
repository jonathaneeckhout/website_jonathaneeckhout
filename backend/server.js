var http = require('http');
var url = require('url');
var fs = require('fs');

var PORT = 4567;

var WEBPAGEDIR = "./www";
var HOMEPAGE = WEBPAGEDIR + "/index.html";

var HTTP_HTML_HEADER = {'Content-Type': 'text/html'};
var HTTP_CSS_HEADER = {'Content-Type': 'text/css'};

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);

    var filename = "";

    if (q.pathname === '/') {
        filename = HOMEPAGE;
    } else {
        filename = WEBPAGEDIR + q.pathname;
    }

    var header = HTTP_HTML_HEADER;
    if (q.pathname.endsWith("css")) {
        header = HTTP_CSS_HEADER;
    }

    fs.readFile(filename, function(err, data) {
        if (err) {
            res.writeHead(404, header);
            return res.end("404 Not Found");
        }
        res.writeHead(200, header);
        res.write(data);
        return res.end();
    });

}).listen(PORT);
