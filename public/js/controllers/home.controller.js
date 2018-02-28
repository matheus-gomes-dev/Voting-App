myApp.controller('homeController', function($scope, $http, vottingAppServices) {

	var loginFlag = localStorage.getItem('votingApp_user')
	$scope.loader = true;
	$scope.login = (loginFlag === "false" || loginFlag === "undefined") ? false : true;
	$scope.polls = {
		items: []
	}
	console.log(localStorage.getItem('votingApp_user'))
	console.log($scope.login);

	$http.get('/api/poll/all').then(function(response){
		console.log(response)
		$scope.loader = false;
		//$scope.polls.items = response.data;
		$scope.polls = {
			items: response.data
		}
		console.log($scope.polls);
	});

	$scope.viewPoll = function(param){
		window.location.href = window.location.href + 'poll?id=' + param;
	}

});