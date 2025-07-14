import {WebSocketServer} from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws,request) {

    const url = request.url;
    if(!url){
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token')?? "";
    const decoded = jwt.verify(token,JWT_SECRET)

    if(!decoded || !(decoded as JwtPayload).userId){
        ws.close();
        return;
    }

    ws.on('error',console.error);

    wss.on('message', function message(data) {
        console.log('received: %s', data);
        // Echo the received message back to the client
        ws.send(`Echo: ${data}`);
    });
})