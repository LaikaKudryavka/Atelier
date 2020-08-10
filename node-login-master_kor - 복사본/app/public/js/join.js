var http = require('http'); 
var fs = require('fs'); 
var ejs = require('ejs'); 
var hello = fs.readFileSync('./index.html', 'utf8'); 
var content1 = fs.readFileSync('./login.ejs', 'utf8'); 
var server = http.createServer(); 
server.on('request', doRequest); 
server.listen(1234); console.log('Server running!'); 
// 요청 처리 
function doRequest(req, res) { 
    var hello2 = ejs.render(hello, 
        { title: "제목입니다.", 
        content: ejs.render(content1,
            { message:"텍스트 메세지" }) 
        }); 
        res.writeHead(200, 
            {'Content-Type': 'text/html'
        }); 
        res.write(hello2); 
        res.end(); 
}