(function() {
  var app = angular.module('gemStore', ['store-product']);

  app.controller('StoreController', ['$http', function($http) {
    // this.products = gems;
    var store = this;
    store.products = [];
    $http.get('products.json')
      .success(function(data) {
        store.products = data;
        console.log(store.products)
      });
  }]);

  app.controller('TabController', function() {
    this.tab = 1;

    this.setTab = function(tab) {
      this.tab = tab;
    };

    this.isSet = function(tab) {
      return (this.tab === tab);
    };
  });


  app.controller('ReviewController', function() {
    this.review = {};
    this.addReview = function(product) {
      this.review.createdOn = Date.now();
      product.reviews.push(this.review);
      this.review = {};
    };
  });

})();