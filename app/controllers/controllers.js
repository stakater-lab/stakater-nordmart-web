'use strict';

angular.module('app')

    .controller("HomeController",
        ['$scope', '$http', '$filter', 'Notifications', 'cart', 'catalog', 'review', 'Auth', '$uibModal',
            function ($scope, $http, $filter, Notifications, cart, catalog, review, $auth, $uibModal) {


                var ratings = new Map();
                var reviews = new Map();
                $scope.products = [];
                $scope.addToCart = function (item) {
                    cart.addToCart(item.product, parseInt(item.quantity)).then(function (data) {
                        Notifications.success("Added! Your total is " + $filter('currency')(data.cartTotal));
                    }, function (err) {
                        Notifications.error("Error adding to cart: " + err.statusText);
                    });
                };

                $scope.isLoggedIn = function () {
                    return $auth.loggedIn;
                };
                $scope.ssoEnabled = function () {
                    return $auth.ssoEnabled;
                };

                $scope.login = function () {
                    $auth.login();
                };


                // initialize products
                catalog.getProducts().then(function (data) {
                    console.log('initialize products');
                    if (data.error != undefined && data.error != "") {
                        Notifications.error("Error retrieving products: " + data.error);
                        return;
                    }
                    $scope.products = data.map(function (el) {
                        return {
                            quantity: "1",
                            product: el
                        }
                    }),
                    // initialize reviews and ratings
                    $scope.products.forEach(function(item) {
                        console.log('product name ' + item.product.name);
                        var promise = review.getReviews(item.product.itemId);

                        promise.then(function(value) {
                            try {
                                var body = value.body;
                                var totalRating = 0;
                                body.forEach(function (review) {
                                  totalRating = totalRating + parseFloat(review.rating);
                                });
                                if (totalRating > 0) {
                                    ratings.set(item.product.itemId, (totalRating/body.length).toFixed(1));
                                } else {
                                    ratings.set(item.product.itemId, '-');
                                }
                                reviews.set(item.product.itemId, body);
                            } catch(err) {
                                console.log("ERROR parsing body of product: " + err);
                                ratings.set(item.product.itemId, '-');
                            }
                        });
                    })
                }, function (err) {
                    Notifications.error("Error retrieving products: " + err.statusText);
                });

                $scope.getRating = function (productId) {
                    return ratings.get(productId);
                };

                $scope.getReviews = function (productId) {
                    return reviews.get(productId);
                };


                // open dialog with product details
                $scope.openProductDetails = function (product, reviews) {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'product.html',
                        controller: 'ProductModalController',
                        resolve: {
                            product: function () {
                                return product;
                            },
                            reviews: function () {
                                return reviews;
                            }
                        }
                    });
                };


            }])

    .controller("ProductModalController", ['$scope', 'Auth', '$uibModalInstance', 'product', 'reviews',
        function ($scope, $auth, $uibModalInstance, product, reviews) {
            $scope.product = product;
            $scope.reviews = reviews;
            $scope.close = function () {
                $uibModalInstance.close('close');
            };

            $scope.formatString = function (str) {
                return str.replace(/\+/g, ' ');
            };

            $scope.formatDate = function (dateInMillis) {
                return new Date(dateInMillis).toLocaleString();
            }

        }])

    .controller("CartController",
        ['$scope', '$http', 'Notifications', 'cart', 'Auth',
            function ($scope, $http, Notifications, cart, $auth) {

                function reset() {
                    $scope.cart = cart.getCart();
                    $scope.items = $scope.cart.shoppingCartItemList;

                    $scope.subtotal = 0;
                    $scope.cart.shoppingCartItemList.forEach(function (item) {
                        $scope.subtotal += (item.quantity * item.product.price);
                    });
                }

                $scope.config = {
                    selectItems: false,
                    multiSelect: false,
                    dblClick: false,
                    showSelectBox: false
                };

                function performAction(action, item) {
                    cart.removeFromCart(item.product, item.quantity).then(function (newCart) {
                        reset();
                    }, function (err) {
                        Notifications.error("Error removing from cart: " + err.statusText);
                    });
                };

                $scope.actionButtons = [
                    {
                        name: 'Remove',
                        title: 'Remove',
                        actionFn: performAction
                    }
                ];


                $scope.$watch(function () {
                    return cart.getCart();
                }, function (newValue) {
                    reset();
                });

                $scope.$watch(function () {
                    return $auth.userInfo;
                }, function (newValue) {
                    cart.reset();
                });

                $scope.checkout = function () {
                    cart.checkout().then(function (cartData) {
                    }, function (err) {
                        Notifications.error("Error checking out: " + err.statusText);
                    });
                };

                $scope.isLoggedIn = function () {
                    return $auth.loggedIn;
                };
                $scope.ssoEnabled = function () {
                    return $auth.ssoEnabled;
                };

                reset();
            }])

    .controller("CustomerController",
        ['$scope', '$http', 'Notifications', 'customer', 'Auth',
            function ($scope, $http, Notifications, customer, $auth) {
                $scope.model = undefined;

                var email = ($auth.userInfo || {}).preferred_username;
                customer.getByEmail(email).then(function (resp) {
                    if (resp && resp.data) {
                        var restCustomer = resp.data;
                        $scope.model = {
                            id: restCustomer.id,
                            email: restCustomer.email,
                            address: restCustomer.address,
                            gender: restCustomer.gender && restCustomer.gender === 'M' ? 'male' : 'female' || 'male',
                            dateOfBirth: new Date(restCustomer.dateOfBirth),
                            phoneNumber: restCustomer.phoneNumber
                        }
                    } else {
                        $scope.model = {};
                    }
                }, function (err) {
                    Notifications.error("Error while fetching customer profile. " + err.statusText);
                });

                $scope.save = function ($customer) {
                    $scope.model = angular.copy($customer);
                    $scope.model.email = $auth.userInfo.preferred_username;
                    if ($scope.model.id) {
                        customer.update($scope.model).then(function () {
                            Notifications.success("Customer updated successfully");
                        }, function (err) {
                            Notifications.error("Error while updating customer: " + err.statusText);
                        });
                    } else {
                        customer.save($scope.model).then(function (resp) {
                            Notifications.success("Customer saved successfully");
                        }, function (err) {
                            Notifications.error("Error while saving customer: " + err.statusText);
                        });
                    }
                };
            }])

    .controller("HeaderController",
        ['$scope', '$location', '$http', 'Notifications', 'cart', 'Auth',
            function ($scope, $location, $http, Notifications, cart, $auth) {
                $scope.userInfo = $auth.userInfo;

                $scope.cartTotal = 0.0;
                $scope.itemCount = 0;

                $scope.isLoggedIn = function () {
                    return $auth.loggedIn;
                };

                $scope.login = function () {
                    $auth.login();
                };
                $scope.logout = function () {
                    $auth.logout();
                };
                $scope.isLoggedIn = function () {
                    return $auth.loggedIn;
                };
                $scope.ssoEnabled = function () {
                    return $auth.ssoEnabled;
                };
                $scope.profile = function () {
                    $auth.authz.accountManagement();
                };
                $scope.$watch(function () {
                    return cart.getCart().cartTotal || 0.0;
                }, function (newValue) {
                    $scope.cartTotal = newValue;
                });

                $scope.$watch(function () {
                    var totalItems = 0;
                    cart.getCart().shoppingCartItemList.forEach(function (el) {
                        totalItems += el.quantity;
                    });
                    return totalItems;
                }, function (newValue) {
                    $scope.itemCount = newValue;
                });

                $scope.$watch(function () {
                    return $auth.userInfo;
                }, function (newValue) {
                    $scope.userInfo = newValue;
                });

                $scope.isActive = function (loc) {
                    return loc === $location.path();
                }
            }]);
