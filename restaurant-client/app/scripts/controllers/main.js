'use strict';

/**
 * @ngdoc function
 * @name restaurantClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the restaurantClientApp
 */

 var api_server_str = "http://118.138.30.213:8000";
 var restaurant_id = "restaurant-id";

angular.module('restaurantClientApp')
  .controller('MainCtrl', function ($scope, $http, $interval) {

    $scope.orders = [];

    $scope.removeItem = function (id) {
      console.log("Removing", id);
      $http.get(api_server_str + "/delete/" + restaurant_id + "/" + id).
        then(function(response) {
          console.log("Delete request responded", response);
          refreshData();
        });
    }

    function tick() {
      for (var i = 0; i < $scope.orders.length; i++) {
        $scope.orders[i].created += 1000;
      }
    }

    function getTimeSince (time) {
      return Date.now() - Date.parse(time)
    }

    function refreshData() {
      console.log("Updating list")
      $http.get(api_server_str + "/view/" + restaurant_id).
        then(function(response) {
          console.log("Current orders: ", response.data);
          var orders = response.data;

          for (var i = 0; i < orders.length; i++) {
            orders[i].created = getTimeSince(orders[i].created);
          }

          $scope.orders = orders;
        });
    }

    refreshData();

    $interval(tick, 1000);
    $interval(refreshData, 10000);
  });
