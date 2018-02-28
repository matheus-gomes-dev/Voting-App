myApp.controller('myPollsController', function($scope, $http, toastr) {

	$scope.loader = true;
	$scope.polls = {
		items: []
	}

	var user_id = localStorage.getItem('votingApp_user_id');
	$http.get('/api/poll/mypolls?user_id=' + user_id).then(function(response){
		console.log(response)
		console.log(JSON.stringify(response.data[0]))
		$scope.loader = false;
		//$scope.polls.items = response.data;
		$scope.polls = {
			items: response.data
		}
		console.log($scope.polls);
	});

	$scope.viewPoll = function(param){
		window.location.href = window.location.href.replace('mypolls', '') + 'poll?id=' + param;
	}

	$scope.deletePoll = function(param){
		$http.delete('/api/poll?poll_id=' + param).then(function(response){
			if(!response.data.error){
				toastr.success("Poll deleted!");
				var aux = [];
				for (var i=0; i<$scope.polls.items.length; i++){
					if($scope.polls.items[i].poll_id != param)
						aux.push($scope.polls.items[i])
				}
				$scope.polls.items = aux;
			}
			else
				toastr.error("Error while deleting poll!")
		})
	}
})