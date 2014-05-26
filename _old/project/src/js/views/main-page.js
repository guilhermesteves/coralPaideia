 module.directive('mainPage', function() {
      return {
        restrict: 'E',
        templateUrl: 'view/main-page.html',
        replace: true,
        controller : ["$scope", function($scope){
          
        }]
      };
 });