'use strict';

//Treat the entire html as an Angular app, this is where rootScope is created
var app = angular.module('tododo', []);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {templateUrl: 'overview.html', controller: 'OverviewCtrl'})
		.when('/details', {templateUrl: 'details.html', controller: 'DetailsCtrl'})
		.when('/notFound', {})
		.otherwise({redirectTo: '/notFound'});
});

app.directive("noChar", function () {
	return function(scope, element, attr) {
		var sadEvents = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57].join();

		element.bind('keydown', function(ev) {
			//nice little hack to allow backspace
			if (ev.keyCode.toString().length > 1) {
				if (sadEvents.indexOf(ev.keyCode) != -1) {
					ev.preventDefault();
				}
			}
		});
	}
});

app.controller('MainCtrl', ['$location', '$scope', '$rootScope',
function($location, $scope, $rootScope) {
}]);

app.controller('OverviewCtrl', ['$rootScope', '$scope', '$location', 
function($rootScope, $scope, $location) {
	$scope.newItem;
	$scope.items = [];

	$scope.items = [{
		'text': 'hey',
		'date': 1231
	}, {
		'text': '2',
		'date': 123123,
		'id': 1
	}];

	$scope.initialize = function() {
		if ($rootScope.items) {
			$scope.items = $rootScope.items;
		}
	}

	$scope.saveItem = function() {
		// $scope.items.push($scope.newItem);
		$scope.items.push({
			'text': $scope.newItem,
			'date': Date.now(),
			'id': Date.now() + '-' +$scope.newItem 
		})

		//Reset
		$scope.newItem = '';
	};

	$scope.goToDetailsPage = function(index) {
		$rootScope.currentItem = $scope.items[index];
		$rootScope.items = $scope.items;
		$location.path('/details');
	};
}]);

app.controller('DetailsCtrl', ['$scope', '$location',
function($scope, $location) {

}]);

app.controller('FooterCtrl', ['$scope', function($scope) {
	$scope.author = 'Tarif Kayali';
}]);

app.controller('HeaderCtrl', ['$scope', '$location', function($scope, $location) {
	$scope.goHome = function() {
		$location.path('/');
	}
}]);