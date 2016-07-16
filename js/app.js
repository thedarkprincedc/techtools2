'use strict';
var app = angular.module('techtoolsapp', ['ngRoute', 'ngAnimate', 'authDirective', 'miscDirective']).config(function($routeProvider) {
	$routeProvider.when('/index', {
		templateUrl : 'partials/index.html'
	}).when('/kiosk', {
		templateUrl : 'pages/partials/projects.html'
	}).when('/login', {
		templateUrl : 'partials/auth/login.html'
	}).when('/issues', {
		templateUrl : 'partials/misc/issues.html'
	})
	.when('/admincreate', {
		templateUrl : 'partials/misc/admin.create.newissue.html'
	}).when('/adminitemcheckin/:redmineid', {
		templateUrl : 'partials/misc/admin.item.checkin.html'
	})
	.otherwise({
		redirectTo : '/index'
	});
}).run(function($rootScope, $templateCache, $location) {
      /*loginservice.authenticate();   
      $rootScope.logout = function(){
      	loginservice.logout();
      	$location.path('/index');
      };*/
});