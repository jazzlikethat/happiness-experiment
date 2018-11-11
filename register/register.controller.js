(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['AuthenticationService', '$location', '$rootScope', 'FlashService'];
    function RegisterController(AuthenticationService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.invalidPassword = false;

        vm.register = register;
        vm.resetFlags = resetFlags;

        function register() {

            if (vm.user.password.trim().length < 6) {
                vm.invalidPassword = true;
                return;
            }
            vm.dataLoading = true;

            var payload = {
                email: vm.user.username,
                password: vm.user.password,
                fName: vm.user.firstName,
                lName: vm.user.lastName
            }
            AuthenticationService.signup(payload, function (response) {
                if (response.status === 200) {
                    FlashService.Success('Registration successful', true);
                    $location.path('/login');
                } else {
                    FlashService.Error(response.data.msg);
                    vm.dataLoading = false;
                }
            });
        }

        function resetFlags() {
            vm.invalidPassword = false;
        }
    }

})();
