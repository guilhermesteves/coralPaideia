module.factory('passwordService',['$rootScope','server', function (rootScope,server){
    var service = {
        
        data : {
            newPassword : '',
            newPasswordConfirm : '',
            oldPassword : ''
        },

        save : function(){
            server.put("/auth/password/",{newPassword : this.data.newPassword, oldPassword : this.data.oldPassword}).success(function(){
                rootScope.$broadcast( 'password.saved' );
            });

            safeDigest(rootScope);
        },

        cancel : function(){
            this.data.newPassword = '';
            this.data.newPasswordConfirm = '';
            this.data.oldPassword = '';

            rootScope.$broadcast( 'password.cancelled' );
        },

        clean : function(){
            this.data.newPassword = '';
            this.data.newPasswordConfirm = '';
            this.data.oldPassword = '';

            rootScope.$broadcast( 'password.cleaned' );
        }

           
    
    };

    return service;

}]);