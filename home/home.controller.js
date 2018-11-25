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
        
        vm.goToQuestionnaire = goToQuestionnaire;
        vm.goToDailyBalanceChart = goToDailyBalanceChart;
        vm.goToDashboard = goToDashboard;
        vm.goToLesson = goToLesson;

        function goToQuestionnaire(){
            vm.showDashboard = false;
            vm.showLesson = false;
            vm.showDailyBalanceChart = false;
            vm.showQuestionnaire = true;
        }

        function goToDailyBalanceChart() {
            vm.showDashboard = false;
            vm.showLesson = false;
            vm.showQuestionnaire = false;
            vm.showDailyBalanceChart = true;
        }

        function goToDashboard() {
            vm.showLesson = false;
            vm.showQuestionnaire = false;
            vm.showDailyBalanceChart = false;
            vm.showDashboard = true;
        }

        function goToLesson() {
            vm.showDashboard = false;
            vm.showQuestionnaire = false;
            vm.showDailyBalanceChart = false;
            vm.showLesson = true;
        }

        $rootScope.$on('switchToDailyBalanceChart', goToDailyBalanceChart);
    }

})();