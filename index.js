const http = require ("http");
const express = require ("express")
const app = express();
const {Server} = require ("socket.io")
const path = require ("path")
const server = http.createServer(app);
const io = new Server(server);
// handle socket
io.on ('connection', (socket)=>{
    console.log("a new user connected ", socket.id)
    socket.on ("user-message", (message)=>{
        console.log(" A new user message", message)
        // send all sever
        io.emit('message',message)
    })
})

app.use(express.static(path.resolve("./public")))
const port = 8000;

app.get('/',(req,res)=>{
    return res.sendFile("/public/index.html");
})
server.listen (port, ()=>{
    console.log("server started on port"+ port);
})