
module.directive('logout', [ 'server', '$rootScope', function(server,rootScope) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click',function(){
                server.logout();
                safeDigest(rootScope);
            });
        }
    };
}]);
