myApp.controller('pollController', function($scope, $http, toastr, $uibModal, ModalService, vottingAppServices) {


	//ver documentação do mongo para adicionar voto:
	//https://docs.mongodb.com/manual/reference/operator/update/positional/

	$scope.loader = true;
	$scope.options = {
		items: []
	}

	var poll_id = vottingAppServices.get_urlParameter('id');
	$http.get('/api/poll?id=' + poll_id).then(function(response){
		console.log(response)
		$scope.loader = false;
		if(response.data.error){
			toastr.warning("Poll not found!", "Warning");
			return;
		}
		$scope.pollTitle = response.data.title;
		for(var i=0; i<response.data.options.length; i++)
			$scope.options.items.push(response.data.options[i].description);
		setPoll(response.data);
	});

	$scope.shareTwitter = function(){
		var twitter_url = 'https://twitter.com/intent/tweet?text='
		twitter_url += 'Voting App - ' + $scope.pollTitle + '(' + window.location.href + ')';
		window.open(twitter_url, '_blank', 'location=yes,height=300,width=550,scrollbars=yes,status=yes');
	}

	$scope.newOption = function(){
		vottingAppServices.authentication(function(response){
			if(!response)
				toastr.warning("You must be authenticated to create a new option!", "Warning");
			else{
				console.log("procedimento para criar opção")
				
				//http://dwmkerr.github.io/angular-modal-service/

			    ModalService.showModal({
				    templateUrl: "views/modal.newoption.html",
				    controller: "modalController"
				}).then(function(modal) {

					console.log(modal);

				    //it's a bootstrap element, use 'modal' to show it
				    modal.element.modal();
				    modal.close.then(function(result) {
				      	console.log(result);
				    });
				});
			}
		})
	}

	$scope.submitVote = function(){
		if(!$scope.pollOption){
			toastr.warning("You need to choose an option!");
			return
		}
		var data = {
			poll_id: poll_id,
			option_description: $scope.pollOption
		}
		$http.put('/api/option', data).then(function(response){
			if(response.data.error)
				toastr.error("Error while voting!");
			else if(response.data.message)
				toastr.warning(response.data.message)
			else
				toastr.success("You have voted on this poll!");
		});
	}

	//generate random hex code color
	function getRandomColor() {
  		var letters = '0123456789ABCDEF';
  		var color = '#';
  		for (var i = 0; i < 6; i++) {
    		color += letters[Math.floor(Math.random() * 16)];
  		}
  		return color;
	}

	function setPoll(poll){

		//set colors array
		var colorsArray = [];
		for (var i=0; i<poll.options.length; i++)
			colorsArray.push(getRandomColor());


		//check number of votes
		if(!poll.votes.length)
			toastr.success("Be the first to vote on this poll!");
		

		//set poll data
		var labels=[];
		var votes=[];
		for(var i=0; i<poll.options.length; i++){
			labels.push(poll.options[i].description)
			votes.push(poll.options[i].votes)
		}
		var data = {
	   		datasets: [{
	        	//data: votesArray,
	        	data: votes,
	        	backgroundColor: colorsArray
	    	}],
		    labels: labels
		};

		//plot poll
		console.log(data);
		var ctx = document.getElementById('myChart').getContext('2d');
		var myDoughnutChart = new Chart(ctx, {
	    	type: 'doughnut',
	    	data: data
		});
	}


});