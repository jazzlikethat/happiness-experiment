(function () {
    'use strict';

    angular
        .module('app')
        .directive('dailyBalanceChart', DailyBalanceChart);

    DailyBalanceChart.$inject = ['$http', 'AppGlobalConstants', 'AuthenticationService'];
    function DailyBalanceChart($http, AppGlobalConstants, AuthenticationService) {
        return {
            restrict: 'EA',
            templateUrl: './app-directives/daily-balance-chart/daily-balance-chart.html',
            link: function (scope, element, attrs) {
                var vm = scope;

                vm.overallScore = null;
                vm.dailyBalanceSubmitted = false;
                vm.incompleteResponses = false;

                vm.fieldQ1Q2Changed = fieldQ1Q2Changed;
                vm.submitDailyBalance = submitDailyBalance;

                function getDailyBalanceEntries() {
                    $http({
                        url: AppGlobalConstants.baseURL + '/dailyRoutine',
                        method: "GET",
                        headers: {"Content-Type": "application/json"}
                    }).then(function(response){
                        vm.dailyBalanceEntries = response.data;
                        evalMonthlyRoutine();
                    })
                }

                function fieldQ1Q2Changed(entry) {
                    var curItem = null;
                    if (entry.balanceChartName === 'q1') {
                        curItem = vm.dailyBalanceEntries[0];
                    }
                    else if (entry.balanceChartName === 'q2') {
                        curItem = vm.dailyBalanceEntries[1];
                    }
                    curItem.isRed = false;
                    curItem.isGreen = false;
                    curItem.isYellow = false;
                    
                    if (curItem.score.trim() === "") {
                        return;
                    }

                    var score = parseInt(curItem.score);
                    if (score > curItem.previousScore) {
                        curItem.isGreen = true;
                    }
                    else if (score < curItem.previousScore) {
                        curItem.isRed = true;
                    }
                    else if (scope === curItem.previousScore) {
                        curItem.isYellow = true;
                    }
                }

                function submitDailyBalance() {
                    var entries_mod = [];
                    var invalid = false;
                    vm.incompleteResponses = false;
                    for (var i = 0; i < vm.dailyBalanceEntries.length; i++) {
                        var entry = vm.dailyBalanceEntries[i];
                        if (entry.balanceChartName === 'q1' || entry.balanceChartName === 'q2') {
                            if (entry.score > 1){
                                vm.overallScore += parseInt(entry.score);
                            }
                            else {
                                invalid = true;
                            }
                        }
                        var entry_mod = {
                            balanceChartName: entry.balanceChartName,
                            description: entry.description,
                            score: entry.score
                        };
                        entries_mod.push(entry_mod);
                    }
                    
                    if (invalid) {
                        vm.overallScore = null;
                        vm.incompleteResponses = true;
                        return;
                    }

                    var payload = {
                        email: AppGlobalConstants.userData.email,
                        balanceChart: entries_mod
                    };

                    $http({
                        url: AppGlobalConstants.baseURL + '/dailyRoutine',
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        data: payload
                    })
                    .then(
                        function(response) {
                            vm.dailyBalanceSubmitted = true;
                            AuthenticationService.getCompleteData(AppGlobalConstants.userData.email);
                        },
                        function(response) {
                            // show an error message
                        }
                    )
                    .catch(angular.noop);
                }

                function evalMonthlyRoutine() {
                    var balanceChart = AppGlobalConstants.userData.balanceChart;
                    var index = 0;
                    
                    if (balanceChart.length === 0) { // No previous entry
                        return;
                    }
                    else if (vm.dailyBalanceSubmitted && balanceChart.length === 1) { // Only previous entry is today's entry
                        return;
                    }
                    
                    if (vm.dailyBalanceSubmitted) {
                        index = balanceChart.length - 2;
                    }
                    else {
                        index = balanceChart.length - 1;
                    }
                    var lastEntry = balanceChart[index];
                    vm.dailyBalanceEntries[0].previousScore = parseInt(lastEntry.balanceChart[0].score);
                    vm.dailyBalanceEntries[1].previousScore = parseInt(lastEntry.balanceChart[1].score);

                    if (vm.dailyBalanceSubmitted) {
                        fieldQ1Q2Changed({'balanceChartName': 'q1'});
                        fieldQ1Q2Changed({'balanceChartName': 'q2'});
                    }
                }

                function evalDailyRoutine() {
                    var userData = AppGlobalConstants.userData;
                    var balanceChart = userData.balanceChart;
                    if (userData.hasFilledDailyBalanceChartToday) {
                        vm.dailyBalanceEntries = balanceChart[balanceChart.length - 1].balanceChart;
                        vm.dailyBalanceSubmitted = true;
                        evalMonthlyRoutine();
                    }
                    else {
                        getDailyBalanceEntries();
                    }
                    // Once the daily routine is fetched, unsubscribe to the event
                    deregisterListener();
                }

                var deregisterListener = vm.$on('fetchUserDataComplete', evalDailyRoutine);

            }
        }
    }

        
})();