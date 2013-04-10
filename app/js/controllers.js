'use strict';

/* Controllers */


function NavigationCtrl($scope, $location, $http, mapToolService, mapSearchService, nukeService){

    //required to high light the active navigational point
    $scope.location = $location;

    $scope.mapTool = "";

    $scope.searchResults = "";



//$scope.nukes = s = nukeService.getNuke
    /*$http.get('nukes/nukes.json').success(function(data) {
     $scope.nukes = data;
     });*/


    $scope.data = nukeService.getNukes();





    //Search location
    $scope.searchLocation = function(){
        mapSearchService.searchLocation($scope.searchText);

        /*var url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + formatAddressString($scope.searchText) + '&sensor=false';
         alert(url);
         $http({method: 'GET', url: url}).
         success(function(data, status, headers, config) {
         //alert(status + " | good");
         //Set address text
         alert(data.status);
         $scope.searchResults = data;
         }).
         error(function(data, status, headers, config) {
         alert(status + " | bad");
         });*/

    }


    //Set mapTool functions
    $scope.setAddMarker = function(event){
        event.preventDefault();

        this.setMapTool("mapTool.ADDMARKER");
    }


    //Clear all markers and overlays, reset center and zoom
    $scope.setClearMap = function(event){
        event.preventDefault();
        nukeService.clearMap();
    }




    $scope.setRemoveMarker = function(event){
        event.preventDefault();
        this.setMapTool("mapTool.REMOVEMARKER");
    }

    $scope.setMapTool = function(mapTool){
        if (mapToolService.getMapTool() == mapTool){
            $scope.mapTool = "";
        }else{
            $scope.mapTool = mapTool;
        }
        mapToolService.setMapTool($scope.mapTool);
    }


}

function HomeCtrl($scope){

    $scope.modal = {
        "content": "Hello Modal",
            "saved": false
    }
}

function ContactCtrl($scope){


}

function MapCtrl($scope, socket){

    //------------------------------
    //For the map directive
    //------------------------------
    angular.extend($scope, {

        /** the initial center of the map */
        centerProperty: {
            lat:  37.50,
            lng: -96.45
        },

        /** the initial zoom level of the map */
        zoomProperty:5,

        /** list of markers to put in the map */
        markersProperty: [ ],

        /** list of overlays to put in the map */
        polygonsProperty: [ ],

        // These 2 properties will be set when clicking on the map
        clickedLatitudeProperty: null,
        clickedLongitudeProperty: null,

        centerLabelProperty: "Center Point"
    });



    //------------------------------
    //For the sidebar
    //------------------------------
    angular.extend($scope, {

        name : "--fetching--",
        users : [ ],
        messages : [ ]

    });


    //Listen for the user name and list of other users
    socket.on('init', function (data) {

        //debugger;

        $scope.name = data.name;

        $scope.users = data.users;
    });

    //Listen for a new user to be added
    socket.on('user:join', function (data) {
        //debugger;

        $scope.users.push(data);
    });

    //Listen for user to leave
    socket.on('user:left', function (data) {

        //alert("userleft");
        //debugger;

        var i, user;
        for (i = 0; i < $scope.users.length; i++) {
            user = $scope.users[i];
            if (user.name === data.name) {
                $scope.users.splice(i, 1);
                break;
            }
        }
    });



}


