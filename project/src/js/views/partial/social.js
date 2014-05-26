module.directive('social', function() {
      return {
        restrict: 'E',
        templateUrl: 'view/partial/social.html',
        replace: true,
        controller : ["server", "$scope", function(server, $scope){

        }]
      };
 });
