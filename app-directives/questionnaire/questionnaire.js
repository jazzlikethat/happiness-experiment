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
                vm.invalidResponse = false;
                vm.showThought2 = false;
                vm.showQuestionnaire = false;

                vm.paginationArray = [];
                for (var m = 0; m < vm.allQuestions.length / 5; m++) {
                    var element = {
                        value: m,
                        underline: false
                    };
                    vm.paginationArray.push(element);
                }
                
                vm.switchToPage = switchToPage;
                vm.goToQuestionnaire = goToQuestionnaire;
                vm.openThoughtTwo = openThoughtTwo;
                vm.submitQuestionnaire = submitQuestionnaire;
                vm.templateUrlForThoughtTwo = templateUrlForThoughtTwo;

                function switchToPage(page) {
                    vm.curPage = page;
                }

                function goToQuestionnaire() {
                    vm.showQuestionnaire = true;
                    vm.showThought2 = false;
                }

                function openThoughtTwo() {
                    vm.showQuestionnaire = false;
                    vm.showThought2 = true;
                }
        
                function submitQuestionnaire() {
                    var answers = [];
                    var invalidForm = false;
                    for (var i = 0; i < vm.allQuestions.length; i++){
                        var entry = vm.allQuestions[i];
                        var value = parseInt(entry.value);
                        if (value > 0) {
                            answers.push(value);
                            entry.invalid = false;
                            var pageNum = Math.floor(i / 5);
                            vm.paginationArray[pageNum].underline = false;
                        }
                        else {
                            entry.invalid = true;
                            invalidForm = true;
                            var pageNum = Math.floor(i / 5);
                            vm.paginationArray[pageNum].underline = true;
                        }
                    }

                    if (invalidForm) {
                        vm.invalidResponse = true;
                        return;
                    }
                    else {
                        vm.invalidResponse = false;
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

                function templateUrlForThoughtTwo() {
                    return "/app-directives/thoughts/thought2.html";
                }

                function evalUserData() {
                    var userData = AppGlobalConstants.userData;
                    vm.questionnaireSubmitted = userData.hasFilledQuestionnaire;
                    if (vm.questionnaireSubmitted) {
                        vm.showQuestionnaire = true;
                        var responses = userData.questionnaireResponses;
                        for (var i = 0; i < vm.allQuestions.length; i++) {
                            vm.allQuestions[i].value = responses[i].toString();
                        }
                        submitQuestionnaire();
                    }
                    else {
                        vm.showThought2 = true;
                    }
                    cancelEvent();
                }

                var cancelEvent = vm.$on('fetchUserDataComplete', evalUserData);
            }
        }
    }

})();