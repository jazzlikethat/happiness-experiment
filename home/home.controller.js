(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope', 'AppGlobalConstants', '$http', 'AuthenticationService'];
    function HomeController(UserService, $rootScope, AppGlobalConstants, $http, AuthenticationService) {
        var vm = this;

        // TODO: Improve this logic
        // On reload, fetch userDetails
        var userData = AppGlobalConstants.userData;
        if (!("email" in userData)) {
            var authdata = $rootScope.globals.currentUser.authdata;

            AuthenticationService.decodeBase64(authdata, function(loginDetails){
                AuthenticationService.Login(loginDetails[0], loginDetails[1], function (response) {
                    if (response.status === 200) {
                        AuthenticationService.SetCredentials(loginDetails[0], loginDetails[1]);
                        AppGlobalConstants.userData = response.data.user;
                    }
                });
            })
        }

        vm.showQuestionnaire = false;
        vm.showDailyBalanceChart = false;
        
        vm.goToQuestionnaire = goToQuestionnaire;
        vm.goToDailyBalanceChart = goToDailyBalanceChart;
        vm.goToDashboard = goToDashboard;
        vm.goToLesson = goToLesson;

        function goToQuestionnaire(){
            vm.showDailyBalanceChart = false;
            vm.showQuestionnaire = true;
        }

        function goToDailyBalanceChart() {
            vm.showQuestionnaire = false;
            vm.showDailyBalanceChart = true;
        }

        function goToDashboard() {
            vm.showQuestionnaire = false;
            vm.showDailyBalanceChart = false;
        }

        function goToLesson() {
            vm.showQuestionnaire = false;
            vm.showDailyBalanceChart = false;
        }

    }

})();