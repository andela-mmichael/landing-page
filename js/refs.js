app.factory('Refs', function() {
    var rootRef = 'https://landingpage-gen.firebaseio.com/';

  return {
    rootRef: root,
    products: rootRef.child('products')
  }
});

$firebase(ref.child('posts')).$asArray();