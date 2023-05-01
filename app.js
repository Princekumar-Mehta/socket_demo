import  express  from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import http from "http"
import { Server } from 'socket.io';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = 8000;

const server = http.createServer(app);
const socketio =new Server(server);
app.get("/",(request,response)=>{
    const options = {
        root:path.join(__dirname)
    }
    const filename = "index.html";
  response.sendFile(filename,options)
})

socketio.on("connection",(socket)=>{
    console.log("one user is connected");
    socket.on("disconnect",()=>{
        console.log("one user disconnected");
    })
})
const start = async ()=>{
    try{
        server.listen(PORT, ()=>{
            console.log(PORT, "Hi I am listening");
        })
    }catch(err){
        console.log(err);
    }
}
start();