var getSeat = function() {
	var self = this;
	var openid = common.getQueryStringByName("openid");
	var actid = common.getQueryStringByName("actid");

	self.actRoleType = ko.observable(0);
	self.displayName = ko.observable('');
	self.seats = ko.observableArray([]); //用以前端显示的座位
	self.allShows = ko.observableArray([]);
	self.allShowsPics = ko.observableArray([]);	//专场演出的座位示意图
	self.allSeats = ko.observableArray([]); //完整的座位
	self.filteredShows = ko.observableArray([]); //过滤后的演出
	self.filteredSeats = ko.observableArray([]); //过滤后的座位
	self.searchText = ko.observable('');

	self.getData = function() {
		if (openid == '' || actid == '') {
			window.location = "../home/error.html";
			return;
		}
		
		var url = common.gServerUrl + "Open/Activity/GetSeatByUser/?weixin=" + openid + "&activityID=" + actid;
		$.ajax({
			type: "get",
			url: url,
			success: function(responseText) {
				if (responseText) {
					var result = JSON.parse(responseText);
					self.actRoleType(result.ActRoleType);
					self.displayName(result.DisplayName);

					if (result.Shows) {
						self.allShows(result.Shows);
						result.Shows.forEach(function(item){	//获取示意图（多个会以逗号隔开）
							if(item.FilePath){
								var paths = item.FilePath.split(',');
								paths.forEach(function(path){
									if(common.StrIsNull(path) != ''){
										var tmp = path.split('/');
										var filename = tmp[tmp.length - 1].split('.')[0];
										self.allShowsPics.push({
											showid: item.ID,
											path: path,
											filename: filename
										})
									}
								})
							}
						})
					}
					
					if (result.Seats) {
						self.allSeats(result.Seats);
						//self.seats(self.allSeats());
					}

					$("#waiting").hide();
				}
			},
			error: function() {
				window.location = "../home/error.html";
				return;
			}
		});
	}

	self.search = function() {
		$("#waiting").show();
		if (self.searchText() != '') {
			self.seats([]);
			self.filteredSeats([]);
			var max = 10;				//最多显示10条
			for(var i = 0; i < self.allSeats().length; i++){
				var item = self.allSeats()[i];
				if(max <= 0){
					if(item.ShowID == self.filteredSeats()[self.filteredSeats().length - 1].ShowID){
						continue;
					}
					else{
						max = 10;	//不同场次，重新计数
					}
				}
				if (item.UserName.indexOf(self.searchText()) >= 0 || item.DisplayName.indexOf(self.searchText()) >= 0 ||
					(common.StrIsNull(item.SeatName) != '' && item.SeatName.indexOf(self.searchText()) >= 0)) {
					self.filteredSeats.push(item);
					max--;
				}
			}
			
			self.seats(self.filteredSeats());
		} else {
			self.seats([]);
			//self.seats(self.allSeats());
		}
		$("#waiting").hide();
	}

	$(document).ready(function() {
		/*openid = 'oEq5Gv3oMvhQYNuFnBjpxxe31CH0';
		actid = 1;*/
		if (openid == '' || actid == '') {
			UIkit.notify("非法访问，请关闭！", {
				timeout: 0,
				pos: 'bottom-center'
			});
			$("#waiting").hide();
		} else {
			self.getData();
			$("#main").show();
		}
	})
}

ko.applyBindings(getSeat);