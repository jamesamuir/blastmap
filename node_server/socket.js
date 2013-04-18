exports.initSocketEvents = function initSocket(io, users, locations){


    var count = 0;

    io.on('connection', function(socket){

        var name = users.getGuestName(socket.id);
        count++;

        //console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ clientid is ", socket.id);


        //broadcast new user to other clients
        socket.broadcast.emit('user:join', {
            name: name
        });



        socket.on('startgame', function(user){

            console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  :", user.name);

            users.

            //Add user name to all other clients
            socket.broadcast.emit('user:join', {
                name: user.name
            });

            //Get the list of current users for current client
            socket.emit('init', {
                users: users.get()
            });

            1
        });



        socket.on('messsage', function(msg){
            //console.log('Message received: ', msg);
            socket.broadcast.emit('message', msg);
        });




        socket.on('addblast', function(blastPaths){
            //console.log('BLAST received: ', '');
            socket.broadcast.emit('blastadded', blastPaths);
        });


        socket.on('disconnect', function () {

            console.log('----#####################################%%%%%%%%%%%%%%%%%%%%%DICONTESSO!!!!!: ', name);

            socket.broadcast.emit('user:left', {
                name: name
            });
            users.free(name);
        });


    });
}


