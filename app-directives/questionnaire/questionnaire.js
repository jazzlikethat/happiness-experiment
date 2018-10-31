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
                var curPage = 0;
                vm.allQuestions = AppGlobalConstants.questionnaire;
                vm.questionnaireApiResponse = {};
                vm.questionnaireSubmitted = false;
                
                vm.disablePrevButton = true;
                vm.disableNextButton = false;
                
                vm.submitQuestionnaire = submitQuestionnaire;
                vm.previousPage = previousPage;
                vm.nextPage = nextPage;    

                for (var k = 0; k < vm.allQuestions.length; k++) {
                    vm.allQuestions[k].show = false;
                }
                displayCurrentPageQuestions();
        
                function submitQuestionnaire() {
                    var answers = [];
                    for (var i = 0; i < vm.allQuestions.length; i++){
                        answers.push(vm.allQuestions[i].value);
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
        
                function previousPage(){
                    curPage -= 1;
                    vm.disableNextButton = false;
                    if (curPage === 0){
                        vm.disablePrevButton = true;
                    }
                    for (var i = 0; i < vm.allQuestions.length; i++) {
                        vm.allQuestions[i].show = false;
                    }
                    displayCurrentPageQuestions();
                }
        
                function nextPage(){
                    curPage += 1;
                    vm.disablePrevButton = false;
                    if (curPage + 1 > vm.allQuestions.length / 5){
                        vm.disableNextButton = true;
                    }
                    for (var i = 0; i < vm.allQuestions.length; i++) {
                        vm.allQuestions[i].show = false;
                    }
                    displayCurrentPageQuestions();
                }
        
                function displayCurrentPageQuestions() {
                    for (var j = curPage * 5; j < (curPage + 1) * 5; j++){
                        if (j === vm.allQuestions.length){
                            break;
                        }
                        vm.allQuestions[j].show = true;
                    }
                }
            }
        }
    }

})();