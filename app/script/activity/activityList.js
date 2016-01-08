var viewModel = function() {
	var self = this;

	var pageCount = 0,
		pageSize = 4,
		pageflag = false;
		pageID = 1;
	self.pages = ko.observableArray([]);
	
	var activityURl=common.gServerUrl +"API/Activity/GetActivityInfoList?pageSize=" + pageSize + "&pageIndex=";
	
	self.activities=ko.observableArray([]);
	
	self.getActivities=function(){
		$.ajax({
			url:activityURl+pageID,
			type:"get",
			success:function(data){
				self.activities(JSON.parse(data));
				if (!pageflag) {
					var pagedom = $('.uk-pagination');
					UIkit.pagination(pagedom, {items: self.activities()[0].TotalCount, itemsOnPage: pageSize, displayedPages: 3, edges: 1});
					pageflag = true;
				}
			}
		});
	};
		$('.uk-pagination').on('select.uk.pagination', function(e, pageIndex){
    	pageID = pageIndex+1;
    	self.getActivities();
	});

	self.getActivities();
}

ko.applyBindings(viewModel);
	
