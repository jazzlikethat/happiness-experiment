(function () {
    'use strict';

    angular
        .module('app')
        .directive('appLesson', Lesson);

    Lesson.$inject = ['$http', 'AppGlobalConstants', '$rootScope'];
    function Lesson($http, AppGlobalConstants, $rootScope) {
        return {
            restrict: 'EA',
            templateUrl: './app-directives/lesson/lesson.html',
            link: function (scope, element, attrs) {
                var vm = scope;

                vm.lessons = null;
                vm.thoughtNumber = 1;
                vm.lesson1Submitted = false;
                vm.lesson2Submitted = false;
                vm.lesson3Submitted = false;

                vm.showWeeklyOverview = true;
                vm.showLessonOne = false;
                vm.showLessonTwo = false;
                vm.showLessonThree = false;

                vm.openLesson = openLesson;
                vm.templateUrl = templateUrl;
                vm.switchToLessonsOverview = switchToLessonsOverview;
                vm.submitLesson = submitLesson;
                vm.switchToDailyBalanceChart = switchToDailyBalanceChart;

                vm.dayCount = 1;

                function evalLessonTwoAndDays() {
                    var userData = AppGlobalConstants.userData;
                    var monthlyRoutine = userData.balanceChart;
                    if (monthlyRoutine.length > 0) {
                        setLesson2Complete();
                        vm.dayCount = 3 + monthlyRoutine.length;
                    }
                    else if (userData.hasFilledQuestionnaire) {
                        vm.dayCount = 3;
                    }
                    else if (userData.hasFilledStanfordQuestionnaire) {
                        vm.dayCount = 2;
                    }
                }

                function fetchLessons(){

                    evalLessonTwoAndDays();

                    $http({
                        url: AppGlobalConstants.baseURL + '/lesson?page=1 ',
                        method: "GET",
                        headers: {"Content-Type": "application/json"},
                    })
                    .then( function(response) {
                        vm.lessons = response.data;
                        var lesson3 = vm.lessons[1];
                        vm.lessons.splice(1, 1);
                        vm.lessons.push(lesson3);
                        // prefill previous responses
                        evalLessonsResponse();
                    })
                    .catch(angular.noop);
                }

                function openLesson(num) {
                    vm.showWeeklyOverview = false;
                    if (num === 1) {
                        vm.showLessonOne = true;
                    }
                    else if (num === 2 && vm.dayCount >= 3) {
                        vm.showLessonTwo = true;
                    }
                    else if (num === 3 && vm.dayCount >= 8) {
                        vm.showLessonThree = true;
                    }
                    else {
                        vm.showWeeklyOverview = true;
                    }
                }

                function templateUrl() {
                    return "/app-directives/thoughts/thought" + vm.thoughtNumber + ".html";
                }

                function switchToLessonsOverview() {
                    vm.showWeeklyOverview = true;
                    vm.showLessonOne = false;
                    vm.showLessonTwo = false;
                    vm.showLessonThree = false;
                }

                function submitLesson(num){
                    // check for invalid response
                    var invalid = false;
                    var tasks = vm.lessons[num-1].tasks;
                    for (var i = 0; i < tasks.length; i++) {
                        if (tasks[i].userResponse.trim() === ""){
                            tasks[i].invalidResponse = true;
                            invalid = true;
                        }
                        else {
                            tasks[i].invalidResponse = false;
                        }
                    }
                    if (invalid) {
                        return;
                    }
                    // submit api
                    var payload = {
                        lesson: vm.lessons[0],
                        email: AppGlobalConstants.userData.email
                    };
                    $http({
                        url: AppGlobalConstants.baseURL + '/lesson',
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        data: payload
                    })
                    .then(function(response) {
                        if (num === 1) {
                            vm.lesson1Submitted = true;
                        }
                        else if (num === 3) {
                            vm.lesson3Submitted = true;
                        }
                    })
                    .catch(angular.noop);
                }

                function switchToDailyBalanceChart() {
                    $rootScope.$emit('switchToDailyBalanceChart');
                    switchToLessonsOverview();
                }

                function evalLessonsResponse() {
                    var userData = AppGlobalConstants.userData;
                    var lessonResponses = userData.lessonResponses;
                    for (var i = 0; i < lessonResponses.length; i++) {
                        var response = lessonResponses[i];
                        if (!response.lessonSubmitted) {
                            continue;
                        }
                        if (response.lessonNumber === 1) {
                            vm.lesson1Submitted = true;
                            vm.lessons[0].tasks = response.tasks;
                        }
                        else if (response.lessonNumber === 3) {
                            vm.lesson3Submitted = true;
                            vm.lessons[2].tasks = response.tasks;
                        }
                    }
                }

                function setLesson2Complete() {
                    vm.lesson2Submitted = true;
                    cancelEvent();
                }

                var cancelEvent = vm.$on('updateMonthlyRoutine', setLesson2Complete);
                vm.$on('fetchUserDataComplete', fetchLessons);
            }
        }
    }


})();