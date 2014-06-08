 module.directive('musicPage', function() {
      return {
        restrict: 'E',
        templateUrl: 'view/music-page.html',
        replace: true,
        controller : ["$sce", "$scope", "$state", "$stateParams", "musicService",  function($sce, $scope, $state, $stateParams, musicService){
          $scope.model = {};

          function bindFromService() {
            $scope.model = musicService.music;
            $scope.youtube = $sce.trustAsResourceUrl('http://www.youtube.com/embed/'+musicService.music.video);
            safeDigest($scope);
          }

          $scope.$on('music.view', function () {
            bindFromService();
          });

          if ($stateParams.slug) {
            musicService.getMusic($stateParams.slug);
          } else {
            $state.go('main');
          }

          $scope.getHtmlContent = function (html) {
            return $sce.trustAsHtml(html);
          };
        }]
      };
 });
