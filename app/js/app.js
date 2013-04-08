'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp', ["google-maps", "bootstrap-module"]).
    config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/map', {templateUrl: 'partials/map.html', controller: MapCtrl});
    $routeProvider.otherwise({redirectTo: '/map'});
}]);


