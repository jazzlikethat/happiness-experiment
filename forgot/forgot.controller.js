(function () {
    'use strict';

    angular
        .module('app')
        .controller('ForgotController', ForgotController);

    ForgotController.$inject = ['$location', 'AuthenticationService', 'FlashService', 'AppGlobalConstants'];
    function ForgotController($location, AuthenticationService, FlashService, AppGlobalConstants) {
        var vm = this;

        vm.resetSuccess = false;
        vm.resetFailure = false;

        vm.forgot = forgot;
        vm.resetFlags = resetFlags;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function forgot(){
            var payload = {
                email: vm.username
            };
            AuthenticationService.forgot(payload, function(response){
                if (response.status === 200) {
                    vm.resetSuccess = true;
                }
                else {
                    vm.resetFailure = true;
                }
            });
        }

        function resetFlags() {
            vm.resetSuccess = false;
            vm.resetFailure = false;
        }
    }

})();
