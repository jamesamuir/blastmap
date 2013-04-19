exports.initSocketEvents = function initSocket(io, users, locations){


    var count = 0;

    io.on('connection', function(socket){

        var name = '';
        count++;

        //console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ clientid is ", socket.id);

        socket.on('socket:startgame', function(user){

            //console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  :", user.name);

            if (users.claim(user.name, socket.id)){

                //Add user name to all other clients
                socket.broadcast.emit('user:join', {
                    name: user.name
                });

                //Get the list of current users for current client
                socket.emit('socket:gamestarted', {
                    users: users.get()
                });

            }else{
                //Validation failed us, the user already exists
                socket.emit('socket:usernotclaimed', {
                    claimed: false
                });
            }




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


