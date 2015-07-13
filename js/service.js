app.factory('Products', ['$firebaseArray', '$firebaseObject',
  function($firebaseArray, $firebaseObject) {
    var ref = new Firebase('https://landingpage-gen.firebaseio.com/');
    var products = $firebase(ref.child('products')).$asArray();

    var Products = {
      all: products,
      add: function (product) {
        return products.$add(product);
      },
      get: function (productId) {
        return $firebase(ref.child('products').child(productId)).$asObject();
      },
      delete: function (product) {
        return products.$remove(product);
      }
    };

  return Products;
}]);