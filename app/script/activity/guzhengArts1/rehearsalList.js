var rehearsalList = function() {
	var self = this;
	var openid = common.getQueryStringByName("openid");
	var actid = common.getQueryStringByName("actid");

	self.actRoleType = ko.observable(0);

	self.getData = function() {
		if (openid == '' || actid == '') {
			window.location = "../../home/error.html";
			return;
		}
		
		var url = common.gServerUrl + "Open/Activity/GetActUser/?weixin=" + openid + "&activityID=" + actid;
		$.ajax({
			type: "get",
			url: url,
			success: function(responseText) {
				if (responseText) {
					var result = JSON.parse(responseText);
					self.actRoleType(result.ActRoleType);
				}
			},
			error: function() {
				window.location = "../../home/error.html";
				return;
			}
		});
	}

	$(document).ready(function() {
		if (openid == '' || actid == '') {
			UIkit.notify("非法访问，请关闭！", {
				timeout: 0,
				pos: 'bottom-center'
			});
		} else {
			self.getData();
			$("#main").show();
		}
	})
}

ko.applyBindings(rehearsalList);