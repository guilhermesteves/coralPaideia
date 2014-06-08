 module.directive('authorPage', function() {
      return {
        restrict: 'E',
        templateUrl: 'view/author-page.html',
        replace: true,
        controller : ["$scope",  function($scope){

        }]
      };
 });
