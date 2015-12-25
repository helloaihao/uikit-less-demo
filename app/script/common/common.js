﻿var common = {
		//chen ge
		//gServerUrl: "http://192.168.1.66:8090/",gVideoServerUrl: "http://192.168.1.66:8099/",
		
		//Web API地址
		gServerUrl: "http://172.16.30.90:8090/",gWebsiteUrl: "http://172.16.30.90:8081/",gVideoServerUrl: "http://172.16.30.90:8099/",
		
		//正式
		//gServerUrl: "http://cloud.linkeol.com/",gWebsiteUrl: "http://www.linkeol.com/",gVideoServerUrl: "http://video.linkeol.com/",
		
		//判断字符串是否为空，空则返回""
		StrIsNull: function(str) {
			if (str != null)
				return str;
			else
				return "";
		},

		JsonConvert: function(jsonSrc, ValueField, TextField) {
			var jsonDest = [];
			if (typeof(jsonSrc) == "string") {
				jsonSrc = JSON.parse(jsonSrc);
			}
			if (jsonSrc) {
				for (var i = 0; i < jsonSrc.length; i++) {
					jsonDest.push({
						'value': jsonSrc[i][ValueField],
						'text': jsonSrc[i][TextField]
					});
					/*jsonDest[i].value = jsonSrc[i][ValueField];
					jsonDest[i].text = jsonSrc[i][TextField];*/
				}
			}

			return jsonDest;
		},

		/**
		 * 根据值获取对应的显示文本
		 * @param {Object} jsonSrc json字符串或数组（必须为value和text键值对的）
		 * @param {String} value 数值
		 * @return {String} 对应的文本
		 */
		getTextByValue: function(jsonSrc, value) {
			if (typeof(jsonSrc) == "string") {
				jsonSrc = JSON.parse(jsonSrc);
			}
			if (jsonSrc) {
				for (var i = 0; i < jsonSrc.length; i++) {
					if (jsonSrc[i].value == value) {
						return jsonSrc[i].text;
					}
				}
			}

			return '';
		},

		transfer: function(targetUrl, checkLogin, extras, createNew, autoShowValue) {
			var tmpUrl = targetUrl;
			if (checkLogin && getLocalItem('UserID') <= 0) {
				tmpUrl = '../account/login.html';
			}
			mui.openWindow({
				url: tmpUrl,
				extras: extras,
				createNew: createNew,
				show: {
					autoShow: true,
					aniShow: "slide-in-right",
					duration: "100ms"
				},
				waiting: {
					autoShow: true
				}
			});
		},
		//根据认证状态及图片路径获取其中文描述
		getAuthStatusStr: function(authStatus, picPath) {
			switch (authStatus) {
				case 1:
					if (common.StrIsNull(picPath) == '')
						return '未认证';
					else
						return '待认证';
				case 2:
					return '未通过';
				case 3:
					return '已认证';
				default:
					return '';
			}
		},

		//根据QueryString参数名称获取值
		getQueryStringByName: function(name) {
			var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));

			if (result == null || result.length < 1) {
				return "";
			}

			return result[1];
		},

		//计算数组中某一列的总和
		getArraySum: function(array, field) {
			var ret = 0;
			array.forEach(function(item) {
				ret += item[field];
			})

			return ret;
		},

		//提交动作（收藏、赞）
		postAction: function(actionType, targetType, targetID) {
			var ret = false;
			var ajaxUrl = common.gServerUrl + 'API/Action';
			mui.ajax(ajaxUrl, {
				type: 'POST',
				async: false,
				data: {
					UserID: getLocalItem('UserID'),
					ActionType: actionType,
					TargetType: targetType,
					TargetID: targetID
				},
				success: function(responseText) {
					ret = true;
				}
			})

			return ret;
		},

		//根据起始时间和结束时间返回类似“9月20日 15:00~16:00”
		formatTime: function(btime, etime) {
			if (!btime) return;

			var bdate;
			if (btime instanceof Date)
				bdate = btime;
			else {
				bdate = new Date(btime.replace(/-/gi, '/'));
			}
			if (isNaN(bdate)) { //非日期格式，原文返回
				return btime;
			}
			var edate;
			if(etime){
				if (etime instanceof Date)
					edate = etime;
				else {
					edate = new Date(etime.replace(/-/gi, '/'));
				}
			}
			else
				edate = bdate;
			
			var ehour = 0;
			if (etime) {
				ehour = edate.getHours();
			} else
				ehour = bdate.getHours() + 1;

			var bMinutes = bdate.getMinutes();
			if (bMinutes < 10)
				bMinutes = "0" + bMinutes.toString();
			else
				bMinutes = bMinutes.toString();
			
			var eMinutes = edate.getMinutes();
			if (eMinutes < 10)
				eMinutes = "0" + eMinutes.toString();
			else
				eMinutes = eMinutes.toString();
				
			var ret = (bdate.getMonth() + 1) + '月' + bdate.getDate() + '日' + ' ' + bdate.getHours() + ':' + bMinutes + '~' + ehour + ':' + eMinutes;

			return ret;
		},
		//消息页面的跳转
		gotoMessage: function() {
			mui.openWindow({
				url: '../my/messageList.html',
				show: {
					autoShow: true,
					aniShow: "slide-in-right",
					duration: "100ms"
				},
				waiting: {
					autoShow: false
				}
			});
		},

		//获取未读消息
		getUnreadCount: function(UnreadCount) {
			if (common.StrIsNull(getLocalItem('UUID')) == '')
				return;
			mui.ajax(common.gServerUrl + "API/Message/GetUnreadCount", {
				dataType: 'json',
				type: "GET",
				data: {
					receiver: getLocalItem('UserID'),
					lastTime: getLocalItem('msgLastTime')
				},
				success: function(responseText) {
					UnreadCount = responseText;
				}
			});
		},

		/**
		 * 根据图片名获取其图片
		 * @param {String} photo 图片名
		 */
		getPhotoUrl: function(photo) {
			return common.gServerUrl + 'Images/' + photo;
		},
		getPhotoUrl2: function(photo) {
			return common.gWebsiteUrl + 'Pics/' + photo;
		},

		/**
		 * 获取视频缩略图
		 * @param {String} photo 图片名
		 */
		getThumbnail: function(photo) {
			return common.gVideoServerUrl + 'Thumbnails/' + photo;
		},


		
		//用户类型枚举
		gDictUserType: {
			teacher: 32,
			student: 64
		},

		//性别类型枚举
		gDictGenderType: {
			male: 0,
			female: 1
		},
		gDictWorkType: {
			notComment: 1, //未点评
			Commenting: 2, //点评中
			Commented: 3 //已点评
		},
		gDictTeacherAuthType: {
			IDAuth: 1, //身份认证
			EduAuth: 2, //学历认证
			ProTitleAuth: 3 //职称认证
		},
		gDictAuthStatusType: {
			NotAuth: 1, //未认证
			Rejected: 2, //已拒绝
			Authed: 3 //已认证
		},
		//账户明细类型
		gDictAccountDetailType: {
			NotFinish: 1, //未完成
			Finished: 2, //已完成
			Transfered: 3 //已转账
		},
		//动作类型
		gDictActionType: {
			Favorite: 1, //收藏
			Like: 2 //赞
		},
		//动作对象类型
		gDictActionTargetType: {
			Works: 1, //作品
			News: 2, //新闻
			User: 3 //用户
		},
		//课时调整状态
		gDictLessonFeedbackStatus: {
			Normal: 1, //正常
			Handling: 2, //处理中
			Rejected: 3 //已拒绝
		},
		//订单状态
		gDictOrderStatus: {
			NotPay: 1, //未支付
			Payed: 2, //已支付
			Refunded: 3 //已退款
		},
		//订单货品类型
		gDictOrderTargetType: {
			NotPay: 1, //未支付
			Payed: 2, //已支付
			Refunded: 3 //已退款
		},
		//是否类型JSON
		gJsonYesorNoType: [{
			value: 1,
			text: '是'
		}, {
			value: 0,
			text: '否'
		}],
		//性别类型JSON
		gJsonGenderType: [{
			value: 0,
			text: '男'
		}, {
			value: 1,
			text: '女'
		}],
		gJsonWorkType: [{
			value: 1,
			text: "分解教程"
		}, {
			value: 2,
			text: "完整教程"
		}, {
			value: 3,
			text: "演出作品"
		}],

		//老师评级
		gJsonTeacherLever: [{
			value: 0,
			text: "不限",
			ctext: "不限"
		}, {
			value: 1,
			text: "★",
			ctext: "一星"
		}, {
			value: 2,
			text: "★★",
			ctext: "二星"
		}, {
			value: 3,
			text: "★★★",
			ctext: "三星"
		}, {
			value: 4,
			text: "★★★★",
			ctext: "四星"
		}],

		//老师排序
		gJsonTeacherSort: [{
			value: 1,
			text: "评分降序"
		}, {
			value: 2,
			text: "价位升序"
		}, {
			value: 3,
			text: "价位降序"
		}, {
			value: 4,
			text: "教龄排序"
		}],
		//作品排序
		gJsonWorkSort: [{
			value: 1,
			text: "日期降序"
		}, {
			value: 2,
			text: "浏览降序"
		}, {
			value: 3,
			text: "点赞降序"
		}],
		//作品权限类型JSON
		gJsonWorkRemarkType: [{
			value: 0,
			text: '不公开'
		}, {
			value: 1,
			text: '公开'
		}],
		gProfessionalType: [{
			value: 1,
			text: '教授/国家一级演员'
		}, {
			value: 2,
			text: '副教授/国家二级演员'
		}, {
			value: 3,
			text: '讲师/演奏家'
		}]

		/*获取网络状态值
		 * CONNECTION_UNKNOW: 网络连接状态未知  固定值0
		 * CONNECTION_NONE: 未连接网络  固定值1
		 * CONNECTION_ETHERNET: 有线网络  固定值2
		 * CONNECTION_WIFI: 无线WIFI网络  固定值3
		 * CONNECTION_CELL2G: 蜂窝移动2G网络  固定值4
		 * CONNECTION_CELL3G: 蜂窝移动3G网络  固定值5
		 * CONNECTION_CELL4G: 蜂窝移动4G网络  固定值6
		 * @description 获取网络状态的函数
		 */
		//gNetworkState: plus.networkinfo.getCurrentType(),


	}
	//js获取URL参数
$.extend({
	getUrlVars: function() {
		var vars = [],
			hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for (var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	},
	getUrlVar: function(name) {
		return $.getUrlVars()[name];
	}
});

$('.uk-search-field').bind('keydown', function(event) {
    if (event.keyCode == "13") {
    	$('#searchBtn').click();
    }
});