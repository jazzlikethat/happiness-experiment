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


                    //////////
                    
                    
                    zingchart.render({
                        id: 'myChart',
                        data: {
                          type: 'area',
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
                              borderColor: 'green',
                              borderRadius: 3,
                              borderWidth: 1,
                              fontColor: 'green',
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
                              borderColor: 'green',
                              borderRadius: 3,
                              borderWidth: 1,
                              fontColor: 'green',
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

                    
                    ///////////



                    /////

                    /*
                    var myConfig = {
                        "layout":"h",
                         "globals":{
                            "font-family":"Roboto"
                        },
                        "graphset":[
                            
                            {
                            type: 'area',
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
                            },
                            {
                                "type":"pie",
                                "scale":{
                                    "size-factor":1.0
                                  },
                                "background-color":"#F4F4F4",
                                "legend":{
                                    "background-color":"none",
                                    "border-width":0,
                                    "shadow":false,
                                    "layout":"float",
                                    "margin":"auto auto 16% auto",
                                    "marker":{
                                        "border-radius":3,
                                        "border-width":0
                                    },
                                    "item":{
                                        "color":"%backgroundcolor"
                                    }
                                },
                                "title":{
                                    "text":"Lessons",
                                    "background-color":"none",
                                    "color":"#626262",
                                    "font-size":16,
                                    "x":-52,
                                    "y":80
                                },
                                "plotarea":{
                                    "border-color":"#DFE1E3",
                                    "border-width":1,
                                    "border-radius":3,
                                    "margin":"15% 5%"
                                },
                                "labels":[
                                    {
                                        "x":"45%",
                                        "y":"47%",
                                        "width":"10%",
                                        "text":"2 Lessons Remaining",
                                        "font-size":14
                                    }    
                                ],
                                "plot":{
                                    "size":50,
                                    "slice":70,
                                    "border-width":0,
                                    "shadow":0,
                                    "value-box":{
                                        "visible":false
                                    },
                                     "tooltip":{
                                        "text":"%v",
                                        "shadow":false,
                                        "border-radius":3
                                    }
                                },
                                "series":[
                                    {
                                        "values":[1],
                                        "text":"Lessons Completed",
                                        "background-color":"#6CCFDF"
                                    },
                                    {
                                        "values":[3],
                                        "text":"Total Lessons",
                                        "background-color":"#E76D45"
                                    }
                                ]
                            }
                        ]
                    };
                   
                    zingchart.render({ 
                        id : 'myChart', 
                        data : myConfig, 
                    });

                    */
                    ////
                }

                vm.$on('fetchUserDataComplete', evalMonthlyRoutine);

                
            }
        }
    }

})();