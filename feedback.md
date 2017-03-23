# Project 3 Evaluation

## Back-end Technology
**3: Excelling**
>Includes many well-structured models, and advanced functionality such as authorization, 3rd-party API integration, or other technology not covered in class

## Front-end Technology
**3: Excelling**
>In addition to appropriate Angular use, includes 1 Angular topic not covered in class. Makes use of multiple custom directives

## Code Quality
**3: Excelling**
>No major code quality issues, makes use of Ruby best practices appropriately, and follows techniques such as separation of concerns, abstraction, and encapsulation

## Deployment and Functionality
**3: Excelling**
>App has advanced functionality that works with minimal errors, and may make use of advanced tools such as APIs, plugins, etc. App may be deployed to a service other than Heroku (e.g. Digital Ocean).

## Planning / Process / Submission
**3: Excelling**
>Submission includes everything in previous category, as well as evidence of proper teamwork, such as feature branching, code review, github issue / user story tracking, and justification of technical decisions.

## Inline Code Comments

### Angular Front End

```diff
diff --git a/css/styles.css b/css/styles.css
index 93e8b53..38be5a7 100644
--- a/css/styles.css
+++ b/css/styles.css
@@ -221,6 +221,9 @@ a {
   animation-iteration-count: infinite;
   animation-timing-function: linear;
   animation-direction: alternate;
+  /*maybe make animation-direction: right and find a map that has some repition of
+  continents so that the reset is not noticeable (to avoid the effect where the
+  globe switches direction)*/
 }

 .earth-two {
@@ -243,6 +246,8 @@ a {
     background-position-x: 210px;
   }
 }
+/*OR more specifically controll the animation (with percentages) so that it will
+reset to original position with no noticeable blink*/

 .modal {
   border: 1px solid lightgray;
@@ -320,7 +325,8 @@ form {
 }

 /*MEDIA QUERY*/
-
+/*Good start but add more styling logic here to make all of your views responsive
+instead of just the home page*/
 @media only screen and (max-width: 767px){
     #earth {
       width: 200px;
diff --git a/index.html b/index.html
index 45dae4d..5e2b380 100644
--- a/index.html
+++ b/index.html
@@ -1,21 +1,26 @@
 <!DOCTYPE html>
 <html ng-app="touristApp">
-
+<!-- perhaps make this data-ng-app to stay consistent with your other directives (and to
+allow for html validation ++) -->
 <head>
     <link rel="icon" href="css/favicon.ico" type="image/x-icon" />
     <script src="https://use.fontawesome.com/3a210fbd92.js"></script>
     <link href="https://fonts.googleapis.com/css?family=ABeeZee|Fredoka+One|Satisfy" rel="stylesheet">
     <link rel="stylesheet" type="text/css" href="css/styles.css">
+    <link rel="stylesheet" type="text/css" href="css/styles.css">
+    <!-- best practice is to group all link tags above all script tags -->
     <meta charset="utf-8">
     <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
     <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.4.2/angular-ui-router.min.js"></script>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-resource.min.js"></script>
     <script src="assets/angular-modal-service.js"></script>
+    <!-- dope use of angular modals! ++ -->
+    <!-- but consider using a cdn to load them in (minimizes your server's burden):
+    <script src="https://rawgit.com/dwmkerr/angular-modal-service/master/dst/angular-modal-service.js"></script> -->
     <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBA3VCF6KbfBgQxQYDb-5WJU_gydrWVAHU&libraries=places"></script>
+    <!-- great use of third party api for location data ++ -->
     <script src="js/app.js"></script>
-    <link rel="stylesheet" type="text/css" href="css/styles.css">
-
     <title>Venture Forth</title>
 </head>

diff --git a/js/README.md b/js/README.md
deleted file mode 100644
index 3a450f1..0000000
--- a/js/README.md
+++ /dev/null
@@ -1,3 +0,0 @@
-# Project3
-
-This repo will contain all the code for the front-end of our project (Angular, JS, CSS, HTML)
diff --git a/js/app.js b/js/app.js
index 9ea603c..691f477 100644
--- a/js/app.js
+++ b/js/app.js
@@ -9,6 +9,8 @@ if(location.origin.includes('localhost')) {
 } else {
   env.pwd = env.prod;
 }
+// Great use of environment variables to determine API source ++
+// although not sure what pwd is meant to stand for

 angular
     .module("touristApp", [
@@ -21,10 +23,12 @@ angular
         "$urlRouterProvider",
         RouterFunction
     ])
-    .factory("LocationFactory", ["$resource",
+    .factory("LocationFactory", [
+        "$resource",
         LocationFactoryFunction
     ])
-    .factory("ActivityFactory", ["$resource",
+    .factory("ActivityFactory", [
+        "$resource",
         ActivityFactoryFunction
     ])
     .controller("HomeController", [
@@ -57,6 +61,8 @@ angular
         ActivityCreateModalControllerFunction
     ])

+    // Really excellent setup, naming conventions, and code formatting and quality
+
 function RouterFunction($stateProvider, $urlRouterProvider) {
     $stateProvider
         .state("home", {
@@ -79,15 +85,19 @@ function RouterFunction($stateProvider, $urlRouterProvider) {
         })
     $urlRouterProvider.otherwise('/home');
 }
+// Great job bring in $urlRouterProvider to set a root route

 function LocationFactoryFunction($resource) {
     return $resource(env.pwd + "/locations/:id.json");
+    // you probably don't need the .json extension above since your API is set up
+    // to only serve up json and not any html views
 }

 function ActivityFactoryFunction($resource) {
     return $resource(env.pwd + "/locations/:location_id/activities/:activity_id", {
         location_id: '@location_id',
         activity_id: '@activity_id'
+        // Good job configuring url parameter
     }, {
         'create': {
             method: 'POST'
@@ -102,6 +112,8 @@ function ActivityFactoryFunction($resource) {
         'update': {
             method: 'PUT'
         }
+        // Not sure if you need to configure methods here other than update. The other
+        // ones should already have defaults set to the HTTP actions listed
     });
 }

@@ -130,6 +142,8 @@ function HomeControllerFunction(LocationFactory, $stateParams, $state) {
             // alert("Please enter valid location");
             $("#alert-box").html('Please enter a valid location.');
         } else {
+            // Maybe trigger some sort of loading icon here in case the request takes
+            // a bit of time to come back and render the show view
             var userInput = $("#search-box").val();
             this.location.name = userInput
             this.location.$save(function(location) {
@@ -199,7 +213,9 @@ function LocationShowControllerFunction(LocationFactory, ActivityFactory, $state
             }
         });
     }
-
+    // I really like the inclusion of Google Maps, but I think that it would add more,
+    // as a feature, if added to the show view as well where a user could see where an
+    // event is in the city.
     function initMap(latitude, longitude) {
         var map = new google.maps.Map(document.getElementById('map'), {
           zoom: 8,
@@ -245,7 +261,7 @@ function ActivityShowControllerFunction(ActivityFactory, $stateParams, ModalServ
     }
 }

-
+// Again, really cool implementation of modals
 function ActivityCreateModalControllerFunction(ActivityFactory, $stateParams, $scope, close, activityData, $state) {
     //checks if activityData exists
     $scope.editMode = activityData ? true : false;
diff --git a/js/ng-views/home.html b/js/ng-views/home.html
index 1da8503..c0dcf69 100644
--- a/js/ng-views/home.html
+++ b/js/ng-views/home.html
@@ -5,6 +5,8 @@
         <div id="alert-box"></div>
         <input id="search-box" size="30" type="text" placeholder="Where to next?"></input>
         <button id="submit-location" ng-click="vm.create()">GO</button>
+        <!-- consider using a form with ng-submit="vm.create()" so I can hit enter to
+        submit a search -->
     </div>

 </div>
diff --git a/js/ng-views/location/show.html b/js/ng-views/location/show.html
index c1807a3..1ff4ed8 100644
--- a/js/ng-views/location/show.html
+++ b/js/ng-views/location/show.html
@@ -53,7 +53,7 @@
 </div>
 </div>

-
+<!-- Remove unused test code before deploying to production -->

 <!-- Comment: When I create div box images of the categories later. -->
 <!-- <div>
```

### Rails Back End

```diff
diff --git a/Gemfile b/Gemfile
index b3f8eea..3770489 100644
--- a/Gemfile
+++ b/Gemfile
@@ -5,6 +5,8 @@ git_source(:github) do |repo_name|
   "https://github.com/#{repo_name}.git"
 end

+# Good job configuring CORS to allow for crosss origin requests
+
 gem 'rack-cors', :require => 'rack/cors'
 # Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
 gem 'rails', '~> 5.0.2'
diff --git a/app/controllers/activities_controller.rb b/app/controllers/activities_controller.rb
index 74b61df..1d89944 100644
--- a/app/controllers/activities_controller.rb
+++ b/app/controllers/activities_controller.rb
@@ -17,6 +17,7 @@ class ActivitiesController < ApplicationController
     @activity = @location.activities.find(params[:id])
     puts @activity.name
     puts @activity.upvote
+    # remove troubleshooting puts statements from code before deploying to production
     render json: @activity
   end

diff --git a/app/controllers/application_controller.rb b/app/controllers/application_controller.rb
index c6a49f0..0a24562 100644
--- a/app/controllers/application_controller.rb
+++ b/app/controllers/application_controller.rb
@@ -1,3 +1,4 @@
 class ApplicationController < ActionController::Base
   protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }
+  # good job using alternate way to protect from CSRF attacks
 end
diff --git a/app/controllers/locations_controller.rb b/app/controllers/locations_controller.rb
index 2c1243e..bcdf000 100644
--- a/app/controllers/locations_controller.rb
+++ b/app/controllers/locations_controller.rb
@@ -1,5 +1,8 @@
 class LocationsController < ApplicationController
   skip_before_filter :verify_authenticity_token
+  # Good job configuring to allow requests from your Angular App, however, since your
+  # app is using rails 5, you should use skip_before_action instead:
+  # http://stackoverflow.com/questions/5669322/turn-off-csrf-token-in-rails-3

   def index
     @locations = Location.all
@@ -20,6 +23,16 @@ class LocationsController < ApplicationController
         @location.save
         render json: @location
       end
+      # You may want to add error handling here in case the db rejects the save,
+      # especially if you decide to go back and add null: false to schema fields
+      # to enforce data normalization:
+      #   if @location.save
+      #     ....
+      #   else
+      #     ...(send some response saying there was an error)
+      #   end
+      #
+      # Same for other methods that modify db records here and in activities controller
   end

   def update
diff --git a/app/views/activities/index.html.erb b/app/views/activities/index.html.erb
index 4387f7e..b7a486d 100644
--- a/app/views/activities/index.html.erb
+++ b/app/views/activities/index.html.erb
@@ -1,5 +1,6 @@
 <p id="notice"><%= notice %></p>
-
+<!-- This is why we do not scaffold rails projects, otherwise you get a lot of unneccessary
+files that end up being unused. You should get rid of all unused files both here and elsewhere. -->
 <h1>Activities</h1>

 <table>
diff --git a/db/migrate/20170310182154_create_activities.rb b/db/migrate/20170310182154_create_activities.rb
index 86e4d8c..da8838f 100644
--- a/db/migrate/20170310182154_create_activities.rb
+++ b/db/migrate/20170310182154_create_activities.rb
@@ -2,6 +2,7 @@ class CreateActivities < ActiveRecord::Migration[5.0]
   def change
     create_table :activities do |t|
       t.string :name
+      # Good use of default values
       t.integer :upvote, :default => 0
       t.string :address
       t.string :category
diff --git a/db/schema.rb b/db/schema.rb
index 274d696..e10dd32 100644
--- a/db/schema.rb
+++ b/db/schema.rb
@@ -15,6 +15,10 @@ ActiveRecord::Schema.define(version: 20170310182154) do
   # These are extensions that must be enabled in order to support this database
   enable_extension "plpgsql"

+  # You may want to consider making some of the fields in the tables below required fields
+  # by using the null: false modifier. Otherwise, users could submit incomplete or empty
+  # locations / activities to your app and it wouldn't stop them
+
   create_table "activities", force: :cascade do |t|
     t.string   "name"
     t.integer  "upvote",      default: 0
```
