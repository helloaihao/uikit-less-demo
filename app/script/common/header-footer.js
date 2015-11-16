function heredoc(exedoc) {
	var src = exedoc.toString();
	var result = src.substring(src.indexOf("/*")+3, src.lastIndexOf("*/"));
	return result;
}

var headerInfo = heredoc(function(){/*
	<div class="lk-logobar">
            <div class="uk-container uk-container-center">
                <div class="uk-grid">
                    <div class="uk-width-medium-1-2 uk-width-small-1-1">
                        <a href="#"><img src="images/logo.png" height="88" width="259"></a>
                    </div>
                    <div class="uk-width-medium-1-2 uk-hidden-small uk-margin-top">
                        <div class="uk-grid">
                            <div class="uk-width-1-1">
                                <button class="uk-button lk-btn-reg">注册</button>
                                <button class="uk-button lk-btn-login">登录</button>
                            </div>
                            <div class="uk-width-1-1 uk-margin-top uk-clearfix">
                                <div class="lk-tel web-tel">
                                    <i class="uk-icon-phone"></i><img src="images/tel.png" height="24" width="137">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 导航条 -->
        <nav class="uk-navbar lk-nav" data-uk-sticky>
            <div class="uk-container uk-container-center">
                <ul class="uk-navbar-nav uk-hidden-small">
                    <li class="uk-active"><a href="">首页</a></li>
                    <li><a href="">新闻中心</a></li>
                    <li><a href="">名师库</a></li>
                    <li><a href="">作品库</a></li>
                    <li><a href="">我的空间</a></li>
                    <li><a href="">关于我们</a></li>
                </ul>
                <a href="#offcanvas" class="uk-navbar-toggle uk-visible-small" data-uk-offcanvas></a>
                <div class="uk-navbar-brand uk-navbar-center uk-visible-small">纽带教育</div>
                <div class="uk-navbar-flip lk-search uk-visible-large">
                    <div class="uk-navbar-content">
                        <form class="uk-search" data-uk-search>
                            <input class="uk-search-field" type="search" placeholder="搜索">
                        </form>
                    </div>
                </div>
            </div>
        </nav>

        <!-- 侧边栏 -->
        <div id="offcanvas" class="uk-offcanvas">
            <div class="uk-offcanvas-bar">
                <ul class="uk-nav uk-nav-offcanvas">
                    <li class="uk-active"><a href="#">首页</a></li>
                    <li><a href="#">新闻中心</a> </li>
                    <li><a href="#">名师库</a></li>
                    <li><a href="#">作品库</a></li>
                    <li><a href="#">我的空间</a></li>
                    <li><a href="#">关于我们</a></li>
                    <li><a href="#">登录</a></li>
                    <li><a href="#">注册</a></li>
                </ul>
            </div>
        </div>
 */});
 
 var footerInfo = heredoc(function(){/*
 	<div class="lk-footer uk-grid uk-margin-large-top">
        <div class="uk-container uk-container-center uk-text-center">
            <div class="uk-panel">
                <p>版权所有：广州凌扣网络科技有限公司</p>
                <p><small>地址：广州市天河区华夏路49号津滨腾越大厦南塔2710室</small></p>
                <p>备案/许可证编号：粤ICP备15101032号</p>
            </div>
        </div>
    </div>
 */});

var headerInit = function() {
	var headerobj = document.getElementsByTagName('header');
	headerobj[0].innerHTML = headerInfo;
}

var footerInit = function() {
	var footerobj = document.getElementsByTagName('footer');
	footerobj[0].innerHTML = footerInfo;
}
