(function () {
    'use strict';

    angular
        .module('app')
        .directive('appQuestionnaire', Questionnaire);

    Questionnaire.$inject = ['AppGlobalConstants', '$http'];
    function Questionnaire(AppGlobalConstants, $http){
        return {
            restrict: 'EA',
            templateUrl: './app-directives/questionnaire/questionnaire.html',
            link: function (scope, element, attrs) {
                var vm = scope;
                vm.curPage = 0;
                vm.allQuestions = AppGlobalConstants.questionnaire;
                vm.questionnaireApiResponse = {};
                vm.questionnaireSubmitted = false;

                vm.paginationArray = [];
                for (var m = 0; m < vm.allQuestions.length / 5; m++) {
                    vm.paginationArray.push(m);
                }
                
                vm.switchToPage = switchToPage;
                vm.submitQuestionnaire = submitQuestionnaire;

                function switchToPage(page) {
                    vm.curPage = page;
                }
        
                function submitQuestionnaire() {
                    var answers = [];
                    for (var i = 0; i < vm.allQuestions.length; i++){
                        answers.push(parseInt(vm.allQuestions[i].value));
                    }
                    var email = AppGlobalConstants.userData.email;
        
                    $http({
                        url: AppGlobalConstants.baseURL + '/questionnaire',
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        data: {
                            questionnaireAnswers: answers,
                            email: email
                        }
                    }).then(function(response){
                        var userData = AppGlobalConstants.userData;
                        userData.hasFilledQuestionnaire = true;
                        AppGlobalConstants.userData = userData;
                        vm.questionnaireSubmitted = true;
                        vm.questionnaireApiResponse = response.data;
                    })
                }
            }
        }
    }

})();