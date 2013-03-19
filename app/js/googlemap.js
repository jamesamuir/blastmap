/**
 * Created with JetBrains WebStorm.
 * User: US084134
 * Date: 3/19/13
 * Time: 2:38 PM
 * To change this template use File | Settings | File Templates.
 */
'use strict';

/* Directives */
var MapMarkers = [ ];


//Check to see if marker exists
var MapHasMarker = function(newmarker, markers){
    var hasMarker = false;
    angular.forEach(MapMarkers, function(m, i){
        if (newmarker.lat() == m.latLng.lat() && newmarker.lng() == m.latLng.lng()){
            hasMarker = true;
        }
    });
    return hasMarker;
}


//Check to see if two numbers are equal
var floatEqual = function (f1, f2) {
    return (Math.abs(f1 - f2) < 0.000001);
}


var googleMapsModule = angular.module("google-maps", []);



googleMapsModule.directive('map', ["$log", "$timeout", function($log, $timeout) {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: '<div></div>',
        scope: {
            center: "=center", // required
            markers: "=markers", // optional
            polygons: "=polygons",
            latitude: "=latitude", // required
            longitude: "=longitude", // required
            zoom: "=zoom", // optional, default 8
            refresh: "&refresh" // optional
        },

        link: function(scope, element, attrs) {


            // Center property must be specified and provide lat & lng properties
            if (!angular.isDefined(scope.center) || (!angular.isDefined(scope.center.lat) || !angular.isDefined(scope.center.lng))) {
                $log.error("Could not find a valid center property");
                return;
            }


            var myOptions = {
                zoom: angular.isDefined(scope.zoom)? scope.zoom : 1,
                center: new google.maps.LatLng(scope.center.lat, scope.center.lng),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var _map = new google.maps.Map(document.getElementById(attrs.id), myOptions);


            //Set map event handlers
            google.maps.event.addListener(_map, "center_changed",

                function () {
                    //alert("fdsa");
                    var mapCenter = _map.getCenter();

                    $timeout(function () {
                        scope.$apply(function (){
                            scope.center.lat = mapCenter.lat();
                            scope.center.lng = mapCenter.lng();
                        });
                    });
                }
            );

            google.maps.event.addListener(_map, "zoom_changed",

                function () {
                    //alert("fdsa");
                    var mapzoom = _map.getZoom();

                    $timeout(function () {
                        scope.$apply(function (){
                            scope.zoom = mapzoom;
                        });
                    });
                }
            );

            google.maps.event.addListener(_map, "click",

                function (event) {

                    var coords = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());

                    scope.$apply(function (){
                        scope.markers.unshift(coords);
                    });

                }
            );



            //Markers
            scope.$watch("markers", function (newValue, oldValue) {


                if (newValue[0]){

                    if (!MapHasMarker, newValue[0], scope.markers){

                        var MapMarker = new google.maps.Marker({
                            position: new google.maps.LatLng(newValue[0].lat(), newValue[0].lng()),
                            map: _map
                        });

                        MapMarkers.push(MapMarker);
                    }
                }

            }, true);


        }
    };
}]);

