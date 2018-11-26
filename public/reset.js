$(function() {
    $window = $(window);
    
    var socket = io();
    socket.emit('reset');
    window.location.replace("/");
})