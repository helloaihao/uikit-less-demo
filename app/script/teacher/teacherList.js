var viewModel = function() {
	var self = this;

	var pageCount = 0,
		pageSize = 9,
		pageflag = false;
		pageID = 1;
	self.pages = ko.observableArray([]);

	var teacherUrl = common.gServerUrl + "API/Teacher?pageSize=" + pageSize + "&page=";
	self.teachers = ko.observableArray([]);

	self.getTeacher = function() {
		$.ajax({
			url: teacherUrl + pageID,
			type: "get",
			success: function(data) {
				self.teachers(JSON.parse(data));
				if (!pageflag) {
					var pagedom = $('.uk-pagination');
					UIkit.pagination(pagedom, {items: self.teachers()[0].TotalCount, itemsOnPage: pageSize, displayedPages: 3, edges: 1});
					pageflag = true;
				}

				//document.getElementsByTagName('body')[0].scrollTop = 0;
			}
		});
	};
	
	$('.uk-pagination').on('select.uk.pagination', function(e, pageIndex){
    	pageID = pageIndex+1;
    	self.getTeacher();
	});
	
	self.getTeacher();
}

ko.applyBindings(viewModel);