var getAllSeat = function() {
	var self = this;
	var openid = common.getQueryStringByName("openid");
	var actid = common.getQueryStringByName("actid");
	
	self.allSeats = ko.observableArray([]);

	self.getData = function() {
		if(openid == '' || actid == ''){
			window.location = "../home/error.html";
			return;
		}
		
		var url = common.gServerUrl + "Open/Activity/GetAllSeatByActivityID/?weixin="+openid+"&activityID="+actid;
		$.ajax({
			type: "get",
			url: url,
			success: function(responseText) {
				if(responseText){
					var result = JSON.parse(responseText);
					self.allSeats(result);
				}
			}
		});
	}
	
	$(document).ready(function(){
		//console.log(openid);
		if(openid == '' || actid == ''){
			UIkit.notify("非法访问，请关闭！", {timeout: 0, pos:'bottom-center'});
		}
		else{
			self.getData();
		}
	})
}

ko.applyBindings(getAllSeat);