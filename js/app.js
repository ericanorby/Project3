angular
  .module("touristApp", [
    "ui.router",
    "ngResource"])

  .config([
    "$stateProvider",
    RouterFunction
  ])

  .factory("LocationFactory",
  ["$resource",
  LocationFactoryFunction])

  .factory("ActivityFactory",
  ["$resource",
    ActivityFactoryFunction])

  .controller("ActivityShowController", [
    "ActivityFactory",
    "$stateParams",
    ActivityShowControllerFunction
  ])

  .controller("LocationShowController", [
    "LocationFactory",
    "$stateParams",
    LocationShowControllerFunction
  ]);

function LocationFactoryFunction($resource){
  return $resource("http://localhost:3000/locations/:id");
}

function ActivityFactoryFunction($resource){
  return $resource("http://localhost:3000/locations/:id/activities/:id");
}

function LocationShowControllerFunction(LocationFactory, $stateParams){
  this.location = LocationFactory.get({id: $stateParams.id});
}

function ActivityShowControllerFunction(ActivityFactory, $stateParams){
  this.activity = ActivityFactory.get({id: $stateParams.id});
}

function ActivityNewControllerFunction(ActivityFactory){
  this.activity = new ActivityFactory();
  this.create = function(){
    this.activity.$save()
  }
}



function RouterFunction($stateProvider){
  $stateProvider
  .state("locationIndex", {
    url: "/locations",
    templateUrl: "js/ng-views/index.html",
    controller: "LocationIndexController",
    controllerAs: "vm"
  })

  .state("locationShow", {
    url: "/locations/:id",
    templateUrl: "js/ng-views/show.html",
    controller: "LocationShowController",
    controllerAs: "vm"
  })

  .state("activityIndex", {
    url: "/locations/:id/activities",
    templateUrl: "js/ng-views/activitiesindex.html",
    controller: "ActivityShowController",
    controllerAs: "vm"
  })

  .state("activityShow", {
    url: "/locations/:id/activities/:id",
    templateUrl: "js/ng-views/activitiesshow.html",
    controller: "ActivityShowController",
    controllerAs: "vm"
  })

  }
