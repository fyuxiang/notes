"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routers = exports.handleRouter = exports.getUrl = exports.readFile = exports.wirteFile = void 0;
const fs = require('fs');
const UserController = require('../app/user/router').UserController;
function wirteFile(name, data) {
    var index_writer = fs.createWriteStream(name);
    index_writer.write(data, 'utf-8');
    index_writer.end();
    index_writer.on('finish', (e) => {
        console.log(e);
    });
    return index_writer;
}
exports.wirteFile = wirteFile;
function readFile(url) {
    if (fs.existsSync(url)) {
        var buffer = fs.readFileSync(url);
        return buffer;
    }
    return readFile('404.html');
}
exports.readFile = readFile;
function getUrl(prefix, url) {
    return url.slice(prefix.length);
}
exports.getUrl = getUrl;
function handleRouter(request, response) {
    var url = getUrl('/ws/', request.url);
    return routers.user.run(request, response);
}
exports.handleRouter = handleRouter;
var routers = {
    user: new UserController
};
exports.routers = routers;
