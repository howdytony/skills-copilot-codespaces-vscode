// Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var path = require('path');
var mime = require('mime');

var comments = [];

var server = http.createServer(function(req, res) {
  var urlObj = url.parse(req.url, true);
  var pathname = urlObj.pathname;
  var query = urlObj.query;

  if (pathname === '/') {
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    fs.readFile('./index.html', function(err, data) {
      if (err) {
        console.log(err);
        res.statusCode = 404;
        res.end('Not Found');
      } else {
        res.end(data);
      }
    })
  } else if (pathname === '/comments') {
    // 获取get请求参数
    var callbackName = query.callback;
    // 获取post请求参数
    var str = '';
    req.on('data', function(data) {
      str += data;
    });
    req.on('end', function() {
      var obj = qs.parse(str);
      obj.time = new Date().toLocaleString();
      comments.push(obj);
      // 返回数据
      res.setHeader('Content-Type', 'application/javascript;charset=utf-8');
      res.end(callbackName + '(' + JSON.stringify(comments) + ')');
    });
  } else {
    // 读取文件
    var filename = '.' + pathname;
    fs.readFile(filename, function(err, data) {
      if (err) {
        res.statusCode = 404;
        res.end('Not Found');
      } else {
        res.setHeader('Content-Type', mime.lookup(filename) + ';charset=utf-8');
        res.end(data);
      }
    });
  }
});

server.listen(3000, function() {
  console.log('Server is running at port 3000...');
});