
module.directive('phoneMask', [ '$timeout', function(timeout) {
  return {
    priority: 10,
    restrict: 'A',
    require: 'ngModel',
    scope : false,
    compile:  function (element, attrs, transclude) {
      attrs.$set('uiMask','{{phoneMask}}');


      return function(scope,element,attrs,ngModelCtrl){
                scope.phoneMask = '(99) 9999-?99999';

                scope.$watch(attrs.ngModel,function (){
                  if(ngModelCtrl.$modelValue !== undefined && ngModelCtrl.$modelValue !== null){
                    var phone =ngModelCtrl.$modelValue;
                    scope.phoneMask = '(99) 9999-?99999';
                    ngModelCtrl.$modelValue = phone;

                    if(ngModelCtrl.$modelValue.length == 11)
                      updateMask('(99) 99999-9999');
                  }

                  function updateMask(mask){
                    timeout(function(){
                      scope.phoneMask = mask;
                      ngModelCtrl.$modelValue = phone;
                    },300);
                  }


                });


              };
    }
  };
}]);

