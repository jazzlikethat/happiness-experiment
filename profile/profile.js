(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', Profile);

    Profile.$inject = ['AppGlobalConstants', '$http', '$rootScope'];
    function Profile(AppGlobalConstants, $http, $rootScope){
        var vm = this;
       
        vm.userData = null;

        vm.basicInfoIsVisible = true;
        vm.editDetailsIsVisible = false;
        vm.showSuccessMessage = false;

        vm.fName = "";
        vm.lName = "";
        vm.primaryPhoneNumber = "";
        vm.userID = "";

        vm.showBasicInfo = showBasicInfo;
        vm.showEditDetails = showEditDetails;
        vm.saveProfile = saveProfile;
        vm.cancelsave = cancelsave;

        function showBasicInfo() {
            vm.basicInfoIsVisible = true;
            vm.editDetailsIsVisible = false;
            vm.showSuccessMessage = false;
        }

        function showEditDetails() {
            vm.basicInfoIsVisible = false;
            vm.editDetailsIsVisible = true;
            vm.showSuccessMessage = false;
        }

        function saveProfile() {
            var payload = {
                fName: vm.fName,
                lName: vm.lName,
                phoneNumber: vm.primaryPhoneNumber,
                userID: vm.userID,
                email: vm.userData.email
            };

            $http({
                url: AppGlobalConstants.baseURL + '/user',
                method: "POST",
                headers: {"Content-Type": "application/json"},
                data: payload
            }).then(function(response){
                vm.userData.fName = vm.fName;
                vm.userData.lName = vm.lName;
                vm.userData.primaryPhoneNumber = vm.primaryPhoneNumber;
                vm.userData.userID = vm.userID;
                AppGlobalConstants.userData = vm.userData;
                vm.showSuccessMessage = true;
            })
        }

        function cancelsave() {
            evalUserData();
        }

        function evalUserData() {
            vm.userData = AppGlobalConstants.userData;
            vm.fName = vm.userData.fName;
            vm.lName = vm.userData.lName;
            vm.primaryPhoneNumber = vm.userData.primaryPhoneNumber;
            vm.userID = vm.userData.userID;
        }

        $rootScope.$on('fetchUserDataComplete', evalUserData);
    }

})();