angular.module('authDirective', []).directive('authLogin', function() {
	return {
		restrict : 'EA', //E = element, A = attribute, C = class, M = comment
		scope : {
			//@ reads the attribute value, = provides two-way binding, & works with functions
			gameType : '@',
			title : '@',
			filters : '='
		},
		templateUrl : 'partials/auth/login.template.html',
		controller : ['$scope', '$compile', '$http', '$rootScope','$timeout','$location',
		function($scope, $compile, $http, $root, $timeout, $location) {
            $scope.usercredentials = {
                username : "",
                password : ""
            };
            $scope.onLoginClicked = function(){
                 try{
                 	
                 	$http({
                 		method : "POST",
                 		url : "php/techtoolsapp.php?action=login",
                 		data : $.param($scope.usercredentials),
                 		headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
            		
                 	}).then(function(msg){
                 		
                 		if(msg.data.authenticated){
                 			$location.path("/issues");
                 		}
                 	});
                    /*if($scope.usercredentials.username.length == 0){
                        throw "Username is not long enough";
                    }
                    if($scope.usercredentials.password.length == 0){
                        throw "Password is not long enough";
                    }*/
                    //
                }
                catch(e){
                    alert(e);
                }
            };
        }]
   };
}).directive('authCustomerlogin', function() {
	return {
		restrict : 'EA', //E = element, A = attribute, C = class, M = comment
		scope : {
			//@ reads the attribute value, = provides two-way binding, & works with functions
			gameType : '@',
			title : '@',
			filters : '='
		},
		templateUrl : 'partials/auth/custlogin.template.html',
		controller : ['$scope', '$compile', '$http', '$rootScope','$timeout',
		function($scope, $compile, $http, $root, $timeout) {
            $scope.usercredentials = {
                emailaddr : "",
                phonenum : ""
            };
            $scope.onLoginClicked = function(){
                try{
                    debugger;
                    if($scope.usercredentials.emailaddr.length == 0){
                        throw "Email address is not long enough";
                    }
                    if($scope.usercredentials.phonenum.length == 0){
                        throw "Phone number is not long enough";
                    }
                }
                catch(e){
                    alert(e);
                }
            };
        }]
   };
});
