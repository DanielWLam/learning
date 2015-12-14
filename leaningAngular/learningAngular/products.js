(function() {
    var app = angular.module('store-product', []);
    app.directive('productTitle', function() {
        return {
            restrict: 'E',
            templateUrl: 'product-description.html'
        };
    });

    app.directive('productSpecs', function() {
        return {
            restrict: 'A',
            templateUrl: 'product-specs.html'
        }
    });

    app.directive('productGallery', function() {
        return {
            restrict: 'E',
            templateUrl: 'product-gallery.html',
            controller: function() {
                this.current = 0;

                this.setCurrent = function(index) {
                    this.current = index;
                };
            },
            controllerAs: 'gallery'
        }
    })
})()