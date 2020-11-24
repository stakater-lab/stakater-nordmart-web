'use strict';

angular.module("app")

  .factory('promotions', ['$http', '$q', 'NORDMART_CONFIG', 'Auth', '$location', function($http, $q, NORDMART_CONFIG, $auth, $location) {
    var factory = {}, promotions, baseUrl;

    if ($location.protocol() === 'https') {
      baseUrl = (NORDMART_CONFIG.SECURE_API_ENDPOINT.startsWith("https://") ? NORDMART_CONFIG.SECURE_API_ENDPOINT : "https://" + NORDMART_CONFIG.SECURE_API_ENDPOINT + '.' + $location.host().replace(/^.*?\.(.*)/g,"$1")) + '/api/promotion';
    } else {
      baseUrl = (NORDMART_CONFIG.API_ENDPOINT.startsWith("http://") ? NORDMART_CONFIG.API_ENDPOINT : "http://" + NORDMART_CONFIG.API_ENDPOINT + '.' + $location.host().replace(/^.*?\.(.*)/g,"$1")) + '/api/promotion';
    }

    factory.get = function(promotionId) {
      var deferred = $q.defer();
      if (promotions) {
        deferred.resolve(promotions);
      } else {
        $http({
          method: 'GET',
          url: baseUrl
        }).then(function(resp) {
          promotions = resp.data;
          deferred.resolve(resp.data);
        }, function(err) {
          deferred.reject(err);
        });
      }
      return deferred.promise;
    };

    return factory;
  }]);
