var getSeat = function() {
	var self = this;
	var openid = common.getQueryStringByName("openid");
	var actid = common.getQueryStringByName("actid");
	
	self.actRoleType = ko.observable(0);
	self.seats = ko.observableArray([]);			//用以前端显示的座位
	self.allShows = ko.observableArray([]);
	self.allSeats = ko.observableArray([]);			//完整的座位
	self.filteredShows = ko.observableArray([]);	//过滤后的演出
	self.filteredSeats = ko.observableArray([]);	//过滤后的座位
	self.searchText = ko.observable('');

	self.getData = function() {
		if(openid == '' || actid == ''){
			window.location = "../home/error.html";
			return;
		}
		
		var url = common.gServerUrl + "Open/Activity/GetSeatByUser/?weixin="+openid+"&activityID="+actid;
		$.ajax({
			type: "get",
			url: url,
			success: function(responseText) {
				if(responseText){
					var result = JSON.parse(responseText);
					self.actRoleType(result.ActRoleType);
					
					if(result.Shows){
						self.allShows(result.Shows);
					}
					if(result.Seats){
						self.allSeats(result.Seats);
						self.seats(self.allSeats());
					}
				}
			},
			error: function(){
				window.location = "../home/error.html";
				return;
			}
		});
	}
	
	self.search = function(){
		if(self.searchText() != ''){
			self.seats([]);
			self.filteredSeats([]);
			self.allSeats().forEach(function(item){
				if(item.UserName.indexOf(self.searchText()) >= 0 || item.DisplayName.indexOf(self.searchText()) >= 0){
					self.filteredSeats.push(item);
				}
			})
			self.seats(self.filteredSeats());
		}
		else{
			self.seats([]);
			self.seats(self.allSeats());
		}
	}
	
	$(document).ready(function(){
		//console.log(openid);
		if(openid == '' || actid == ''){
			UIkit.notify("非法访问，请关闭！", {timeout: 0, pos:'bottom-center'});
		}
		else{
			self.getData();
			$("#main").show();
		}
	})
}

ko.applyBindings(getSeat);