appModule.factory("Dish", function ($resource) {
    return $resource("/api/dishes/:Id", { id: '@Id' }, {
        update: { method: "PUT" }
    });
}).service("DishesModel", function ($resource, $rootScope, Dish) {

    var self = this;

    this.dishes = [];

    this.getList = function () {
        Dish.query().$promise.then(function (data) {
            self.dishes = data;
            $rootScope.$broadcast("dishesList");
        });
    };

    this.create = function (dish) {
        Dish.save(dish).$promise.then(function (data) {
            self.dishes.push(data);
            $rootScope.$broadcast("dishCreated", data, self.dishes.length);
        });
    };

    this.update = function (dish) {
        Dish.update(dish).$promise.then(function (data) {
            var index = _.findIndex(self.dishes, { Id: data.Id });
            self.dishes[index] = data;
            $rootScope.$broadcast("dishUpdated", data);
        });
    };

    this.remove = function (dishId) {
        Dish.remove({ Id: dishId }).$promise.then(function (data) {
            _.remove(self.dishes, { Id: data });
            $rootScope.$broadcast("dishDeleted", dishId);
        });
    };
});