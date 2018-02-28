angular.module('votingApp').service('vottingAppServices', function($http) {
	var service = {};

	service.authentication = function(callback){
		$http.get('/user').then(function(response){
			console.log(response);
			if(response.data.user)
				callback(response.data.user);
			else
				callback(false);
		}, function(error){
			callback(error);
		});
	}

	service.get_urlParameter = function(name, url){
		if (!url) url = window.location.href;
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	return service;
})


