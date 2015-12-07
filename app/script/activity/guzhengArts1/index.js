var viewModel = function() {
	var self = this;

	var pageCount = 0,
		pageSize = 4,
		pageflag = false;
		pageID = 1;
	self.pages = ko.observableArray([]);

	var GZTeacherUrl = 'teacher.txt';
	self.GZTeacher = ko.observableArray([]);
	self.tmpTeacher = ko.observableArray([]);
	
	
	self.getGZTeacher = function() {
		$.ajax({
			url: GZTeacherUrl,
			type: "get",
			success: function(data) {
				self.GZTeacher(JSON.parse(data));
				var tmp = [];
				self.tmpTeacher([]);
				for(var i = (pageID-1)*pageSize; i < pageID*pageSize && i < self.GZTeacher().length; i ++) {
					self.tmpTeacher.push(self.GZTeacher()[i]);
				}
				if (!pageflag) {
					var pagedom = $('.uk-pagination');
					UIkit.pagination(pagedom, {items: 60, itemsOnPage: pageSize, displayedPages: 3, edges: 1});
					pageflag = true;
				}
			}
		});
	};
	
	$('.uk-pagination').on('select.uk.pagination', function(e, pageIndex){
    	pageID = pageIndex+1;
    	self.getGZTeacher();
	});

	self.getGZTeacher();
}

ko.applyBindings(viewModel);