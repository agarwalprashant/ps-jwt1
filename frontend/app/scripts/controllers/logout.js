'use strict';

angular.module('psJwt1App')
  .controller('LogoutCtrl', function (authToken,$state) {
  	authToken.removeToken();
  	$state.go('main');
  });
