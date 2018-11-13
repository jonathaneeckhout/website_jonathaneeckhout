var http = require('http');
var url = require('url');
var fs = require('fs');

var PORT = 4567;

var WEBPAGEDIR = "./www";
var HOMEPAGE = WEBPAGEDIR + "/index.html";

var HTTP_HTML_HEADER = {'Content-Type': 'text/html'};
var HTTP_CSS_HEADER = {'Content-Type': 'text/css'};
var HTTP_ALL_HEADER = {'Content-Type': '*/*'};

function setHttpHeader(req, res) {
    if (req.headers['accept'] == null) {
        res.writeHead(200, HTTP_HTML_HEADER);
        return;
    }
    
    var contentType =  req.headers['accept'].split(",")[0];

    if (contentType === 'text/html') {
        res.writeHead(200, HTTP_HTML_HEADER);
    } else if (contentType === 'text/css') {
        res.writeHead(200, HTTP_CSS_HEADER);
    } else if (contentType === '*/*') {
        res.writeHead(200, HTTP_ALL_HEADER);
    } else {
        res.writeHead(200, HTTP_HTML_HEADER);
    }
}

function sendHttpError (req, res) {
    setHttpHeader(req, res);
    return res.end("404 Not Found");
}

function getWebPageFile (path) {
    var filename = "";

    if (path === '/') {
        filename = HOMEPAGE;
    } else {
        filename = WEBPAGEDIR + path;
    }
    return filename;
}

http.createServer(function (req, res) {

    if (req.method === 'GET') {
        var q = url.parse(req.url, true);

        var filename = getWebPageFile(q.pathname);

        fs.readFile(filename, function(err, data) {
            if (err) {
                return sendHttpError(req, res);
            }

            setHttpHeader(req, res);
            res.write(data);
            return res.end();
        });
    } else if (req.method === 'PUSH') {
        return sendHttpError(req, res);
    } else {
        return sendHttpError(req, res);
    }

}).listen(PORT);
