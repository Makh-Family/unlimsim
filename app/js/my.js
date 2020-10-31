let basket = [];

const customer = {}; //details about customer

let cardData;

let newCardData;

const elCheckoutBtn = $(".btn-checkout");

$(document).ready(function () {
  $("body").removeClass("preload");

  elCheckoutBtn.on("click", function () {
    $("body, html").animate({
      scrollTop: 0,
    });
  });

  if (localStorage.getItem("basket")) {
    basket = [...JSON.parse(localStorage.getItem("basket"))];
    console.log(basket.length);
    $(".badge-pill").text(basket.length);
  }

  if (!basket.length) {
    $(".btn-basket")
      .css({
        "pointer-events": "none",
      })
      .children(".badge-pill")
      .hide();
  }

  $(".btn-basket").on("click", function (e) {
    e.preventDefault();

    if (basket.length === 1) {
      window.location.href = "shopping-card.html";
    } else {
      window.location.href = "basket.html";
    }
  });

  const elRegionsList = $("#regions-list");
  const elPrefixList = $("#prefix-select");
  const elCountriesList = $("#countries-select");
  const elNumbersList = $("#numbers-list");
  const elVirtualInnerBox = $(".virtual-inner");

  elCountriesList.on("click", ".dropdown-item", function (e) {
    const selectedCountry = $(this).text();
    $.getJSON("../data/regions.json", function (regionsList) {
      const regions = regionsList.filter(function (country) {
        return country.countryName.toUpperCase() == selectedCountry;
      })[0].regions;
      let chunk = "";
      regions.forEach(function (reg) {
        const template = `
          <option value="${reg.name}">${reg.name}</option>`;
        chunk += template;
      });
      const elSelect = elRegionsList.find("select");
      elSelect.html(chunk);
      elSelect.removeAttr("disabled");
      elSelect.selectpicker("refresh");
    });
  });

  elRegionsList.on("click", ".dropdown-item", function (e) {
    const elSelect = elPrefixList.find("select");
    elSelect.removeAttr("disabled");
    elSelect.selectpicker("refresh");
  });

  elPrefixList.on("click", ".dropdown-item", function (e) {
    const elSelect = elNumbersList.find("select");
    elSelect.removeAttr("disabled");
    elSelect.selectpicker("refresh");
  });

  elNumbersList.on("click", ".dropdown-item", function (e) {
    const elActiveOption = elNumbersList.find(".filter-option");
    const formattedNumber = formatPhoneNumber(elActiveOption.text());
    elActiveOption.text(formattedNumber);
    $(".btn-join-to-card").removeAttr("disabled");
    $(".btn-substitution-join").attr("disabled", true);
  });

  if ($("body").hasClass("basket-body")) {
    fillBasket();

    for (let i = 0; i < basket.length; i++) {
      if (basket[i].includedItems) {
        for (let j = 0; j < basket[i].includedItems.length; j++) {
          addService(basket[i].includedItems[j], i + 1, true);
          setTotalPrice(i + 1);
        }
      }
    }

    $(".js-card-wrapper").on("click", ".js-add-service", function (e) {
      const index = parseInt($(this).attr("data-item"), 10);

      const data = basket[index - 1];

      $(".js-btn-checkout").attr("data-item", index);

      $(".js-basic-basket").hide();
      $(".js-basket-shopping-card").show();
      $(".js-basket-list").show();
      $('.js-step[data-step="1"]').show();
      $(".js-subtotal-wrapper").show();
      $(`.basket-line[data-item="${index}"]`).hide().siblings().show();
      $(".js-shopping-card__card").attr("data-item", index);

      if (customer.dhl == "on") {
        $(".js-dhl-img").show();
      } else {
        $(".js-dhl-img").hide();
      }

      $(".shopping-card__form").attr("data-item", index);

      customer.Iprice = parseInt(data.priceData.price, 10);
      customer.totalPrice = customer.Iprice;

      switch (data.plan) {
        case "Worldwide":
          setWorldWidePlan(data);
          break;
        case "Region":
          setRegionPlan(data);
          break;
        case "Country":
          setCountryPlan(data);
          break;
      }

      setInlcludedItems(index);

      if (basket.length == 1) {
        $(".js-basket-list").hide();
      }
    });

    $(".js-basket-line").on("click", ".included-item", function (e) {
      const index = parseInt($(this).attr("data-basket-item"), 10);
      updateCard(basket[index - 1]);

      openOneCard(index, this);

      $(`.basket-line[data-item=${index}]`).hide().siblings().show();
    });

    $(".js-package-included-items").on("click", ".included-item", function (e) {
      const index = parseInt($(this).attr("data-basket-item"), 10);
      updateCard(basket[index - 1]);

      openOneCard(index, this);

      $(`.js-step[data-step="2"]`).hide();
      $(`.js-step[data-step="1"]`).css({
        display: "flex",
      });
    });

    $(".js-basket-checkout").on("click", function () {
      $(".js-basic-basket").hide();
      $(".js-basket-shopping-card").show();
      $(".js-basket-list").hide();
      $('.js-step[data-step="2"]').show().removeClass("display-none");
      $('.js-step[data-step="1"]').hide().addClass("display-none");
      $(".js-subtotal-wrapper").hide();
    });

    elCheckoutBtn.on("click", function () {
      if ($(this).attr("data-approve") == "yes") {
        $(this).hide();
        $(".js-total-price-amount").text(customer.totalPrice);
        const index = parseInt($(".js-shopping-card__card").attr("data-item"));

        updateTotalPrice();

        const elParentTarget = $(`.basket-line[data-item="${index}"]`);

        const elPackageItem = $(`.basket-item[data-item="${index}"]`);

        const label =
          basket[index - 1].location == "worldwide"
            ? basket[index - 1].tariff
            : basket[index - 1].location == "region"
            ? basket[index - 1].region
            : basket[index - 1].location == "country"
            ? basket[index - 1].country
            : "PRO";

        console.log(basket[index - 1]);

        console.log(label);

        elParentTarget.find(".location-name").text(label.toUpperCase());

        elPackageItem.find(".location-name").text(label.toUpperCase());

        elParentTarget.find(".sim-type").text(basket[index - 1].simType);

        elPackageItem.find(".sim-type").text(basket[index - 1].simType);

        elParentTarget
          .find(".card-gb-amount")
          .text(basket[index - 1].amount + "Gb");

        elParentTarget
          .find(".card-days-amount")
          .text(basket[index - 1].priceData.days + "days");

        elParentTarget
          .find(".plan-name")
          .text(basket[index - 1].location + " Plan");

        elPackageItem
          .find(".plan-name")
          .text(basket[index - 1].location + " Plan");

        setTotalPrice(index);
      }
    });

    $(".js-btn-confirm-and-pay").on("click", function () {
      $(this).hide();
      $(".js-all-wrapper").addClass("payed");
      const html = `
        <span class="plan-paid-text">plan payed <span><img src="img/icons/confirmed.svg" alt=""></span></span>
      `;
      $(".price-box").html(html);
    });
  }

  ////////////////////
  // MODAL
  ////////////////////

  $(".btn-show-sim-info").click(function (e) {
    const target = e.target.dataset.target;
    const inputTarget = e.target.dataset.sim;
    $(this).toggleClass("active");

    $(`.btn-show-sim-info:not([data-target="${target}"])`).removeClass(
      "active"
    );

    $(target).siblings().hide();
    $(target).toggle();

    if ($(this).hasClass("active")) {
      $(inputTarget).prop("checked", true);
    }

    if ($("#sims-sim").is(":checked")) {
      $("#dhl-checkbox").prop("checked", true);
    } else {
      $("#dhl-checkbox").prop("checked", false);
    }
  });

  $(".btn-add-to-card").on("click", function () {
    $(".notification-block").slideDown().addClass("animate-it");

    setTimeout(() => {
      $(".notification-block").slideUp().removeClass("animate-it");
    }, 8000);

    localStorage.removeItem("card");
    localStorage.setItem("card", JSON.stringify(cardData));
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      "slow"
    );
    const simType = $("#add-to-card-form").serialize();
    cardData.simType = simType.split("=")[1];
    const dhlOn = $("#dhl-form").serialize();
    cardData.isDhl = dhlOn == "" ? false : true;

    if (!basket.includes(cardData)) {
      basket.push(cardData);
      localStorage.removeItem("basket");
      localStorage.setItem("basket", JSON.stringify(basket));
      console.log(basket);
    }

    $(".btn-basket")
      .css({
        "pointer-events": "unset",
      })
      .children(".badge-pill")
      .show();

    $(".badge-pill").text(basket.length);
  });

  $("#add-to-card-form").on("change", function (e) {
    const simType = $(this).serialize().split("=")[1];
    if (simType == "Sim") {
      $("#dhl-checkbox").prop("checked", true);
    } else {
      $("#dhl-checkbox").prop("checked", false);
    }
  });

  $(".tab_content").on("click", ".btn-buy", function (e) {
    cardData = getCardDetails(e.target);
  });

  const elPhoneNumberInput = document.getElementById("subNumber");
  const elPhoneNumberInputStepTwo = document.querySelector("#telnumber");

  try {
    IMask(elPhoneNumberInput, {
      mask: "+{0} (000) 000-00-00",
      lazy: false, // make placeholder always visible
      placeholderChar: "_", // defaults to '_'
    });
    IMask(elPhoneNumberInputStepTwo, {
      mask: "(000) 000-00-00",
      lazy: false, // make placeholder always visible
      placeholderChar: "_", // defaults to '_'
    });
    IMask(document.querySelector("#signIn-phone-input"), {
      mask: "+{7} (000) 000-00-00",
      lazy: false, // make placeholder always visible
      placeholderChar: "_", // defaults to '_'
    });
    IMask(document.querySelector("#cardnumber"), {
      mask: "0000-0000-0000-0000",
      lazy: false, // make placeholder always visible
      placeholderChar: "_", // defaults to '_'
    });
    IMask(document.querySelector("#carddate"), {
      mask: "MM{/}YY",
      pattern: "MM{/}YY",
      lazy: false, // make placeholder always visible
      placeholderChar: "_",
      blocks: {
        MM: {
          mask: IMask.MaskedRange,
          from: 01,
          to: 12,
        },
        YY: {
          mask: IMask.MaskedRange,
          from: 20,
          to: 30,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }

  if ($("body").hasClass("shopping-card-body")) {
    if (localStorage.getItem("card")) {
      newCardData = JSON.parse(localStorage.getItem("card"));
      customer.totalPrice = 0;
      customer.totalPrice += parseInt(newCardData.priceData.price, 10);
    }
    if (!$("body").hasClass("basket-body")) {
      customer.Iprice = customer.totalPrice;
      $(".js-total-price-amount").text(customer.Iprice);
    }

    $(".js-internet-price-amount-single").text(customer.Iprice);

    $(
      "#plan-select select, #tariff-select select, #region-select select, #country-select select, #enter-gb select, #enter-period select"
    ).selectpicker("render");

    switch (newCardData.plan) {
      case "Worldwide":
        setWorldWidePlan(newCardData);
        break;
      case "Region":
        setRegionPlan(newCardData);
        break;
      case "Country":
        setCountryPlan(newCardData);
        break;
    }

    $(".tab-inner").each(function () {
      $(this).on("click", ".btn-buy", function (e) {
        $(".notification-block").slideUp();
      });
    });

    // $('#plan-select').on('click', function (e) {

    //   if ($(this).find('select').val().toUpperCase() == "WORLDWIDE" || $(this).find('select').val().toUpperCase() == "COUNTRY") {
    //     $(`#region-list .nav-link[data-value="*"]`).trigger('click');
    //   }

    //   if ($(this).find('select').val().toUpperCase() != "WORLDWIDE") {
    //     $('#tariff-select').hide();

    $("#plan-select").on("click", function (e) {
      if (
        $(this).find("select").val().toUpperCase() == "WORLDWIDE" ||
        $(this).find("select").val().toUpperCase() == "COUNTRY"
      ) {
        $(`#region-list .nav-link[data-value="*"]`).trigger("click");
      }

      if ($(this).find("select").val().toUpperCase() != "WORLDWIDE") {
        $("#tariff-select").hide();
      } else {
        $("#tariff-select").show();
      }
    });

    $("#region-select").on("click", function (e) {
      let continent = $(this).find("select").val().toUpperCase();

      continent =
        continent == "OCEANIA"
          ? "OCEANIA"
          : continent == "NORTH AMERICA" || continent == "SOUTH AMERICA"
          ? continent.split(" ")[0][0] + ". " + continent.split(" ")[1]
          : continent;
      customer.tariff = continent;
      $(`#region-list .nav-link[data-value="${continent}"]`).trigger("click");
      $(".js-tariff-name").text(continent);
    });

    $("#country-select").on("click", function (e) {
      let country = $(this).find("select").val().toUpperCase();
      $(".js-tariff-name").text(country);
    });

    $(".btn-service-toggler")
      .mouseenter(function () {
        $(this).siblings("img").css({
          transform: "scale(1.2)",
        });
      })
      .mouseleave(function () {
        $(this).siblings("img").css({
          transform: "scale(1)",
        });
      })
      .click(function (e) {
        const status = $(this).children("span").first().text();
        const target = $(this).data("target");
        const dataNames = $(this).data("names").split(",");
        const index = parseInt(
          $(".js-shopping-card__card").attr("data-item"),
          10
        );

        toggleCheckbox($(this).children("input"));

        if (status == "+") {
          addService(target, index);

          $(this).css("color", "#ff0000");
          $(this).children("span").first().text("-");
          if (target == "#virtual-number" || target == "#substitution-number") {
            if (target == "#virtual-number") {
              customer.Vprice = 500;
            }

            if (target == "#substitution-number") {
              customer.Sprice = 25;
            }

            elCheckoutBtn.attr("disabled", true);
          }
        } else {
          dataNames.forEach(function (d) {
            customer[d] = "";
          });

          if (target == "#virtual-number" && customer.Vprice == 500) {
            customer.Vprice = 0;
          }

          if (target == "#substitution-number" && customer.Sprice == 25) {
            customer.Sprice = 0;
          }

          if (target == "#voice-sms") {
            $('select[name="VSbalance"]').prop("selectedIndex", -1);
            $("#enter-balance").selectpicker("refresh");
          }

          removeService(target, index);
          $(this).css("color", "#000");
          $(this).children("span").first().text("+");

          //hide joined info
          $(".join-info").hide();
          $(".virtual-inner").show();
          //end of joined info

          if (target == "#virtual-number" || target == "#substitution-number") {
            const newsTarget =
              target == "#virtual-number"
                ? "#substitution-number"
                : "#virtual-number";
            if (
              $(target).siblings(newsTarget).attr("style") == "display: none;"
            ) {
              elCheckoutBtn.removeAttr("disabled");
              elCheckoutBtn.show();
            }
          }
        }

        $(".js-total-price-amount").text(customer.totalPrice);

        const includedItems = [];
        const includedItemsBtns = $(`.btn-service-toggler:contains('-')`);

        includedItemsBtns.each(function (btn) {
          includedItems.push($(this).attr("data-target"));
        });

        if ($("body").hasClass("basket-body")) {
          basket[index - 1].includedItems = includedItems;

          console.log(basket);

          localStorage.removeItem("basket");
          localStorage.setItem("basket", JSON.stringify(basket));
        }

        updateCardInfo(customer);
      });

    $(".js-included-country-text").on("click", function () {
      const isClickable = $(this).next().hasClass("js-items-toggler");
    });

    $("#country-select").on("click", function (e) {
      let country = $(this).find("select").val().toUpperCase();
      $(".js-tariff-name").text(country);
    });

    $(".js-included-country-text").on("click", function () {
      const isClickable = $(this).next().hasClass("js-items-toggler");

      if (isClickable) {
        $(this).next().toggleClass("sorted");
        $(this).toggleClass("has-dashed-border");
      } else {
        $(".js-included-country-text").css({
          cursor: "unset",
        });
      }
    });

    $(".js-sorted-items .included-item").on("click", function () {
      const isSorted = !$(this).parent().parent().hasClass("sorted");
      const target = $(this).attr("id").replace("-block", "");

      console.log(target);

      $(".js-included-country-text").css({
        cursor: "unset",
      });

      if (isSorted) {
        $(`.step-button[data-step='1']`).trigger("click");

        $(`.btn-service-toggler[data-target="#${target}"]`).trigger("click");
      }
    });

    $("#subNumber").on("keyup", function (e) {
      if (
        e.target.value.length == 18 &&
        e.target.value[e.target.value.length - 1] != "_"
      ) {
        $(".btn-substitution-join").removeAttr("disabled");
      } else {
        $(".btn-substitution-join").attr("disabled", true);
      }
    });

    $("#cardnumber").on("keyup", function () {
      if ($(this).val().length == 19 && !$(this).val().includes("_")) {
        $("#carddate").focus();
      }
    });

    $("#carddate").on("keyup", function () {
      if ($(this).val().length == 5 && !$(this).val().includes("_")) {
        $("#cardcode").focus();
      }
    });

    $("#sub-period").on("click", ".dropdown-item", function (e) {
      $("#subNumber").removeAttr("disabled");
    });

    $("#virtual-period").on("click", ".dropdown-item", function (e) {
      const elSelect = elCountriesList.find("select");
      elSelect.removeAttr("disabled");
      elSelect.selectpicker("refresh");
    });

    $(".btn-join-to-card").on("click", function () {
      const formData = decodeURIComponent(
        $(".shopping-card__form").serialize()
      ).split("&");
      formData.forEach(function (data) {
        const dataArray = data.split("=");
        customer[dataArray[0]] = dataArray[1];
      });

      const elJoinInfo = $(".join-info");

      elVirtualInnerBox.hide();

      elJoinInfo.find(".country-name").text(customer.Vcountry);
      elJoinInfo.find(".region-name").text(customer.Vregion);
      $(".virtual-number").text(formatPhoneNumber(customer.Vnumber));
      elJoinInfo.show();
      if ($(this).hasClass("btn-substitution-join")) {
        $(".virtual-number-info").hide();
        $(".substitution-join").show();
        $(".substitution-number").text(customer.subNumber);
        $(".substitution-wrapper").hide();
        $(".input-placeholder").show();
      }
      $(".btn-checkout").removeAttr("disabled");
    });

    $('select[name="period"]').on("change", function () {
      const data = $(this).val();
      const vsPeriodToBeClicked = getClickableParent(
        "#VS-period",
        data + ` ${data == "1" ? "day" : "days"}`
      );
      vsPeriodToBeClicked.trigger("click");
    });

    $("#dhl-checkbox").on("change", function () {
      if ($(this).is(":checked")) {
        $(".js-dhl-img").show();
      } else {
        $(".js-dhl-img").hide();
      }
    });

    //steps controller
    $(".step-button").on("click", function () {
      const step = parseInt($(this).data("step"), 10);

      showStep(step);
      if (step == 1) {
        $(".js-opening-title").show();
        $(".steps-controller").hide();
        $(".js-edit-btn").hide();
        $(".js-basic-basket").show();
      } else {
        $(".js-opening-title").hide();
        $(".steps-controller").show();
      }

      if (step != 4) {
        $(`.js-step[data-step="${step}"]`)
          .siblings(".js-step")
          .addClass(`display-none`)
          .find(".confirmation-box")
          .hide();
      }

      if ($(this).hasClass("active")) {
        $(this)
          .siblings(`.step-button`)
          .each(function (btn) {
            if ($(this).data("step") >= step) {
              $(this).removeClass("active");
            }
          });
      } else {
        $(this).addClass("active");

        $(this)
          .siblings(`.step-button`)
          .each(function (btn) {
            if ($(this).data("step") <= step) {
              $(this).addClass("active");
              $(this).removeAttr("disabled");
            }
          });
      }
    });

    //end of step controller

    $("#regFormSubmit").on("click", function (e) {
      e.preventDefault();
      if ($(this).attr("data-confirm") == "yes") {
        $(".verification-wrapper").show();
        $(this).attr("type", "submit");
        $(this).text("Continue");
        $(this).attr("data-confirm", "no");
        $(".confirm-wrapper p").hide();
      } else {
        const targetStep = $(this).data("step");

        let elTarget = $(
          `.js-step[data-step="${targetStep}"] .js-step-content-wrapper`
        );

        if (targetStep == "2") {
          elTarget = $(
            `.js-step[data-step-inside="true"] .js-step-content-wrapper`
          );
        }

        elTarget.removeClass("editing");
        elTarget.find(".js-return-btn").hide();

        moveToStep(3, true);
        $($('.js-step[data-step="2"]')[1]).addClass("completed-step");
      }
    });

    //edit button

    $(".btn-edit").on("click", function (e) {
      if ($(this).attr("data-pay") !== "true") {
        $(`.step-button[data-step='1']`).trigger("click");
        $(".js-included-country-text").css({
          cursor: "unset",
        });
      } else {
        $(".js-all-wrapper").addClass("payed");
        $(".js-edit-btn").hide();
      }
    });

    //step-2

    //end of step2
  }
  //end of if statement
  $("#region-select").on("click", function (e) {
    let continent = $(this).find("select").val().toUpperCase();

    continent =
      continent == "OCEANIA"
        ? "OCEANIA"
        : continent == "NORTH AMERICA" || continent == "SOUTH AMERICA"
        ? continent.split(" ")[0][0] + ". " + continent.split(" ")[1]
        : continent;
    customer.tariff = continent;
    $(`#region-list .nav-link[data-value="${continent}"]`).trigger("click");
    $(".js-tariff-name").text(continent);
  });

  $(".btn-show-countries").on("click", function () {
    $(".tab_content-map").slideToggle();
    $(this).toggleClass("active");

    if ($(this).hasClass("active")) {
      const target = $(".tab_content-map").offset().top;
      $("html, body").animate(
        {
          scrollTop: target - 100,
        },
        "slow"
      );
    }
  });

  $("#switch-method").on("change", function (e) {
    const elShippingPrice = $(".js-shipping-price");
    const innerHtml = elShippingPrice.html();

    elShippingPrice.html(
      '<img width="30" height="30" src="img/icons/loader.svg" alt="laoder">'
    );

    setTimeout(function () {
      elShippingPrice.html(innerHtml);
    }, 2000);
  });
  $("#billingAddressToggler").on("click", function () {
    if ($(this).not(":checked") && $("#billingAddress").not(":checked")) {
      $(".js-billing-address-input-wrapper").hide();
      $("#billingAddress").prop("checked", true);
      $(".js-radio-wrapper").show();
    }
  });

  //reg-sign-togller

  $(".discount-form").on("submit", function (e) {
    e.preventDefault();
    $(this).hide();
    if ($("body").hasClass("basket-body")) {
      customer.totalPrice = setTotalPrice();
      console.log(customer.totalPrice);
    }
    applyDiscount(customer.totalPrice, 20);
  });

  $(".giftcard-form").on("submit", function (e) {
    e.preventDefault();
    $(this).hide();
    if ($("body").hasClass("basket-body")) {
      customer.totalPrice = setTotalPrice();
    }
    applyDiscount(customer.totalPrice, 5);
    $(".btn-gift-card-togger").attr("disabled", true);
  });

  $(".btn-gift-card-togger").on("click", function () {
    $(".giftcard-form").toggle();
    $(this).toggleClass("active");
  });

  //listen to form changes
  $(".shopping-card__form").on("change", function () {
    const formData = decodeURIComponent($(this).serialize()).split("&");

    formData.forEach(function (data) {
      const dataArray = data.split("=");
      customer[dataArray[0]] = dataArray[1];
    });

    if ($("#switch-location").val() != "worldwide") {
      $("#tariff-select").hide();
    }

    console.log("Current item \n", customer);
    if ($("body").hasClass("basket-body")) {
      const index = $(this).data("item");
      formData.forEach(function (data) {
        const dataArray = data.split("=");
        basket[index - 1][dataArray[0]] = dataArray[1];
      });

      console.log("Current basket item \n", basket[index - 1]);
    }

    // const VSbalance = parseInt(data.VSbalance, 10) || 0;

    // customer.totalPrice +=VSbalance

    updateCardInfo(customer);
  });
  //end of listining form changes

  $(".discount-input").on("keyup", function () {
    if ($(this).val().length > 0) {
      $(".btn-gift-card").removeAttr("disabled");
    } else {
      $(".btn-gift-card").attr("disabled", true);
    }
  });

  $(".form-tabs-btn").on("click", function () {
    console.log("hi");
    const target = $(this).data("target");
    $(this).addClass("active");
    $(this).siblings().removeClass("active");
    $(target).show();
    $(target).siblings().hide();
  });

  $(".js-radio-wrapper").on("change", function (e) {
    updateInputsByChoice(this);
  });

  //payment
  $(".js-payment-btn").on("click", function (e) {
    hideStep(4);
    $(".btn-edit")
      .text("Сonfirm and Pay")
      .attr("data-pay", true)
      .css("background-color", "red");
    $(".js-btn-confirm-and-pay").show();
    $('.js-step[data-step="4"]').addClass("completed-step");

    $(`.js-edit-btn`).show();

    let elTarget = $(`.js-step[data-step="4"] .js-step-content-wrapper`);

    elTarget.removeClass("editing");
    elTarget.find(".js-return-btn").hide();

    $(".js-items-toggler").removeClass("sorted");
  });

  //end of payment

  $(".btn-service-toggler")
    .mouseenter(function () {
      $(this).siblings("img").css({
        transform: "scale(1.2)",
      });
    })
    .mouseleave(function () {
      $(this).siblings("img").css({
        transform: "scale(1)",
      });
    })
    .on("click", function (e) {
      const status = $(this).children("span").first().text();
      const target = $(this).data("target");
      const dataNames = $(this).data("names").split(",");
      const index = parseInt(
        $(".js-shopping-card__card").attr("data-item"),
        10
      );

      toggleCheckbox($(this).children("input"));

      if (status == "+") {
        addService(target, index);

        $(this).css("color", "#ff0000");
        $(this).children("span").first().text("-");
        if (target == "#virtual-number" || target == "#substitution-number") {
          if (target == "#virtual-number") {
            customer.Vprice = 500;
          }

          if (target == "#substitution-number") {
            customer.Sprice = 25;
          }

          elCheckoutBtn.attr("disabled", true);
        }
      } else {
        dataNames.forEach(function (d) {
          customer[d] = "";
        });

        if (target == "#virtual-number" && customer.Vprice == 500) {
          customer.Vprice = 0;
        }

        if (target == "#substitution-number" && customer.Sprice == 25) {
          customer.Sprice = 0;
        }

        if (target == "#voice-sms") {
          $('select[name="VSbalance"]').prop("selectedIndex", -1);
          $("#enter-balance").selectpicker("refresh");
        }

        removeService(target, index);
        $(this).css("color", "#000");
        $(this).children("span").first().text("+");

        //hide joined info
        $(".join-info").hide();
        $(".virtual-inner").show();
        //end of joined info

        if (target == "#virtual-number" || target == "#substitution-number") {
          const newsTarget =
            target == "#virtual-number"
              ? "#substitution-number"
              : "#virtual-number";
          if (
            $(target).siblings(newsTarget).attr("style") == "display: none;"
          ) {
            elCheckoutBtn.removeAttr("disabled");
            elCheckoutBtn.show();
          }
        }
      }

      $(".js-total-price-amount").text(customer.totalPrice);

      const includedItems = [];
      const includedItemsBtns = $(`.btn-service-toggler:contains('-')`);

      includedItemsBtns.each(function (btn) {
        includedItems.push($(this).attr("data-target"));
      });

      if ($("body").hasClass("basket-body")) {
        basket[index - 1].includedItems = includedItems;

        console.log(basket);

        localStorage.removeItem("basket");
        localStorage.setItem("basket", JSON.stringify(basket));
      }

      updateCardInfo(customer);
    });

  $(".forgot-password").on("click", function (e) {
    const texts = ["Forgot password", "Remember password"];
    const target = $(".js-radio-wrapper")
      .children("input:checked")
      .data("target");
    const target2 = $(".js-radio-wrapper")
      .children("input:not(:checked)")
      .data("target");
    console.log($(this).attr("data-forgot"));
    if ($(this).attr("data-forgot") == "yes") {
      $(this).text(texts[1]).attr("data-forgot", "no");
      $(target).addClass("col-lg-12");
      $(".js-password-input-wrapper").hide();
      $(target2).addClass("col-lg-12");

      $("#signInSubmit")
        .attr("data-confirm", "no")
        .attr("data-forgot", "yes")
        .text("Send");
    } else {
      $(this).text(texts[0]).attr("data-forgot", "yes");

      $(target).removeClass("col-lg-12");
      $(".js-password-input-wrapper").show();
      $(".js-temporary-password-wrapper").hide();
      $("#signInSubmit").attr("data-forgot", "no");
      $("#signInSubmit").text("Continue");
      $(target2).removeClass("col-lg-12");
    }
  });

  $("#signInSubmit").on("click", function (e) {
    e.preventDefault();

    if ($(this).attr("data-forgot") == "yes") {
      console.log("yes");
      $(".js-temporary-password-wrapper").show();
      $(this).text("Enter");
      $(this).attr("data-confirm", "yes");
      $(this).attr("data-forgot", "no");
      return;
    }
    if ($(this).attr("data-confirm") == "yes") {
      moveToStep(3, true);
      $(".billing-info-box").show();
      $(".btn-edit")
        .text("Сonfirm and Pay")
        .attr("data-pay", true)
        .css("background-color", "red");
      $(".js-btn-confirm-and-pay").show();
      hideStep(3);
      moveToStep(4);
      hideStep(4);

      $(`.js-edit-btn`).show();

      $(".payment-info-box").show();
      $(".js-step").addClass("completed-step");

      $(".js-items-toggler").removeClass("sorted");
    }
  });

  $(".js-edit-btn").on("click", function (e) {
    const targetStep = $(this).data("step");
    const hidden = $(`.js-step[data-step="${targetStep}"]`).hasClass(
      "display-none"
    );

    if (hidden) {
      showStep(targetStep);
      const parentTarget = $(this).parent().next();
      parentTarget.addClass("editing");

      parentTarget.find(".js-return-btn").show();
    }

    $(".js-return-btn").on("click", function (e) {
      const targetStep = $(this).data("step");
      $(this).hide();

      hideStep(targetStep);

      const parentTarget = $(this).parent().parent();

      parentTarget.removeClass("editing");
    });
  });

  $(".js-basket-item").on("click", function (e) {
    if (e.target.matches(".js-edit-package")) {
      $('.js-step[data-step="2"]').hide();
      $('.js-step[data-step="1"]').css("display", "flex");
      $(`.js-add-service[data-item="${e.target.dataset.item}"]`).trigger(
        "click"
      );
    } else {
      $(".inner-recharge-plans-list").css("max-height", "260px");
      $(this).toggleClass("active");
    }
  });

  //billing

  $(".js-shipping-continue-btn").on("click", function (e) {
    moveToStep(4);
    hideStep(3);

    fillBilling();

    let elTarget = $(`.js-step[data-step="3"] .js-step-content-wrapper`);

    elTarget.removeClass("editing");
    elTarget.find(".js-return-btn").hide();

    $('.js-step[data-step="3"]').addClass("completed-step");
  });
  //end of billing
});

///FUNCTIONS

function hideStep(step) {
  let elStepForm = $(`.js-step[data-step="${step}"]`);

  if (step == "2") {
    elStepForm = $(`.js-step[data-step-inside="true"]`);
  }
  elStepForm.addClass("display-none");

  elStepForm.find(".confirmation-box").show();
}

function showStep(step) {
  $(`.js-step[data-step="${step}"]`).removeClass("display-none");
}

function moveToStep(step, isSecond = false) {
  $(`.step-button[data-step="${step}"]`).trigger("click");
  $(`.step-button[data-step="${step}"]`).removeAttr("disabled");
  $(`.js-step[data-step-inside="${isSecond}"]`).addClass("display-none");
  $(".js-confirmation-box").show();
}

function updateInputsByChoice(parent) {
  const hiddenType = $(parent).children("input:not(:checked)").data("target");
  const visibleType = $(parent).children("input:checked").data("target");

  $(visibleType).show();
  $(hiddenType).hide();
  console.log(visibleType);
  const elBillingTypeInput = $("#billingAddress");
  const useBilling = elBillingTypeInput.is(":checked");
  const target = elBillingTypeInput.attr("data-target");

  if (useBilling) {
    $(target).hide();
    $("#billingAddressToggler").prop("checked", true);

    $(".js-billing-info-item").hide();
  } else {
    $(".js-billing-info-item").show();
    $(target).show();
    elBillingTypeInput.parent().hide();
    $("#billingAddressToggler").prop("checked", false);
  }
}

function formatPhoneNumber(str) {
  return `+ ${str.slice(0, 4)} ${str.slice(4, 7)}-${str.slice(
    7,
    9
  )}-${str.slice(9, 11)}`;
}

function getCardDetails(btn) {
  const wrapper = $(btn).parent();
  const textWrapper = wrapper.find(".right-span .text");
  const plan = textWrapper.hasClass("region-text")
    ? "Region"
    : textWrapper.hasClass("country_text")
    ? "Country"
    : "Worldwide";
  console.log(plan);
  const data = {
    plan: plan,
    label: textWrapper.text(),
    amount: wrapper.find("h1 span.let").text(),
    priceData: {
      price: $(btn).prev().find("span").text(),
      days: $(btn).prev().text().split(" ").join("").split("/")[1][0],
    },
  };
  console.log(data);
  return data;
}

function setWorldWidePlan(data) {
  setBasicInPlans(data);
  const typesArray = ["START", "PRO", "MAX", "BUSINESS"];

  $("#tariff-select")
    .find(
      `.dropdown-item[data-original-index="${
        typesArray.indexOf(data.label) + 1
      }"]`
    )
    .trigger("click");
}

function setRegionPlan(data) {
  setBasicInPlans(data);
  let continent =
    data.label == "OCEANIA"
      ? "Oceania"
      : data.label == "N. AMERICA"
      ? "North America"
      : data.label == "S. America"
      ? "South America"
      : data.label;
  continent = continent.toLowerCase();
  continent = continent.replace(continent[0], continent[0].toUpperCase());
  console.log(continent);
  const continentToBeClicked = getClickableParent("#region-select", continent);
  console.log(continentToBeClicked);
  continentToBeClicked.trigger("click");
}

function setCountryPlan(data) {
  setBasicInPlans(data);
  const countryToBeClicked = getClickableParent("#country-select", data.label);
  countryToBeClicked.trigger("click");
}

function setBasicInPlans(data) {
  if (data.plan != "Worldwide") {
    $("#tariff-select").hide();
  }

  const elPlanToBeClicked = getClickableParent("#plan-select", data.plan);
  elPlanToBeClicked.trigger("click");

  const gbToBeClicked = getClickableParent("#enter-gb", data.amount + " Gb");
  gbToBeClicked.trigger("click");
  const periodToBeClicked = getClickableParent(
    "#enter-period",
    data.priceData.days + ` ${data.priceData.days == "1" ? "day" : "days"}`
  );
  periodToBeClicked.trigger("click");

  $(".js-gb-amount-big").text(data.amount);
  $(".js-gb-amount").text(data.amount + "Gb");
  $(".js-day-amount").text(`${data.priceData.days} days`);
  $(".js-internet-price-amount").text(`${data.priceData.price}`);
  $('.js-price-amount[data-free="yes"]').text(0);
  $(".js-plan-name").text(`${data.plan} Plan`);
}

function getClickableParent(selector, target) {
  return $(selector)
    .find(`.dropdown-item span.text:contains("${target}")`)
    .parent()
    .parent();
}

function fillBasket() {
  const elBasketItemsBox = $(".js-card-wrapper");
  let chunk = "";
  let listChunk = `
  <div class="basket-line">
    <div class="basket-item">Package</div>
    <div class="basket-item">Plan</div>
    <div class="basket-item">Quantity/Period</div>
    <div class="basket-item">Services</div>
    <div class="basket-item">Pay </div>
  </div>`;
  let packageChunk = "";
  let totalPrice = 0;

  $(".js-package-amount").text(basket.length);

  for (let i = 0; i < basket.length; i++) {
    totalPrice += parseInt(basket[i].priceData.price, 10);
    console.log(basket[i].amount);
    const template = `
    <div data-item=${i + 1} class="shopping-card__card js-shopping-card__card">
      <div class="item">

        <div class="top1">
          <img src="img/logo.svg" alt="logo">
          <span class="right-span">
            <div class="text tariff-name">${
              basket[i].label == "BUSINESS" ? "PROMAX" : basket[i].label
            }</div>
          </span>
        </div>
        <button onclick="removeItemFromBasket($(this));" data-item=${
          i + 1
        } class="remove-btn js-remove-item"><img src="img/icons/close.svg" alt="remove"></button>
        <h1><span class="let gb-amount-big">${basket[i].amount}</span> Gb</h1>
        <div class="top2">
          <h4><span class="plan-name">${
            basket[i].plan
          } plan</span><span class="sim-type"><span
                class="sim-name">${basket[i].simType}</span></span></h4>
          <span class="line"></span>
        </div>
        <div class="top3">
          <h3 class="my-3">Included in your plan:</h3>
      <div class="js-not-sorted-items">
      <div class="included-item" id="internet-data-box">
            <div class="img-wrapper">
              <img src="img/icons/icon2.png" alt="icon1">
            </div>
            <div class="item-content d-flex ml-auto justify-content-between">
              <div class="content-left">
                <h3 class="item-name">Internet data</h3>
                <p class="item-period"><span class="card-gb-amount">${
                  basket[i].amount
                }Gb</span>/<span class="card-day-amount">${
      basket[i].priceData.days
    } days</span></p>
              </div>
              <div class="content-right">
                $ <span class="price-amount internet-price-amount">${
                  basket[i].priceData.price
                }</span> us
              </div>
            </div>
          </div>
          
          <div class="included-item" id="sim-type-box">
            <div class="img-wrapper">
              <img class="sim-img" src="img/icons/left-sim.png" alt="icon1">
            </div>
            <div class="item-content d-flex ml-auto justify-content-between">
              <div class="content-left d-flex align-items-baseline">
                <h3 class="item-name sim-name">${basket[i].simType}</h3>
                <span class="sim-price-status">free</span>
                ${
                  basket[i].isDhl
                    ? '<img width="45" height="10" src="img/icons/dhl.png" class="ml-2" alt="dhl">'
                    : ""
                }
              </div>
              <div class="content-right">
                $ <span data-free="yes" class="price-amount">0</span> us
              </div>
            </div>
          </div>
          <span class="line"></span>
          <div class="total-price mt-3">$ <span class="total-price-amount">${
            basket[i].priceData.price
          }</span> us</div>
          <button type="button" data-item="${
            i + 1
          }" class="btn-checkout js-add-service mt-3">Add Services</button>
        </div>
      
      </div>
          
      </div>
    </div>`;

    const listTemplate = `
    <div class="basket-line js-basket-line" data-item="${i + 1}">
    <button onclick="removeItemFromBasket($(this));" data-item="${
      i + 1
    }" class="remove-btn js-remove-item"><img src="img/icons/close.svg" alt="remove"></button>
      <div class="basket-item">
        <img src="img/icons/logo-r.svg" alt="logo">
        <div class="skewed-box location-name-wrapper"><span class="location-name">${
          basket[i].label
        }</span></div>
      </div> 
      <div class="basket-item">
        <div class="plan-name">${basket[i].plan} Plan</div>
        <div class="skewed-box sim-type-wrapper"><span class="sim-type">${
          basket[i].simType
        }</span></div>
      </div>
      <div class="basket-item quantity-period">
        <div class="card-gb-amount">${basket[i].amount}Gb</div>
        /
        <div class="card-days-amount">${basket[i].priceData.days}days</div>
      </div>
      <div class="basket-item">
        <div class="included-items-wrapper d-flex align-items-baseline justify-content-around">
          <div data-basket-item="${
            i + 1
          }" class="included-item" data-label="internet-data-wrapper">
            <div class="img-wrapper">
              <img src="img/icons/icon2-r.png" width="20" height="20" alt="icon1">
            </div>
            <div class="item-content">
              <h3 class="item-name">Internet data</h3>
            </div>
          </div>
          <div data-basket-item="${
            i + 1
          }" class="included-item inactive" data-label="voice-sms-block">
            <div class="img-wrapper">
              <img src="img/icons/icon5-r.png" width="30" height="25" alt="icon1">
            </div>
            <div class="item-content">
              <h3 class="item-name">Voice and SMS</h3>
            </div>
          </div>
          <div data-basket-item="${
            i + 1
          }" class="included-item inactive" data-label="virtual-number-block">
            <div class="img-wrapper">
              <img src="img/icons/icon3-r.png" width="26" height="26" alt="icon1">
            </div>
            <div class="item-content">
              <h3 class="item-name">Virtual number</h3>
            </div>
          </div>
          <div data-basket-item="${
            i + 1
          }" class="included-item inactive" data-label="substitution-number-block">
            <div class="img-wrapper">
              <img src="img/icons/icon4-r.png" width="23" height="22" alt="icon1">
            </div>
            <div class="item-content">
              <h3 class="item-name">Substitution of numbers</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="basket-item">
        $ <span class="price-amount">${basket[i].priceData.price}</span> us
      </div>
    </div>
    `;

    const packagesCard = `
    <div data-item="${i + 1}" class="basket-item flex-wrap js-basket-item">
      <div class="visible-content w-100 d-flex justify-content-between">
        <div>
          <div class="d-flex align-items-center">
            <img src="img/logo.svg" alt="logo" width="62" height="15">
            <div class="skewed-box"><span class="location-name">${
              basket[i].label
            }</span></div>
          </div>
          <div class="basic-info"><span class="plan-name">${
            basket[i].plan
          } Plan</span> /  
            <span class="sim-type sim-type-text">${basket[i].simType}</span>
            ${
              basket[i].isDhl
                ? '<img width="45" height="10" src="img/icons/dhl.png" class="ml-2" alt="dhl">'
                : ""
            }
            </div>
        </div>
        <div class="price-box">
          $ <span>${basket[i].priceData.price}</span> us
        </div>
      </div>
      <div class="hidden-content mx-auto my-3">
        <div class="top2">
          <h4><span class="plan-name">${
            basket[i].plan
          } Plan</span><span class="sim-type"><span
                class="sim-name js-sim-name">${
                  basket[i].simType
                }</span></span></h4>
          <span class="line"></span>
          <div class="included-items-wrapper js-package-included-items d-flex align-items-baseline justify-content-around mt-3">
            <div class="included-item" data-basket-item="${
              i + 1
            } "data-label="internet-data-block">
              <div class="img-wrapper">
                <img src="img/icons/icon2.png" alt="icon1">
              </div>
              <div class="item-content">
                <h3 class="item-name">Internet data</h3>
              </div>
            </div>
            <div class="included-item inactive" data-basket-item="${
              i + 1
            } "data-label="voice-sms-block">
              <div class="img-wrapper">
                <img src="img/icons/icon5.png" alt="icon1">
              </div>
              <div class="item-content">
                <h3 class="item-name">Voice and SMS</h3>
              </div>
            </div>
            <div class="included-item inactive" data-basket-item="${
              i + 1
            } "data-label="virtual-number-block">
              <div class="img-wrapper">
                <img src="img/icons/icon3.png" alt="icon1">
              </div>
              <div class="item-content">
                <h3 class="item-name">Virtual number</h3>
              </div>
            </div>
            <div class="included-item inactive" data-basket-item="${
              i + 1
            } "data-label="substitution-number-block">
              <div class="img-wrapper">
                <img src="img/icons/icon4.png" alt="icon1">
              </div>
              <div class="item-content">
                <h3 class="item-name">Substitution of numbers</h3>
              </div>
            </div>
          </div>
          <div class="subtotal-box d-flex align-items-center justify-content-between">
            <span>Subtotal</span>
            <span>$ <span class="js-subtotal-amount">${
              basket[i].priceData.price
            }</span> us</span>
          </div>
          <button data-item="${
            i + 1
          }" class="rounded-button js-edit-package d-block mx-auto">Edit</button>
        </div>
      </div>
    </div>`;

    packageChunk += packagesCard;
    listChunk += listTemplate;
    chunk += template;
  }

  $(".js-basket-list").html(listChunk);

  $(".basket-items-wrapper").html(packageChunk);

  elBasketItemsBox.html("");

  elBasketItemsBox.html(chunk);

  $(".js-subtotal-price-amount").text(totalPrice);
  $(".js-final-total-price-amount").text(totalPrice);
  elBasketItemsBox.removeClass("slick-initialized slick-slider");

  elBasketItemsBox.slick({
    arrows: true,
    slidesToShow: 3,
    infinite: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
}

function refreshSlider(selector) {
  const elBasketItemsBox = $(".js-card-wrapper");

  elBasketItemsBox.slick("unslick");

  $(selector).remove();

  elBasketItemsBox.slick({
    arrows: true,
    slidesToShow: 3,
    infinite: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 350,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  });
}

function updateCardInfo(data) {
  $(".day-amount").text(
    data.period + ` ${data.period == "1" ? "day" : "days"}`
  );

  $(".js-vs-day-amount").text(
    data.VSperiod + ` ${data.VSperiod == "1" ? "day" : "days"}`
  );
  $(".js-sub-period").text(data.subPeriod + " month");

  $(".js-vs-price").text(data.VSbalance);

  $(".gb-amount").text(data.gb + "Gb");

  // let tariff = data.tariff ? data.tariff.toUpperCase() : data.label.toUpperCase();

  const tariff =
    customer.location == "worldwide"
      ? customer.tariff
      : customer.location == "region"
      ? customer.region
      : customer.location == "country"
      ? customer.country
      : "PRO";

  $(".js-tariff-name").text(tariff.toUpperCase());

  $(".js-sim-name").text(data.simToBeSelected);

  $(".js-plan-name").text(`${data.location} Plan`);

  if (data.simToBeSelected == "Sim") {
    $(".sim-img").attr("src", "img/icons/right-sim.png");
  } else {
    $(".sim-img").attr("src", "img/icons/left-sim.png");
  }

  $(".js-v-day-amount").text(data.Vperiod + " month");
  console.log(data.totalPrice);

  updateTotalPrice();

  $(".js-total-price-amount").text(data.totalPrice);
  $(".js-total-price-amount-single").text(data.totalPrice);
}

function updateTotalPrice() {
  const VSbalance = parseInt(customer.VSbalance, 10) || 0;
  const Vprice = customer.Vprice || 0;
  const Iprice = customer.Iprice || 0;
  const Sprice = customer.Sprice || 0;

  customer.totalPrice = VSbalance + Vprice + Iprice + Sprice;
}

function removeItemFromBasket(btn) {
  const dataItem = btn.attr("data-item");
  basket.splice(dataItem - 1, 1);

  let totalPrice = 0;
  basket.forEach(function (b) {
    totalPrice += parseInt(b.priceData.price, 10);
  });
  $(".js-subtotal-price-amount").text(totalPrice);
  $(".js-final-total-price-amount").text(totalPrice);
  localStorage.removeItem("basket");
  localStorage.setItem("basket", JSON.stringify(basket));
  $(`.basket-line[data-item="${dataItem}"]`).remove();
  const deletedTarget = $(`.js-shopping-card__card[data-item="${dataItem}"]`);
  deletedTarget.parent().parent().remove();

  refreshSlider(`.js-shopping-card__card[data-item="${dataItem}"]`);
}

function updateCard(data) {
  $(".js-sim-name").text(data.simType);

  $(".js-plan-name").text(`${data.plan} Plan`);

  $(".js-gb-amount-big").text(data.amount);

  $(".js-tariff-name").text(data.label);

  if (data.simType == "Sim") {
    $(".sim-img").attr("src", "img/icons/right-sim.png");
  } else {
    $(".sim-img").attr("src", "img/icons/left-sim.png");
  }

  $(".js-total-price-amount").text(data.totalPrice);
}

function toggleCheckbox(checkbox) {
  if (!checkbox.prop("checked")) {
    checkbox.prop("checked", true);
  } else {
    checkbox.prop("checked", false);
  }
}

function setInlcludedItems(itemId) {
  const elItems = basket[itemId - 1].includedItems || "";
  if (elItems.length) {
    $(`.btn-service-toggler:contains('-')`).trigger("click");
    for (let i = 0; i < elItems.length; i++) {
      $(
        `.btn-service-toggler:contains('+')[data-target="${elItems[i]}"]`
      ).trigger("click");
    }
  } else {
    $(`.btn-service-toggler:contains('-')`).trigger("click");
  }
}

function addService(target, index, isFromBody = false) {
  if (!isFromBody) {
    $(".btn-checkout").show();
    $(target).slideDown();
    $(`.included-item[data-label=${target.replace("#", "")}-box]`).slideDown();
  }

  $(
    `.basket-line[data-item="${index}"] .included-item[data-label=${target.replace(
      "#",
      ""
    )}-block]`
  ).removeClass("inactive");
  $(`${target}-block`).removeClass("inactive");
  $(
    `.js-basket-item[data-item="${index}"] .included-item[data-label=${target.replace(
      "#",
      ""
    )}-block]`
  ).removeClass("inactive");
}

function removeService(target, index) {
  $(target).slideUp();
  $(`.included-item[data-label=${target.replace("#", "")}-box]`).slideUp();
  $(`${target}-box`).slideUp();
  $(
    `.basket-line[data-item="${index}"] .included-item[data-label=${target.replace(
      "#",
      ""
    )}-block]`
  ).addClass("inactive");
  $(
    `.js-basket-item[data-item="${index}"] .included-item[data-label=${target.replace(
      "#",
      ""
    )}-block]`
  ).addClass("inactive");
  $(`${target}-block`).addClass("inactive");
}

function setTotalPrice(index = false) {
  if (index) {
    basket[index - 1].total = customer.totalPrice;
    $(`.basket-line[data-item="${index}"] .price-amount`).text(
      customer.totalPrice
    );

    let subtotal = 0;
    basket.forEach(function (b) {
      const total = b.total ? b.total : parseInt(b.priceData.price, 10);
      subtotal += total;
    });
    $(`.js-basket-item[data-item="${index}"] .price-box span`).text(
      customer.totalPrice
    );
    $(".js-subtotal-price-amount").text(subtotal);
    $(".js-final-total-price-amount").text(subtotal);
    return subtotal;
  } else {
    let subtotal = 0;
    basket.forEach(function (b) {
      const total = b.total ? b.total : parseInt(b.priceData.price, 10);
      subtotal += total;
    });
    return subtotal;
  }
}

function applyDiscount(totalPrice, percent) {
  customer.subtotal = totalPrice;
  totalPrice = +totalPrice * (1 - percent / 100);
  $(".js-total-price-amount").text(totalPrice.toFixed(1));
  $(".js-final-total-price-amount").text(totalPrice.toFixed(1));
  let discountAmount = $(".js-discount-amount").text();
  customer.totalPrice = totalPrice.toFixed(1);
  discountAmount = +discountAmount + percent;
  $(".discount-info").show();

  $(".js-discount-amount").text(discountAmount);

  $(".js-subtotal-amount").text(customer.subtotal);
}

function openOneCard(index, thisOne) {
  const btnTarget = $(thisOne).attr("data-label").replace("-block", "");

  const elClickableServiceToggler = $(
    `.btn-service-toggler[data-target="#${btnTarget}"]`
  );

  if (basket[index - 1].includedItems) {
    basket[index - 1].includedItems.push(btnTarget);
  } else {
    basket[index - 1].includedItems = [btnTarget];
  }

  $(".js-btn-checkout").attr("data-item", index);

  switch (basket[index - 1].plan) {
    case "Worldwide":
      setWorldWidePlan(basket[index - 1]);
      break;
    case "Region":
      setRegionPlan(basket[index - 1]);
      break;
    case "Country":
      setCountryPlan(basket[index - 1]);
      break;
  }

  $(".shopping-card__form").attr("data-item", index);

  console.log(basket[index - 1]);

  $(".js-shopping-card__card").attr("data-item", index);

  $(`.js-add-service[data-item="${index}"]`).trigger("click");

  elClickableServiceToggler.trigger("click");

  updateCard(basket[index - 1]);
}

function fillBilling() {
  const useBilling = $("#billingAddress").is(":checked");

  const billingData = getFormData("#billing-form");
  const shippingData = getFormData("#shipping-form");

  $(".js-customer-name-text").text(
    `${billingData.firstname} ${billingData.lastname}`
  );

  $(".js-shipping-name-text").text(
    `${shippingData.firstname} ${shippingData.lastname}`
  );

  let billingAddress = `
    ${billingData.billingAddress}
    ${billingData.city} / ${billingData.state} ${billingData.postcode} ${billingData.country}
  `;

  let shippingAddress = `
  ${shippingData.shippingAddress}
  ${shippingData.city} / ${shippingData.state} ${shippingData.postcode} ${shippingData.country}
`;
  const detailedBilling = billingAddress.slice(
    0,
    billingAddress.indexOf("St") + 4
  );
  const mainBilling = billingAddress.slice(
    billingAddress.indexOf("St") + 4,
    billingAddress.length
  );

  $(".js-address-text").children(".js-address-sec").text(mainBilling);

  $(".js-address-text").children("span:first-child").text(detailedBilling);

  if (useBilling) {
    $(".js-shipping-address-text").text("Use billing address");
  } else {
    const detailedShipping = shippingAddress.slice(
      0,
      shippingAddress.indexOf("St") + 4
    );
    const mainShipping = shippingAddress.slice(
      shippingAddress.indexOf("St") + 4,
      shippingAddress.length
    );

    const html = `
    <span>${detailedShipping}</span>
    ${mainShipping}
    `;

    $(".js-shipping-address-text").html(html);
    $(".js-shipping-company-name").text(shippingData.companyname);
  }
}

function getFormData(target) {
  const formData = decodeURIComponent($(target).serialize()).split("&");

  let formJsonData = {};

  formData.forEach(function (data) {
    const dataArray = data.split("=");
    formJsonData[dataArray[0]] = dataArray[1];
  });

  return formJsonData;
}

function turnOnSortedMode() {
  $(".js-items-toggler").removeClass("sorted");
  $(".js-included-country-text").css({
    cursor: "pointer",
  });
}
