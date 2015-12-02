var viewModel = function() {
	var self = this;

	var pageCount = 0,
		pageSize = 6,
		pageflag = false;
		pageID = 1;
	self.pages = ko.observableArray([]);

	var newsUrl = common.gServerUrl + "API/News/getNewsBySection?pageSize=" + pageSize + "&pageIndex=";
	self.news = ko.observableArray([]);

	self.getNews = function() {
		$.ajax({
			url: newsUrl + pageID,
			type: "get",
			success: function(data) {
				self.news(JSON.parse(data));
				if (!pageflag) {
					var pagedom = $('.uk-pagination');
					UIkit.pagination(pagedom, {items: self.news()[0].TotalCount, itemsOnPage: pageSize, displayedPages: 3, edges: 1});
					pageflag = true;
					$('#news-defult').css({'display': 'none'});
				}
			}
		});
	};
	
	$('.uk-pagination').on('select.uk.pagination', function(e, pageIndex){
    	pageID = pageIndex+1;
    	self.getNews();
	});

	self.getNews();
}

ko.applyBindings(viewModel);