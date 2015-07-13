
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

app.controller('ProductController', ['$scope', '$interval', 'Products', '$stateParams', 
  function($scope, $interval, Products, $stateParams) {
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
      publishedDate: new Date(),
      image: 'http://srobbin.com/wp-content/uploads/2012/05/books.jpg'
    };
    
    if($stateParams.productId){
      $scope.product = Products.get($stateParams.productId);
    }

    

   
    
  }]);

app.controller('AdminController', ['$scope', '$timeout', 'Products', '$stateParams',  
  function($scope, $timeout, Products, $stateParams) {

    // if($stateParams.productId){
    //   $scope.product = Products.get($stateParams.productId);
    // }
  $scope.products = Products.all;
  // $scope.products.publishedDate = $scope.products.publishedDate;

  $scope.publish = function(data){
    data.publishedDate = new Date().getTime();
    console.log(data);
    // Products.add(data);
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
    .state("product-details", {
      url: "/product/:productId",
      templateUrl: "views/product.html",
      controller: 'ProductController'
    })
    .state('admin', {
      url: "/admin",
      templateUrl: "views/admin.html",
      controller: 'AdminController'
    });

 });
