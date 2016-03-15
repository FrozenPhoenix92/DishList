appModule.factory("Dish", function ($resource) {
    return $resource("/api/dishes/:Id", {}, {
        update: { method: "PUT", url: "/api/dishes/:Id" }
    });
}).service("DishesModel", function ($resource, $rootScope, $http, Dish) {

    var self = this;

    this.dishes = [];

    this.getList = function () {
        Dish.query().$promise.then(function (data) {
            self.dishes = data;
            $rootScope.$broadcast("dishesList");
        });
    };

    this.get = function (dishId) {
        Dish.get({ Id: dishId }).$promise.then(function (data) {
            $rootScope.$broadcast("dishGet", data);
        });
    };

    this.create = function (dish) {
        Dish.save(dish).$promise.then(function (data) {
            self.dishes.push(data);
            $rootScope.$broadcast("dishCreated", data);
        });
    };

    this.update = function (dish) {
        Dish.update({Id: dish.Id}, dish).$promise.then(function (data) {
            $rootScope.$broadcast("dishUpdated", data);
        });
    };

    this.remove = function (dishId) {
        Dish.remove({ Id: dishId }).$promise.then(function (data) {
            $rootScope.$broadcast("dishDeleted", dishId);
        });
    };
});