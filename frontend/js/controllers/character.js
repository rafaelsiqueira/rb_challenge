'use strict';
angular.module('rb')
.controller('CharacterCtrl', ['$scope', '$http', 'CharacterFactory', function($scope, $http, CharacterFactory){

    $scope.showLoading  = true;
    $scope.characters   = [];
    $scope.filters      = [];

    $scope.addFilter    = function(){
        $scope.filters.push({field: '', value: ''});
    };

    $scope.delFilter    = function(filter){
        var idx = $scope.filters.indexOf(filter);
        if(idx != -1) {
            $scope.filters.splice( idx, 1 );
        }
    };

    $scope.fields       = [];

    CharacterFactory.listAll().then(function(result){
        $scope.showLoading = false;
        $scope.characters = result.data;
        $scope.characters.map(function(character){

            character.mae      = character.pessoasRelacionadas.mae;
            character.pai      = character.pessoasRelacionadas.pai;
            character.amigos   = character.pessoasRelacionadas.amigos.join(', ');
            character.inimigos = character.pessoasRelacionadas.inimigos.join(', ');
            character.caracteristicas = character.caracteristicas.join(', ');

            delete(character.pessoasRelacionadas);
        });

        if(result.data.length > 0) {
            for (var field in result.data[0]) {
                if(field != '_id' && field != '__v') {
                    $scope.fields.push({field: field, visible: true});
                }
            }
        }
    });
}])
.filter('multiplefilter', function () {

    function _match(array, test){
        var passedTest =[];
        for (var i = 0; i < array.length; i++) {
            if(test( array[i]))
                passedTest.push(array[i]);
        }

        return passedTest;
    }

    return function (characters, filters) {

        return _match(characters, function(item) {
            var matchedAllFilters = true;

            lbl:
            for(var field in item) {
                for(var i in filters) {
                    if(filters[i].field === field &&
                        $.trim(filters[i].value) != '' &&
                        item[field].toLowerCase().indexOf(filters[i].value.toLowerCase()) == -1) {
                        matchedAllFilters = false;
                        break lbl;
                    }
                }
            }

            return matchedAllFilters;
        });
    };
});;