var env = {
  dev: 'http://localhost:3000',
  prod: 'https://ventureforth.herokuapp.com',
  pwd: null
}

if(location.origin.includes('localhost')) {
  env.pwd = env.dev;
} else {
  env.pwd = env.prod;
}

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
        "ModalService",
        "$state",
        ActivityShowControllerFunction
    ])
    .controller("ActivityCreateModalController", [
        "ActivityFactory",
        "$stateParams",
        "$scope",
        "close",
        "activityData",
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
        .state("activity", {
            url: "/locations/:location_id/activities/:activity_id",
            templateUrl: "js/ng-views/activity/show.html",
            controller: "ActivityShowController",
            controllerAs: "vm"
        })
    $urlRouterProvider.otherwise('/home');
}

function LocationFactoryFunction($resource) {
    return $resource(env.pwd + "/locations/:id.json");
}

function ActivityFactoryFunction($resource) {
    return $resource(env.pwd + "/locations/:location_id/activities/:activity_id", {
        location_id: '@location_id',
        activity_id: '@activity_id'
    }, {
        'create': {
            method: 'POST'
        },
        'query': {
            method: 'GET',
            isArray: true
        },
        'delete': {
            method: 'DELETE'
        },
        'update': {
            method: 'PUT'
        }
    });
}

function HomeControllerFunction(LocationFactory, $stateParams, $state) {

    $(".earth-two").hide()

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
            // alert("Please enter valid location");
            $("#alert-box").html('Please enter a valid location.');
        } else {
            var userInput = $("#search-box").val();
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

    $(".earth-two").show()

    var vm = this;
    this.location = LocationFactory.get({
        id: $stateParams.id
    }, () => {
        this.getLatLong()
    })
    this.activities = ActivityFactory.query({location_id: $stateParams.id})
    this.addActivity = function() {
        ModalService.showModal({
            templateUrl: "js/ng-views/activity/activity-creation-modal.html",
            controller: "ActivityCreateModalController",
            inputs: {
                activityData: null,
            }
        })
    }
    this.upVote = function(event, activity) {
      event.preventDefault();
      event.stopPropagation();
      var params = {
          location_id: $stateParams.id,
          activity_id: activity.id
      };
      activity.upvote++;
      ActivityFactory.update(params, activity, function(results) {
        console.log(results);
      });
    }
    //find latitude and longitude of location name
    this.getLatLong = function() {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            'address': this.location.name
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();
                //AJAX request to weather underground
                var url = `https://api.wunderground.com/api/67e285089e02a77a/conditions/q/${latitude},${longitude}.json`
                $.ajax({
                    url: url,
                    type: "get",
                    dataType: "json"
                }).done((response) => {
                    var weather = response.current_observation
                    $('#weather-info').append(`<p>${weather.feelslike_string}<br>${weather.icon}</p>
                    <img src="${weather.icon_url}">`)
                }).fail(() => {
                    console.log("Ajax request fails!")
                })
                initMap(latitude, longitude)
            }
        });
    }

    function initMap(latitude, longitude) {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: new google.maps.LatLng(latitude, longitude)
        });
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(latitude, longitude),
          map: map
        });
    }
}


function ActivityShowControllerFunction(ActivityFactory, $stateParams, ModalService, $state) {
    var vm = this;
    var params = {
        location_id: $stateParams.location_id,
        activity_id: $stateParams.activity_id
    };

    ActivityFactory.get(params, function(results) {
        vm.activityshow = results
    })

    this.delete = function() {
        ActivityFactory.delete(params, function(results) {

            $state.go('location', {
                id: params.location_id
            })
        })

    }

    this.edit = function() {
        ModalService.showModal({
            templateUrl: "js/ng-views/activity/activity-edit-modal.html",
            controller: "ActivityCreateModalController",
            inputs: {
                activityData: vm.activityshow,
            }
        });
    }
}


function ActivityCreateModalControllerFunction(ActivityFactory, $stateParams, $scope, close, activityData, $state) {
    //checks if activityData exists
    $scope.editMode = activityData ? true : false;

    if ($scope.editMode) {
        $scope.activityName = activityData.name,
            $scope.activityAddress = activityData.address,
            $scope.activityCategory = activityData.category,
            $scope.activityPhoto = activityData.photo_url,
            $scope.activityWebsite = activityData.website_url,
            $scope.activityDescription = activityData.description
    }

    $scope.addActivity = function() {
        ActivityFactory.create({
            location_id: $stateParams.id
        }, getDataObj($scope), function(result) {
            location.reload();
        })
    }
    $scope.modifyActivity = function() {
        var params = {
            location_id: $stateParams.location_id,
            activity_id: $stateParams.activity_id
        };

        ActivityFactory.update(params, getDataObj($scope), function(results) {
            location.reload();
        });
    }

    $scope.closeModal = function() {
        close('close', 0);
    }

    function getDataObj($scope) {
        return data = {
            name: $scope.activityName,
            address: $scope.activityAddress,
            category: $scope.activityCategory,
            photo_url: $scope.activityPhoto,
            website_url: $scope.activityWebsite,
            description: $scope.activityDescription
        }
    }

}
