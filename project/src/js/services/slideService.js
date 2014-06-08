module.factory('slideService',['$rootScope','server', function (rootScope, server){
    var service = {

       slides: [
                  {
                    index: 0,
                    nome: '',
                    legenda: '',
                    imageUrl: ''
                  },
                  {
                    index: 1,
                    nome: '',
                    legenda: '',
                    imageUrl: ''
                  },
                  {
                    index: 2,
                    nome: '',
                    legenda: '',
                    imageUrl: ''
                  }
                ],

       getSlides : function(){
           return service.slides;
       }
    };

    return service;

}]);



