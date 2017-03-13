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

  .controller("HomeController", [
    "LocationFactory",
    "$timeout",
    HomeControllerFunction
  ])

  .controller("LocationShowController", [
    "ActivityFactory",
    "$stateParams",
    LocationShowControllerFunction
  ])

  .controller("ActivityShowController", [
    "ActivityFactory",
    "$stateParams",
    ActivityShowControllerFunction
  ])


function RouterFunction($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state("location", {
      url: "/home",
      templateUrl: "js/ng-views/location/index.html",
      controller: "LocationIndexController",
      controllerAs: "vm"
    })
    .state("activity", {
      url: "/locations/:location_id/activities",
      templateUrl: "js/ng-views/activity/index.html",
      controller: "ActivityIndexController",
      controllerAs: "vm"
    })
    .state("activity.details", {
      url: "/:activity_id",
      templateUrl: "js/ng-views/activity/show.html",
      controller: "ActivityShowController",
      controllerAs: "vm"
    })


  $urlRouterProvider.otherwise('/home');
}

function LocationFactoryFunction($resource) {
  return $resource({
    url: 'http://localhost:3000/locations/:id'
  });
}

function ActivityFactoryFunction($resource) {
  return $resource("http://localhost:3000/locations/:location_id/activities/:id");
}

function LocationIndexControllerFunction() {

  var options = {
    types: ['(cities)']
  }
  var input = document.getElementById('search-box');
  var autocomplete = new google.maps.places.Autocomplete(input, options);


  // LocationFactory.then(function successCallback(response) {
  //     this.location = response;
  // }, function errorCallback(response) {});
  // this.locationQuery = null;
  // this.alertLocation = function() {
  //     console.log(this.locationQuery);
  // }

}

function LocationShowControllerFunction(ActivityFactory, $stateParams) {
  // this.location = LocationFactory.get({id: $stateParams.id});
  this.activities = ActivityFactory.query();
}

function ActivityShowControllerFunction(ActivityFactory, $stateParams) {
  this.activityDetails = activities
    .filter(function(activity) {
      return activity.id == $stateParams.activity_id
    })[0];
}
