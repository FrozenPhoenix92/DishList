function ConvertDishesModelToViewModel(dish) {
    return {
        Id: dish.Id,
        Title: dish.Title,
        Description: dish.Description
    };
}

function ConvertViewModelToDishesModel(dishesModel) {
    return {
        Id: dishesModel.Id,
        Title: dishesModel.Title,
        Description: dishesModel.Description
    };
}

appModule.controller("DishesCtrl", function ($scope, $uibModal, DishesModel) {
    
        $scope.$on("dishesList", function() {
            $scope.dishes = [];
            DishesModel.dishes.forEach(function (item, i, arr) {
                $scope.dishes.push(ConvertDishesModelToViewModel(item));
            });
        });
        $scope.$on("dishCreated", function (event, dish, index) {
            $scope.dishes.splice(index, 0, ConvertDishesModelToViewModel(dish));
        });
        $scope.$on("dishUpdated", function (event, dish) {
            var convertedDish = ConvertDishesModelToViewModel(dish);
            var index = _.findIndex($scope.dishes, function (o) { return o.Id === convertedDish.Id; });
            $scope.dishes[index] = convertedDish;
        });
        $scope.$on("dishDeleted", function(event, dishId) {
            _.remove($scope.dishes, function(o) { return o.Id === dishId; });
        });

        DishesModel.getList();

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
    .controller("ModalInstanceCreateCtrl", function ($scope, $uibModalInstance, DishesModel) {
        $scope.Dish = { Title: "", Description: "" };

        $scope.ok = function () {
            DishesModel.create(ConvertViewModelToDishesModel($scope.Dish));
            $uibModalInstance.close($scope.Dish);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("ModalInstanceUpdateCtrl", function ($scope, $uibModalInstance, dishId, DishesModel) {
        DishesModel.dishes.forEach(function (item, i, arr) {
            if (item.Id === dishId)
                $scope.Dish = item;
        });

        $scope.ok = function () {
            DishesModel.update(ConvertViewModelToDishesModel($scope.Dish));
            $uibModalInstance.close($scope.Dish);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("ModalInstanceDeleteCtrl", function ($scope, $uibModalInstance, dishId, DishesModel) {
        $scope.ok = function() {
            DishesModel.remove(dishId);
            $uibModalInstance.close(dishId);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    });