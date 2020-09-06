// gloabl variables
const dashboardSlider = {
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: false,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 770,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 500,
      settings: {
        arrows: false,
        slidesToShow: 1,
      },
    },
  ],
};

const dashboardBoxSlider = {
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: false,
};

const stickyPlansList = new Sticky(".list-plans");

console.log(stickyPlansList);

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
  const target = $(this).prev();
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

$(".js-add-to-pay-btn").on("click", function () {
  const target = $(this).data("js-target");
  const incItemTarget = $(this).data("target");

  const relatedRenewBtn = $(this).parent().parent().parent().prev();

  relatedRenewBtn.prop("disabled", true);

  $(target).addClass("renewed");
});

$(".js-change-btn").bind("click", function () {
  $("#predashboard-virtual-number").collapse("hide");
});

$(".js-renewal-btn").bind("click", function () {
  $('.js-renew-btn[data-target=".predashboard-virtual-number"]').prop(
    "disabled",
    true
  );
});

$(".js-renew-btn").on("click", function () {
  const stickyEl = $(".list-plans[data-sticky-wrap]");

  const target = $(".service-list-wrapper");
  if (target.hasClass("d-none")) {
    target.removeClass("d-none");
    $(".empty-services-wrapper").addClass("d-none");
  }
  setTimeout(() => {
    stickyPlansList.update();
  }, 500);
});

function controlDropdownOverlay(action) {
  if (action == "open") {
    $(".js-dropdown-overlay").slideDown();
  } else {
    $(".js-dropdown-overlay").slideUp();
  }
}

$(".js-owner-line").on("click", function () {
  const slideNumber = $(this).data("item");
  sliderDashboardBox.slick("slickGoTo", slideNumber - 1);
});

$(".js-recharge-all-btn").on("click", function () {
  $(".visible-content").removeClass("inactive");
});

$(".js-recharge-btn").on("click", function () {
  const planNumber = $(this).data("item");
  const target = `.visible-content[data-item="${planNumber}"]`;

  $(target).removeClass("inactive");
});

$(".top-up-balance-input").on("keyup", function () {
  const amount = $(this).val();
  if (amount == "") {
    $(".js-total-amount strong").text(0);
  } else {
    $(".js-total-amount strong").text(amount);
  }
});

$(".recharge-inputs").on("change", function () {
  const selectedInput = $(this).find(".custom-control-input:checked");

  $(".input-box").removeClass("selected-method");

  if ($("#top-up-balance").is(":checked")) {
    $(".js-pay-btn").attr("data-toggle", "collapse");
  } else {
    $(".js-pay-btn").removeAttr("data-toggle");
  }

  selectedInput.parent().parent().addClass("selected-method");
});

$(".js-pay-btn").on("click", function () {
  const target = $(this).data("target");
  if (!$(this).attr("data-toggle")) {
    $(target).collapse("toggle");
    $(".payment-toggle-collapse").collapse("toggle");
    $(".shopping-card__card-list").addClass("payed");
  }
});

$(".js-payment-btn").on("click", function () {
  $(".shopping-card__card-list").addClass("payed");
});

function removeItemFromOwnerList(el) {
  const itemNumber = el.data("item");

  $(`.js-owner-line[data-item="${itemNumber}"]`).remove();
  $(`.visible-content[data-item="${itemNumber}"]`).remove();
  $(`.js-basket-item[data-item="${itemNumber}"]`).remove();
  sliderDashboardBox.slick("slickRemove", itemNumber - 1);

  setTimeout(() => {
    stickyPlansList.update();
  }, 300);
}

const sliderDashboard = $(".js-dashboard-slider").slick(dashboardSlider);

const sliderDashboardBox = $(".js-dashboard-box-slider").slick(
  dashboardBoxSlider
);
