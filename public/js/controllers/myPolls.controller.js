myApp.controller('myPollsController', function($scope, $http, toastr, vottingAppServices) {

	$scope.loader = true;
	$scope.polls = {
		items: []
	}

	vottingAppServices.authentication(function(response){
		if(response){
			$http.get('/api/poll/mypolls?user_id=' + response.id).then(function(res){
				console.log(res)
				console.log(JSON.stringify(res.data[0]))
				$scope.loader = false;
				//$scope.polls.items = response.data;
				$scope.polls = {
					items: res.data
				}
				console.log($scope.polls);
			});
		}
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