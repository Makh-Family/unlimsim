let basket = [];

const customer = {}; //details about customer

let cardData;


const elCheckoutBtn = $('.btn-checkout');

$(document).ready(function () {

  

  if (localStorage.getItem('basket')) {
    basket = [...JSON.parse(localStorage.getItem('basket'))];
    $('.badge-pill').text(basket.length);
  }
  
  




  if ($('body').hasClass('basket-body')) {
    fillBasket();


    $('.js-add-service ').on('click', function(e) {
      const index = parseInt($(this).attr('data-item'),10);
      const data = basket[index-1];
      
      $('.js-basic-basket').hide();
      $('.js-basket-shopping-card').show();
      $('.js-basket-list').show();
      $('.js-step[data-step="1"]').show();
      $('.js-subtotal-wrapper').show();
      $(`.basket-line[data-item="${index}"]`).hide();
      $('.js-shopping-card__card').attr('data-item', index);
      setBasicInPlans(data);
    });

    $('.basket-line').on('click', function () {
      const index = parseInt( $(this).attr('data-item'), 10 );
      updateCard(basket[index - 1]);
      
      $(`.basket-line[data-item=${index}]`).hide()
        .siblings().show();
        
      

      $('.js-shopping-card__card').attr('data-item', index);

      const btns = $('.additional-services').find('.btn-service-toggler');

      //close all services
      btns.children('span:first-child').text('-');
      btns.trigger('click');
      
    });


    $('.js-basket-checkout').on('click', function() {
      $('.js-basic-basket').hide();
      $('.js-basket-shopping-card').show()
      $('.js-basket-list').hide();
    });


    $('.js-basket-item').on('click', function(e) {
      if(e.target.matches('.js-edit-package')) {
        $('.js-step[data-step="2"]').hide();
        $('.js-step[data-step="1"]').css('display', 'flex');
        $(`.js-add-service[data-item="${e.target.dataset.item}"]`).trigger('click');
      } else {
        $(this).toggleClass('active');
      }
    });

    elCheckoutBtn.on('click', function() {
      if( $(this).attr('data-approve') == "yes" ) {
        $(this).hide();
        $('.js-total-price-amount').text(customer.totalPrice);
        const index = parseInt( $('.js-shopping-card__card').attr('data-item') );

        $(`.basket-line[data-item="${index}"]`).find('.included-item').addClass('inactive');
        
        basket[index - 1].includedItems.forEach(function(i) {
         $(`.basket-line[data-item="${index}"]`).find(i + '-wrapper').removeClass('inactive');
        });

      }

    });


    
    $('.js-btn-confirm-and-pay').on('click', function() {
      $(this).hide();
      $('.js-all-wrapper').addClass('payed');
    });


  }










  ////////////////////
  // MODAL
  ////////////////////

  $('.btn-show-sim-info').click(function (e) {
    const target = e.target.dataset.target;
    $(target).siblings().hide();
    $(target).toggle();
  });


  $('.btn-add-to-card').on('click', function () {
    $('.notification-block').slideDown().show();
    localStorage.removeItem('card');
    localStorage.setItem('card', JSON.stringify(cardData));

    const simType = $('#add-to-card-form').serialize();
    cardData.simType = simType.split('=')[1];
    const dhlOn = $('#dhl-form').serialize();
    cardData.isDhl = dhlOn == "" ? false : true;

    if(!basket.includes(cardData)) {
      basket.push(cardData);
      localStorage.removeItem('basket');
      localStorage.setItem('basket', JSON.stringify(basket));
      console.log(basket)
    }

    $('.badge-pill').text(basket.length);

  });

  $('.tab_content').on('click', '.btn-buy',function (e) {
    cardData = getCardDetails(e.target);
  });

  if ($('body').hasClass('shopping-card-body')) {
    const elRegionsList = $('#regions-list');
    const elPrefixList = $('#prefix-select');
    const elCountriesList = $('#countries-select');
    const elNumbersList = $('#numbers-list');
    const elVirtualInnerBox = $('.virtual-inner');

    const newCardData = JSON.parse(localStorage.getItem('card'));

    setTimeout(function() {
      switch(newCardData.plan) {
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
    }, 1500);

    $('.tab-inner').each(function () {
      $(this).on('click', '.btn-buy', function (e) {
        $('.notification-block').slideUp().hide();
        console.log(getCardDetails(e.target));
      });
    });

    $('#plan-select').on('click', '.dropdown-item', function (e) {
      
      if ($(this).text().toUpperCase() == "WORLDWIDE" || $(this).text().toUpperCase() == "COUNTRY") {
        $(`#region-list .nav-link[data-value="*"]`).trigger('click');
      }
    });

    $('#region-select').on('click', '.dropdown-item', function (e) {
      let continent = $(this).text().toUpperCase();
      continent = continent == "AUSTRALIA" ? "OCEANIA" : (continent == "NORTH AMERICA" || continent == "SOUTH AMERICA") ? continent.split(' ')[0][0] + '. ' + continent.split(' ')[1] : continent
      $(`#region-list .nav-link[data-value="${continent}"]`).trigger('click');
    });

    $('.btn-service-toggler').click(function (e) {
      const status = $(this).children('span').first().text();
      const target = $(this).data('target');
      const dataNames = $(this).data('names').split(',');
      const index = parseInt( $('.js-shopping-card__card').attr('data-item'), 10 );

      

      if (status == "+") {
        $('.btn-checkout').show();
        $(target).slideDown();
        $(`${target}-box`).slideDown();
        $(`${target}-block`).slideDown();

        $(this).css('color', '#ff0000');
        $(this).children('span').first().text("-");
        if (target == "#virtual-number" || target == "#substitution-number") {
          elCheckoutBtn.attr('disabled', true);
        }
      } else {
        dataNames.forEach(function (d) {
          customer[d] = "";
        });

        $(target).slideUp();
        $(`${target}-box`).slideUp();
        $(`${target}-block`).slideUp();

        $(this).css('color', '#000');
        $(this).children('span').first().text("+")

        //hide joined info
        $('.join-info').hide();
        $('.virtual-inner').show();
        $('.substitution-join').hide();
        $('.virtual-number-info').show();
        //end of joined info
        
        if (target == "#virtual-number" || target == "#substitution-number") {
          const newsTarget = target == "#virtual-number" ? "#substitution-number" : "#virtual-number"
          if ($(target).siblings(newsTarget).attr('style') == "display: none;") {
            elCheckoutBtn.removeAttr('disabled');
            elCheckoutBtn.show();
          }
        }
      }
      const includedItems = [];
      const includedItemsBtns = ( $(`.btn-service-toggler:contains('-')`) );
      
      includedItemsBtns.each(function(btn) {
        includedItems.push( $(this).attr('data-target') );
      });

      basket[index - 1].includedItems = includedItems;
      
      console.log(basket);

      localStorage.removeItem('basket');
      localStorage.setItem('basket', JSON.stringify(basket));

    })

    const elPhoneNumberInput = document.getElementById('subNumber');
    const elPhoneNumberInputStepTwo = document.querySelector('#telnumber');
    
    if (elPhoneNumberInput) {
      IMask(elPhoneNumberInput, {
        mask: '+{7} (000) 000-00-00',
        lazy: false, // make placeholder always visible
        placeholderChar: '_' // defaults to '_'
      });
      IMask(elPhoneNumberInputStepTwo, {
        mask: '(000) 000-00-00',
        lazy: false, // make placeholder always visible
        placeholderChar: '_' // defaults to '_'
      });
      IMask(document.querySelector('#signIn-phone-input'), {
        mask: '+{7} (000) 000-00-00',
        lazy: false, // make placeholder always visible
        placeholderChar: '_' // defaults to '_'
      });
      IMask(document.querySelector('#cardnumber'), {
        mask: '0000-0000-0000-0000',
        lazy: false, // make placeholder always visible
        placeholderChar: '_' // defaults to '_'
      });
      IMask(document.querySelector('#carddate'), {
        mask: '00{/}00',
        lazy: false, // make placeholder always visible
        placeholderChar: '_' // defaults to '_'
      });
    }

    elPhoneNumberInput.addEventListener('keyup', function (e) {
      if (e.target.value.length == 18 && e.target.value[e.target.value.length - 1] != "_") {
        $('.btn-substitution-join').removeAttr('disabled');
      } else {
        $('.btn-substitution-join').attr('disabled', true);
      }
    });

    elCountriesList.on('click', '.dropdown-item', function (e) {
      const selectedCountry = $(this).text();
      $.getJSON('../data/regions.json', function (regionsList) {
        const regions = regionsList.filter(function (country) {
          return country.countryName.toUpperCase() == selectedCountry;
        })[0].regions;
        let chunk = ''
        regions.forEach(function (reg) {
          const template = `
        <option value="${reg.name}">${reg.name}</option>`;
          chunk += template;
        });
        const elSelect = elRegionsList.find('select');
        elSelect.html(chunk);
        elSelect.removeAttr('disabled');
        elSelect.selectpicker('refresh');
      });
    });

    elRegionsList.on('click', '.dropdown-item', function (e) {
      const elSelect = elPrefixList.find('select');
      elSelect.removeAttr('disabled');
      elSelect.selectpicker('refresh');
    });

    elPrefixList.on('click', '.dropdown-item', function (e) {
      const elSelect = elNumbersList.find('select');
      elSelect.removeAttr('disabled');
      elSelect.selectpicker('refresh');
    });

    elNumbersList.on('click', '.dropdown-item', function (e) {
      const elActiveOption = elNumbersList.find('.filter-option');
      const formattedNumber = formatPhoneNumber(elActiveOption.text())
      elActiveOption.text(formattedNumber);
      $('.btn-join-to-card').removeAttr('disabled');
      $('.btn-substitution-join').attr('disabled', true)
    });


    $('.btn-join-to-card').on('click', function () {
      const formData = decodeURIComponent($('.shopping-card__form').serialize()).split('&');
      formData.forEach(function (data) {
        const dataArray = data.split('=');
        customer[dataArray[0]] = dataArray[1];
      });
      const elJoinInfo = $('.join-info')

      elVirtualInnerBox.hide();
  
      elJoinInfo.find('.country-name').text(customer.Vcountry);
      elJoinInfo.find('.region-name').text(customer.Vregion);
      $('.virtual-number').text(formatPhoneNumber(customer.Vnumber));
      elJoinInfo.show();
      if ($(this).hasClass('btn-substitution-join')) {
        $('.virtual-number-info').hide();
        $('.substitution-join').show();
        $('.substitution-number').text(customer.subNumber);
        $('.substitution-wrapper').hide();
        $('.input-placeholder').show();
      }
      $('.btn-checkout').removeAttr('disabled');
    });

    $('select[name="period"]').on('change', function() {
      const data = $(this).val();
      const vsPeriodToBeClicked = getClickableParent('#VS-period', data + ` ${data == "1" ? "day" : "days"}`);
      vsPeriodToBeClicked.trigger('click');
    });

    
    $('#dhl-checkbox').on('change', function() {
      if ($(this).is(':checked')) {
        $('.js-dhl-img').show();
      } else {
        $('.js-dhl-img').hide();
      }
    });


    //listen to form changes
    $('.shopping-card__form').on('change',function() {
      const formData = decodeURIComponent($(this).serialize()).split('&');

      formData.forEach(function (data) {
        const dataArray = data.split('=');
        customer[dataArray[0]] = dataArray[1];
      });

      console.log(customer);

      updateCardInfo();

      
    });
    //end of listining form changes


    $('.btn-show-countries').on('click', function () {
      $('.tab_content-map').slideToggle();
      $(this).toggleClass('active');
      
    });

    //steps controller
    $('.step-button').on('click', function() {
      const step = parseInt($(this).data('step'),10);
      
      showStep(step);
      if(step == 1) {
        $('.js-opening-title').show();
        $('.steps-controller').hide();
      } else {
        $('.js-opening-title').hide();
        $('.steps-controller').show();
      }
      
      if(step != 4) {
        $(`.js-step[data-step="${step}"]`).siblings('.js-step').addClass(`display-none`);
      }

      $(`.js-edit-btn[data-step="${step}"]`).show();

      if ($(this).hasClass('active')) {
        
        $(this).siblings(`.step-button`).each(function(btn) {
          if($(this).data('step') >= step) {
            $(this).removeClass('active');
          }
        });
        
      } else {
        $(this).addClass('active');
        $(this).siblings(`.step-button`).each(function(btn) {
          if($(this).data('step') <= step) {
            $(this).addClass('active');
            $(this).removeAttr('disabled');
          }
        });
      }
    })

    //end of step controller

    //reg-sign-togller

    $('.form-tabs-btn').on('click', function() {
      const target = $(this).data('target');
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
      $(target).show();
      $(target).siblings().hide();
    });



    //type filter

    $('.js-radio-wrapper').on('change', function(e) {
      updateInputsByChoice(this);
      
    }); 

    //end of type filter


    //forgot password toggler
    $('.forgot-password').on('click', function(e) {
      const texts = ["Forgot password", "Remember password"];
      const target = $('.js-radio-wrapper').children('input:checked').data('target');
      const target2 = $('.js-radio-wrapper').children('input:not(:checked)').data('target');

      if(texts[0] == $(this).text()) {
        $(this).text(texts[1]);
        $(target).addClass('col-lg-12');
        $('.js-password-input-wrapper').hide();
        $(target2).addClass('col-lg-12');
        
        
        $('#signInSubmit').attr('data-confirm','no');
        $('#signInSubmit').attr('data-forgot','yes');
      } else {
        $(this).text(texts[0]);
        $(target).removeClass('col-lg-12');
        $('.js-password-input-wrapper').show();
        $('.js-temporary-password-wrapper').hide();
        $('#signInSubmit').attr('data-forgot','no');
        $('#signInSubmit').text('Continue')
        $(target2).removeClass('col-lg-12');
      }
    });

    $('#signInSubmit').on('click', function(e) {
      e.preventDefault();

      if(e.target.dataset.forgot == 'yes') {
        console.log('yes');
        $('.js-temporary-password-wrapper').show();
        $(this).text('Enter');
        $(this).attr('data-confirm', 'yes');
      }

      if(e.target.dataset.confirm == 'yes') {
        moveToStep(3,true);
        $('.billing-info-box').show();
        $('.btn-edit').text('Сonfirm and Pay').attr('data-pay',true).css('background-color','red');
        $('.js-btn-confirm-and-pay').show();
        hideStep(3);
        moveToStep(4);
        hideStep(4);
        $('.payment-info-box').show();
      }
    });

    //end of forgot password toggler


    //email verification block open



    //end of email verfication open
    $('#regFormSubmit').on('click', function(e) {
      e.preventDefault();
      if($(this).text() == "Confirm Email") {
        
        $('.verification-wrapper').show();
        $(this).attr('type','submit');
        $(this).text('Continue');
        $('.confirm-wrapper p').hide();
      } else {
        moveToStep(3,true);
        $('.js-edit-btn[data-step="4"]').show();
      }
    });

    

    //edit button

    $('.btn-edit').on('click' , function(e) {
      if($(this).attr('data-pay') !== "true") {
        $(`.step-button[data-step='1']`).trigger('click');
      } else {
        $('.js-all-wrapper').addClass('payed');
      }
    }) 

    $('.js-edit-btn').on('click', function(e) {
      const targetStep = $(this).data('step');
      const hidden = $(`.js-step[data-step="${targetStep}"]`).hasClass('display-none');
      if(hidden) {
        showStep(targetStep);
      }
    });


    //billing

    $('.js-shipping-continue-btn').on('click', function(e) {
      moveToStep(4);
      hideStep(3);
    });
    //end of billing


    //payment
    $('.js-payment-btn').on('click', function(e) {
      hideStep(4);
      $('.btn-edit').text('Сonfirm and Pay').attr('data-pay',true).css('background-color','red');
      $('.js-btn-confirm-and-pay').show();
    });

    //end of payment

    //step-2

    $('.btn-gift-card-togger').on('click', function() {
      $('.giftcard-form').toggle();
      $(this).toggleClass('active');
    });

    $('.discount-form').on('submit', function(e) {
      e.preventDefault();
      $(this).hide();
      customer.subtotal = customer.totalPrice;
      customer.totalPrice = +customer.totalPrice * 0.8;
      $('.js-total-price-amount').text(customer.totalPrice);
      let discountAmount = $('.js-discount-amount').text();
      discountAmount = +discountAmount + 20;
      $('.discount-info').show();

      $('.js-discount-amount').text(discountAmount);
      $('.js-subtotal-amount').text(customer.subtotal);
    });

    $('.giftcard-form').on('submit', function(e) {
      e.preventDefault();
      $(this).hide();

      customer.totalPrice = +customer.totalPrice * 0.95;
      let discountAmount = $('.js-discount-amount').text();

      discountAmount = +discountAmount + 5;
      
      $('.js-discount-amount').text(discountAmount);
      $('.discount-info').show();
      $('.js-total-price-amount').text(customer.totalPrice);
      $('.btn-gift-card-togger').attr('disabled', true);
    });

    $('.discount-input').on('keyup', function() {

      if ($(this).val().length > 0) {
        $('.btn-gift-card').removeAttr('disabled');
      } else {
        $('.btn-gift-card').attr('disabled',true);
      }

    });

    //end of step2
  }
  //end of if statement

  


  
})

///FUNCTIONS

function hideStep(step) {
  $(`.js-step[data-step="${step}"]`).addClass('display-none');
  $(`.js-step[data-step="${step}"]`).find('.confirmation-box').show();
}

function showStep(step) {
  $(`.js-step[data-step="${step}"]`).removeClass('display-none');
}

function moveToStep(step,isSecond = false) {
  $(`.step-button[data-step="${step}"]`).trigger('click');
  $(`.step-button[data-step="${step}"]`).removeAttr('disabled');
  $(`.js-step[data-step-inside="${isSecond}"]`).addClass('display-none');
  $('.js-confirmation-box').show();
}


function updateInputsByChoice(parent) {
  const visibleType = $(parent).children('input:checked').data('target');
  const hiddenType = $(parent).children('input:not(:checked)').data('target');
  $(visibleType).show();
  $(hiddenType).hide();
  console.log(visibleType);
  if(visibleType == '.js-billing-address-input-wrapper') {
    $('input[data-target=".js-billing-address-input-wrapper"]').parent().hide();
  } else {
    $('input[data-target=".js-billing-address-input-wrapper"]').parent().show();
    $('#billingAddressToggler').prop('checked', true);
    $('#dhltoggler').prop('checked', true);
  }
}


function formatPhoneNumber(str) {
  return `+ ${str.slice(0, 4)} ${str.slice(4, 7)}-${str.slice(7, 9)}-${str.slice(9, 11)}`;
}



function getCardDetails(btn) {
  const wrapper = $(btn).parent();
  const textWrapper = wrapper.find('.right-span .text');
  const plan = textWrapper.hasClass('region-text') ? "Region" : textWrapper.hasClass('country_text') ? "Country" : "Worldwide";
  console.log(plan);
  const data = {
    plan: plan,
    label: textWrapper.text(),
    amount: wrapper.find('h1 span.let').text(),
    priceData: {
      price: $(btn).prev().find('span').text(),
      days: $(btn).prev().text().split(' ').join('').split('/')[1][0]
    }
  }
  console.log(data);
  return data;
}

function setWorldWidePlan(data) {
  setBasicInPlans(data);
};

function setRegionPlan(data) {
  setBasicInPlans(data);
  let continent = data.label == "OCEANIA" ? "Australia" : data.label == "N. AMERICA" ? "North America" : data.label == "S. America" ? "South America" : data.label;
  continent = continent.toLowerCase();
  continent = continent.replace(continent[0],continent[0].toUpperCase());
  console.log(continent);
  const continentToBeClicked = getClickableParent('#region-select', continent);
  console.log(continentToBeClicked);
  continentToBeClicked.trigger('click');
};



function setCountryPlan(data) {
  setBasicInPlans(data);
  const countryToBeClicked = getClickableParent('#country-select', data.label);
  countryToBeClicked.trigger('click');
}


function setBasicInPlans(data) {
  const typesArray = ["START", "PRO", "MAX", "BUSINESS"];
  const elBtnToBeClicked = getClickableParent('#plan-select',data.plan);
  elBtnToBeClicked.trigger('click');
  $('#tariff-select').find(`.dropdown-item[data-original-index="${typesArray.indexOf(data.label) + 1}"]`).trigger('click');
  const gbToBeClicked = getClickableParent('#enter-gb',data.amount + ' Gb');
  gbToBeClicked.trigger('click');
  const periodToBeClicked = getClickableParent('#enter-period',data.priceData.days + ` ${data.priceData.days == "1" ? "day" : "days"}`);
  periodToBeClicked.trigger('click');

  $('.js-gb-amount-big').text(data.amount);
  $('.js-gb-amount').text(data.amount + 'Gb');
  $('.js-day-amount').text(`${data.priceData.days} days`);
  $('.js-internet-price-amount').text(`${data.priceData.price}`);
  $('.js-price-amount[data-free="yes"]').text(0);
  $('.js-plan-name').text(`${data.plan} Plan`);
}

function getClickableParent(selector,target) {
  return $(selector).find(`.dropdown-item span.text:contains("${target}")`).parent().parent();
}



function fillBasket() {
  const elBasketItemsBox = $('.js-card-wrapper');
  let chunk = '';
  let listChunk = `
  <div class="basket-line">
    <div class="basket-item">Package</div>
    <div class="basket-item">Plan</div>
    <div class="basket-item">Quantity/Period</div>
    <div class="basket-item">Services</div>
    <div class="basket-item">Pay </div>
  </div>`
  let packageChunk = '';
  let totalPrice = 0;

  $('.js-package-amount').text(basket.length);

  for (let i = 0; i < basket.length; i++) {
    totalPrice += parseInt(basket[i].priceData.price,10);
    console.log(basket[i].amount);
    const template = `
    <div data-item=${i+1} class="shopping-card__card js-shopping-card__card">
      <div class="item">

        <div class="top1">
          <img src="img/logo.svg" alt="logo">
          <span class="right-span">
            <div class="text tariff-name">${basket[i].label == "BUSINESS" ? "PROMAX" : basket[i].label}</div>
          </span>
        </div>
        <button onclick="removeItemFromBasket($(this));" data-item=${i+1} class="remove-btn js-remove-item"><img src="img/icons/close.svg" alt="remove"></button>
        <h1><span class="let gb-amount-big">${basket[i].amount}</span> Gb</h1>
        <div class="top2">
          <h4><span class="plan-name">${basket[i].plan} plan</span><span class="sim-type"><span
                class="sim-name">${basket[i].simType}</span></span></h4>
          <span class="line"></span>
        </div>
        <div class="top3">
          <h3 class="my-3">Included in your plan:</h3>

          <div class="included-item" id="internet-data-box">
            <div class="img-wrapper">
              <img src="img/icons/icon2.png" alt="icon1">
            </div>
            <div class="item-content d-flex ml-auto justify-content-between">
              <div class="content-left">
                <h3 class="item-name">Internet data</h3>
                <p class="item-period"><span class="card-gb-amount">${basket[i].amount}Gb</span>/<span class="card-day-amount">${basket[i].priceData.days} days</span></p>
              </div>
              <div class="content-right">
                $ <span class="price-amount internet-price-amount">${basket[i].priceData.days}</span> us
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
                ${basket[i].isDhl ? '<img width="45" height="10" src="img/icons/dhl.png" class="ml-2" alt="dhl">' : ''}
              </div>
              <div class="content-right">
                $ <span data-free="yes" class="price-amount">0</span> us
              </div>
            </div>
          </div>
          <span class="line"></span>
          <div class="total-price mt-3">$ <span class="total-price-amount">${basket[i].priceData.price}</span> us</div>
          <button type="button" data-item="${i+1}" class="btn-checkout js-add-service mt-3">Add Services</button>
        </div>
      </div>
    </div>`
    
    const listTemplate = `
    <div class="basket-line" data-item="${i+1}">
    <button onclick="removeItemFromBasket($(this));" data-item="${i+1}" class="remove-btn js-remove-item"><img src="img/icons/close.svg" alt="remove"></button>
      <div class="basket-item">
        <img src="img/icons/logo-r.svg" alt="logo">
        <div class="skewed-box location-name-wrapper"><span class="location-name">${basket[i].label}</span></div>
      </div> 
      <div class="basket-item">
        <div class="plan-name">${basket[i].plan} Plan</div>
        <div class="skewed-box sim-type-wrapper"><span class="sim-type">${basket[i].simType}</span></div>
      </div>
      <div class="basket-item quantity-period">
        <div class="card-gb-amount">${basket[i].amount}Gb</div>
        /
        <div class="card-days-amount">${basket[i].priceData.days}days</div>
      </div>
      <div class="basket-item">
        <div class="included-items-wrapper d-flex align-items-baseline justify-content-around">
          <div class="included-item" id="internet-data-wrapper">
            <div class="img-wrapper">
              <img src="img/icons/icon2-r.png" width="20" height="20" alt="icon1">
            </div>
            <div class="item-content">
              <h3 class="item-name">Internet data</h3>
            </div>
          </div>
          <div class="included-item inactive" id="voice-sms-wrapper">
            <div class="img-wrapper">
              <img src="img/icons/icon5-r.png" width="30" height="25" alt="icon1">
            </div>
            <div class="item-content">
              <h3 class="item-name">Voice and SMS</h3>
            </div>
          </div>
          <div class="included-item inactive" id="virtual-number-wrapper">
            <div class="img-wrapper">
              <img src="img/icons/icon3-r.png" width="26" height="26" alt="icon1">
            </div>
            <div class="item-content">
              <h3 class="item-name">Virtual number</h3>
            </div>
          </div>
          <div class="included-item inactive" id="substitution-number-wrapper">
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
    `
    
    const packagesCard = `
    <div data-item="${i+1}" class="basket-item flex-wrap js-basket-item">
      <div class="visible-content w-100 d-flex justify-content-between">
        <div>
          <div class="d-flex align-items-center">
            <img src="img/logo.svg" alt="logo" width="62" height="15">
            <div class="skewed-box"><span>${basket[i].label}</span></div>
          </div>
          <div class="basic-info"><span>${basket[i].plan} Plan</span> /  
            <span>${basket[i].simType}</span></div>
        </div>
        <div class="price-box">
          $ <span>${basket[i].priceData.price}</span> us
        </div>
      </div>
      <div class="hidden-content mx-auto my-3">
        <div class="top2">
          <h4><span class="plan-name js-plan-name">${basket[i].plan} Plan</span><span class="sim-type"><span
                class="sim-name js-sim-name">${basket[i].simType}</span></span></h4>
          <span class="line"></span>
          <div class="included-items-wrapper d-flex align-items-baseline justify-content-around mt-3">
            <div class="included-item" id="internet-data-box">
              <div class="img-wrapper">
                <img src="img/icons/icon2.png" alt="icon1">
              </div>
              <div class="item-content">
                <h3 class="item-name">Internet data</h3>
              </div>
            </div>
            <div class="included-item inactive" id="voice-sms-box">
              <div class="img-wrapper">
                <img src="img/icons/icon5.png" alt="icon1">
              </div>
              <div class="item-content">
                <h3 class="item-name">Voice and SMS</h3>
              </div>
            </div>
            <div class="included-item inactive" id="virtual-number-box">
              <div class="img-wrapper">
                <img src="img/icons/icon3.png" alt="icon1">
              </div>
              <div class="item-content">
                <h3 class="item-name">Virtual number</h3>
              </div>
            </div>
            <div class="included-item inactive" id="substitution-number-box">
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
            <span>$ <span class="js-subtotal-amount">1150</span> us</span>
          </div>
          <button data-item="${i+1}" class="rounded-button js-edit-package d-block mx-auto">Edit</button>
        </div>
      </div>
    </div>`

    packageChunk += packagesCard;
    listChunk += listTemplate;
    chunk += template;
  }

  $('.js-basket-list').html(listChunk);

  $('.basket-items-wrapper').html(packageChunk);

  elBasketItemsBox.html('');
  
  elBasketItemsBox.html(chunk);
    
  $('.js-subtotal-price-amount').text(totalPrice);
  
  elBasketItemsBox.removeClass('slick-initialized slick-slider');

  elBasketItemsBox.slick({
    arrows:true,
    slidesToShow: 3,
    infinite: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow:1
        }
      },
      {
        breakpoint: 350,
        settings: {
          arrows: false,	
          slidesToShow:1
        }
      }
    ]
  });
}


function updateCardInfo() {

  $('.day-amount').text(customer.VSperiod + ` ${customer.VSperiod == "1" ? "day" : "days"}`);
  
  $('.js-vs-price').text( customer.VSbalance )

  $('.gb-amount').text(customer.gb + 'Gb')

  $('.js-tariff-name').text(customer.tariff.toUpperCase());
  $('.js-sim-name').text(customer.simToBeSelected);
  
  $('.js-plan-name').text(`${customer.location} Plan`);

  if (customer.simToBeSelected == "Sim") {
    $('.sim-img').attr('src', 'img/icons/right-sim.png');
  } else {
    $('.sim-img').attr('src', 'img/icons/left-sim.png');
  }

  $('.js-v-day-amount').text(customer.Vperiod + ' month')
  let totalPrice = 0; 

  $('.js-price-amount').each(function(e) {
    totalPrice += parseInt($(this).text().split(' ').join(''),10);
  });

  if( customer.VSbalance != "" ) {
    totalPrice += parseInt(customer.VSbalance, 10);
    customer.totalPrice = totalPrice;
  }
  
  
  $('.js-total-price-amount').text(totalPrice);
}

function removeItemFromBasket(btn) {
  const dataItem = btn.attr('data-item');
  basket.splice(dataItem - 1, 1);

  let totalPrice = 0;
  basket.forEach(function(b) {
    totalPrice += parseInt(b.priceData.price,10);
  });
  $('.js-subtotal-price-amount').text(totalPrice);

  localStorage.removeItem('basket');
  localStorage.setItem('basket', JSON.stringify(basket));
  $(`.basket-line[data-item="${dataItem}"]`).remove();
  $(`.js-shopping-card__card[data-item="${dataItem}"]`).parent().parent().remove();
}

function updateCard(data) {

  $('.js-sim-name').text(data.simType);
  
  $('.js-plan-name').text(`${data.plan} Plan`);

  $('.js-gb-amount-big').text(data.amount)

  if (data.simType == "Sim") {
    $('.sim-img').attr('src', 'img/icons/right-sim.png');
  } else {
    $('.sim-img').attr('src', 'img/icons/left-sim.png');
  }
  

  $('.js-total-price-amount').text(data.totalPrice);

}


