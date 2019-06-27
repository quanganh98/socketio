var express = require('express');
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("./public"));
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var Users = [];
io.on("connection", function (socket) {
    console.log(socket.id + " Connect");
    socket.on("disconnect", function () {
        console.log(socket.id + " Disconnect");
    })
    socket.on("client-send-username", function (data) {
        if (Users.indexOf(data) >= 0) {
            socket.emit("server-send-register-faild");
        }
        else {
            Users.push(data);
            socket.UserName = data;
            socket.emit("server-send-resister-success", data);
            io.sockets.emit("server-send-list-user", Users);
        }
    })
    socket.on("logout", function () {
        Users.splice(
            Users.indexOf(socket.UserName), 1
        )
        socket.broadcast.emit("server-send-new-list", Users);
    })

    socket.on("user-send-mes", function (data) {
        io.sockets.emit("sever-send-user-mess", { username: socket.UserName, data: data });
    })

})

io.emit("")

app.get("/", function (req, res) {
    res.render("trangtru");
})


