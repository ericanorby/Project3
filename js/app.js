angular
  .module("touristApp", [
    "ui.router",
    "ngResource"])

  .config([
    "$stateProvider",
    RouterFunction
  ]);

  .factory("ActivityFactory",
  ["$resource",
ActivityFactoryFunction]);

  .controller("ActivityShowController", [
    "ActivityFactory",
    "stateParams",
    ActivityShowController
  ]);

function ActivityFactoryFunction($resource){
  return $resource("http://localhost:3000/activities/:id");
}

function ActivityShowControllerFunction(ActivityFactory, $stateParams){
  this.activity = ActivityFactory.get({id: $stateParams.id});
}

$stateProvider
  .state("activityIndex", {
    url: "/activities",
    templateUrl: "js/ng-views/index.html",
    controller: "ActivityIndexController",
    controllerAs: "vm"
  })
  .state("activityNew", {
    url: "/activities/new",
    templateUrl: "js.ng-views/new.html",
    controller: "ActivityShowController",
    controllerAs: "vm"
  })
  .state("activityShow", {
    url: "/activities/:id",
    templateUrl: "js/ng-views/show.html",
    controller: "ActivityShowController",
    controllerAs: "vm"
  });
