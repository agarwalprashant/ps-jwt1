'use strict';

/**
 * @ngdoc directive
 * @name psJwt1App.directive:validateEquals
 * @description
 * # validateEquals
 */
angular.module('psJwt1App')
  .directive('validateEquals', function () {
    return {
      require:"ngModel",
     	link:function(scope,element,attrs,ngModelCtrl){
     		function validateEquals(value){
     			var valid = (value === scope.$eval(attrs.validateEquals));
     			ngModelCtrl.$setValidity('equal',valid);
     			return valid ? value : undefined;
     		}
     		ngModelCtrl.$parsers.push(validateEquals);
     		ngModelCtrl.$formatters.push(validateEquals);

     		scope.$watch(attrs.validateEquals,function(){
     			ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
     		})
     	} 
    };
  });
