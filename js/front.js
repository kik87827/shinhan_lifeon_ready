if( window.console == undefined ){ console = { log : function(){} }; }
/** browser checker **/
;(function($){$.browserTest=function(a,z){var u='unknown',x='X',m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1]);}return r;},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;r.version=(c.exec(i)||[x,x,x,x])[3];if(r.name.match(/safari/)&&r.version>400){r.version='2.0';}if(r.name==='presto'){r.version=($.browser.version>9.27)?'futhark':'linear_b';}r.versionNumber=parseFloat(r.version,10)||0;r.versionX=(r.version!==x)?(r.version+'').substr(0,1):x;r.className=r.name+r.versionX;return r;};a=(a.match(/Opera|Navigator|Minefield|KHTML|Chrome/)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape']]):a).toLowerCase();$.browser=$.extend((!z)?$.browser:{},c(a,/(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/,[],/(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));$.layout=c(a,/(gecko|konqueror|msie|opera|webkit)/,[['konqueror','khtml'],['msie','trident'],['opera','presto']],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);$.os={name:(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase())||[u])[0].replace('sunos','solaris')};if(!z){$('html').addClass([$.os.name,$.browser.name,$.browser.className,$.layout.name,$.layout.className].join(' '));}};$.browserTest(navigator.userAgent);})(jQuery);//http://jquery.thewikies.com/browser/
var shpuzzle = shpuzzle || {};
shpuzzle = {
	touchis : "ontouchstart" in window,
	init : function(){
		var funcThis = this;
		$(function(){
			if(funcThis.touchis){
				$("html").addClass("touchmode");
			}else{
				$("html").removeClass("touchmode");
			}
			funcThis.dimLayerControl();
		});
		$(window).on("load",function(){
			funcThis.layBottomFunc();
		});
	},
	layBottomFunc: function () {
		var $btn_psmbot_wrap = $(".btn_psmbot_wrap");
		var $page_wrap = $(".page_wrap");
		$(window).on("resize", function () {
			action();
		}).resize();
		function action() {
			if ($btn_psmbot_wrap.length) {
				$page_wrap.css({ "padding-bottom": "" });
				$page_wrap.css({ "padding-bottom": $btn_psmbot_wrap.outerHeight() });
			}
		}
	},
	dimLayerControl: function () {
		var objThis = this,
			touchIs = "ontouchstart" in window,
			$modal = $(".dlayer_z");
		if ($modal.length === 0) { return; }
		$modal.on("click", ".dlayer_bg , .btn_dlayerclose,.closetrigger", function (e) {
			var $this = $(this),
				$t_p = $this.parents(".dlayer_z");
			e.preventDefault();
			objThis.dimLayerHide({ 'target': $t_p });
		});
	},
	dimLayerShow: function (option) {
		var objThis = this,
			touchIs = objThis.touchis,
			$modal = null,
			$page_wrap = null,
			$modal_box = null,
			$modal_box_w = null,
			$dlayer_bg = null,
			$btn_dfullsm_w = null,
			$dlayer_full_contlow = null,
			$dlayer_full_contlow_height = 0,
			$page_wrap_wid = 0,
			$btn_dfullsm_w_height = 0,
			$btn_dfullsm_top = null,
			$target = null;

		$(function () {
			$modal = $(".dlayer_z");
			$page_wrap = $(".page_wrap");
			$target = $(option.target);
			$modal_box = $target.find(".dlayer_box");
			$modal_box_w = $target.find(".dlayer_box_w");
			$btn_dfullsm_w = $target.find(".btn_dfullsm_w");
			$dlayer_full_contlow = $target.find(".dlayer_full_contlow");
			$dlayer_bg = $target.find(".dlayer_bg");
			$page_wrap_wid = $page_wrap.length ? $page_wrap.outerWidth() : 0;


			if ($modal.length === 0) { return; }
			$modal.removeClass("active");
			$target.addClass("active");

			$page_wrap.css({ "z-index": 0 });
			heightcheck();
			if ("openCallback" in option) {
				option.openCallback();
			}
			var $window_width = 0;
			$(window).on("resize", function () {
				if ($window_width == $(window).width()) {
					return;
				}
				$page_wrap_wid = $page_wrap.length ? $page_wrap.outerWidth() : 0;

				//heightcheck();
			});
			function heightcheck() {
				$dlayer_bg.css({ "width": "" });
				$btn_dfullsm_w_height = $btn_dfullsm_w.length ? $btn_dfullsm_w.outerHeight() : 0;
				$dlayer_full_contlow_height = $dlayer_full_contlow.length ? $dlayer_full_contlow.outerHeight() : 0;
				$btn_dfullsm_top = $btn_dfullsm_w.length ? parseInt($btn_dfullsm_w.css("bottom")) : 0;
				if (touchIs) {
					$("body").data("data-scr", $(window).scrollTop()).css({ "margin-top": -$(window).scrollTop() }).append($target);
					$("html").addClass("touchDis");
				} else {
					if ($(window).height() < $modal_box_w.outerHeight()) {
						//$dlayer_bg.css({ "width": $page_wrap_wid - objThis.getScrollBarWidth() });
					}
				}
				$dlayer_full_contlow.css({ "padding-bottom": $btn_dfullsm_w_height + $btn_dfullsm_top + 20 });
			}
		});
	},
	getScrollBarWidth: function () {
		var $outer = $('<div>').css({ visibility: 'hidden', width: 100, overflow: 'scroll' }).appendTo('body'),
			widthWithScroll = $('<div>').css({ width: '100%' }).appendTo($outer).outerWidth();
		$outer.remove();
		return 100 - widthWithScroll;
	},
	dimLayerHide: function (option) {
		var $callbtn = null,
			touchIs = "ontouchstart" in window,
			$modal = null,
			$target = null,
			transis = "TransitionEvent" in window,
			$t_box = null,
			$t_box_duration = 0;

		$(function () {
			$modal = $(".dlayer_w");
			$target = $(option.target);
			$target.removeClass("active");
			$(".page_wrap").css({ "z-index": "" });
			$("html,body").removeClass("touchDis");
			scrollEnd();

			if ("closeCallback" in option) {
				option.closeCallback();
			}

			function scrollEnd() {
				if (touchIs) {
					$("body").css({ "margin-top": 0 });
					window.scrollTo(0, Number($("body").data("data-scr")));
				}
			}
		});
	}
};
shpuzzle.init();

