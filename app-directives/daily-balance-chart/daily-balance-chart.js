(function () {
    'use strict';

    angular
        .module('app')
        .directive('dailyBalanceChart', DailyBalanceChart);

    DailyBalanceChart.$inject = [];
    function DailyBalanceChart() {
        return {
            restrict: 'EA',
            templateUrl: './app-directives/daily-balance-chart/daily-balance-chart.html',
            link: function (scope, element, attrs) {
                var vm = scope;
                vm.dailyBalanceEntries = ["Mindset", "Overall Health", "Body - Excercise", "Body - Nutrition", "Mental",
                    "Emotional", "Spirit", "Sleep", "Wealth (money)", "Time", "Experiences", 
                    "Relationships", "Community (service)", "Impact", "Work", "Home", "Stress", "Balance", "Other"
                ];
                vm.overallScore = null;
                vm.field1 = null;
                vm.field2 = null;
                vm.dailyBalanceSubmitted = false;

                vm.field1IsRed = false;
                vm.field1IsYellow = false;
                vm.field1IsGreen = false;
                vm.field2IsRed = false;
                vm.field2IsYellow = false;
                vm.field2IsGreen = false;

                vm.submitDailyBalance = submitDailyBalance;
                vm.field1Changed = field1Changed;
                vm.field2Changed = field2Changed;

                function submitDailyBalance() {
                    vm.overallScore = parseInt(vm.field1) + parseInt(vm.field2);
                    vm.dailyBalanceSubmitted = true;
                }

                function field1Changed() {
                    
                    vm.field1IsRed = false;
                    vm.field1IsYellow = false;
                    vm.field1IsGreen = false;
                    
                    if (vm.field1 < 4) {
                        vm.field1IsRed = true;
                    }
                    else if (vm.field1 > 7) {
                        vm.field1IsGreen = true;
                    }
                    else {
                        vm.field1IsYellow = true;
                    }
                }

                function field2Changed() {
                    
                    vm.field2IsRed = false;
                    vm.field2IsYellow = false;
                    vm.field2IsGreen = false;
                    
                    if (vm.field2 < 4) {
                        vm.field2IsRed = true;
                    }
                    else if (vm.field2 > 7) {
                        vm.field2IsGreen = true;
                    }
                    else {
                        vm.field2IsYellow = true;
                    }
                }
            }
        }
    }

        
})();