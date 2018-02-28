myApp.controller('newPollController', function($scope, $http, toastr) {

	$scope.createPoll = function(){
		$scope.newPoll.options = $scope.newPoll.options.split('\n');
		if($scope.newPoll.options.length <= 1){
			toastr.warning("At least two options required!");
			return;
		}
		else{
			$http.post('/api/poll', $scope.newPoll).then(function(response){
				if(response.data.error)
					toastr.error("Error while creating new poll")
				else
					toastr.success("New poll created!")
			})
		}
		console.log($scope.newPoll)
	}
})