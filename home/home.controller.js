(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope', 'AppGlobalConstants', '$http', 'AuthenticationService'];
    function HomeController(UserService, $rootScope, AppGlobalConstants, $http, AuthenticationService) {
        var vm = this;

        vm.showDashboard = true;
        vm.showLesson = false;
        vm.showQuestionnaire = false;
        vm.showDailyBalanceChart = false;
        vm.showCommunity = false;

        vm.goToQuestionnaire = goToQuestionnaire;
        vm.goToDailyBalanceChart = goToDailyBalanceChart;
        vm.goToDashboard = goToDashboard;
        vm.goToLesson = goToLesson;
        vm.goToCommunity = goToCommunity;

        function goToQuestionnaire(){
            vm.showDashboard = false;
            vm.showLesson = false;
            vm.showDailyBalanceChart = false;
            vm.showQuestionnaire = true;
            vm.showCommunity = false;
        }

        function goToDailyBalanceChart() {
            vm.showDashboard = false;
            vm.showLesson = false;
            vm.showQuestionnaire = false;
            vm.showDailyBalanceChart = true;
            vm.showCommunity = false;
        }

        function goToDashboard() {
            vm.showLesson = false;
            vm.showQuestionnaire = false;
            vm.showDailyBalanceChart = false;
            vm.showDashboard = true;
            vm.showCommunity = false;
        }

        function goToLesson() {
            vm.showDashboard = false;
            vm.showQuestionnaire = false;
            vm.showDailyBalanceChart = false;
            vm.showLesson = true;
            vm.showCommunity = false;
        }

        function goToCommunity() {
            vm.showDashboard = false;
            vm.showQuestionnaire = false;
            vm.showDailyBalanceChart = false;
            vm.showLesson = false;
            vm.showCommunity = true;
        }

        $rootScope.$on('switchToDailyBalanceChart', goToDailyBalanceChart);
    }

})();