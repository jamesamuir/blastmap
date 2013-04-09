exports.initSocketEvents = function initSocket(io, users){

    io.on('connection', function(socket){

        var name = users.getGuestName();
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ Username is ", name);

        // send the new user their name and a list of users
        socket.emit('init', {
            name: name,
            users: users.get()
        });



        socket.on('messsage', function(msg){
            //console.log('Message received: ', msg);
            socket.broadcast.emit('message', msg);
        });




        socket.on('addblast', function(blastPaths){
            //console.log('BLAST received: ', '');
            socket.broadcast.emit('blastadded', blastPaths);
        });


    });
}


