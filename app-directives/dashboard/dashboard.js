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

                    scoresArray = [];

                    vm.userData = AppGlobalConstants.userData;
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
                    
                    var myConfig = {
                      "layout":"h",
                       "globals":{
                          "font-family":"Arial,sans-serif",
                          "font-size" : "24px",
                      },
                      "graphset":[
                          
                          {
                          type: 'area',
                          "x": "0%",
                          "y":"10%",
                          "height":"80%",
                          "width":"75%",  
                        plot : {
                          aspect : 'spline',
                          animation:{
                              delay:400,
                              effect:3,
                              speed:500,
                              method:"ANIMATION_BOUNCE_EASE_OUT",
                              sequence:0
                          },
                        },
                        title: {
                          textAlign: 'center',
                          text: "Daily Balance Activity Chart"
                        },
                        scaleX: {
                          "min-value":1,
                          label: {
                            text: 'Days',
                            backgroundColor: '#e7e7ff',
                            borderColor: 'blue',
                            borderRadius: 3,
                            borderWidth: 1,
                            fontColor: 'blue',
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
                            backgroundColor: '#e7e7ff',
                            borderColor: 'blue',
                            borderRadius: 3,
                            borderWidth: 1,
                            fontColor: 'blue',
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
                          },
                          {
                              "type":"ring",
                              "height":"70%",
                              "width":"30%",
                              "x":"72%",
                              "y":"10%",
                              "title":{
                                "text":"Lesson Progress"
                              },
                              "plot":{
                                "value-box":{
                                  "text":"<h3>"+ vm.userData.lessonCompleted+" </> <br/> lessons completed",
                                  "placement":"center",
                                  "font-color":"black",
                                  "font-size":25,
                                  "font-family":"Georgia",
                                  "font-weight":"normal",
                                  "rules":[
                                    {
                                      "rule":"%p != 0",
                                      "visible":false
                                    }
                                  ]
                                },
                                "tooltip":{
                                  "text":"%t: %v (%npv%)",
                                  "font-color":"black",
                                  "font-family":"Georgia",
                                  "text-alpha":1,
                                  "background-color":"white",
                                  "alpha":0.7,
                                  "border-width":1,
                                  "border-color":"#cccccc",
                                  "line-style":"dotted",
                                  "border-radius":"10px",
                                  "padding":"10%",
                                  "placement":"node:center"
                                },
                                "slice":"50%",
                                "border-width":1,
                                "border-color":"#cccccc",
                                "line-style":"dotted"
                              },
                              "plotarea":{
                                "margin-top":"12%"
                              },
                              "series":[
                                {
                                  "values":[(3-vm.userData.lessonCompleted)],
                                  "slice":"80%",
                                  "text":"Remaining",
                                  "background-color":"#C5DEFD",
                                      "border-width":"0px",
                                },
                                {
                                  "values":[vm.userData.lessonCompleted],
                                  "slice":"80%",
                                  "text":"Completed",
                                           "background-color":"#85a1af",
                                      "alpha":"0.5",
                                      "border-color":"#85a1af",
                                      "border-width":"1px",
                                      "shadow":0
                                }
                              ]
                            }
                      ]
                  };
                 
                  zingchart.render({ 
                      id : 'myChart', 
                      data : myConfig, 
                  });


                }


                function updateMonthlyRoutine(event, data) {
                    vm.monthlyRoutine.push({
                        balanceChart: data
                    });
                    evalMonthlyRoutine();
                    cancelEvent();
                }

                var cancelEvent = vm.$on('updateMonthlyRoutine', updateMonthlyRoutine);
                vm.$on('fetchUserDataComplete', evalMonthlyRoutine);

                
            }
        }
    }

})();