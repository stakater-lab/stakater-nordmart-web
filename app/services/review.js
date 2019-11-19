'use strict';

angular.module("app")

.factory('review', ['$http', '$q', 'NORDMART_CONFIG', 'Auth', '$location', function($http, $q, NORDMART_CONFIG, $auth, $location) {
	var factory = {}, baseUrl;
	if ($location.protocol() === 'https') {
		baseUrl = (NORDMART_CONFIG.SECURE_API_ENDPOINT.startsWith("https://") ? NORDMART_CONFIG.SECURE_API_ENDPOINT : "https://" + NORDMART_CONFIG.SECURE_API_ENDPOINT + '.' + $location.host().replace(/^.*?\.(.*)/g,"$1")) + '/api/review';
	} else {
		baseUrl = (NORDMART_CONFIG.API_ENDPOINT.startsWith("http://") ? NORDMART_CONFIG.API_ENDPOINT : "http://" + NORDMART_CONFIG.API_ENDPOINT + '.' + $location.host().replace(/^.*?\.(.*)/g,"$1")) + '/api/review';
	    baseUrl = 'https://gateway-dev.cp-stakater.com/api/review'
	}

	//Get reviews for the selected product
	factory.getReviews = function(productItemId) {
		var deferred = $q.defer();

        $http({
            method: 'GET',
            url: baseUrl + '/' + productItemId
        }).then(function(resp) {
            deferred.resolve(resp.data);
        }, function(err) {
            deferred.reject(err);
        });
        return deferred.promise;
	};
	return factory;
}]);
