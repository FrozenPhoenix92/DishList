var appModule = angular.module('dishlistApp', ['ngRoute', 'ui.bootstrap', 'ui.router', 'ngResource'])

.config(function ($provide, $stateProvider, $urlRouterProvider) {

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
                    templateUrl: '/Templates/create.html',
                    controller: 'ModalInstanceCreateCtrl'
                });
            }
        })
        // Изменение существующего элемента
        .state("dishes.update", {
            url: "/:dishId/update",
            parent: "dishes",
            onEnter: function ($stateParams, $state, $uibModal, $resource) {
                $uibModal.open({
                    animation: true,
                    templateUrl: '/Templates/update.html',
                    controller: 'ModalInstanceUpdateCtrl',
                    resolve: {
                        dishId: parseInt($stateParams.dishId)
                    }
                });
            }
        })
        // Удаление существующего элемента
        .state("dishes.delete", {
            url: "/:dishId/delete",
            parent: "dishes",
            onEnter: function($stateParams, $state, $uibModal, $resource) {
                $uibModal.open({
                    animation: true,
                    templateUrl: '/Templates/delete.html',
                    controller: 'ModalInstanceDeleteCtrl',
                    resolve: {
                        dishId: parseInt($stateParams.dishId)
                    }
                });
            }
        });
});