(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope', 'AppGlobalConstants', '$http', 'AuthenticationService', '$timeout'];
    function HomeController(UserService, $rootScope, AppGlobalConstants, $http, AuthenticationService, $timeout) {
        var vm = this;

        vm.hideSpinner = false;
        vm.showDashboard = false;
        vm.showLesson = false;
        vm.showQuestionnaire = false;
        vm.showQuestionnaire2 = false;
        vm.showDailyBalanceChart = false;
        
        vm.goToQuestionnaire = goToQuestionnaire;
        vm.goToQuestionnaire2 = goToQuestionnaire2;
        vm.goToDailyBalanceChart = goToDailyBalanceChart;
        vm.goToDashboard = goToDashboard;
        vm.goToLesson = goToLesson;

        function hideAll() {
            vm.showDashboard = false;
            vm.showLesson = false;
            vm.showQuestionnaire = false;
            vm.showQuestionnaire2 = false;
            vm.showDailyBalanceChart = false;
        }

        function goToQuestionnaire(){
            hideAll();
            vm.showQuestionnaire = true;
        }

        function goToQuestionnaire2() {
            hideAll();
            vm.showQuestionnaire2 = true;
        }

        function goToDailyBalanceChart() {
            hideAll();
            vm.showDailyBalanceChart = true;
        }

        function goToDashboard() {
            hideAll();
            vm.showDashboard = true;
        }

        function goToLesson() {
            hideAll();
            vm.showLesson = true;
        }

        function hideSpinner(){
            $timeout(function(){
                vm.hideSpinner = true;
            }, 1000);
            var userData = AppGlobalConstants.userData;
            if (!userData.hasFilledQuestionnaire) {
                vm.showQuestionnaire = true;
            }
            else if (!userData.hasFilledDailyBalanceChartToday) {
                vm.showDailyBalanceChart = true;
            }
            else {
                vm.showDashboard = true;
            }
        }

        $rootScope.$on('fetchUserDataComplete', hideSpinner);
        $rootScope.$on('switchToDailyBalanceChart', goToDailyBalanceChart);
    }

})();