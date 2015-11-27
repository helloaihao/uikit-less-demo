var viewModel = function() {
	var self = this;
	
	var workID = common.getQueryStringByName('id');
	
	self.workInfoUrl = common.gServerUrl + 'Common/Work/' + workID;
	self.works = ko.observableArray([]);
	
	$.ajax({
		type:"get",
		url: workInfoUrl,
		success: function(data) {
			self.works(JSON.parse(data));
		}
	});
};

ko.applyBindings(viewModel);