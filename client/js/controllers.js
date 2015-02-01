angular.module('Restapi')
/** * Controls the Pages */ 
.controller('ItemsCtrl', function ($scope, $location, $http) {

    $http.get('/api/items').
    	success(function(data, status, headers, config) {
            $scope.items = data;
    });
    $scope.deleteItem = function(item) {
        $http.delete('/api/items/' + item._id);
        var itemElement = document.getElementById(item._id);
        itemElement.parentNode.removeChild(itemElement);
    }
    $scope.addItem = function() {
        if($scope.itemTitle == '') {
            return;
        }
        $http.post('/api/items', { 
            title: $scope.itemTitle,
            content: $scope.itemContent
        });
        $scope.itemTitle = '';
        $scope.itemContent = '';
    }
    $scope.getItem = function(item) {
        $http.get('/api/items/' + item._id). 
            success(function(data, status, headers, config) {
            $scope.one = data;
        });
    }
})
.controller('OneCtrl', function ($scope, $location, $http) {

    $scope.updateItem = function() {
        $http.put('/api/items/' + one._id, { 
            title: $scope.oneTitle,
            content: $scope.oneContent
        });
    }; 

});

