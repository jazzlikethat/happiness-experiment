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

                vm.responseOne = 0;
                vm.responseTwo = 0;
                vm.responseThree = 0;
                vm.responseFour = 0;

                vm.submitStanfordQuestionnaire = submitStanfordQuestionnaire;

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
            }
        }
    }

})();