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
            onEnter: function($stateParams, $state, $uibModal, $resource) {
                $uibModal.open({
                    animation: true,
                    templateUrl: '/Templates/create.html',
                    controller: 'ModalInstanceCreateCtrl'
                }).result.finally(function () {
                    $state.go('^');
                });
            }
        })
        // Изменение существующего элемента
        .state("dishes.update", {
            url: "/:dishId/update",
            onEnter: function ($stateParams, $state, $uibModal, $resource) {
                $uibModal.open({
                    animation: true,
                    templateUrl: '/Templates/update.html',
                    controller: 'ModalInstanceUpdateCtrl',
                    resolve: {
                        dishId: parseInt($stateParams.dishId)
                    }
                }).result.finally(function () {
                    $state.go('^');
                });
            }
        })
        // Удаление существующего элемента
        .state("dishes.delete", {
            url: "/:dishId/delete",
            onEnter: function($stateParams, $state, $uibModal, $resource) {
                $uibModal.open({
                    animation: true,
                    templateUrl: '/Templates/delete.html',
                    controller: 'ModalInstanceDeleteCtrl',
                    resolve: {
                        dishId: parseInt($stateParams.dishId)
                    }
                }).result.finally(function () {
                    $state.go('^');
                });
            }
        });
});