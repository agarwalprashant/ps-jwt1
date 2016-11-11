'use strict';

angular.module('psJwt1App')
  .controller('RegisterCtrl', function ($scope,$http,authToken,auth) {
  	

  	$scope.submit = function(){

      var url = "http://localhost:3000/register",
      user = {
        email:$scope.email,
        password:$scope.password
      };

  		$http.post(url,user)
  			.success(function(res){
          console.log(res);
  				authToken.setToken(res.token);	
  			})
  			.error(function(error){
  				console.log("bad");
  			})
  	};

    $scope.google = function(){
      auth.googleAuth().then();
    }
  });
