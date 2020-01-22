'use strict';

angular.module("app")

.factory('search', ['$http', '$q', 'NORDMART_CONFIG', 'Auth', '$location', function($http, $q, NORDMART_CONFIG, $auth, $location) {
	var factory = {}, products, baseUrl;

	if ($location.protocol() === 'https') {
		baseUrl = (NORDMART_CONFIG.SECURE_API_ENDPOINT.startsWith("https://")
		    ? NORDMART_CONFIG.SECURE_API_ENDPOINT
		    : "https://" + NORDMART_CONFIG.SECURE_API_ENDPOINT + '.' + $location.host().replace(/^.*?\.(.*)/g,"$1")) + '/api/v1/product-search';
	} else {
		baseUrl = (NORDMART_CONFIG.API_ENDPOINT.startsWith("http://")
		    ? NORDMART_CONFIG.API_ENDPOINT
		    : "http://" + NORDMART_CONFIG.API_ENDPOINT + '.' + $location.host().replace(/^.*?\.(.*)/g,"$1")) + '/api/v1/product-search';
	}

	factory.productsSearch = function(searchCriteria) {
	    var deferred = $q.defer();
        $http({
            method: 'GET',
            url: baseUrl + '?criteria=' + searchCriteria
        }).then(function(resp) {
            products = resp.data;
            deferred.resolve(resp.data);
        }, function(err) {
            deferred.reject(err);
        });
	   return deferred.promise;
	};

	return factory;
}]);