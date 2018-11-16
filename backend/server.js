var http = require('http');
var url = require('url');
var fs = require('fs');

var PORT = 4567;

var WEBPAGEDIR = "./www";
var IMGPAGEDIR = "./";
var HOMEPAGE = WEBPAGEDIR + "/index.html";

var HTTP_HTML_HEADER = {'Content-Type': 'text/html'};
var HTTP_CSS_HEADER = {'Content-Type': 'text/css'};
var HTTP_ALL_HEADER = {'Content-Type': '*/*'};

function getHttpHeaderContentType(req) {
  if (req.headers['accept'] == null) {
      res.writeHead(200, HTTP_HTML_HEADER);
      return "error";
  }

  var contentType =  req.headers['accept'].split(",")[0];

  return contentType;

}

function setHttpHeader(req, res) {
  contentType = getHttpHeaderContentType(req);

    if (contentType === 'text/html') {
        res.writeHead(200, HTTP_HTML_HEADER);
        return true;
    } else if (contentType === 'text/css') {
        res.writeHead(200, HTTP_CSS_HEADER);
        return true;
    } else if (contentType === '*/*') {
        res.writeHead(200, HTTP_ALL_HEADER);
        return true;
    } else {
      return false;
    }
}

function sendHttpError (req, res) {
    setHttpHeader(req, res);
    return res.end("404 Not Found");
}

function getWebPageFile (path, req) {
    var filename = "";

    contentType = getHttpHeaderContentType(req);

    if (contentType === 'text/html') {
        if (path === '/') {
            filename = HOMEPAGE;
          } else {
            filename = WEBPAGEDIR + path;
          }
    } else if (contentType === 'text/css') {
        filename = WEBPAGEDIR + path;

    } else if (contentType === '*/*') {
        filename = IMGPAGEDIR + path;
    } else {

    }
    return filename;
}

http.createServer(function (req, res) {

    if (req.method === 'GET') {
        var q = url.parse(req.url, true);
	console.log(q.pathname);

        var filename = getWebPageFile(q.pathname, req);
        console.log(filename);
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
