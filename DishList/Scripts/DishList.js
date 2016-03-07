var dishlistApp = angular.module('dishlistApp', ['ngRoute', 'ui.bootstrap', 'ngResource', 'ui.router']);

var parentScope;

dishlistApp.factory("dishesService", function ($resource) {
    return $resource("Home", {}, {
        query: { method: "GET", isArray: true, url: "/Home/List" },
        create: { method: "GET", url: "/Home/Create" },
        get: { method: "GET", url: "/Home/Get/:Id" },
        update: { method: "GET", url: "/Home/Update/:Id" },
        remove: { method: "GET", url: "/Home/Delete/:Id" }
    });
});

dishlistApp.config(function ($provide, $stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise("/dishes");

    $stateProvider
        .state('dishes', {
            url: "/dishes",
            templateUrl: "/"
        })
        // Добавление нового элемента
        .state("dishes.add", {
            url: "/add",
            parent: "dishes",
            onEnter: function($stateParams, $state, $uibModal, $resource) {
                $uibModal.open({
                    animation: true,
                    templateUrl: '/Templates/Create',
                    controller: 'ModalInstanceCreateCtrl'
                }).result.then(function(resultDish) {
                    parentScope.dishes.push(resultDish);
                });
            }
        })
        // Изменение существующего элемента
        .state("dishes.update", {
            url: "/update/:dishId",
            parent: "dishes",
            onEnter: function($stateParams, $state, $uibModal, $resource) {
                $uibModal.open({
                    animation: true,
                    templateUrl: '/Templates/Create',
                    controller: 'ModalInstanceUpdateCtrl',
                    resolve: {
                        dish: parentScope.dish
                    }
                }).result.then(function(resultDish) {
                    parentScope.dishes.forEach(function (item, i, arr) {
                        if (item.Id === resultDish.Id)
                            parentScope.dishes[i] = resultDish;
                    });
                });
            }
        })
        // Удаление существующего элемента
        .state("dishes.delete", {
            url: "/delete/:dishId",
            parent: "dishes",
            onEnter: function($stateParams, $state, $uibModal, $resource) {
                $uibModal.open({
                    animation: true,
                    templateUrl: '/Templates/Delete',
                    controller: 'ModalInstanceDeleteCtrl',
                    resolve: {
                        dish: parentScope.dish
                    }
                }).result.then(function (resultDish) {
                    parentScope.dishes.forEach(function (item, i, arr) {
                        if (item.Id === resultDish.Id)
                            parentScope.dishes.splice(i, 1);
                    });
                });
            }
        });
});

var DishesCtrl = dishlistApp.controller("DishesCtrl", function ($state, $scope, $http, $location, $uibModal, dishesService) {

    parentScope = $scope;

    $scope.dishes = dishesService.query();

    // Изменение текущего элемента
    $scope.selectCurrentDish = function (dish) {
        $scope.dish = dish;
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

dishlistApp.controller("ModalInstanceCreateCtrl", function ($scope, $http, $rootScope, $location, $uibModalInstance, dishesService) {
    $scope.Title = "";
    $scope.Description = "";

    $scope.ok = function () {
        dishesService.create({ Title: $scope.Title, Description: $scope.Description })
            .$promise.then(function (data) { $uibModalInstance.close(data); });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

dishlistApp.controller("ModalInstanceUpdateCtrl", function ($scope, $http, $location, $uibModalInstance, dish, dishesService) {
    $scope.Title = dish.Title;
    $scope.Description = dish.Description;

    $scope.ok = function () {
        dishesService.update({ Id: dish.Id, Title: $scope.Title, Description: $scope.Description })
            .$promise.then(function (data) { $uibModalInstance.close(data); });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

dishlistApp.controller("ModalInstanceDeleteCtrl", function ($scope, $http, $location, $uibModalInstance, dish, dishesService) {
    $scope.ok = function () {
        dishesService.remove({ Id: dish.Id })
            .$promise.then(function (data) { $uibModalInstance.close(data); });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});