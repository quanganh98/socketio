var socket = io("http://localhost:3000");
socket.on("server-send-register-faild", function () {
    alert("Duplicate");
})
socket.on("server-send-resister-success", function (data) {
    $("#currentUser").html(data);
    $("#loginForm").hide(1000);
    $("#chatForm").show(2000);
})
socket.on("server-send-list-user", function (data) {
    $("#boxContent").html("");
    data.forEach(element => {
        console.log(element);
        $("#boxContent").append("<div class='user'>" + element + "</div>")
    });
})
socket.on("server-send-new-list", function (data) {
    $("#boxContent").html("");
    data.forEach(element => {
        console.log(element);
        $("#boxContent").append("<div class='user'>" + element + "</div>")
    });
})

socket.on("sever-send-user-mess", function (data) {
    $("#listMessages").append("<div class='mess'>" + data.username + ":" + data.data + "</div>")
})

$(document).ready(function () {
    $("#loginForm").show();
    $("#chatForm").hide();

    // $("#chatForm").hide();

    $("#btnRegister").click(function () {
        socket.emit("client-send-username", $("#userName").val());
    })

    $("#btnLogout").click(function () {
        socket.emit("logout");
        $("#loginForm").show();
        $("#chatForm").hide();
    })

    $("#btnSend").click(function () {
        socket.emit("user-send-mes", $("#txtMess").val());
        $("#txtMess").val("");
    })
}); 