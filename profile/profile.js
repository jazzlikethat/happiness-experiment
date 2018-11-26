(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', Profile);

    Profile.$inject = ['AppGlobalConstants', '$http', '$rootScope'];
    function Profile(AppGlobalConstants, $http, $rootScope){
        var vm = this;
       
        vm.userData = null;

        function evalUserData() {
            vm.userData = AppGlobalConstants.userData;
        }

        $rootScope.$on('fetchUserDataComplete', evalUserData);
    }

})();