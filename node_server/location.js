var userLocations = [ ];
var nextLocationId = 0;


var locations = new Array();
locations[0] = {"address": "Harrisburg PA", "lat": 40.273611, lng: -76.884722};
locations[0] = {"address": "Trenton NJ", "lat": 40.217053, lng: -74.742938};
locations[0] = {"address": "York PA", "lat": 39.9625, lng: -76.728056};






/**
 * Created with JetBrains WebStorm.
 * User: US084134
 * Date: 4/10/13
 * Time: 6:39 PM
 * To change this template use File | Settings | File Templates.
 */
exports.getUserLocation = function(name){


    var location = locations[nextLocationId];
    userLocations[name] = location;

    if (nextLocationId == 2){
        nextLocationId = 0;
    }

    return location;
}