'use strict';

angular.module('rb')
.factory('CharacterFactory', ['$http', function CharacterFactory($http) {
    return {

        'listAll': function() {
            return $http.get('http://localhost:3000/api/characters');
        }

    };
}]);