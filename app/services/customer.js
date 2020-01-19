'use strict';

angular.module("app")

.factory('customer', ['$http', '$q', 'NORDMART_CONFIG', 'Auth', '$location', function($http, $q, NORDMART_CONFIG, $auth, $location) {
	var factory = {}, baseUrl;

	if ($location.protocol() === 'https') {
		baseUrl = (NORDMART_CONFIG.SECURE_API_ENDPOINT.startsWith("https://") ? NORDMART_CONFIG.SECURE_API_ENDPOINT : "https://" + NORDMART_CONFIG.SECURE_API_ENDPOINT + '.' + $location.host().replace(/^.*?\.(.*)/g,"$1")) + '/api/customers';
	} else {
		baseUrl = (NORDMART_CONFIG.API_ENDPOINT.startsWith("http://") ? NORDMART_CONFIG.API_ENDPOINT : "http://" + NORDMART_CONFIG.API_ENDPOINT + '.' + $location.host().replace(/^.*?\.(.*)/g,"$1")) + '/api/customers';
	}

    factory.save = function (customer) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: baseUrl,
            data: customer
        }).then(function (resp) {
            deferred.resolve(resp.data);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    factory.update = function (customer) {
        var deferred = $q.defer();
        $http({
            method: 'PUT',
            url: baseUrl+'/'+customer.id,
            data: customer
        }).then(function (resp) {
            deferred.resolve(resp.data);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    factory.getByEmail = function (email) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: baseUrl+'/search',
            params: {email:email}
        }).then(function (resp) {
            deferred.resolve(resp.data);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

	return factory;
}]);
