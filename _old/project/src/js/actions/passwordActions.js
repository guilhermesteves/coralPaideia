module.directive('savePassword', [ 'passwordService', function(passwordService) {
    return {
      restrict: 'A',
      link: function( scope, element, attrs ) {
        element.bind( "click", function() {	
          passwordService.save();
        });
      }
    };
}]);  


module.directive('cancelPassword', [ 'passwordService', function(passwordService) {
    return {
      restrict: 'A',
      link: function( scope, element, attrs ) {
        element.bind( "click", function() { 
          passwordService.cancel();
        });
      }
    };
}]);



