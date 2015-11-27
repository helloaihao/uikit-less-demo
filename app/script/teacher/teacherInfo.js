var viewModel = function() {
	var self = this;
	
	var teacherID = common.getQueryStringByName('id');
	var teacherInfoUrl = common.gServerUrl + 'API/Account/GetInfo?userid=' + teacherID + "&usertype=" + common.gDictUserType.teacher;

	self.teachersInfo = ko.observableArray([]);
	self.geted = ko.observable(false);
	
	$.ajax({
		url: teacherInfoUrl,
		type: "get",
		success: function(data) {
			self.teachersInfo(JSON.parse(data));
			var tsn = $('#teacher-side-nav');
			UIkit.sticky(tsn, {top: 200});
			UIkit.scrollspynav(tsn, {closest: 'li', smoothscroll: true, cls: 'current'});
			self.geted(true);
		}
	});
};

ko.applyBindings(viewModel);
