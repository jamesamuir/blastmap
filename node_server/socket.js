exports.initSocketEvents = function initSocket(io){

    io.on('connection', function(socket){

        //var name = userNames.getGuestName();

        socket.emit('server ready', {msg: 'hi'}) ;


        socket.on('messsage', function(msg){
            console.log('Message received: ', msg);
            socket.broadcast.emit('message', msg);
        });




        socket.on('addblast', function(blastPaths){
            console.log('BLAST received: ', '');
            socket.broadcast.emit('blastadded', blastPaths);
        });


    });
}


