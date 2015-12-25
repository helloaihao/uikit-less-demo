var viewModel = function() {
	var self = this;

	var keyword = common.getQueryStringByName('keyword');

	var pageCount = 0,
		pageSize = 5,
		pageflag = false;
		pageID = 1;

	var searchUrl = common.gServerUrl + 'API/Common/SearchFullText?keyword=' + keyword + '&pageSize=' + pageSize + '&page=';
	var gotoUrl = ['','/modules/teacher/teacherInfo.html?id=','', '/modules/works/workInfo.html?id=', '/modules/news/newsInfo.html?id=']
	
	self.serachGotoUrl = ko.observableArray(gotoUrl);
	self.searchLength = ko.observable();
	self.searchs = ko.observableArray([]);

	self.getSearchs = function() {
		$.ajax({
			url: searchUrl + pageID,
			type: "get",
			success: function(data) {
				console.log(data);
				keyword = decodeURI(keyword);
				var reg = new RegExp(keyword,'gi');
				var searchText = JSON.parse(data);
				
				searchText.forEach(function(item){
					item.Title = item.Title.replace(reg, '<span>' + keyword + '</span>');
					if( item.Abstract )
						item.Abstract = item.Abstract.replace(reg, '<span>' + keyword + '</span>');
				});
				self.searchs(searchText);
				searchLength(self.searchs()[0].TotalCount);
				if (!pageflag) {
					var pagedom = $('.uk-pagination');
					UIkit.pagination(pagedom, {items: self.searchs()[0].TotalCount, itemsOnPage: pageSize, displayedPages: 3, edges: 1});
					pageflag = true;
				}

				//document.getElementsByTagName('body')[0].scrollTop = 0;
			}
		});
	};
	
	$('.uk-pagination').on('select.uk.pagination', function(e, pageIndex){
    	pageID = pageIndex+1;
    	self.getSearchs();
	});
	
	self.getSearchs();
};

ko.applyBindings(viewModel);
