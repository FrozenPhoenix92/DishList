appModule.controller("DishesCtrl", function($state, $scope, $http, $location, $uibModal, dishesModel) {

        $scope.dishes = dishesModel.query();

        $scope.$on("dishCreated", function (event, dishJson) {
            $scope.dishes.push(JSON.parse(dishJson));
        });
        $scope.$on("dishUpdated", function (event, dishJson) {
            var dish = JSON.parse(dishJson);
            $scope.dishes.forEach(function (item, i, arr) {
                if (item.Id === dish.Id)
                    $scope.dishes[i] = dish;
            });
        });
        $scope.$on("dishDeleted", function (event, dishIdJson) {
            $scope.dishes.forEach(function (item, i, arr) {
                if (item.Id === parseInt(dishIdJson))
                    $scope.dishes.splice(i, 1);
            });
        });

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
    })
    .controller("ModalInstanceCreateCtrl", function($scope, $http, $rootScope, $location, $uibModalInstance, dishesModel) {
        $scope.Dish = new dishesModel();

        $scope.ok = function() {
            dishesModel.create($scope.Dish)
                .$promise.then(function(data) { $uibModalInstance.close(data); });
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("ModalInstanceUpdateCtrl", function($scope, $http, $location, $uibModalInstance, dishId, dishesModel) {
        dishesModel.get({ Id: dishId }).$promise.then(function(data) {
            $scope.Dish = data;
        });

        $scope.ok = function() {
            dishesModel.update($scope.Dish)
                .$promise.then(function(data) { $uibModalInstance.close(data); });
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("ModalInstanceDeleteCtrl", function($scope, $http, $location, $uibModalInstance, dishId, dishesModel) {
        $scope.ok = function() {
            dishesModel.remove({ Id: dishId })
                .$promise.then(function(data) { $uibModalInstance.close(data); });
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    });