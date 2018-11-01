(function () {
    'use strict';

    angular
        .module('app')
        .controller('ResetController', ResetController);

    ResetController.$inject = ['$location', 'AuthenticationService', 'FlashService', 'AppGlobalConstants'];
    function ResetController($location, AuthenticationService, FlashService, AppGlobalConstants) {
        var vm = this;

        vm.resetFailure = false;

        var token = $location.search().token;

        vm.reset = reset;
        vm.resetFlags = resetFlags;

        function reset(){
            if (vm.password !== vm.confirmPassword) {
                vm.resetFailure = true;
                vm.errorMessage = 'Password and Confirm Password do not match with each other. Please check again.';
                return;
            }

            var payload = {
                token: token,
                newPassword: vm.password
            };

            AuthenticationService.reset(payload, function(response) {
                if (response.status === 200) {
                    FlashService.Success('Password change successful', true);
                    $location.search('token', null);
                    $location.path('/login');
                }
                else {
                    vm.resetFailure = true;
                    vm.errorMessage = response.data.msg;
                }
            });
        }

        function resetFlags() {
            vm.resetFailure = false;
            vm.errorMessage = '';
        }

    }

})();
