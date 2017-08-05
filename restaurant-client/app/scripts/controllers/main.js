'use strict';

/**
 * @ngdoc function
 * @name restaurantClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the restaurantClientApp
 */
angular.module('restaurantClientApp')
  .controller('MainCtrl', function ($rootScope, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $rootScope.orders = [];

    $http.get("http://localhost:8000/view/restaurant-id").
      then(function(response) {
        console.log("Current orders: ", response.data);
        $rootScope.orders = response.data;
      });

  });
