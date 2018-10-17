(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService', 'AppGlobalConstants'];
    function LoginController($location, AuthenticationService, FlashService, AppGlobalConstants) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.status === 200) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    AppGlobalConstants.userData = response.data.user;
                    $location.path('/');
                } else {
                    FlashService.Error(response.data.msg);
                    vm.dataLoading = false;
                }
            });
        };
    }

})();
