(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController)
        .directive('appQuestionnaire', Questionnaire);

    HomeController.$inject = ['UserService', '$rootScope', 'AppGlobalConstants', '$http'];
    function HomeController(UserService, $rootScope, AppGlobalConstants, $http) {
        var vm = this;

        vm.questionnaireSubmitted = false;

        vm.allQuestions = AppGlobalConstants.questionnaire;
        vm.submitQuestionnaire = submitQuestionnaire;
        vm.questionnaireApiResponse = {};

        function submitQuestionnaire() {
            var answers = [];
            for (var i = 0; i < vm.allQuestions.length; i++){
                answers.push(vm.allQuestions[i].value);
            }
            var email = "suresh.kumar@gmail.com"; // TODO

            $http({
                url: AppGlobalConstants.baseURL + '/questionnaire',
                method: "POST",
                headers: {"Content-Type": "application/json"},
                data: {
                    questionnaireAnswers: answers,
                    email: email
                }
            }).then(function(response){
                vm.questionnaireSubmitted = true;
                vm.questionnaireApiResponse = response.data;
            })
        }

    }

    Questionnaire.$inject = [];
    function Questionnaire(){
        return {
            restrict: 'EA',
            templateUrl: './home/questionnaire.html',
            link: function (scope, element, attrs) {
                
            }
        }
    }

})();