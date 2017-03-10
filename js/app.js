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

  .controller("LocationShowController", [
    "LocationFactory",
    "stateParams",
    LocationShowControllerFunction
  ]);

function LocationFactoryFunction($resource){
  return $resource("http://localhost:3000/locations/:id");
}

function LocationShowControllerFunction(LocationFactory, $stateParams){
  this.location = LocationFactory.get({id: $stateParams.id});
}

function LocationNewControllerFunction(LocationFactory){
  this.location = new LocationFactory();
  this.create = function(){
    this.location.$save()
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

  .state("locationNew", {
    url: "/locations/new",
    templateUrl: "js.ng-views/new.html",
    controller: "LocationShowController",
    controllerAs: "vm"
  })
  .state("locationShow", {
    url: "/locations/:id",
    templateUrl: "js/ng-views/show.html",
    controller: "LocationShowController",
    controllerAs: "vm"
  });
}
