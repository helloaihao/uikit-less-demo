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
	
	self.workVideoUrl = common.gServerUrl + 'API/Video/GetVideoUrl/?workId=' + workID;
	self.video = ko.observableArray([]);
	
	$.ajax({
		type:"get",
		url:workVideoUrl,
		success: function(data) {
			self.video(JSON.parse(data));
			var source = '<source src="' + common.gVideoServerUrl + self.video().VideoUrl +'" type="video/mp4"></source>'
			$("video").append(source);
			videojs("my-video", {}, function(){});
		}
	});
};

ko.applyBindings(viewModel);