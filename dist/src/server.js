"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const util_1 = require("./util/util");
http.createServer(function (request, response) {
    try {
        request.setTimeout(10000);
        let url = "";
        if (request.url.endsWith("index")) {
            response.writeHead(200, { "Content-Type": "text/html" });
            return response.end(util_1.readFile("static/index.html"));
        }
        if (request.url.startsWith("/my/")) {
            url = util_1.getUrl("/my/", request.url);
            return response.end(util_1.readFile(`static/${url}`));
        }
        if (request.url.startsWith("/ws/")) {
            return util_1.handleRouter(request, response);
        }
        return response.end(util_1.readFile(`static/${url}`));
    }
    catch (error) {
        console.log(error);
    }
}).listen(10000);
util_1.wirteFile("index.html", "<!doctype html><html><head>mysever</head><body>here<body></html>");
