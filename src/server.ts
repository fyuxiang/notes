
const http = require("http");
import { readFile, wirteFile, getUrl, handleRouter } from "./util";
import {Router} from './util/util';
const UserController = require('./app/user/router').UserController;
const ManageController = require('./app/user/router').ManageController;
const route = new Router;
route.accept('/ws/user', UserController)
route.accept('/ws/postUser', ManageController)
http.createServer(function (request: any, response: any) {
    try {
        request.setTimeout(10000);
        let url: string = "";
        if (request.url.endsWith("index")) {
            response.writeHead(200, { "Content-Type": "text/html" });
            return response.end(readFile("static/index.html"));
        }
        if (request.url.startsWith("/my/")) {
            url = getUrl("/my/", request.url);
            return response.end(readFile(`static/${url}`));
        }
        if (request.url.startsWith("/ws/")) {
            const res =  route.run(request, response);
            if (!res) {
                url = getUrl("/ws/", request.url);
                return response.end(readFile(`static/${url}`));
            }
            return true;
        }
        return response.end(readFile(`static/${url}`));
    } catch (error) {
        console.debug(error)
    }
}).listen(10000);
wirteFile("index.html", "<!doctype html><html><head>mysever</head><body>here<body></html>");
