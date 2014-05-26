 module.directive('loading-page', function() {
      return {
        restrict: 'E',
        templateUrl: 'view/loading-page.html',
        replace: true,
        controller : ["$scope", function($scope){

        }]
      };
 });
