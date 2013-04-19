app.directive('uniqueEmail', function($http) {
    var toId;
    return {
        restrict: 'E',
        require: 'ngModel',
        link: function(scope, elem, attr, ctrl) {
            //when the scope changes, check the email.
            scope.$watch(attr.ngModel, function(value) {
                // if there was a previous attempt, stop it.
                if(toId) clearTimeout(toId);

                // start a new attempt with a delay to keep it from
                // getting too "chatty".
                toId = setTimeout(function(){
                    // call to some API that returns { isValid: true } or { isValid: false }
                    $http.get('/Is/My/EmailValid?email=' + value).success(function(data) {

                        //set the validity of the field
                        $scope.$apply(function(s) {
                            ctrl.$setValidity('uniqueEmail', data.isValid);
                        });
                    });
                }, 200);
            })
        }
    }
});