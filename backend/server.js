var http = require('http');
var url = require('url');
var fs = require('fs');

var PORT = 4567;

var WEBPAGEDIR = "./www";
var HOMEPAGE = WEBPAGEDIR + "/index.html";

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);

    var filename = "";

    console.log("Pathname: " + q.pathname);
    if (q.pathname === '/') {
        filename = HOMEPAGE;
    } else {
        filename = WEBPAGEDIR + q.pathname;
    }
    console.log("Filename: " + filename);
    fs.readFile(filename, function(err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(PORT);
