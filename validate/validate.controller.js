(function () {
    'use strict';

    angular
        .module('app')
        .controller('EmailValidateController', EmailValidateController);

    EmailValidateController.$inject = ['$location', 'AuthenticationService', 'FlashService', 'AppGlobalConstants'];
    function EmailValidateController($location, AuthenticationService, FlashService, AppGlobalConstants) {
        var vm = this;

        var token = $location.search().token;

        vm.validateComplete = false;
        vm.validateSuccess = false;

        vm.goToHome = goToHome;

        validateEmail();

        function validateEmail() {
            var payload = {
                token: token
            }

            AuthenticationService.validate(payload, function(response) {
                vm.validateComplete = true;
                if (response.status === 200) {
                    vm.validateSuccess = true;
                }
            })
        }

        function goToHome(){
            $location.path('/');
        }
    }

})();
