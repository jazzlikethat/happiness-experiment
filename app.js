(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/profile', {
                controller: 'ProfileController',
                templateUrl: 'profile/profile.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })

            .when('/forgot', {
                controller: 'ForgotController',
                templateUrl: 'forgot/forgot.view.html',
                controllerAs: 'vm'
            })

            .when('/reset', {
                controller: 'ResetController',
                templateUrl: 'reset/reset.view.html',
                controllerAs: 'vm'
            })

            .when('/emailvalidate', {
                controller: 'EmailValidateController',
                templateUrl: 'validate/validate.view.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/' });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http', 'AuthenticationService', 'AppGlobalConstants'];
    function run($rootScope, $location, $cookies, $http, AuthenticationService, AppGlobalConstants) {

        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register', '/forgot', '/reset', '/emailvalidate']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
            else if (loggedIn) {
                AuthenticationService.getUserData();
            }
        });
    }

})();