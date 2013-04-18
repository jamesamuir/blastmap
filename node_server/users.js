
var userNames = [ ];












//node.js requires exports
exports.getGuestName = function(clientid){



    var name, nextUserId = 1;
    do{
        name = 'guest' + nextUserId;
        console.log('getGuestName: ', name);
        nextUserId += 1;
    }while(!claim(nextUserId, name, clientid));

    return name;
}



var claim = function (count, name, clientid){



    //Check if name exists in list
    if (!name || userNames[name] != null){
        return false;
    }else{

        userNames[name] = {name: name, clientid: clientid};


        console.log('claimed: ', name);
        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ userNames[name] = ', userNames[name]);
        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ userNames.length = ', userNames.length);

        return true;
    }
}


    //serialize claimed names as an array
exports.get = function(){
    var res = [ ];
    for (key in userNames){
        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ userNames[name] = ', userNames[key].name);
        res.push( {name: userNames[key].name} );
    }
    return res;
}

exports.free = function (name){
    if (userNames[name]){
        delete userNames[name];
    }
}


