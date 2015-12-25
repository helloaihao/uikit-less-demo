function heredoc(exedoc) {
	var src = exedoc.toString();
	var result = src.substring(src.indexOf("/*") + 3, src.lastIndexOf("*/"));
	return result;
}
/*
 * <div class="uk-width-medium-1-2 uk-hidden-small uk-margin-top">
                        <div class="uk-grid">
                            <div class="uk-width-1-1">
                                <button class="uk-button lk-btn-reg">注册</button>
                                <button class="uk-button lk-btn-login">登录</button>
                            </div>
                            <div class="uk-width-1-1 uk-margin-top uk-clearfix">
                                <div class="lk-tel web-tel">
                                    <i class="uk-icon-phone"></i><span></span>
                                </div>
                            </div>
                        </div>
                    </div>
 */
var headerInfo = heredoc(function() {
	/*
		<div class="lk-logobar uk-hidden-small">
	            <div class="uk-container uk-container-center">
	                <div class="uk-grid">
	                    <div class="uk-width-1-1">
	                        <a id="lk-logo" href="/index.html"></a>
	                    </div>
	                    
	                </div>
	            </div>
	        </div>

	        <!-- 导航条 -->
	        <nav class="uk-navbar lk-nav" data-uk-sticky>
	            <div class="uk-container uk-container-center">
	                <ul id="lk-nav-large" class="uk-navbar-nav uk-hidden-small">
	                    <li><a href="/index.html">首页</a></li>
	                    <li><a href="/modules/news/newsList.html">乐评资讯</a></li>
	                    <li><a href="/modules/teacher/teacherList.html">名师库</a></li>
	                    <li><a href="/modules/works/workList.html">作品库</a></li>
	                    
	                    <li><a href="/modules/home/aboutUs.html">关于我们</a></li>
	                </ul>
	                <a href="#offcanvas" class="uk-navbar-toggle uk-visible-small" data-uk-offcanvas></a>
	                <div class="uk-navbar-brand uk-navbar-center uk-visible-small">乐评家</div>
	                <div class="uk-navbar-flip lk-search uk-visible-large">
	                    <div class="uk-navbar-content">
	                        <div id="search" class="uk-search"  data-uk-search>
	                            <input id="searchText" class="uk-search-field" type="search" placeholder="搜索">
	                            <input id="searchBtn" type="submit" onClick="goto()" style="display: none;"/>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </nav>

	        <!-- 侧边栏 -->
	        <div id="offcanvas" class="uk-offcanvas">
	            <div class="uk-offcanvas-bar">
	                <ul id="lk-nav-small" class="uk-nav uk-nav-offcanvas">
	                    <li><a href="/index.html">首页</a></li>
	                    <li><a href="/modules/news/newsList.html">乐评资讯</a> </li>
	                    <li><a href="/modules/teacher/teacherList.html">名师库</a></li>
	                    <li><a href="/modules/works/workList.html">作品库</a></li>
	                    <li><a href="/modules/home/aboutUs.html">关于我们</a></li>
	                   
	                </ul>
	            </div>
	        </div>
	 */
});

var footerInfo = heredoc(function() {
	/*
	 	<div class="lk-footer uk-grid uk-margin-large-top">
	        <div class="uk-container uk-container-center uk-text-center">
	            <div class="uk-panel uk-hidden-small">
	                <p>©2015 广州凌扣网络科技有限公司</p>
	                <p>广州市天河区华夏路49号津滨腾越大厦南塔2710室</p>
	                <p>粤ICP备15101032号</p>
	            </div>
	        </div>
	    </div>
	 */
});

var geturl = function(name) {
	console.log(name);
	var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
	console.log(result);
	if (result == null || result.length < 1) {
		return "";
	}

	return result[1];
}

var headerInit = function(num) {
	var headerobj = document.getElementsByTagName('header');
	if (geturl('device') === 'app') {
		headerobj[0].innerHTML = "";
	} else {
		headerobj[0].innerHTML = headerInfo;
		var navLarge = document.getElementById('lk-nav-large').getElementsByTagName('li');
		var navSmall = document.getElementById('lk-nav-small').getElementsByTagName('li');
		navLarge[num].className = 'uk-active';
		navSmall[num].className = 'uk-active';
	}
}

var footerInit = function() {
	var footerobj = document.getElementsByTagName('footer');
	footerobj[0].innerHTML = footerInfo;
}

function goto() {
	location.href = '/modules/search/search.html?keyword=' + document.getElementById('searchText').value;
}