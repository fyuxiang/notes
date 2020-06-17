
import { ServerResponse, ClientRequest } from "http";
import {parse} from 'url';
import queryparse from 'querystring';
 class UserController {
    run (request: Request, response: ServerResponse) {
        response.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
        var query = parse(request.url).query;
        var name = queryparse.parse(query as string).name;
        return response.end(JSON.stringify({name, sex: 'man', id: '1', content: parse(request.url)}))
    }
}
class ManageController {
    run (request: any, response: ServerResponse) {
        var body = '';
        request.on('data', (e: any) => {
            body+=e;
        });
        request.on('end', (e: any) => {
            var content = queryparse.parse(body);
            response.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
            return response.end(JSON.stringify({sex: 'man', id: '1', content: content}))
        });
    }
}
module.exports.UserController = UserController;
module.exports.ManageController = ManageController;