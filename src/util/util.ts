import { Interface } from "readline";
import {parse} from 'url';
import { readFile } from "fs";
export interface RouteController {
    new (): this;
    run (request: any, response: any): any
}
export class Router {
    routers: Map<string|null, any> = new Map;
    accept (route: string|null, controller: RouteController) {
        this.routers.set(route, new controller)
    }
    run (request: any, response: any) {
        const pathname = parse(request.url).pathname;
        if (!this.routers.has(pathname)) {
            return false;
        }
        this.routers.get(pathname).run(request, response);
        return true;
    }
}
export const db = {
    host     : 'localhost',
    port: 3306,
    user     : 'root',
    password : 'Root@123456',
    database : 'test'
  }