"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    run(request, response) {
        response.writeHead(200, { 'Content-Type': 'application/json;charset=UTF-8' });
        return response.end(JSON.stringify({ name: 'feng', sex: 'man', id: '1' }));
    }
}
module.exports.UserController = UserController;
