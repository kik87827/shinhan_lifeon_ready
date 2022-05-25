if( window.console == undefined ){ console = { log : function(){} }; }
var touchstart = "ontouchstart" in window;
var userAgent=navigator.userAgent.toLowerCase();
var resizePartWidth = 1023;

document.addEventListener("DOMContentLoaded", function () {
    commonInit();
    wordBalloon();
    commonForm();
    vballoonFunc();
    commonResizeFunc(function(){
        sublistFunc();
    });
    toggleGroup();
});

function commonInit() {
    var touchstart = "ontouchstart" in window;
    var userAgent = navigator.userAgent.toLowerCase();
    var checkitem = [];
    if (touchstart) {
        browserAdd("touchmode");
    }
    if (userAgent.indexOf('samsung') > -1) {
        browserAdd("samsung");
    }
  
    if (navigator.platform.indexOf('Win') > -1 || navigator.platform.indexOf('win') > -1) {
        browserAdd("window");
    }
  
    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
        // iPad or iPhone
        browserAdd("ios");
    }
    
    window.onload = function(){
    }
    commonLayout();
  
    function browserAdd(opt){
      document.querySelector("html").classList.add(opt);
    }
}

function commonLayout(){
    var header_toptitle = document.querySelector(".header_toptitle");
    var header_toplogo_w = document.querySelector(".header_toplogo_w");
    var header_left = document.querySelector(".header_left");
    var header_left_wid = header_left !== null ? header_left.offsetWidth : 0;
    var header_right = document.querySelector(".header_right");
    var header_right_wid = header_right !== null ? header_right.offsetWidth : 0;
    var header_item_max = Math.max(header_left_wid , header_right_wid);

    function headerFunc(){
        if(header_toptitle !== null){
            header_toptitle.style.paddingLeft = header_item_max+"px";
            header_toptitle.style.paddingRight = header_item_max+"px";
        }
        if(header_toplogo_w !== null){
            header_toplogo_w.style.paddingLeft = header_left_wid+"px";
            header_toplogo_w.style.paddingRight = header_right_wid+"px";
        }
    }
    
    
    // mobile total
    function mbTotal(){
        var btn_htotal = document.querySelector(".btn_htotal"),
            mobile_mainmenu_zone = document.querySelector(".mobile_mainmenu_zone"),
            mainmenu_dim = document.querySelector(".mainmenu_dim"),
            btn_mbmenuclose = document.querySelector(".btn_mbmenuclose"),
            mbmenu_low = document.querySelector(".mbmenu_low"),
            mobile_mainmenu_wrap = document.querySelector(".mobile_mainmenu_wrap"),
            mbmenu_one = document.querySelector(".mbmenu_one"),
            mbmenu_two_vlist_w = document.querySelector(".mbmenu_two_vlist_w"),
            mbmenu_vli = document.querySelector(".mbmenu_vlist > li"),
            domHtml = document.querySelector("html"),
            domBody = document.querySelector("body");

        // init 
        if(mobile_mainmenu_zone === null){return;}
        btn_htotal.addEventListener("click",function(e){
            e.preventDefault();
            totalOpen();
        },false);
        btn_mbmenuclose.addEventListener("click",function(e){
            e.preventDefault();
            totalClose();
        },false);
        mainmenu_dim.addEventListener("click",function(e){
            e.preventDefault();
            totalClose();
        },false);
        function totalOpen(){
            mobile_mainmenu_zone.classList.add("active")
            setTimeout(function(){
                mobile_mainmenu_zone.classList.add("motion");
                domBody.setAttribute("data-scr", window.pageYOffset);
                domBody.style.marginTop = -window.pageYOffset + "px";
                domHtml.classList.add("touchDis");
            },30);
        }
        function totalClose(){
            mobile_mainmenu_zone.classList.remove("motion");
            setTimeout(function(){
                mobile_mainmenu_zone.classList.remove("active");
                domHtml.classList.remove("touchDis");
                domBody.style.marginTop = 0;
                window.scrollTo(0, parseInt(domBody.getAttribute("data-scr")));
            },500);
        }
    }

    headerFunc();
    mbTotal();
}

function commonResizeFunc(func){
    let window_width = 0;
    func();
    window.addEventListener("resize",function(){
        if(window_width == window.innerWidth){
			return;
		}
        func();
        window_width = window.innerWidth;
    },false);
}

function commonForm(){
    // $form_input.on("focusin keydown keypress",function(){
	// 	var $this = $(this);
	// 	var $t_p = $this.parents(".form_field");
		
	// 	$form_field.removeClass("active");
	// 	if($t_p.length){
	// 		$t_p.addClass("active");
	// 	}
	// });
	// $form_input.on("focusout",function(){
	// 	var $this = $(this);
	// 	var $t_p = $this.parents(".form_field");
		
	// 	if($t_p.length){
	// 		$t_p.removeClass("active");
	// 	}
	// });

    let sort_togitem = document.querySelectorAll(".sort_togitem");
    if(sort_togitem.length){
        sort_togitem.forEach(function(element,index){
            element.addEventListener("click",function(e){
                element.classList.toggle("active");
            },false);
        });
    }

    let form_select = document.querySelectorAll(".form_select");
    let input_form_select = document.querySelectorAll(".input_form_select");
    let domHTML = document.querySelector("html");
    if(form_select.length){
        form_select.forEach(function(element,index){
            formAction(element);
            element.addEventListener("click",function(e){
                element.classList.add("active");
            },false);
            element.addEventListener("change",function(e){
                formAction(element);
            },false);
        });
        function formAction(target){
            if(target.value === "0"){
                target.classList.remove("active");
            }else{
                target.classList.add("active");
            }
        }
    }

    let intext = document.querySelectorAll(".intext");
    if(intext.length===0){return;}

    intext.forEach(function(elem,index){
        elem.addEventListener("focus",function(e){
            focusInAction(e.currentTarget);
        },false);
        elem.addEventListener("keydown",function(e){
            focusInAction(e.currentTarget);
        },false);
        elem.addEventListener("keypress",function(e){
            focusInAction(e.currentTarget);
        },false);
        
        elem.addEventListener("focusout",function(e){
            focusOutAction(e.currentTarget);
        },false);
    });

    if(input_form_select.length){
        input_form_select.forEach(function(elem,index){
            let this_p = elem.closest(".input_form_select_w");
            if(elem.value.length>0){return;}
            this_p.classList.remove("active");

            elem.addEventListener("change",function(e){
                e.preventDefault();
                let this_p = elem.closest(".input_form_select_w");
                this_p.classList.add("active");
            },false);
            elem.addEventListener("focus",function(e){
                e.preventDefault();
                let this_p = elem.closest(".input_form_select_w");
                if(domHTML.classList.contains("window")){
                    this_p.classList.add("active");
                }
            },false);
            elem.addEventListener("focusout",function(e){
                let this_p = elem.closest(".input_form_select_w");
                if(elem.value.length>0){return;}
                this_p.classList.remove("active");
            },false);
        })
    }

    // $(document).on("change",".input_date",function(e){
	// 	e.preventDefault();
	// 	var $this = $(this);
	// 	var $this_p = $this.parents(".select_date_item");
	// 	$this_p.addClass("active");
	// });
	// $(document).on("focusin focus",".input_date",function(e){
	// 	e.preventDefault();
	// 	var $this = $(this);
	// 	var $this_p = $this.parents(".select_date_item");
	// 	if($("html").hasClass("win")){
	// 		$this_p.addClass("active");
	// 	}
	// });
	// $(document).on("focusout",".input_date",function(e){
	// 	e.preventDefault();
	// 	var $this = $(this);
	// 	var $this_p = $this.parents(".select_date_item");
	// 	if($this[0].value.length>0){return;}
	// 	$this_p.removeClass("active");
	// });

    function focusInAction(target){
        let currentTarget = target;
        let currentParent = currentTarget.closest(".inform_fxwrap").classList.add("active");
    }

    function focusOutAction(target){
        let currentTarget = target;
        let currentParent = currentTarget.closest(".inform_fxwrap").classList.remove("active");
    }
}


function toggleGroup(){
    addDynamicEventListener(document.body, 'click', '.btn_slike', function (e) {
        e.preventDefault();
        e.target.classList.toggle("active");
    });
}

function sublistFunc(){
    let list_thum_fxlist_w = document.querySelector(".list_thum_fxlist_w");
    let nodata_fxvitem = document.querySelector(".nodata_fxvitem");
    if(list_thum_fxlist_w !== null && list_thum_fxlist_w.closest(".mid_loopitem") === null){
        list_thum_fxlist_w.removeAttribute("style");
        list_thum_fxlist_w.style.minHeight = "calc(100vh - "+list_thum_fxlist_w.offsetTop+"px";
    }
    if(nodata_fxvitem !== null ){
        nodata_fxvitem.removeAttribute("style");
        nodata_fxvitem.style.minHeight = "calc(100vh - "+list_thum_fxlist_w.offsetTop+"px";
    }
}

function wordBalloon(){
    let page_wrap = document.querySelector(".page_wrap");
    let btn_call = document.querySelectorAll(".balloon_call");
    let btn_balloon_close = document.querySelectorAll(".btn_balloon_close");
    let balloon_layer = document.querySelectorAll(".balloon_layer");
    let balloon_layer_active = document.querySelectorAll(".balloon_layer.active");
    let balloon_layer_active_id = null;
    let balloon_parent = document.createElement('div');
    let page_wrap_wid = 0;
    let window_width = 0;
    if(page_wrap !== null){
        page_wrap_wid = page_wrap.offsetWidth;
    }
    if(btn_balloon_close !== null){
        btn_balloon_close.forEach(function(elem,index){
            elem.addEventListener("click",function(e){
                e.preventDefault();
                let cobj = e.currentTarget;
                cobj.closest(".balloon_layer").classList.remove("active");
            },false);
        });
    }
    if(balloon_layer !== null){
        balloon_parent.classList.add("balloon_parent")
        page_wrap.appendChild(balloon_parent);
        balloon_layer.forEach(function(elem,index){
            balloon_parent.appendChild(balloon_layer[index]);
        });
        window.addEventListener("resize",function(){
            if(window_width == window.innerWidth || balloon_layer_active === null){
                return;
            }
            page_wrap_wid = page_wrap.offsetWidth;
            if(balloon_layer_active.length === 0 || balloon_layer_active === null){return;}
            balloon_layer_active = document.querySelector(".balloon_layer.active");
            balloon_layer_active_id = balloon_layer_active.id || null;
            balloon_layer_active_btn = document.querySelector("[data-balloon='#"+balloon_layer_active_id+"']") || null;

             if(balloon_layer_active.classList.contains("left_pos")){
                balloon_layer_active.style.top = balloon_layer_active_btn.offsetTop-5 + "px";
                balloon_layer_active.style.width = balloon_layer_active_btn.offsetLeft-balloon_layer_active_btn.offsetWidth - 10 + "px";
             }else{
                balloon_layer_active.style.width = page_wrap_wid - (balloon_layer_active_btn.offsetLeft+balloon_layer_active_btn.offsetWidth+33)  + "px";
                balloon_layer_active.style.left = balloon_layer_active_btn.offsetLeft+balloon_layer_active_btn.offsetWidth+15  + "px";
             }

            window_width = window.innerWidth;
        },false);
        document.body.addEventListener("click",function(e){
            balloon_layer_active = document.querySelector(".balloon_layer.active");
            if(e.target.closest(".balloon_call") !== null){return;}
            if(e.target.closest(".balloon_layer.active") === null && balloon_layer_active !== null){
                balloon_layer_active.classList.remove("active");
            }
        },false);
    }
    if(btn_call !== null){
        btn_call.forEach(function(elem,index){
            if(elem.offsetLeft>page_wrap_wid/2){
                elem.classList.add("left_pos");
            }else{
                 elem.classList.add("right_pos");
            }
            elem.addEventListener("click",function(e){
                let currentTarget = e.currentTarget;
                let current_layer = document.querySelector(currentTarget.getAttribute("data-balloon"));
                if(current_layer === null){return;}
                current_layer.classList.toggle("active");
                if(currentTarget.classList.contains("left_pos")){
                    current_layer.classList.add("left_pos");
                    current_layer.style.width = currentTarget.offsetLeft-currentTarget.offsetWidth - 10 + "px";
                }else{
                    current_layer.classList.add("right_pos");
                    current_layer.style.width = page_wrap_wid - (currentTarget.offsetLeft+currentTarget.offsetWidth+33)  + "px";
                    current_layer.style.left = currentTarget.offsetLeft+currentTarget.offsetWidth+15  + "px";
                    console.log(page_wrap_wid,currentTarget.offsetLeft,currentTarget.offsetWidth);
                }
                current_layer.style.top = currentTarget.offsetTop-5 + "px";
                
            },false);
        });
    }
}

function DesignPopup(option) {
    this.selector = null;
    if (option.selector !== undefined) {
        this.selector = document.querySelector(option.selector);
    }
    this.design_popup_wrap = document.querySelectorAll(".popup_wrap");
    this.domHtml = document.querySelector("html");
    this.domBody = document.querySelector("body");
    this.pagewrap = document.querySelector(".page_wrap");
    this.btn_closeTrigger = null;
    this.bg_design_popup = null;
    this.scrollValue = 0;
    this.popupShow(option.selector);
}

DesignPopup.prototype.popupShow = function (target) {
    var objThis = this;
    this.selector = document.querySelector(target);
    if (this.selector == null) {
        return;
    }
    this.domBody.setAttribute("data-scr", window.pageYOffset);
    this.domBody.style.marginTop = -window.pageYOffset+"px";
    this.scrollValue = window.pageYOffset;
    this.domHtml.classList.add("touchDis");
    this.selector.classList.add("active");
	setTimeout(function(){
		objThis.selector.classList.add("motion");
	},30);


    this.btn_closeTrigger = this.selector.querySelectorAll(".close_trigger");
    
    this.bg_design_popup = this.selector.querySelector(".popup_wrap .bg_dim");
    this.domBody.append(this.selector);
    this.bindEvent(this.selector);
    
}
DesignPopup.prototype.popupHide = function (target) {
    var objThis = this;
    if (target !== undefined) {
        if (typeof target =="object"){
            this.selector = target;
        }else{
            this.selector = document.querySelector(target);
        }
        this.selector.classList.remove("motion");
        setTimeout(function(){
            //remove
            objThis.selector.classList.remove("active");
            objThis.design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
            if (objThis.design_popup_wrap_active.length==0){
                objThis.domHtml.classList.remove("touchDis");
                objThis.domBody.style.marginTop = 0;
                window.scrollTo(0, parseInt(objThis.domBody.getAttribute("data-scr")));
            }
        },420);
    }
}

DesignPopup.prototype.bindEvent = function () {
    var objThis = this;

    if (this.btn_closeTrigger.length) {
        for (var i = 0; i < this.btn_closeTrigger.length; i++) {
            this.btn_closeTrigger[i].addEventListener("click", function () {
                objThis.popupHide(objThis.selector);
            }, false);
        }
    }

    if (this.bg_design_popup !== null){
        this.bg_design_popup.addEventListener("click", function (e) {
            e.preventDefault();
            objThis.popupHide(objThis.selector);
        }, false);
    }
};




function DesignModal(option) {
    this.message = option.message;
    this.domHtml = document.querySelector("html");
    this.domBody = document.querySelector("body");
    this.pagewrap = document.querySelector(".page_wrap");
    this.design_modal_wrap = null;
    this.btn_dmsmidentify = null;
    this.btn_dmsmcancel = null;
    this.duration = option.duration !== undefined ? option.duration : 400;

    this.initShow(option);
}

DesignModal.prototype.initShow = function (option) {
    var innerPublish = '';
	var objThis = this;
    innerPublish += "<div class='design_modal_wrap'>";
    innerPublish += "  <div class='bg_dim'></div>";
    innerPublish += "    <div class='design_modal_item'>";
	innerPublish += "      <div class='design_modal_cont_w'><div class='design_modal_text'></div></div>";
	innerPublish += "        <div class='btn_dmsm_wrap'>";
	innerPublish += "          <a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmidentify'>확인</a>";
	if (option.type === "confirm") {
	innerPublish += "          <a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmcancel'>취소</a>";
	}
	innerPublish += "    </div>";
    innerPublish += "  </div>";
    innerPublish += "</div>";
    this.modalparent = document.createElement('div');
    this.pagewrap.appendChild(this.modalparent);
    this.modalparent.classList.add("design_modal_insert_wrap");
    this.modalparent.innerHTML = innerPublish;
    if (option.type === "confirm" || option.type === "alert") {
        this.design_modal_text = document.querySelector(".design_modal_text");
        this.btn_dmsmidentify = document.querySelector(".btn_dmsmidentify");
        this.design_modal_text.innerHTML = option.message;
    }
    if (option.type === "confirm") {
        this.btn_dmsmcancel = document.querySelector(".btn_dmsmcancel");
    }
    this.pagewrap.style.zIndex = 0;
    this.domBody.setAttribute("data-scr", window.pageYOffset);
    this.domBody.style.marginTop = -window.pageYOffset+"px";
    this.domHtml.classList.add("touchDis");
    this.design_modal_wrap = document.querySelector(".design_modal_wrap");
    this.closetrigger = document.querySelectorAll(".close_dmtrigger");

	this.design_modal_wrap.classList.add("active");
	setTimeout(function(){
		objThis.design_modal_wrap.classList.add("motion");
	},30);
    this.bindEvent(option);
}
DesignModal.prototype.removeHide = function () {
	var objThis = this;
	this.design_modal_wrap.classList.remove("motion");
	setTimeout(function(){
		//remove
		document.querySelector(".design_modal_insert_wrap").remove();
		objThis.design_modal_wrap.remove();
		objThis.domHtml.classList.remove("touchDis");
		objThis.domBody.style.marginTop = 0;
		window.scrollTo(0, Number(objThis.domBody.getAttribute("data-scr")));
	},420);
}
DesignModal.prototype.bindEvent = function (option) {
    var objThis = this;
    for (var i = 0; i < this.closetrigger.length; i++) {
        this.closetrigger[i].addEventListener("click", function () {
            objThis.removeHide();
        }, false);
    }
    if (this.btn_dmsmidentify !== null) {
        this.btn_dmsmidentify.addEventListener("click", function () {
            if (option.identify_callback !== undefined) {
                option.identify_callback();
            }
        }, false);
    }
    if (this.btn_dmsmcancel !== null) {
        this.btn_dmsmcancel.addEventListener("click", function () {
            if (option.cancel_callback !== undefined) {
                option.cancel_callback();
            }
        }, false);
    }
}


function multiRange(){
    let multi_range_z = document.querySelectorAll(".multi_range_z");
    multi_range_z.forEach(function(elem,index){
        let this_elem = elem;
        let inputLeft = this_elem.querySelector(".input-left"); 
        let inputRight = this_elem.querySelector(".input-right"); 
        let thumbLeft = this_elem.querySelector(".slider > .thumb.left"); 
        let thumbRight = this_elem.querySelector(".slider > .thumb.right"); 
        let range = this_elem.querySelector(".slider > .range");
        let setLeftValue = () => { 
            const _this = inputLeft; 
            const [min, max] = [parseInt(_this.min), parseInt(_this.max)]; 
            
            // 교차되지 않게, 1을 빼준 건 완전히 겹치기보다는 어느 정도 간격을 남겨두기 위해. 
            _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1); 
            
            // input, thumb 같이 움직이도록 
            const percent = ((_this.value - min) / (max - min)) * 100; 
            thumbLeft.style.left = percent + "%"; 
            range.style.left = percent + "%"; 
        }; 
        let setRightValue = () => { 
            const _this = inputRight; 
            const [min, max] = [parseInt(_this.min), parseInt(_this.max)]; 
            
            // 교차되지 않게, 1을 더해준 건 완전히 겹치기보다는 어느 정도 간격을 남겨두기 위해. 
            _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1); 
            
            // input, thumb 같이 움직이도록 
            const percent = ((_this.value - min) / (max - min)) * 100; 
            thumbRight.style.right = 100 - percent + "%"; 
            range.style.right = 100 - percent + "%"; 
        }; 
        
        inputLeft.addEventListener("input", setLeftValue); 
        inputRight.addEventListener("input", setRightValue);
    });

}


function vballoonFunc(){
    let domBody = document.querySelector("body");
    let mid_wrap = document.querySelector(".mid_wrap");
    let balloon_target = document.querySelectorAll(".d_vword_call");
    let btn_simple_word_close = document.querySelectorAll(".btn_simple_word_close");
    let simple_word_balloon_w = document.querySelectorAll(".simple_word_balloon_w");
    if(simple_word_balloon_w !== undefined){
        simple_word_balloon_w.forEach(function(elem,index){
            domBody.append(elem);
        });
    }
    if(balloon_target.length){
        balloon_target.forEach(function(elem,index){
            elem.addEventListener("click",function(e){
                e.preventDefault();
                let this_obj = elem;
                let this_obj_pos = elem.offsetTop;
                let this_obj_pos2 = elem.offsetLeft;
                let this_obj_height = elem.offsetHeight;
                let this_obj_attr = elem.getAttribute("data-wordballon");
                let this_simple_word_pointer = document.querySelector(".simple_word_pointer");
                let this_obj_target = document.querySelector(this_obj_attr);
                
                simple_word_balloon_w.forEach(function(elem,index){
                    elem.classList.remove("active");
                });

                this_obj_target.style.top  = (this_obj_pos+this_obj_height+10) + "px";
                this_simple_word_pointer.style.left = this_obj_pos2 + "px";
                this_obj_target.classList.add("active");
            },false);
        });
        btn_simple_word_close.forEach(function(elem,index){
            elem.addEventListener("click",function(e){
                e.preventDefault();
                elem.closest(".simple_word_balloon_w").classList.remove("active");
            },false);
        });
        window.addEventListener("resize",function(){
            if(simple_word_balloon_w.length){
                simple_word_balloon_w.forEach(function(elem,index){
                    if(elem.classList.contains("active")){
                        elem.classList.remove("active");
                    }
                });
            }
            // simple_word_balloon_w.forEach(function(elem,index){
            //     if(simple_word_balloon_w.classList.contains("active")){
            //         console.log(11);
            //     }
            // });
            
            // if(simple_word_balloon_w.classList.contains("active") && simple_word_balloon_w.length){
            //     simple_word_balloon_w.forEach(function(elem,index){
            //         let this_wrap = elem;
            //         console.dir(this_wrap)
            //     });
            // }
        },false);
    }
}


function toggleContent(){
    let togvitem = document.querySelectorAll(".togvitem");
    if(togvitem.length){
        togvitem.forEach(function(elem,index){
            let this_obj = elem;
            let this_btn = this_obj.querySelector(".btn_togvitem");
            this_btn.addEventListener("click",function(e){
                let togvitem_p = e.currentTarget.closest(".togvitem");
                let togvitem_cont = togvitem_p.querySelector(".togvitem_cont");
                e.currentTarget.classList.toggle("active");
                togvitem_cont.classList.toggle("active");
                // if(togvitem_cont.classList.contains("active")){
                //     togvitem_cont.style.height = "0px";
                //     setTimeout(function(){
                //         togvitem_cont.classList.remove("active");
                //     },500);
                // }else{
                //     togvitem_cont.classList.add("active");
                //     setTimeout(function(){
                //         togvitem_cont.style.height = togvitem_cont.children[0].scrollHeight + "px";
                //     },30);
                // }
               
                // let target_obj = btn_p.siblings(".togvitem_cont");
                // target_obj.classList.toggle("active");
            },false);
        });
    }
}


