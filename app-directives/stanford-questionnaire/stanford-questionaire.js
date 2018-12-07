(function () {
    'use strict';

    angular
        .module('app')
        .directive('stanfordQuestionnaire', stanfordQuestionnaire);

    stanfordQuestionnaire.$inject = ['AppGlobalConstants', '$http'];
    function stanfordQuestionnaire(AppGlobalConstants, $http){
        return {
            restrict: 'EA',
            templateUrl: './app-directives/stanford-questionnaire/stanford-questionnaire.html',
            link: function (scope, element, attrs) {
                var vm = scope;
                vm.stanfordQuestionnaireSubmitted = false;
                vm.invalidStanfordResponse = false;
                vm.showStanfordQuestionnaire = false;
                vm.showThought1 = false;

                vm.responseOne = 0;
                vm.responseTwo = 0;
                vm.responseThree = 0;
                vm.responseFour = 0;

                vm.goToStanfordQs = goToStanfordQs;
                vm.templateUrlForThoughtOne = templateUrlForThoughtOne;
                vm.openTodaysThought = openTodaysThought;
                vm.submitStanfordQuestionnaire = submitStanfordQuestionnaire;

                function goToStanfordQs() {
                    vm.showStanfordQuestionnaire = true;
                    vm.showThought1 = false;
                }

                function templateUrlForThoughtOne() {
                    return "/app-directives/thoughts/thought1.html";
                }

                function openTodaysThought() {
                    vm.showStanfordQuestionnaire = false;
                    vm.showThought1 = true;
                }

                function submitStanfordQuestionnaire() {
                    if (vm.responseOne === 0 || vm.responseTwo === 0 || vm.responseThree === 0 || vm.responseFour === 0) {
                        vm.invalidStanfordResponse = true;
                        return;
                    }
                    vm.invalidStanfordResponse = false;

                    var responses = [parseInt(vm.responseOne), parseInt(vm.responseTwo), parseInt(vm.responseThree), parseInt(vm.responseFour)];

                    $http({
                        url: AppGlobalConstants.baseURL + '/stanfordQuestionnaire ',
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        data: {
                            questionnaireAnswers: responses,
                            email: AppGlobalConstants.userData.email
                        }
                    })
                    .then(function(response){
                        vm.stanfordQuestionnaireSubmitted = true;
                    })
                }

                function evalUserData() {
                    var userData = AppGlobalConstants.userData;
                    vm.stanfordQuestionnaireSubmitted = userData.hasFilledStanfordQuestionnaire;
                    if (vm.stanfordQuestionnaireSubmitted) {
                        vm.showStanfordQuestionnaire = true;
                        vm.responseOne = userData.stanfordQuestionnaireResponses[0].toString();
                        vm.responseTwo = userData.stanfordQuestionnaireResponses[1].toString();
                        vm.responseThree = userData.stanfordQuestionnaireResponses[2].toString();
                        vm.responseFour = userData.stanfordQuestionnaireResponses[3].toString();
                    }
                    else {
                        vm.showThought1 = true;
                    }
                    cancelEvent();
                }

                var cancelEvent = vm.$on('fetchUserDataComplete', evalUserData);
            }
        }
    }

})();