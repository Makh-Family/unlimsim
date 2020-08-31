// gloabl variables
const dashboardSlider = {
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: false,
};

$(".js-custom-dropdown-toggler").on("click", function () {
  if (!$(this).next().hasClass("show")) {
    controlDropdownOverlay("open");
  } else {
    controlDropdownOverlay("close");
  }
});

$(".js-custom-dropdown a").bind("click", function (e) {
  controlDropdownOverlay("close");
});

$("body").bind("click", function (evt) {
  if (
    !evt.target.matches(".dropdown-item") &&
    !evt.target.matches(".js-custom-dropdown-toggler")
  ) {
    controlDropdownOverlay("close");
  }
});

//edit name

$(".js-change-username").on("click", function () {
  const target = $(".change-name-form");
  $(target).toggle();
  $(target).prev().toggle();
});

//widen plans block
$(".js-widen-btn").on("click", function () {
  const target = $(this).data("target");
  const sliderWrapper = $(target).find(".js-dashboard-slider");

  if (sliderWrapper.hasClass("slick-initialized")) {
    $(target).addClass("widened");
    sliderWrapper.slick("unslick");
  } else {
    sliderWrapper.slick(dashboardSlider);
    $(target).removeClass("widened");
  }
});

function controlDropdownOverlay(action) {
  if (action == "open") {
    $(".js-dropdown-overlay").slideDown();
  } else {
    $(".js-dropdown-overlay").slideUp();
  }
}

const sliderDashboard = $(".js-dashboard-slider").slick(dashboardSlider);
