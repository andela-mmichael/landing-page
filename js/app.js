
var app = angular.module('LandingPageApp', [
  'ngMaterial',
  'ui.router'
  ]);

var storageKey = 'CMS';

app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey')
      .accentPalette('amber');
});

app.controller('MainController', ['$scope', function($scope) {

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

app.controller('AdminController', ['$scope', function($scope) {

  try {
    $scope.data = JSON.parse(localStorage.getItem(storageKey));
  } catch(e) {
    console.log(e);
  }

  $scope.submitForm = function(data){
    data.created_at = new Date().getTime();
    localStorage.setItem(storageKey, JSON.stringify(data));
  };

}]);


 app.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "views/index.html",
      controller: 'MainController'
    })
    .state('admin', {
      url: "/admin",
      templateUrl: "views/admin.html",
      controller: 'AdminController'
    });

 });
