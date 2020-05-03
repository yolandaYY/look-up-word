const http = require('http');
const fs = require('fs');
function startServer(_port) {
    var port = _port || parseInt(process.argv[2] || 9394);

    var server = http.createServer(function (req, res) {
        switch (req.url) {
            case "/":
                var homepage = fs.readFileSync(__dirname + '/index.html').toString();
                res.end(homepage);
                break;
            case "/index.css":
                var css = fs.readFileSync(__dirname + '/index.css').toString();
                res.end(css);
                break;
        }
    });

    server.listen(port, () => {
        console.log('服务启动(。・∀・)ノ端口:' + port);
    });

    server.on("error", err => {
        server.close();
        if (err.code === "EADDRINUSE") {
            process.stdout.write(`端口 ${err.port} 已被占用，是否切换端口？(y/n)`);
            process.stdin.on('data', (input) => {
                input = input.toString().trim();
                if (input.startsWith("y")) {
                    startServer(Math.floor(Math.random() * 10000 + 5000));
                } else {
                    process.exit(1);
                }
            });
        }
    });
}

startServer();