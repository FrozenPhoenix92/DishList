appModule.factory("dishesModel", function ($resource, $rootScope) {
    return $resource("DishApi", {}, {
        query: { method: "GET", isArray: true, url: "/api/dish" },
        get: { method: "GET", url: "/api/dish/:Id" },
        create: {
            method: "POST", url: "/api/dish/Create",
            transformResponse: function (data, headersGetter) {
                $rootScope.$broadcast("dishCreated", data);
            }
        },
        update: {
            method: "PUT", url: "/api/dish/Update/:Id",
            transformResponse: function (data, headersGetter) {
                $rootScope.$broadcast("dishUpdated", data);
            }
        },
        remove: {
            method: "DELETE", url: "/api/dish/:Id",
            transformResponse: function (data, headersGetter) {
                $rootScope.$broadcast("dishDeleted", data);
            }
        }
    });
});