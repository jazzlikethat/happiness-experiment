(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['AuthenticationService', '$location', '$rootScope', 'FlashService'];
    function RegisterController(AuthenticationService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;

            var payload = {
                email: vm.user.username,
                password: vm.user.password
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
    }

})();
