var verifyUser = function() {
	var self = this;
	var openid = common.getQueryStringByName("openid");
	var actid = common.getQueryStringByName("actid");
	var state = common.getQueryStringByName("state");
	self.DisplayName = ko.observable('');
	self.UserName = ko.observable('');
	self.canVerify = ko.observable(true);

	self.checkUser = function() {
		if(self.DisplayName() == '' || self.UserName() == ''){
			UIkit.notify("请输入姓名和电话号码！", {timeout: 2000, pos:'bottom-center'});
			return;
		}
		
		var url = common.gServerUrl + "Open/WeixinMP/CheckActUser?state="+state;
		$.ajax({
			type: "post",
			url: url,
			data: {
				UserName: self.UserName,
				DisplayName: self.DisplayName,
				Weixin: openid,
				ActivityID: actid
			},
			success: function(responseText) {
				UIkit.notify("验证成功，即将跳转页面...", {timeout: 2000, pos:'bottom-center', onClose: function(){
					if(responseText != ''){
						window.location = responseText;
					}
					else{
						window.location = "guzhengArts1/index.html";	//此处应该跳转至活动首页
					}
				}});
			},
			error: function(respText){
				UIkit.notify("验证失败，请确认信息正确！", {timeout: 2000, pos:'bottom-center'});
			}
		});
	}
	
	$(document).ready(function(){
		if(openid == ''){
			self.canVerify(false);
			UIkit.notify("非法访问，请关闭！", {timeout: 0, pos:'bottom-center'});
		}
	})
}

ko.applyBindings(verifyUser);