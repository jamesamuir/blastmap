'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp', ["google-maps", "bootstrap-module"]).
    config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: HomeCtrl});
    $routeProvider.when('/map', {templateUrl: 'partials/map.html', controller: MapCtrl});
        $routeProvider.when('/contact', {templateUrl: 'partials/contact.html', controller: ContactCtrl});
    $routeProvider.otherwise({redirectTo: '/map'});
}]);


