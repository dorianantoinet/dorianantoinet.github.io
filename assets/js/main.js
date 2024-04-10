/*
	Miniport by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

// ---------- Modal Slider ---------- //
function navigation(slider) 
{
	let wrapper, dots, arrowLeft, arrowRight
  
	function markup(remove) {
	  wrapperMarkup(remove)
	  dotMarkup(remove)
	  arrowMarkup(remove)
	}
  
	function removeElement(elment) {
	  elment.parentNode.removeChild(elment)
	}
	function createDiv(className) {
	  var div = document.createElement("div")
	  var classNames = className.split(" ")
	  classNames.forEach((name) => div.classList.add(name))
	  return div
	}
  
	function arrowMarkup(remove) {
	  if (remove) {
		removeElement(arrowLeft)
		removeElement(arrowRight)
		return
	  }
	  arrowLeft = createDiv("arrow arrow--left")
	  arrowLeft.addEventListener("click", () => slider.prev())
	  arrowRight = createDiv("arrow arrow--right")
	  arrowRight.addEventListener("click", () => slider.next())
  
	  wrapper.appendChild(arrowLeft)
	  wrapper.appendChild(arrowRight)
	}
  
	function wrapperMarkup(remove) {
	  if (remove) {
		var parent = wrapper.parentNode
		while (wrapper.firstChild)
		  parent.insertBefore(wrapper.firstChild, wrapper)
		removeElement(wrapper)
		return
	  }
	  wrapper = createDiv("navigation-wrapper")
	  slider.container.parentNode.appendChild(wrapper)
	  wrapper.appendChild(slider.container)
	}
  
	function dotMarkup(remove) {
	  if (remove) {
		removeElement(dots)
		return
	  }
	  dots = createDiv("dots")
	  slider.track.details.slides.forEach((_e, idx) => {
		var dot = createDiv("dot")
		dot.addEventListener("click", () => slider.moveToIdx(idx))
		dots.appendChild(dot)
	  })
	  wrapper.appendChild(dots)
	}
  
	function updateClasses() {
	  var slide = slider.track.details.rel
	  slide === 0
		? arrowLeft.classList.add("arrow--disabled")
		: arrowLeft.classList.remove("arrow--disabled")
	  slide === slider.track.details.slides.length - 1
		? arrowRight.classList.add("arrow--disabled")
		: arrowRight.classList.remove("arrow--disabled")
	  Array.from(dots.children).forEach(function (dot, idx) {
		idx === slide
		  ? dot.classList.add("dot--active")
		  : dot.classList.remove("dot--active")
	  })
	}
  
	slider.on("created", () => {
	  markup()
	  updateClasses()
	})
	slider.on("optionsChanged", () => {
	  console.log(2)
	  markup(true)
	  markup()
	  updateClasses()
	})
	slider.on("slideChanged", () => {
	  updateClasses()
	})
	slider.on("destroyed", () => {
	  markup(true)
	})
}

  var sliderSmurfs2 = new KeenSlider("#keen-slider-smurfs2", {loop: true, mode: "free", slides: { perView: 2, spacing: 15, }, }, [navigation]);
  var sliderXxxl = new KeenSlider("#keen-slider-xxxl", {loop: true, mode: "free", slides: { perView: 2, spacing: 15, }, }, [navigation]);
  var sliderTlf = new KeenSlider("#keen-slider-tlf", {loop: true, mode: "free", slides: { perView: 2, spacing: 15, }, }, [navigation]);
  var sliderDataburst = new KeenSlider("#keen-slider-databurst", {loop: true, mode: "free", slides: { perView: 2, spacing: 15, }, }, [navigation]);
  var sliderOrbs = new KeenSlider("#keen-slider-orbs", {loop: true, mode: "free", slides: { perView: 2, spacing: 15, }, }, [navigation]);
  var sliderSrtd = new KeenSlider("#keen-slider-srtd", {loop: true, mode: "free", slides: { perView: 2, spacing: 15, }, }, [navigation]);

// ---------- Modal Slider ---------- //

  
// ---------- Typewriter effect ---------- //
var TxtType = function(el, toRotate, period) 
{
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = '';
	this.tick();
	this.isDeleting = false;
};

TxtType.prototype.tick = function() 
{
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];

	if (this.isDeleting) 
	{
		this.txt = fullTxt.substring(0, this.txt.length - 1);
	} 
	else 
	{
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

	var that = this;
	var delta = 200 - Math.random() * 100;

	if (this.isDeleting) { delta /= 2; }

	if (!this.isDeleting && this.txt === fullTxt) 
	{
		delta = this.period;
		this.isDeleting = true;
	} 
	else if (this.isDeleting && this.txt === '') 
	{
		this.isDeleting = false;
		this.loopNum++;
		delta = 500;
	}

	setTimeout(function() 
	{
		that.tick();
	}, delta);
};

function initTypewriterEffect() 
{
	var elements = document.getElementsByClassName('typewriter');
	for (var i=0; i<elements.length; i++) 
	{
		var toRotate = elements[i].getAttribute('data-type');
		var period = elements[i].getAttribute('data-period');
		if (toRotate) 
		{
			new TxtType(elements[i], JSON.parse(toRotate), period);
		}
	}

	// INJECT CSS
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".typewriter > .wrap {\n" +
		"\t\toverflow: hidden;\n" +
		"\t\tbackground: -webkit-linear-gradient(45deg, red, orange);\n" +
		"\t\t-webkit-background-clip: text;\n" +
		"\t\t-webkit-text-fill-color: transparent;\n" +
		"\t\tborder-right: .15em solid orange;\n" +
		"\t\twhite-space: nowrap;\n" +
		"\t\tanimation:\n" +
		"\t\t\t\tblinking 1s infinite;\n" +
		"\t }\n" +
		"\t@keyframes blinking {\n" +
		"\t\tfrom { border-color: transparent }\n" +
		"\t\tto { border-color: orange; }";

	document.body.appendChild(css);
}
// ---------- Typewriter effect ---------- //


function updateProjectsFilters() 
{
	var i, j;

	// Get the selected filters
	var checkboxes = document.querySelectorAll(".filters input");
	var filters = [];
	var c;
	for(i = 0; i < checkboxes.length; i++) 
	{
		if(checkboxes[i].checked) 
		{
			c = checkboxes[i].value;
			filters.push(c);
		}
	}

	// Apply the filter
	var items = document.querySelectorAll(".filterable");
	var item, filterOut;
	for(i = 0; i < items.length; i++) 
	{
		item = items[i];
		if(filters.length == 0) 
		{
			filterOut = false;
		} 
		else
		{
			// Union: only one of the filters needs to exist
			show = false;
			filterOut = true;


			for(j = 0; j < filters.length; j++) 
			{
				var elementFilterList = $(item).data('filter');

				if(elementFilterList.includes(filters[j]))
				{
					filterOut = false;
					break;
				}
			}
		}

		if(filterOut) item.classList.add("filterOut");
		else item.classList.remove("filterOut");
  }
}


(function($) 
{
	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
	breakpoints(
	{
		xlarge:  [ '1281px',  '1680px' ],
		large:   [ '981px',   '1280px' ],
		medium:  [ '737px',   '980px'  ],
		small:   [ null,      '736px'  ]
	});

	
	$window.on('load', function() 
	{
		// Play initial animations on page load.
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);

		// Typewriter effect
		initTypewriterEffect();

		// Projects filters 
		var checkboxes = document.querySelectorAll(".filters input");
		for(var i = 0; i < checkboxes.length; i++) 
		{
			checkboxes[i].addEventListener("change", updateProjectsFilters);
		}
	});

	// Scrolly.
	$('#nav a, .scrolly').scrolly(
	{
		speed: 500,
		offset: function() { return $nav.height(); }
	});

	// Modals
	$('a.modalLink').click(function(event) 
	{
		var hrefValue = $(this).attr('href');
		$(hrefValue).modal(
		{
			fadeDuration: 250,
			fadeDelay: 0.35
		});

		// Fix KeenSlider elements' size being wrong because of the modal window changing its size after the slider's initialization
		setTimeout
		(
			function() 
			{ 
				switch(hrefValue)
				{
					case '#modalSmurfs2': 
						sliderSmurfs2.update();
						break;

					case '#modalXxxl': 
						sliderXxxl.update();
						break;
					
					case '#modalTlf': 
						sliderTlf.update();
						break;

					case '#modalDataburst': 
						sliderDataburst.update();
						break;

					case '#modalOrbs': 
						sliderOrbs.update();
						break;

					case '#modalSrtd':
						sliderSrtd.update();
						break;

					default: break;
				}
			}
			, 100
		);

		return false;
	});

	// Image : clickable for fullscreen
	$('img.carouselElement').click(function()
	{
		var src = $(this).attr('src');
		$('<div>').css({
			background: 'RGBA(0,0,0,.5) url('+src+') no-repeat center',
			backgroundSize: 'contain',
			width:'100%', height:'100%',
			position:'fixed',
			zIndex:'10000',
			top:'0', left:'0',
			cursor: 'zoom-out'
		}).click(function(){
			$(this).remove();
		}).appendTo('body');
	});

})(jQuery);

