myApp.controller('modalController', function($scope, $http, close, toastr, vottingAppServices){
	console.log("Modal controller!");
	$scope.close = function(result) {
 	  	close(result, 500); // close, but give 500ms for bootstrap to animate
  	};

  	$scope.newOption = function(){
  		if(!$scope.newOptionInput){
  			toastr.error("Invalid Option!");
  			return;
  		}
  		var data = {
  			poll_id: vottingAppServices.get_urlParameter("id"),
  			newOption: $scope.newOptionInput
  		}
  		
  		$http.post('/api/option', data).then(function(response){
			  if(response.data.message)
          toastr.warning(response.data.message)
        else if(response.data.error)
          toastr.error("Error while creating new option!")
        else{
          toastr.success("New option created!")
        }
		  })

  	}
})