app.factory('Products', ['$firebaseArray', '$firebaseObject',
  function($firebaseArray, $firebaseObject) {
    var ref = new Firebase('https://landingpage-gen.firebaseio.com/');
    var products = $firebaseArray(ref.child('products'));

    var Products = {
      all: products,
      add: function (product) {
        return products.$add(product);
      },
      get: function (productId) {
        return $firebaseObject(ref.child('products').child(productId));
      },
      delete: function (product) {
        return products.$remove(product);
      }
    };

  return Products;
}]);