module.directive('slide-principal', function() {
      return {
        restrict: 'E',
        templateUrl: 'view/partial/slide-principal.html',
        replace: true,
        controller : ["server", "$scope", "slideService", function(server, $scope, slideService){

          $scope.getSlides = slideService.getSlides;
        }]
      };
 });
