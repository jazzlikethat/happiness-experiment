(function () {
    'use strict';

    angular
        .module('app')
        .directive('appLesson', Lesson);

    Lesson.$inject = ['$http', 'AppGlobalConstants'];
    function Lesson($http, AppGlobalConstants) {
        return {
            restrict: 'EA',
            templateUrl: './app-directives/lesson/lesson.html',
            link: function (scope, element, attrs) {
                var vm = scope;

                vm.lessons = null;
                vm.lessonSubmitted = false;
                vm.invalidResponse = false;

                fetchLessons();

                vm.submitLesson = submitLesson;
                vm.resetFlags = resetFlags;

                function fetchLessons(){
                    $http({
                        url: AppGlobalConstants.baseURL + '/lesson?page=1 ',
                        method: "GET",
                        headers: {"Content-Type": "application/json"},
                    })
                    .then( function(response) {
                        vm.lessons = response.data;
                        console.log(vm.lessons);
                    }, function(response) {
                        // handle this scenario
                    })
                    .catch(angular.noop);
                }

                function submitLesson(){
                    // check for invalid response
                    var tasks = vm.lessons[0].tasks;
                    for (var i = 0; i < tasks.length; i++) {
                        if (tasks[i].userResponse.trim() === ""){
                            vm.invalidResponse = true;
                            return;
                        }
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
                        vm.lessonSubmitted = true;
                    })
                    .catch(angular.noop);
                }

                function resetFlags() {
                    vm.lessonSubmitted = false;
                    vm.invalidResponse = false;
                }
            }
        }
    }


})();