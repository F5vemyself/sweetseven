var http = require('http');
var fs = require('fs');
var url = require('url');
 
 
// 创建服务器
http.createServer( function (request, response) 
{  
   // 解析请求，包括文件名
   var pathname = url.parse(request.url).pathname;
   //parse表示分割字符串
   //url.parse(request.url)表示分割请求的url的pathname
   
   // 输出请求的文件名
   console.log("Request for " + pathname + " received.");
   
   // 从文件系统中读取请求的文件内容
   fs.readFile(pathname.substr(1), function (err, data) 
   {
        if (err) 
        {
            console.log(err);
            // HTTP 状态码: 404 : NOT FOUND
            // Content Type: text/plain
            response.writeHead(404, {'Content-Type': 'text/html'});
        }
        else
        {             
            contentType = 'text/html';
            pathname = pathname.toLowerCase();//如果有大写，要化为小写（路径内）

            if(pathname.endsWith('css') || pathname.endsWith('js')){
                ends = pathname.split('.')[2];//split分割
                contentType = 'text/' + ends;
            }
            else if(pathname.endsWith('jpg')){
                contentType = 'image/jpg';
            }
            else if(pathname.endsWith('png')){
                contentType = 'image/png';
            }
            else{
                contentType = 'text/html';
            }  
            response.writeHead(200, {'Content-Type': contentType});    
         
            // 响应文件内容
            response.write(data.toString());        
        }
        //  发送响应数据
         response.end();

    }); 
 
//       fs.readFile('./public/**/*.jpg', function (err, data) {
//         if (err) {
//            console.log(err);
//            response.writeHead(404, {'Content-Type': 'image/jpg'});
//         }
//         else {
//             response.writeHead(200, {'Content-Type': 'image/jpg'});    
//         }
    
//    });  
//    response.end();
 
}).listen(8080);
 
// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8080/');
