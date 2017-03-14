angular
  .module("touristApp", [
    "ui.router",
    "ngResource",
    "angularModalService"
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
    "ModalService",
    LocationShowControllerFunction
  ])

  .controller("ActivityShowController", [
    "ActivityFactory",
    "$stateParams",
    ActivityShowControllerFunction
  ])

  .controller("ActivityCreateModalController", [
    "ActivityFactory",
    "$stateParams",
    "$scope",
    "close",
    ActivityCreateModalControllerFunction
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
    // .state("activityShow", {
    //   url: "locations/:id/activities/:activity_id",
    //   templateUrl: "js/ng-views/activity/show.html",
    //   controller: "ActivityShowController",
    //   controllerAs: "vm"
    // })

  $urlRouterProvider.otherwise('/home');
}

function LocationFactoryFunction($resource) {
  return $resource("http://localhost:3000/locations/:id.json");
}

function ActivityFactoryFunction($resource) {
<<<<<<< Updated upstream
  return $resource("http://localhost:3000/locations/:location_id/activities/", {
    location_id: '@location_id',
    id: '@activity_id'
  }, {
    'create': {
      method: 'POST'
    },
    'query': {
      method: 'GET',
      isArray: true
    },
  });
=======
    return $resource("http://localhost:3000/locations/:location_id/activities/:activity_id", {
        activity_id: '@activity_id'
    }, {
        'create': {
            method: 'POST'
        },
        'query': {
            method: 'GET',
            isArray: true
        },
    });
>>>>>>> Stashed changes
}

function HomeControllerFunction(LocationFactory, $stateParams, $state) {

  var input = document.getElementById('search-box');
  var autocomplete = new google.maps.places.Autocomplete(input, {
    types: ['(cities)']
  });
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    var place = autocomplete.getPlace();

    IsplaceChange = true;
  });

  $("#search-box").keydown(function() {
    IsplaceChange = false;
  });

  this.location = new LocationFactory();

  this.create = function() {
    if (IsplaceChange == false) {
      $("#search-box").val('');
      alert("Please enter valid location");
    }
    else {
      var userInput = $("#search-box").val();
      console.log(userInput)
      this.location.name = userInput
      this.location.$save(function(location) {
          $state.go('location', {
            id: location.id
          })
        })
    };
  }
}

  function LocationShowControllerFunction(LocationFactory, ActivityFactory, $stateParams, $state, ModalService) {
    var vm = this;
    this.location = LocationFactory.get({
      id: $stateParams.id
    })
    this.activities = ActivityFactory.query({
      location_id: $stateParams.id
    })
    this.addActivity = function() {
      ModalService.showModal({
        templateUrl: "js/ng-views/activity/activity-creation-modal.html",
        controller: "ActivityCreateModalController"
      }).then(function(modal) {
        // The modal object has the element built, if this is a bootstrap modal
        // you can call 'modal' to show it, if it's a custom modal just show or hide
        // it as you need to.
        // modal.element.modal();
        // modal.close.then(function(result) {
        //     $scope.message = result ? "You said Yes" : "You said No";
        // });
      });

    }
  }

<<<<<<< Updated upstream
  function ActivityShowControllerFunction(ActivityFactory, $stateParams) {
=======
function ActivityShowControllerFunction(ActivityFactory, $stateParams) {
    var vm = this;
    ActivityFactory.get({
      location_id: $stateParams.id,
      activity_id: $stateParams.activity_id
    }, function(results) {
      vm.activityshow = results

    })

    // this.ActivityFactory.get()
>>>>>>> Stashed changes
    // this.activityDetails = activities
    //   .filter(function(activity) {
    //     return activity.id == $stateParams.activity_id
    //   })[0];
<<<<<<< Updated upstream
  }
=======
console.log($stateParams)
}
>>>>>>> Stashed changes

  function ActivityCreateModalControllerFunction(ActivityFactory, $stateParams, $scope, close) {
    $scope.addActivity = function() {
      var data = {
        name: $scope.activityName,
        address: $scope.activityAddress,
        category: $scope.activityCategory,
        photo_url: $scope.activityPhoto,
        website_url: $scope.activityWebsite,
        description: $scope.activityDescription
      }
      ActivityFactory.create({
        location_id: $stateParams.id
      }, data, function(result) {
        close(result, 0);
        // $scope.activities.push(result);
      })
    }
    $scope.closeModal = function() {
        close('close', 0);
      }
    }
