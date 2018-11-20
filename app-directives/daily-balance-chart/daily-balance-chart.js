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
                    
                    vm.dailyBalanceSubmitted = true;
                }

                function fieldChanged() {
                    
                }

            }
        }
    }

        
})();