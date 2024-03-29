﻿(function () {
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
            vm.hideSpinner = true;
            
            // Check if its Day 1 or Day 2 or Day 3. Views change according to the day
            var userData = AppGlobalConstants.userData;

            if (!userData.hasFilledStanfordQuestionnaire) {
                // First day
                vm.showQuestionnaire = true;
            }
            else if (!userData.hasFilledQuestionnaire) {
                // Second day
                vm.showQuestionnaire2 = true;
            }
            else if (!userData.hasFilledDailyBalanceChartToday) {
                // Third day
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