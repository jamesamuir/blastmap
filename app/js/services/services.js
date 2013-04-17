'use strict';

app.factory('nukeService', function($rootScope, $http) {
    var nukeService = {};
    nukeService.data = {};
    nukeService.data.selectedNuke = 20;
    nukeService.data.orderProp = "yield";
    nukeService.data.nukeDialogVisible = false;
    nukeService.data.nukes = {};

    //For modal selection window
    nukeService.setNukeDialogVisible = function(visible){

    }
    nukeService.getNukeDialogVisible = function(visible){
        return nukeService.nukeDialogVisible;
    }

    nukeService.getSelectedNuke = function(){
        return nukeService.data;
    }


    //Gets the list of nuclear weapons
    nukeService.getNukes = function() {
        $http.get('nukes/nukes.json')
            .success(function(data) {
                nukeService.data.nukes = data;
                //alert(status + " | good");
            }).
            error(function(data, status, headers, config) {
                alert(status + " | bad");
            });

        return nukeService.data;
    };

    //Gets the details for a single nuclear weapon
    nukeService.getNuke = function(id) {
        $http.get('nukes/' + id + '.json').success(function(data) {
            nukeService.nuke = data;
        });

        return nukeService.nuke;
    };


    //Gets the details for a single nuclear weapon
    nukeService.clearMap = function() {
        $rootScope.$broadcast('clearMap');
    };

    return nukeService;
});



app.factory('mapToolService', function($rootScope) {
    var mapToolService = {};

    mapToolService.mapTool = "";

    mapToolService.getMapTool = function() {
        return mapToolService.mapTool;
    };

    mapToolService.setMapTool = function(value) {
        mapToolService.mapTool = value;
        $rootScope.$broadcast('changeTool');
    };

    return mapToolService;
});


app.factory('mapSearchService', function($rootScope, $http) {
    var mapSearchService = {};

    //Properties
    mapSearchService.searchLat = "";
    mapSearchService.searchLng = "";
    mapSearchService.formattedAddress = "";



    //
    mapSearchService.searchResults = {};
    mapSearchService.searchResults.items = {};
    mapSearchService.searchResults.found = "";



    //Accessors
    mapSearchService.getSearchLat = function() {
        return mapSearchService.searchLat;
    };
    mapSearchService.getSearchLng = function() {
        return mapSearchService.searchLng;
    };
    mapSearchService.getFormattedAddress = function() {
        return mapSearchService.formattedAddress;
    };
    mapSearchService.getSearchResults = function() {
        return mapSearchService.searchResults;
    };



    //Search
    mapSearchService.getSearchLocationList = function(searchText) {

        var locations = [];

        var geocoder = new google.maps.Geocoder();

        geocoder.geocode( { 'address': searchText}, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {


                //Loop each result returned from geocode
                angular.forEach(results, function (result, i) {

                    var location = result.geometry.location;

                    //Get address, lat, and lng
                    var address = result.formattedAddress = result.formatted_address;
                    var lat = location.lat();
                    var lng = location.lng();

                    //Push info to array
                    locations.push({ "address": address, "lat": lat, "lng": lng });

                });


                //Set the changes to locaiton
                $rootScope.$apply( function(){
                    mapSearchService.searchResults.items = locations;
                    mapSearchService.searchResults.found = true;
                });

            }
            else{
                alert(status + " | bad");

                $rootScope.$apply( function(){
                    mapSearchService.searchResults.found = false;
                });
            }
            //debugger;
        });
    };


    //Search
    mapSearchService.searchLocation = function(searchText) {

        var geocoder = new google.maps.Geocoder();

        geocoder.geocode( { 'address': searchText}, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {



                    debugger;
                    mapSearchService.formattedAddress = results[0].formatted_address;

                    //Set location
                    var location = results[0].geometry.location;



                    mapSearchService.searchLat = location.lat();
                    mapSearchService.searchLng = location.lng();

                    //alert(location.lat());

                    $rootScope.$broadcast('updateMapCenter');


            }
            else{
                alert(status + " | bad");
            }
        });
    };

    return mapSearchService;
});