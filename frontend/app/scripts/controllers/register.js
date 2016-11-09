'use strict';

angular.module('psJwt1App')
  .controller('RegisterCtrl', function ($scope,$http) {
  	

  	$scope.submit = function(){

      var url = "http://localhost:3000/register",
      user = {
        email:$scope.email,
        password:$scope.password
      };
      
  		$http.post(url,user)
  			.success(function(data){
  				console.log(data);	
  			})
  			.error(function(error){
  				console.log("bad");
  			})
  	}
  });
