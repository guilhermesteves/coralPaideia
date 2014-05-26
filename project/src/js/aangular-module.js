
var isApp = typeof intel !== 'undefined';

if(isApp){
  var onDeviceReady = function(){
    intel.xdk.device.hideSplashScreen();
  };

  document.addEventListener("intel.xdk.device.ready",onDeviceReady,false);

}

var module = angular.module('coralPaideia', ['ngRoute','ui.router','ui.bootstrap','ui.mask','ui.format','angularSpinner', 'ngScrollTo']);


module.config(["$locationProvider","$stateProvider", "$urlRouterProvider",function($locationProvider, $stateProvider, $urlRouterProvider){

  $locationProvider.html5Mode(false);

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main', {
          url: "/",
          views: {
             "slide": { template: "<slide-principal/>" },
             "content": { template: "<main-page/>" },
             "social": { template: "<social/>" }
          }
    })
    .state('music', {
          url: "/musica/:musica",
          views: {
             "content": { template: "<music-page/>" }
          }
    })
    .state('author', {
          url: "/autor",
          views: {
             "content": { template: "<author-page/>" }
          }
    });
}]);


function safeDigest(scope) {
    if(!scope.$$phase && !scope.$root.$$phase)
      scope.$digest();
}

