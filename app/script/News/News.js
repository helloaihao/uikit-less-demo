
var Newslist = function () {
    var self = this;
    var urls = common.gServerUrl + "/API/Common/News/1012";
    self.news = ko.observable({});
    self.getNews = function () {
        $.ajax({
            url: urls,
            type: 'GET',
            success: function (responseText) {
                var obj = JSON.parse(responseText);
                self.news(obj);
            }
        });
    };

    $(document).ready(function () {
        self.getNews();
    })
}

ko.applyBindings(Newslist);