
var userNames = [ ];

exports.getGuestName = function(){

    console.log('getGuestName: ', name);

    var name, nextUserId = 1;
    do{
        name = 'Guest ' + nextUserId;
        console.log('getGuestName: ', name);
        nextUserId += 1;
    }while(!claim(name));

    return name;
}



var claim = function (name){

    //Check if name exists in list
    if (!name || userNames[name]){
        console.log('notclaimed: ', name);
        return false;
    }else{
        console.log('claimed: ', name);
        userNames[name] = true;
        return true;
    }
}


    //serialize claimed names as an array
exports.get = function(){
    var res = [ ];
    for (user in userNames){
        res.push(user);
    }
    return res;
}

exports.free = function (name){
    if (userNames[name]){
        userNames[name].pop();
    }
}


