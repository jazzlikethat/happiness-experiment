(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController)
        .directive('appQuestionnaire', Questionnaire)
        .directive('dailyBalanceChart', DailyBalanceChart);

    HomeController.$inject = ['UserService', '$rootScope', 'AppGlobalConstants', '$http'];
    function HomeController(UserService, $rootScope, AppGlobalConstants, $http) {
        var vm = this;

        /* ---------------------------------------------------
        QUESTIONNAIRE
        ----------------------------------------------------- */

        var curPage = 0;
        vm.allQuestions = AppGlobalConstants.questionnaire;
        vm.questionnaireApiResponse = {};
        vm.questionnaireSubmitted = false;
        
        vm.disablePrevButton = true;
        vm.disableNextButton = false;
        vm.previousPage = previousPage;
        vm.nextPage = nextPage;

        vm.showQuestionnaire = false;
        vm.showDailyBalanceChart = false;

        vm.submitQuestionnaire = submitQuestionnaire;
        
        vm.goToQuestionnaire = goToQuestionnaire;
        vm.goToDailyBalanceChart = goToDailyBalanceChart;
        vm.goToDashboard = goToDashboard;
        vm.goToLesson = goToLesson;

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

        function goToQuestionnaire(){
            vm.showDailyBalanceChart = false;
            vm.showQuestionnaire = true;
            for (var k = 0; k < vm.allQuestions.length; k++) {
                vm.allQuestions[k].show = false;
            }
            displayCurrentPageQuestions();
        }

        function goToDailyBalanceChart() {
            vm.showQuestionnaire = false;
            vm.showDailyBalanceChart = true;
        }

        function goToDashboard() {
            vm.showQuestionnaire = false;
            vm.showDailyBalanceChart = false;
        }

        function goToLesson() {
            vm.showQuestionnaire = false;
            vm.showDailyBalanceChart = false;
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

        /* ---------------------------------------------------
        DAILY BALANCE CHART
        ----------------------------------------------------- */
        vm.dailyBalanceEntries = ["Mindset", "Overall Health", "Body - Excercise", "Body - Nutrition", "Mental",
            "Emotional", "Spirit", "Sleep", "Wealth (money)", "Time", "Experiences", 
            "Relationships", "Community (service)", "Impact", "Work", "Home", "Stress", "Balance", "Other"
        ];
        vm.overallScore = null;
        vm.field1 = null;
        vm.field2 = null;
        vm.dailyBalanceSubmitted = false;

        vm.field1IsRed = false;
        vm.field1IsYellow = false;
        vm.field1IsGreen = false;
        vm.field2IsRed = false;
        vm.field2IsYellow = false;
        vm.field2IsGreen = false;

        vm.submitDailyBalance = submitDailyBalance;
        vm.field1Changed = field1Changed;
        vm.field2Changed = field2Changed;

        function submitDailyBalance() {
            vm.overallScore = parseInt(vm.field1) + parseInt(vm.field2);
            vm.dailyBalanceSubmitted = true;
        }

        function field1Changed() {
            
            vm.field1IsRed = false;
            vm.field1IsYellow = false;
            vm.field1IsGreen = false;
            
            if (vm.field1 < 4) {
                vm.field1IsRed = true;
            }
            else if (vm.field1 > 7) {
                vm.field1IsGreen = true;
            }
            else {
                vm.field1IsYellow = true;
            }
        }

        function field2Changed() {
            
            vm.field2IsRed = false;
            vm.field2IsYellow = false;
            vm.field2IsGreen = false;
            
            if (vm.field2 < 4) {
                vm.field2IsRed = true;
            }
            else if (vm.field2 > 7) {
                vm.field2IsGreen = true;
            }
            else {
                vm.field2IsYellow = true;
            }
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

    DailyBalanceChart.$inject = [];
    function DailyBalanceChart() {
        return {
            restrict: 'EA',
            templateUrl: './home/daily-balance-chart.html'
        }
    }

})();