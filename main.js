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

			if (13 == ev.keyCode) {
				scope.$apply(function () {
					scope.saveItem(scope.items);
				});
			}
		});
	}
});

app.controller('MainCtrl', ['$location', '$scope',
function($location, $scope) {
}]);

app.controller('OverviewCtrl', ['$scope', '$location', 'items',
function($scope, $location, items) {
	$scope.items = items;

	$scope.saveItem = function (items) {
		items.items.push({
			'text': items.newItem,
			'date': Date.now(),
			'id': Date.now() + '-' + items.newItem
		})

		//Reset
		items.newItem = '';
	};

	$scope.goToDetailsPage = function (items, item) {
		items.currentItem = item;
		$location.path('/details');
	};
}]);

app.controller('DetailsCtrl', ['$scope', '$location', 'items',
function($scope, $location, items) {
	$scope.currentItem = items.currentItem;
}]);

app.controller('FooterCtrl', ['$scope', function($scope) {
	$scope.author = 'Tarif Kayali';
}]);

app.controller('HeaderCtrl', ['$scope', '$location', function($scope, $location) {
	$scope.goHome = function() {
		$location.path('/');
	}
}]);

app.factory("items", function () {
	return {
		items: [{
			'text': 'hey',
			'date': 1231
		}, {
			'text': '2',
			'date': 123123,
			'id': 1
		}],
		newItem: "",
		currentItem: null,
	};
});
