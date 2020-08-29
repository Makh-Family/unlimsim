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

function controlDropdownOverlay(action) {
  if (action == "open") {
    $(".js-dropdown-overlay").slideDown();
  } else {
    $(".js-dropdown-overlay").slideUp();
  }
}
