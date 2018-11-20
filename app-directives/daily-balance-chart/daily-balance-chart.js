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

                function submitDailyBalance() {
                    var entries_mod = [];
                    for (var i = 0; i < vm.dailyBalanceEntries.length; i++) {
                        var entry = vm.dailyBalanceEntries[i];
                        if (entry.balanceChartName === 'q1' || entry.balanceChartName === 'q2') {
                            vm.overallScore += entry.score;
                        }
                        var entry_mod = {
                            balanceChartName: entry.balanceChartName,
                            description: entry.description,
                            score: entry.score
                        };
                        entries_mod.push(entry_mod);
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

                function fieldChanged() {
                    
                }

            }
        }
    }

        
})();