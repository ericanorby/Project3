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

  .factory("LocationFactory", ["$resource",
    LocationFactoryFunction
  ])

  .factory("ActivityFactory", ["$resource",
    ActivityFactoryFunction
  ])

  .controller("HomeController", [
    HomeControllerFunction
  ])

  .controller("LocationShowController", [
    "LocationFactory",
    LocationShowControllerFunction
  ])

  .controller("ActivityShowController", [
    "ActivityFactory",
    "$stateParams",
    ActivityShowControllerFunction
  ])


function RouterFunction($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state("home", {
      url: "/home",
      templateUrl: "js/ng-views/home.html",
      controller: "HomeController",
      controllerAs: "vm"
    })
    .state("location", {
      url: "/locations",
      templateUrl: "js/ng-views/location/show.html",
      controller: "LocationShowController",
      controllerAs: "vm"
    })
    .state("location.activities", {
      url: "/:activity_id",
      templateUrl: "js/ng-views/activity/show.html",
      controller: "ActivityShowController",
      controllerAs: "vm"
    })

  $urlRouterProvider.otherwise('/home');
}

function LocationFactoryFunction($resource) {
  return $resource('http://localhost:3000/locations/:id.json');
}

function ActivityFactoryFunction($resource) {
  return $resource("http://localhost:3000/locations/:location_id/activities/:id.json");
}

function HomeControllerFunction() {

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

function LocationShowControllerFunction(LocationFactory) {
  this.locations = LocationFactory.query();
  console.log(this.locations)
}

function ActivityShowControllerFunction(ActivityFactory, $stateParams) {
  // this.activityDetails = activities
  //   .filter(function(activity) {
  //     return activity.id == $stateParams.activity_id
  //   })[0];
}
