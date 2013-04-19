
var userNames = [ ];












//node.js requires exports


exports.claim = function (name, clientid){

    //Check if name exists in list
    if (!name || userNames[name] != null){
        return false;
    }else{

        userNames[name] = {name: name, clientid: clientid};
        return true;
    }
}

exports.isAvailable = function(name){
    if (!name || userNames[name] != null){
        return false;
    }else{
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


