var TeacherList = function () {
    var self = this;
    
    var geturl = common.gServerUrl + "API/Teacher/GetIndexTeachers?count=8";
    self.list = ko.observableArray([]);
    self.getTeacher = function () {
        $.ajax({
            url: geturl,
            type: "get",
            success: function (data) {
                var arr = JSON.parse(data);
                self.list(arr);
                var lkSlideset = document.getElementById('lk-slideset');
                var slideset = UIkit.slideset(lkSlideset, { small: 1, medium: 2, large: 4, animation: 'none'});
            }
        });
    }();

    var carouselurl = common.gServerUrl + "Common/Slider/GetList";
    self.carouselCount = ko.observableArray([]);
    self.slideshowItem = ko.observableArray([]);
    self.getCarousel = function () {
        $.ajax({
            url: carouselurl,
            type: "get",
            success: function (data) {
                var dts = JSON.parse(data);
                var tmp = [];
                for(var i = 0; i < dts.length; i ++) {
                	tmp[i] = i;
                }
                self.slideshowItem(tmp);
                self.carouselCount(dts);
                var lkSlideshow = document.getElementById('lk-slideshow');
                var slideshow = UIkit.slideshow(lkSlideshow, {autoplay:true});
            }
        });
    }();
    
}
ko.applyBindings(TeacherList);