(function () {
    'use strict';

    angular
        .module('app')
        .directive('profile', Profile);

    Profile.$inject = ['AppGlobalConstants', '$http'];
    function Profile(AppGlobalConstants, $http){
        return {
            restrict: 'EA',
            templateUrl: './app-directives/profile/profile.html',
            link: function (scope, element, attrs) {
               
                var vm = scope;
                
                getUserProfileDetails();
                function getUserProfileDetails() {
                    $http({
                        url: AppGlobalConstants.baseURL + '/user?email=sourabh.3b@gmail.com',
                        method: "GET",
                        headers: {"Content-Type": "application/json"}
                    }).then(function(response){
                        vm.dailyBalanceEntries = response.data;
                    })
                }
            }
        }
    }

})();