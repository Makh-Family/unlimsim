$(document).ready(function () {
	const elCardSlider = $('.js-card-wrapper');
	const elMainSlider = $('.js-carousel-inner');
	$(function () {
		// Enable tooltips everywhere
		
		
		if ($('[data-toggle="tooltip"]').length) {
			$('[data-toggle="tooltip"]').tooltip()
		}
	
		// iMask for phone fields
		const elPhoneNumberInput = document.getElementById('phone_number');
		if (elPhoneNumberInput) {
			IMask(elPhoneNumberInput, {
				mask: '+{7} (000) 000-00-00',
				lazy: false, // make placeholder always visible
				placeholderChar: '_' // defaults to '_'
			});
		}
		
	
		// Required & Optional Fields
		var requiredFields = ['#email', '#first_name', '#last_name', '#password', '#repeat_password', '#city', '#country'];
		var optionalFields = ['#address', '#address_detail', '#post_code', '#phone_number'];
	
		try {
			bootstrapValidate(requiredFields, 'required:This field is required.');
			bootstrapValidate('#email', 'email:Please enter a valid email.');
			bootstrapValidate('#repeat_password', 'matches:#password:Password confirmation does not match.');
		} catch (error) {
			console.log(error);
		}
	
	
		// Validate the form
		$('#buy-form').on("change", function () {
			var isFormValid = true;
	
			for (var i = 0; i < requiredFields.length; i++) {
				const selector = requiredFields[i];
	
				if (!$(selector).val()) { // if empty
					isFormValid = false;
				}
			}
	
			if (isFormValid) {
				$('.img-filter').css('filter', 'grayscale(0)');
				$('.img-filter').css('opacity', '1');
			} else {
				$('.img-filter').css('filter', 'grayscale(1)');
				$('.img-filter').css('opacity', '0.5');
			}
		});
	});
	
	
	/**
	 * Adding an automatic offset to the scroll position from URL hash
	 */
	var hash = window.location.hash;
	
	if (hash && hash != '#' && hash.length > 3) {
		var target = $(hash);
	
		if (target.length) {
			$('html, body').stop().animate({
				scrollTop: target.offset().top - 100
			}, 500, 'swing');
		}
	}
	
	
	/**
	 * When link clicked, navigate to element smoothly
	 */
	$("a[href^='#']:not([href='#'])").click(function (e) {
		e.preventDefault();
		var target = this.hash;
	
		if (target) {
			$('html, body').animate({
				scrollTop: $(target).offset().top - 100
			}, 500, 'swing');
		}
	});
	
	
	// scroll to top on press footer logo
	$('.footer-logo').click(function () {
		$("html, body").animate({
			scrollTop: 0
		}, "slow");
	});
	
	
	// Set blurry overlay background
	setTimeout(function () {
		$('.backdrop-image').css('display', 'none')
		$('.backdrop-overlay').css('display', 'none')
	}, 5000);
	
	// Set blurry overlay background
	$('.backdrop-overlay').click(function () {
		$('.backdrop-image').css('display', 'none')
		$('.backdrop-overlay').css('display', 'none')
	});
	
	/**
	 * Get countries of selected continent
	 */
	var loadCountryList = function (selectedContinent) {
		// get data
		$.getJSON("./../data/countries.json", function (data) {
			var countries = data.find(function (element) {
				return element.continent == selectedContinent;
			}).countries;
	
			// Sort countries in alphabetical order
			countries.sort();
	
			var options = [];
			$.each(countries, function (key, val) {
				options.push("<option value='" + key + "'>" + val + "</option>");
			});
	
			$("#countries-list")
				.empty()
				.append(options.join(""));
		});
	}
	
	// Load first continent when page loads
	loadCountryList('All');
	
	$('#continent-list').children().click(function () {
		var selectedContinent = $(this).text();
	
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
	
		loadCountryList(selectedContinent);
	});
	
	var region_texts = $('.region-text').map(function () {
		return $(this).text();
	}).get();
	
	$('#region-list').children('li').click(function (e) {
		e.preventDefault();
		
		if ($(window).width() > 450) {
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
		} else {
			if (e.target.matches('.nav-item.active .nav-link') || e.target.matches('.nav-item.active')) {
				$(this).toggleClass('nav-item--clicked');
				$(this).siblings().toggleClass('nav-item--show');
				} else {
					const thisClone = $(this).clone(true);
					$('.nav-item.active').before(this)
					$('.nav-item.active').remove();
					$('#region-list').children('li').first().removeClass('nav-item--show').addClass('active');
					$('#region-list').append(thisClone);
					$(this).removeClass('nav-item--clicked');
					$(this).siblings().removeClass('nav-item--show');
			}
		}

		
		
		var selectedRegion = $(this).find('a').data('value');
	
		if (selectedRegion == '*') {
			$('.region-text').each(function(index) {
				return $(this).html(region_texts[index]);
			});
			showCountries('*')
			$('.map-bg').css({
				"background-image": "url('img/src/all-map.png')"
			});
		}
		else {
			$('.region-text').html(selectedRegion);
			console.log(selectedRegion);
			showCountries(selectedRegion)
			$('.map-bg').css({
				"background-image": `url('img/src/${selectedRegion.split(' ').join('').toLowerCase()}-map.png')`
			});
		}
	});
	
	
	var priceList = {
		1: 25, // 1 Gb => $25
		2: 50,
		3: 70,
		4: 80,
		5: 85
	};
	
	var changeTarifPrice = function (val, obj) {
		val = val.replace(/[^0-9]/g, ''); // remove all chars except numbers
	
		var price = 0;
	
		if (val > 0 && val <= 5) {
			price = priceList[val];
		} else if (val > 5 && val <= 100) {
			price = 85 + 17 * (val - 5);
		}
	
		obj.closest('.ptw').find('.big-price').html(price);
	
		if (price) {
			obj.closest('.ptw').find('.buy-link').removeClass('disabled');
		} else {
			obj.closest('.ptw').find('.buy-link').addClass('disabled');
		}
	}
	
	// Changing value of price
	$('.tarif').keyup(function () {
		var $this = $(this);
		changeTarifPrice($this.val(), $this); // value in GB
	});
	
	// Search box autocomplete
	$('.tarif').autoComplete({
		minLength: 1,
		resolverSettings: {
			url: '../data/tarif-amount.json'
		}
	}).on('autocomplete.select', function (evt, item) {
		changeTarifPrice(item, $(this)); // value in GB
	});
	
	$(".tarif").blur(function () {
		var this$ = $(this);
	
		setTimeout(function () {
			if (this$.val() && !this$.val().includes('GB')) {
				this$.val(this$.val() + ' GB');
			}
		}, 100);
	});
	
	$('.toggle-ios').click(function () {
		$(this).toggleClass('active');
		$('.toggle-android').removeClass('active');
	
		$('#instruction-ios').toggle();
		$('#instruction-android').hide();
	});
	
	$('.toggle-android').click(function () {
		$(this).toggleClass('active');
		$('.toggle-ios').removeClass('active');
	
		$('#instruction-android').toggle();
		$('#instruction-ios').hide();
	});
	
	$('.close-instructions').click(function (e) {
		e.preventDefault();
	
		$('.toggle-android').removeClass('active');
		$('.toggle-ios').removeClass('active');
	
		$('#instruction-android').hide();
		$('#instruction-ios').hide();
	});
	
	
	$('#no_periods_select').on("change", function () {
		var index = $(this).val();
		var price = index * 30;
	
		$('.period_val').html(index * 30);
		$('.period_index').html(index);
	
		$('#actual_price').html(price);
		$('#sale_price').html(Math.round(price * 0.83));
	});
	
	
	// Search block
	$('.search-btn').click(function () {
		$('.search-block').css("left", "0");
		$('#search-input').focus();
	})
	
	$('.search-close').click(function () {
		$('.search-block').css("left", "100%")
	})
	
	
	// 
	var degree = 180;
	
	$('#table-toggler').click(function () {
		$('#dashboard-table').slideToggle("slow");
		$('.arrow').css("transform", "rotate(" + degree + "deg)")
		degree += 180;
	});
	
	$('#edit-button').click(function () {
		$('#contact-information').slideToggle();
		$('#dashboard-container').toggleClass('filter-gray');
	
		$('#dashboard-table').hide(); // this is optional
	});
	
	$('#submit-button').click(function (e) {
		e.preventDefault();
	
		// scroll to top
		$('html, body').animate({
			scrollTop: 0
		}, 400, 'swing');
	
		$('#contact-information').slideUp();
		$('#dashboard-container').removeClass('filter-gray');
	});
	
	/**
	 * START COUNTRY PLAN
	 */
	
	function rotateSelectIcon() {
		var degree = 0;
	
		degree = $(".under-select").hasClass('open') ? 180 : 0;
	
		$(".select-icon").css({
			'transform': `rotateZ(${degree}deg)`
		});
	}
	
	$('#chosen_country').focus(function () {
		$(".under-select").addClass('open');
		rotateSelectIcon();
	});
	
	$("#country-toggle-btn").click(function (e) {
		$(this).toggleClass('open');
		$(".under-select").toggleClass('open');
		rotateSelectIcon();
	});
	
	$('#map-coverage').on('click', 'li', function () {
		var selected_country = $(this).text();
		$('#chosen_country').val(selected_country)
	
		if (selected_country.length > 10) {
			selected_country = $.trim(selected_country).substring(0, 8) + "...";
		}
	
		$('.country_text').html(selected_country)
		$('.map-country-list').children('li').removeClass('active')
		$(this).addClass('active')
	
		$(".under-select").removeClass('open');
		rotateSelectIcon();
	});
	
	// Get list of countries from html
	var list_of_countries = $('.map-country-list li').not('.let').map(function () {
		return $(this).text();
	}).get();
	
	$('#chosen_country').keyup(function () {
		var typed_val = $(this).val().toUpperCase();
		var $results = $('#search-results').empty();
	
		// If typed value is null
		if (!typed_val) {
			$('.map-country-list').show();
			$results.hide();
	
			return;
		}
	
		// Hide list of countries in alphabetical order
		$('.map-country-list').hide();
	
		list_of_countries.forEach(function (country) {
			if (country.startsWith(typed_val)) {
				$results.append('<li>' + country + '</li>');
			}
		});
	
		// Show search results
		$results.show();
	});
	
	/**
	 * END OF COUNTRY PLAN
	 */
	
	
	// Update progress bar
	$('#progress-bar').css('width', function () {
		return $(this).data('value') + "%";
	});
	
	// Reference link on press question mark in form input
	$('.input-inline-icon').click(function () {
		var url = $(this).data("url");
		window.open(url, '_blank');
	});
	
	
	// Read a page's GET URL variables and return them as an associative array.
	function getUrlParams() {
		var vars = [],
			hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for (var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	}
	
	// If query parameter has been provided, display overlay pop-up
	var query = getUrlParams()["display"];
	
	if (query == 'thankyou') {
		$(".backdrop-image").prependTo("body");
		$(".backdrop-overlay").prependTo("body");
	}	







	//SLIDER////


	if (elMainSlider.length) {
		elMainSlider.slick({
			arrows: false,
			dots: true,
			dotsClass: 'js-carousel-indicators'
		});
	}

	
	
	if (elCardSlider.length) {
		elCardSlider.slick({
			arrows:true,
			dots: true,
			slidesToShow: 3,
			dotsClass: 'js-cards-indicators',
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


	/////MAP TAPS////////////



	const elMapRedirectBox = $('.world-wide-text-wrapper');
	
	elMapRedirectBox.click(function() {
		const topOffset = $('.tab_content-map').offset().top;
		$("html, body").animate({
			scrollTop: topOffset - 100
		}, "slow");
	});

	showCountries('*');



});

function showCountries(continent) {
	const elCountriesBox = $('.countries-box');
	let countries = [];
	continent = continent === "N. AMERICA" ? "North America" : continent === "S. AMERICA" ? "South America" : continent; 
	const filePath = continent === "*" ? 'worldwide' : `regions/${continent.replace(' ','').toLowerCase()}`;
	
	$.getJSON("./../data/countries.json", function (data) {
		if(continent === '*') {
			countries = [...data[data.length - 1].countries];
		} else {
			countries = data.filter(function(f) {
				if (continent.toUpperCase() === f.continent.toUpperCase()) {
					return f.countries;
				}
			})[0].countries;
		}
		countries.sort();

		elCountriesBox.html('');
		let readyHtml = '';
		
		// console.log(countries + 'wefw');
		countries.forEach(function(country) {
			const template = `<li><img src="img/${filePath}/${country.replace('\'','').split(' ').join('')}_m.png" width="25" height="17" alt=""><span>${country.toLowerCase()}</span></li>`
			readyHtml += template;
		});
		elCountriesBox.html(readyHtml);
	});
}