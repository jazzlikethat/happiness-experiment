(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', Profile);

    Profile.$inject = ['AppGlobalConstants', '$http', '$rootScope'];
    function Profile(AppGlobalConstants, $http, $rootScope){
        var vm = this;
       
        vm.userData = null;

        vm.basicInfoIsVisible = true;
        vm.editDetailsIsVisible = false;

        vm.showBasicInfo = showBasicInfo;
        vm.showEditDetails = showEditDetails;

        function showBasicInfo() {
            vm.basicInfoIsVisible = true;
            vm.editDetailsIsVisible = false;
        }

        function showEditDetails() {
            vm.basicInfoIsVisible = false;
            vm.editDetailsIsVisible = true;
        }

        function evalUserData() {
            vm.userData = AppGlobalConstants.userData;
        }

        $rootScope.$on('fetchUserDataComplete', evalUserData);
    }

})();