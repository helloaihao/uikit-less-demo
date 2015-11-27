var viewModel = function() {
	var self = this;

	var pageCount = 0,
		pageSize = 3,
		pageflag = false;
		pageID = 1;
	self.pages = ko.observableArray([]);

	var workUrl = common.gServerUrl + "API/Work?pageSize=" + pageSize + "&page=";
	self.works = ko.observableArray([]);

	self.getWorks = function() {
		$.ajax({
			url: workUrl + pageID,
			type: "get",
			success: function(data) {
				self.works(JSON.parse(data));
				if (!pageflag) {
					var pagedom = $('.uk-pagination');
					UIkit.pagination(pagedom, {items: self.works()[0].TotalCount, itemsOnPage: pageSize, displayedPages: 3, edges: 1});
					pageflag = true;
				}

				//document.getElementsByTagName('body')[0].scrollTop = 0;
			}
		});
	};
	
	$('.uk-pagination').on('select.uk.pagination', function(e, pageIndex){
    	pageID = pageIndex+1;
    	self.getWorks();
	});

	self.getWorks();
}

ko.applyBindings(viewModel);