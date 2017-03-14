angular
  .module("touristApp", [
    "ui.router",
    "ngResource"
  ])

  // .directive("uniqueLocation", function(LocationFactory){
  //   return {
  //     restrict: "A",
  //     require: "ngModel",
  //     link: function (scope, element, attrs, ngModel) {
  //       element.bind("blur", function(e) {
  //         if (!ngModel || !element.val()) return;
  //         var keyProperty = scope.$eval(attrs.uniqueLocation);
  //         var currentValue = element.val();
  //       })
  //     }
  //   }
  // })

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
    "LocationFactory",
    "$stateParams",
    "$state",
    HomeControllerFunction
  ])

  .controller("LocationShowController", [
    "LocationFactory",
    "ActivityFactory",
    "$stateParams",
    "$state",
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
      url: "/locations/:id",
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
  return $resource("http://localhost:3000/locations/:id.json");
}

function ActivityFactoryFunction($resource) {
  return $resource("http://localhost:3000/locations/:location_id/activities/:id.json");
}

function HomeControllerFunction(LocationFactory, $stateParams, $state) {

  var input = document.getElementById('search-box');
  var autocomplete = new google.maps.places.Autocomplete(input, {types: ['(cities)']});

  google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();

        IsplaceChange = true;
    });

    $("#search-box").keydown(function () {
        IsplaceChange = false;
    });

  this.location = new LocationFactory();

  // this.create = function() {
  //   if (IsplaceChange == false) {
  //       $("#search-box").val('');
  //       alert("please enter valid location");
  //   } else {
  //   var userInput = $("#search-box").val();
  //   console.log(userInput)
  //   this.location.name = userInput
  //   this.location.$save(function(location) {
  //     $state.go('location', {
  //       id: location.id
  //     })
  //   })
  // }
  // };

  this.create = function(){
    var data = {
      name: input.value
    }
    LocationFactory.save(data, function(location){
      $state.go('location', {
        id: location.id
      })
    });
   };

}

function LocationShowControllerFunction(LocationFactory, ActivityFactory, $stateParams) {
  this.location = LocationFactory.get({id: $stateParams.id})
  // this.activities = ActivityFactory.get({location_id: this.location.id})
  // console.log(this.activities)
}

function ActivityShowControllerFunction(ActivityFactory, $stateParams) {
  // this.activityDetails = activities
  //   .filter(function(activity) {
  //     return activity.id == $stateParams.activity_id
  //   })[0];
}
