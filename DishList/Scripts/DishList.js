var dishlistApp = angular.module('dishlistApp', ['ngRoute', 'ui.bootstrap']);

dishlistApp.config(['$routeProvider', function($routeProvide) {
    $routeProvide
        .when('/dishes/create', {
            templateUrl: '',
            controller: 'CreateCtrl'
        })
        .when('/dishes/update/:dishId', {
            templateUrl: '',
            controller: 'UpdateCtrl'
        })
        .when('/dishes/delete/:dishId', {
            templateUrl: '',
            controller: 'DeleteCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

dishlistApp.controller("DishesCtrl", function ($scope, $http, $location, $uibModal) {
    $http.get("Home/List").success(function(data, status, headers, config) {
        $scope.dishes = data;
    });

    // Добавление нового элемента
    $scope.openCreate = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/Templates/Create',
            controller: 'ModalInstanceCreateCtrl'
        });

        modalInstance.result.then(function (resultDish) {
            $scope.dishes.push(resultDish);
        });
    };

    // Изменение существующего элемента
    $scope.openUpdate = function (dish) {
        $scope.dish = dish;

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/Templates/Create',
            controller: 'ModalInstanceUpdateCtrl',
            resolve: {
                dish: $scope.dish
            }
        });

        modalInstance.result.then(function (resultDish) {
            $scope.dishes.forEach(function(item, i, arr) {
                if (item.Id === resultDish.Id)
                    $scope.dishes[i] = resultDish;
            });
        });
    };

    // Удаление существующего элемента
    $scope.openDelete = function (dish) {
        $scope.dish = dish;

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/Templates/Delete',
            controller: 'ModalInstanceDeleteCtrl',
            resolve: {
                dishId: $scope.dish.Id
            }
        });

        modalInstance.result.then(function (dishId) {
            $scope.dishes.forEach(function (item, i, arr) {
                if (item.Id === dishId)
                    $scope.dishes.splice(i, 1);
            });
        });
    };

    // Сортировка
    $scope.sortField = undefined;
    $scope.reverse = false;
    $scope.sort = function(fieldName) {
        if ($scope.sortField === fieldName) {
            $scope.reverse = !$scope.reverse;
        } else {
            $scope.sortField = fieldName;
            $scope.reverse = false;
        }
    };
    $scope.isSortUp = function(fieldName) {
        return $scope.sortField === fieldName && !$scope.reverse;
    };
    $scope.isSortDown = function(fieldName) {
        return $scope.sortField === fieldName && $scope.reverse;
    };
});

dishlistApp.controller("ModalInstanceCreateCtrl", function ($scope, $http, $location, $uibModalInstance) {
    $scope.Title = "";
    $scope.Description = "";

    $scope.ok = function () {
        $http.get("Home/Create", {
                 params: { Title: $scope.Title, Description: $scope.Description }
            })
            .success(function(data, status, headers, config) {
                $uibModalInstance.close(data);
        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

dishlistApp.controller("ModalInstanceUpdateCtrl", function ($scope, $http, $location, $uibModalInstance, dish) {
    $scope.Title = dish.Title;
    $scope.Description = dish.Description;

    $scope.ok = function () {
        $http.get("Home/Update", {
                 params: { Id: dish.Id, Title: $scope.Title, Description: $scope.Description }
            })
            .success(function (data, status, headers, config) {
                $uibModalInstance.close(data);
            });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

dishlistApp.controller("ModalInstanceDeleteCtrl", function ($scope, $http, $location, $uibModalInstance, dishId) {
    $scope.ok = function() {
        $http.get("Home/Delete", {
                params: { Id: dishId }
            })
            .success(function(data, status, headers, config) {
                $uibModalInstance.close(data);
            });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});