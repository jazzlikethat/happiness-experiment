(function () {
    'use strict';

    angular
        .module('app')
        .directive('appDashboard', Profile);

    Profile.$inject = ['AppGlobalConstants', '$http'];
    function Dashboard(AppGlobalConstants, $http){
        return {
            restrict: 'EA',
            templateUrl: './app-directives/profile/profile.html',
            link: function (scope, element, attrs) {
                // var vm = scope;
                // vm.totalDays = [
                //     'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12', 'Day 13', 'Day 14', 'Day 15',
                //     'Day 16', 'Day 17', 'Day 18', 'Day 19', 'Day 20', 'Day 21', 'Day 22', 'Day 23', 'Day 24', 'Day 25', 'Day 26',  'Day 27', 'Day 28', 'Day 29'
                // ];
                // vm.monthlyBalanceEntries = ["How Excited were you to start your day ?", "Was it a good day ?", "Mindset", "Overall Health", "Body - Excercise",
                //     "Body - Nutrition", "Mental", "Emotional", "Spirit", "Sleep", "Wealth (money)", "Time", "Experiences", 
                //     "Relationships", "Community (service)", "Impact", "Work", "Home", "Stress", "Balance", "Other", "Daily score"
                // ];

                // function evalMonthlyRoutine(){

                //     vm.monthlyRoutine = AppGlobalConstants.userData.balanceChart;

                //     vm.monthlyRoutine.sort(function(a,b) {
                //         return new Date(a.currentDateTime) - new Date(b.currentDateTime);
                //     });

                //     for (var i = 0; i < vm.monthlyRoutine.length; i++) {
                //         var day_scores = vm.monthlyRoutine[i];
                //         var entry = {
                //             balanceChartName: "DailyScore",
                //             description: "Overall score",
                //             score: parseInt(day_scores.balanceChart[0].score) + parseInt(day_scores.balanceChart[1].score)
                //         };
                //         vm.monthlyRoutine[i].balanceChart.push(entry);
                //     }
                // }

                //vm.$on('fetchUserDataComplete', evalMonthlyRoutine);
            }
        }
    }

})();