'use strict';

angular.module('psJwt1App')
  .service('auth', function ($http,API_URL,authToken,$state,$window) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var urlBuilder = [];
    var clientId = "709387121553-33efea54f9gqcahndhnneo0sileobmd7.apps.googleusercontent.com";
    urlBuilder.push("response_type=code",
    	"client_id="+ clientId,
    	"redirect_uri="+ window.location.origin,
    	"scope=profile email")

	 	this.googleAuth = function(){
	 		var url = "https://accounts.google.com/o/oauth2/v2/auth?" + urlBuilder.join('&');
	 		var options="width=500, height=500,left="+($window.outerWidth -500)/2 + ",top=" + ($window.outerHeight -500)/2.5;
	 		var popup = $window.open(url,'',options);
	 		$window.focus();
	 		$window.addEventListener('message',function(event){
	 			if(event.origin === $window.location.origin){
	 				var code = event.data;
	 				popup.close();

	 				$http.post(API_URL + "auth/google",{
	 					code:code,
	 					clientId:clientId,
	 					redirect_uri:window.location.origin
	 				});

	 			}
	 		})
	 	}
  });
