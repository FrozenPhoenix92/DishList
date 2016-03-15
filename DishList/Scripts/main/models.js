appModule.factory("Dish", function ($resource) {
    return $resource("/api/dishes/:Id", { id: '@Id' }, {
        update: { method: "PUT" }
    });
}).service("DishesModel", function ($resource, $rootScope, Dish) {
    
    var dishes = undefined;

    this.query = function () {
        Dish.query().$promise.then(function (data) {
            dishes = data;
            $rootScope.$broadcast("dishesList");
        });
    };

    this.create = function (dish) {
        Dish.save(dish).$promise.then(function (data) {
            dishes.push(data);
            $rootScope.$broadcast("dishCreated", data, dishes.length);
        });
    };

    this.update = function (dish) {
        Dish.update(dish).$promise.then(function (data) {
            var index = _.findIndex(dishes, { Id: data.Id });
            dishes[index] = data;
            $rootScope.$broadcast("dishUpdated", data);
        });
    };

    this.remove = function (dishId) {
        Dish.remove({ Id: dishId }).$promise.then(function (data) {
            _.remove(dishes, { Id: data });
            $rootScope.$broadcast("dishDeleted", dishId);
        });
    };

    this.getDishes = function() {
        return dishes;
    }
});