var TeacherList = function () {
    var self = this;
    var geturl = common.gServerUrl + "API/Teacher/GetIndexTeachers?count=8";
    self.list = ko.observableArray([]);
    self.getTeacher = function () {
        $.ajax({
            url: geturl,
            type: "GET",
            success: function (data) {
                var arr = JSON.parse(data);
                self.list(arr);
                var lkSlideset = document.getElementById('lk-slideset');
                var slideset = UIkit.slideset(lkSlideset, { small: 1, medium: 2, large: 4 });
            }
        });
    }();

    var carouselurl = common.gServerUrl + "Common/Slider/GetList";
    self.CarouselCount = ko.observableArray([]);
    self.getCarousel = function () {
        $.ajax({
            url: carouselurl,
            type: "get",
            success: function (data) {
                var dts = JSON.parse(data);
                self.CarouselCount(dts);
                var lkSlideshow = document.getElementById('lk-slideshow');
                var slideshow = UIkit.slideshow(lkSlideshow, {autoplay:true});
            }
        });
    }();
    
}
ko.applyBindings(TeacherList);