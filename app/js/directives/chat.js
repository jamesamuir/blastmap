var chatModule = angular.module("chatModule", []);


chatModule.directive("chatInput", function () {

    return {
        restrict: "E",
        priority: 100,
        transclude: true,
        template: "<input type='text' id='outgoingChatMessages' ng-transclude>",
        replace: true,
        scope: {

        },
        controller: function ($scope, $element) {



        },
        link: function (scope, element, attrs, ctrl) {

            element.bind("mouseenter", function(){
                element.val("attrs.enter");
            })

            element.bind("keypress", function(event){
                alert(event.which);
            })

        }
    };
});


chatModule.directive("chatOutput", ["socket", function (socket) {

    return {
        restrict: "E",
        priority: 100,
        transclude: false,
        template: "<ul id='incomingChatMessages'></ul>",
        replace: true,
        scope: {

        },
        controller: function ($scope, $element) {



        },
        link: function (scope, element, attrs, ctrl) {



            socket.on('server ready', function(data){

                var list = element.html();
                list = list + "<li>" + data.msg + "</li>";
                element.html(list);

            }) ;

            socket.on('server ready', function(data){

                var list = element.html();
                list = list + "<li>" + data.msg + "</li>";
                element.html(list);

            }) ;


        }
    };
}]);