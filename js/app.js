angular
    .module("touristApp", [
        "ui.router",
        "ngResource"
    ])

    .config([
        "$stateProvider",
        "$urlRouterProvider",
        RouterFunction
    ])

    .factory("LocationFactory", ["$http",
        LocationFactoryFunction
    ])

    .factory("ActivityFactory", ["$resource",
        ActivityFactoryFunction
    ])

    .controller("ActivityController", [
        "ActivityFactory",
        "$stateParams",
        ActivityControllerFunction
    ])

    .controller("LocationController", [
        "LocationFactory",
        "$timeout",
        LocationControllerFunction
    ]);

function LocationFactoryFunction($http) {
    return $http({
        method: 'GET',
        url: 'http://localhost:3000/locations.json'
    });
}

function ActivityFactoryFunction($resource) {
    return $resource("http://localhost:3000/locations/:location_id/activities/:id");
}

function LocationControllerFunction(LocationFactory, $timeout) {
    var vm = this;

    var options = {
        types: ['(cities)']
    }

    $timeout(function() {
        var input = document.getElementById('search-box');
        var autocomplete = new google.maps.places.Autocomplete(input, options);
    })

    LocationFactory.then(function successCallback(response) {
        vm.location = response;
    }, function errorCallback(response) {});
    this.locationQuery = null;
    this.alertLocation = function() {
        console.log(this.locationQuery);
    }
}

function ActivityControllerFunction(ActivityFactory, $stateParams) {
    // this.activity = ActivityFactory.get({
    //     id: $stateParams.id
    // });
}




function RouterFunction($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state("location", {
            url: "/home",
            templateUrl: "js/ng-views/location.html",
            controller: "LocationController",
            controllerAs: "vm"
        })

        .state("activity", {
            url: "/locations/:location_id/activities",
            templateUrl: "js/ng-views/activity.html",
            controller: "ActivityController",
            controllerAs: "vm"
        })

    $urlRouterProvider.otherwise('/home');

}
