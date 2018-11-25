(function () {
    'use strict';

    angular
        .module('app')
        .directive('dailyBalanceChart', DailyBalanceChart);

    DailyBalanceChart.$inject = ['$http', 'AppGlobalConstants'];
    function DailyBalanceChart($http, AppGlobalConstants) {
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

                getDailyBalanceEntries();

                function getDailyBalanceEntries() {
                    $http({
                        url: AppGlobalConstants.baseURL + '/dailyRoutine',
                        method: "GET",
                        headers: {"Content-Type": "application/json"}
                    }).then(function(response){
                        vm.dailyBalanceEntries = response.data;
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
                    else {
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
                        },
                        function(response) {
                            // show an error message
                        }
                    )

                }

                function evalMonthlyRoutine() {
                    var balanceChart = AppGlobalConstants.userData.balanceChart;
                    if (balanceChart.length === 0) {
                        return;
                    }
                    var lastEntry = balanceChart[balanceChart.length - 1];
                    vm.dailyBalanceEntries[0].previousScore = parseInt(lastEntry.balanceChart[0].score);
                    vm.dailyBalanceEntries[1].previousScore = parseInt(lastEntry.balanceChart[1].score);
                }

                vm.$on('fetchUserDataComplete', evalMonthlyRoutine);

            }
        }
    }

        
})();