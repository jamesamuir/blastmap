'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp', ["google-maps"]).
    config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {templateUrl: './app/partials/home.html', controller: HomeCtrl});
    $routeProvider.when('/map', {templateUrl: './app/partials/map.html', controller: MapCtrl});
        $routeProvider.when('/contact', {templateUrl: './app/partials/contact.html', controller: ContactCtrl});
    $routeProvider.otherwise({redirectTo: '/home'});
}]);


