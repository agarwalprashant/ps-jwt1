'use strict';

angular.module('psJwt1App')
  .controller('JobsCtrl', function ($scope,$http,API_URL) {
    $http.get(API_URL + "jobs").success(function(jobs){
    	$scope.jobs = jobs;
    }).error(function(err){
    	console.log("error in jobs.js");
    })

    
    
  });
