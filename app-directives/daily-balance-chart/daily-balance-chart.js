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

                vm.submitDailyBalance = submitDailyBalance;

                function getDailyBalanceEntries() {
                    $http({
                        url: AppGlobalConstants.baseURL + '/dailyRoutine',
                        method: "GET",
                        headers: {"Content-Type": "application/json"}
                    }).then(function(response){
                        vm.dailyBalanceEntries = response.data;
                    })
                }

                function submitDailyBalance() {
                    
                    var entries_mod = [];
                    var invalid = false;
                    vm.incompleteResponses = false;
                    for (var i = 0; i < vm.dailyBalanceEntries.length; i++) {
                        var entry = vm.dailyBalanceEntries[i];
                        if (entry.balanceChartName === 'q1' || entry.balanceChartName === 'q2') {
                            if (entry.score > 0){
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
                            vm.$broadcast('updateMonthlyRoutine', entries_mod);
                        },
                        function(response) {
                            // show an error message
                        }
                    )
                    .catch(angular.noop);
                }

                function evalDailyRoutine() {
                    var userData = AppGlobalConstants.userData;
                    var balanceChart = userData.balanceChart;
                    if (userData.hasFilledDailyBalanceChartToday) {
                        // Fill the model with today's daily routine
                        vm.dailyBalanceEntries = balanceChart[balanceChart.length - 1].balanceChart;
                        vm.overallScore = parseInt(vm.dailyBalanceEntries[0].score) + parseInt(vm.dailyBalanceEntries[1].score);
                        vm.dailyBalanceSubmitted = true;
                    }
                    else {
                        // In case no previous entries, fetch the entry details
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