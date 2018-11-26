(function () {
    'use strict';

    angular
        .module('app')
        .directive('appDashboard', Dashboard);

    Dashboard.$inject = ['AppGlobalConstants', '$http'];
    function Dashboard(AppGlobalConstants, $http){
        return {
            restrict: 'EA',
            templateUrl: './app-directives/dashboard/dashboard.html',
            link: function (scope, element, attrs) {
                var vm = scope;
                vm.totalDays = [
                    'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12', 'Day 13', 'Day 14', 'Day 15',
                    'Day 16', 'Day 17', 'Day 18', 'Day 19', 'Day 20', 'Day 21', 'Day 22', 'Day 23', 'Day 24', 'Day 25', 'Day 26',  'Day 27', 'Day 28', 'Day 29'
                ];
                vm.monthlyBalanceEntries = ["How Excited were you to start your day ?", "Was it a good day ?", "Mindset", "Overall Health", "Body - Excercise",
                    "Body - Nutrition", "Mental", "Emotional", "Spirit", "Sleep", "Wealth (money)", "Time", "Experiences", 
                    "Relationships", "Community (service)", "Impact", "Work", "Home", "Stress", "Balance", "Other", "Daily score"
                ];

                var scoresArray = [];

                function evalMonthlyRoutine(){

                    vm.monthlyRoutine = AppGlobalConstants.userData.balanceChart;

                    vm.monthlyRoutine.sort(function(a,b) {
                        return new Date(a.currentDateTime) - new Date(b.currentDateTime);
                    });

                    for (var i = 0; i < vm.monthlyRoutine.length; i++) {
                        var day_scores = vm.monthlyRoutine[i];
                        var total_score = parseInt(day_scores.balanceChart[0].score) + parseInt(day_scores.balanceChart[1].score);
                        var entry = {
                            balanceChartName: "DailyScore",
                            description: "Overall score",
                            score: total_score
                        };
                        scoresArray.push(total_score);
                        vm.monthlyRoutine[i].balanceChart.push(entry);
                    }

                    zingchart.render({
                        id: 'myChart',
                        data: {
                          type: 'area',
                          title: {
                            textAlign: 'center',
                            text: "Daily Balance Activity Chart"
                          },
                          scaleX: {
                            label: {
                              text: 'Days',
                              backgroundColor: '#ffe6e6',
                              borderColor: 'red',
                              borderRadius: 3,
                              borderWidth: 1,
                              fontColor: 'red',
                              fontFamily: 'Georgia',
                              fontSize: 16,
                              fontStyle: 'normal',
                              fontWeight: 'normal',
                              padding: '5px 20px'
                            }
                          },
                          scaleY: {
                            values: '0:20:5',
                            label: {
                              text: 'Daily Score',
                              backgroundColor: '#ffe6e6',
                              borderColor: 'red',
                              borderRadius: 3,
                              borderWidth: 1,
                              fontColor: 'red',
                              fontFamily: 'Georgia',
                              fontSize: 16,
                              fontStyle: 'normal',
                              fontWeight: 'normal',
                              padding: '3px 20px'
                            }
                          },
                          series: [{
                            values: scoresArray,
                          }]
                        }
                    });

                }

                vm.$on('fetchUserDataComplete', evalMonthlyRoutine);

                
            }
        }
    }

})();