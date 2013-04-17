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

