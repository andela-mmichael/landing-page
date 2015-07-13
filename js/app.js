
var app = angular.module('LandingPageApp', [
  'ngMaterial',
  'ui.router',
  'firebase'
  ]);

var storageKey = 'CMS';

app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey')
      .accentPalette('amber');
});

app.controller('ProductController', ['$scope', '$interval', function($scope, $interval) {

    $scope.subscribe = function() {
      $scope.showProgress = true;
      $scope.subscribe_btn = true;
      $scope.determinateValue = 10;
      $interval(function() {
        $scope.determinateValue += 10;
        if ($scope.determinateValue > 100) {
          $scope.determinateValue = 10;
          $scope.showProgress = false;
          $scope.thankyou = true;
        }
      }, 100, 0, true);
    };

    $scope.product = {
      caption: "We have all the Best Stories",
      name: "Best Story Books",
      description: "So, what is the secret of successful description.",
      pubDate: new Date(),
      image: 'http://srobbin.com/wp-content/uploads/2012/05/books.jpg'
    };

    try {
      $scope.product = JSON.parse(localStorage.getItem(storageKey));
      $scope.product.image = 'http://srobbin.com/wp-content/uploads/2012/05/books.jpg';
    } catch(e) {
      console.log(e);
    }
    
  }]);

app.controller('AdminController', ['$scope', '$timeout',  function($scope, $timeout) {

  // try {
  //   $scope.data = JSON.parse(localStorage.getItem(storageKey));
  // } catch(e) {
  //   console.log(e);
  // }

  $scope.publish = function(data){
    data.created_at = new Date().getTime();
    localStorage.setItem(storageKey, JSON.stringify(data));
    $scope.published = true;
    $timeout(function() {
      $scope.published = false;
      $scope.$apply();
    }, 3000);
  };

  $scope.cancel = function(data) {
    $scope.data = null;
  };

}]);


 app.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise("/product");

  $urlRouterProvider.when("/", "/product");

  $stateProvider
    .state("product", {
      url: "/product",
      templateUrl: "views/product.html",
      controller: 'ProductController'
    })
    .state("product", {
      url: "/product/:id",
      templateUrl: "views/product.html",
      controller: 'ProductController'
    })
    .state('admin', {
      url: "/admin",
      templateUrl: "views/admin.html",
      controller: 'AdminController'
    });

 });
