(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController)
        .directive('appQuestionnaire', Questionnaire);

    HomeController.$inject = ['UserService', '$rootScope', 'AppGlobalConstants', '$http'];
    function HomeController(UserService, $rootScope, AppGlobalConstants, $http) {
        var vm = this;

        vm.allQuestions = AppGlobalConstants.questionnaire;
        vm.submitQuestionnaire = submitQuestionnaire;
        vm.questionnaireSubmitted = false;
        vm.questionnaireApiResponse = {};

        function submitQuestionnaire() {
            var answers = [];
            for (var i = 0; i < vm.allQuestions.length; i++){
                // answers.push(vm.allQuestions[i].value);
                answers.push(5);
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

        $(document).ready(function () {

            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');
            });

            $('#questionnaire-modal').modal('show');
        
        });
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