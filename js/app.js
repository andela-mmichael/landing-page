angular.module('LandingPageApp', ['ngMaterial'])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey')
      .accentPalette('amber');
})

  .controller('MainController', ['$scope', function($scope) {

    $scope.product = {
      caption: "We have all the Best Stories",
      name: "Best Story Books",
      description: "So, what is the secret of successful description.",
      pubDate: new Date(),
      image: 'http://srobbin.com/wp-content/uploads/2012/05/books.jpg'
    };

  }]);