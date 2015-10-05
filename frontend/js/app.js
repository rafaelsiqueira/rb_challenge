'use strict';

// Declare app level module which depends on views, and components
angular.module('rb', [
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {

  $routeProvider
      .when('/', {
          templateUrl: '../views/main.html',
      })
      .when('/characters', {
          templateUrl: '../views/characters.html',
          controller: 'CharacterCtrl'
      })
      .when('/about', {
          templateUrl: '../views/about.html'
      })
      .otherwise({redirectTo: '/'});

}]);
