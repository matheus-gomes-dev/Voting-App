myApp.controller('navbarController', function($scope, $http, vottingAppServices) {

	var hostname = window.location.hostname;
	var port = window.location.port;
	$scope.user = false;


	vottingAppServices.authentication(function(response){
		console.log(response);
		$scope.user = (response) ? response.displayName : false;
		localStorage.setItem('votingApp_user', response.displayName);
		localStorage.setItem('votingApp_user_id', response.id);
	});

	//defines location
	var url = window.location.href;
	console.log(url);
	if(~url.indexOf('newpoll'))
		$scope.navigation = 'newpoll';
	else if(~url.indexOf('mypolls'))
		$scope.navigation = 'mypolls';
	else if(~url.indexOf('poll'))
		$scope.navigation = '';
	else
		$scope.navigation = 'home';

	$scope.navigateHome = function(){
		location.replace('http://' + hostname + ':' + port);
	}

	$scope.navigateNewPoll = function(){
		location.replace('http://' + hostname + ':' + port + '/newpoll');
	}

	$scope.navigateMyPolls = function(){
		location.replace('http://' + hostname + ':' + port + '/mypolls');
	}

});