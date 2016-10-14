$(document).ready(function() {

    $.ajax({
        url: '../js/energyData.json',
        type: 'get',
        dataType: 'json',
        error: function(data){
            console.log("data", data);
        },
        success: function(data){
            var energyValues = data;
            for(var i = 0; i < energyValues.length; i++) {
                if(i == 0) {
                    var currCarousel = $("#myCarouselenergy");
                    var type = "type1";
                    var amount = "amount1";
                } else if (i == 1) {
                    var currCarousel = $("#myCarouselwater");
                    var type = "type2";
                    var amount = "amount2";
                } else if(i == 2) {
                    var currCarousel = $("#myCarouselgreen");
                    var type = "type3";
                    var amount = "amount3";
                }
                var key = Object.keys(energyValues[i]);

                var engs = energyValues[i][key[0]];
                for(var j = 0; j < engs.length; j++) {
                    var eLength = engs[j].displayname.length;
                    var lastIdx = engs[j].displayname.lastIndexOf(" ");
                    var eName = engs[j].displayname.substring(0, lastIdx);
                    var eUnit = engs[j].displayname.substring((lastIdx + 1), eLength);
                    var para1 = document.createElement("p");
                    para1 = $(para1).addClass("eng_text").text(eName);
                    var para2 = document.createElement("p");
                    para2 = $(para2).addClass("eng_text eng_spec").text(eUnit);
                    var para3 = document.createElement("h");
                    para3 = $(para3).addClass("eng_text eng_amt_curr_yr").text(engs[j].value);
                    var para4 = document.createElement("p");
                    para4 = $(para4).addClass("eng_text unit").text(engs[j].uom);
                    var eng_type_contr = document.createElement("div");
                    eng_type_contr = $(eng_type_contr).addClass("eng_type_container").append(para1, para2, para3, para4);
                    var arr = document.createElement("div");
                    if(engs[j].thresholdflag == false) {
                        arr = $(arr).addClass("icon-Down_Arrow arrow_contr");
                    } else {
                        arr = $(arr).addClass("icon-Up_Arrow arrow_contr");
                    }
                    var arrSpec = document.createElement("div");
                    arrSpec = $(arrSpec).addClass("arrow_spec").append(arr);
                    var arrInd = document.createElement("div");
                    arrInd = $(arrInd).addClass("eng_indicator").append(arrSpec);
                    var aspec = document.createElement("p");
                    aspec  = $(aspec).addClass("amount_spec").text(engs[j].rvalue);
                    var aPrd = document.createElement("p");
                    aPrd = $(aPrd).addClass("amount_spec period").text(engs[j].rvaluedesc);
                    var aspecCoontr = document.createElement("div");
                    aspecCoontr = $(aspecCoontr).addClass("amount_spec_contr").append(aspec, aPrd);
                    var amountd = document.createElement("div");
                    amountd = $(amountd).addClass("eng_amount").append(aspecCoontr);
                    $(amountd).addClass(amount);
                    var typ = document.createElement("div");
                    typ = $(typ).addClass("eng_type").append(eng_type_contr, arrInd, amountd);
                    $(typ).addClass(type);
                    var engDesc = document.createElement("div");
                    engDesc = $(engDesc).addClass("energy_description").append(typ);
                    var itm = document.createElement("div");
                    itm = $(itm).addClass("item").append(engDesc);
                    if(j == 0) {
                        $(itm).addClass("active");
                    }
                    var car = $(currCarousel).find(".carousel-inner.crsl_contr").append(itm);
                } 
            }
        }
    });

    var totalHeight = parseInt($(".hdr_container").css('height'), 10);
    $("#fullpage").fullpage({
        paddingTop: totalHeight,
        sectionSelector: '.section',
        slideSelector: '.slideme',
        normalScrollElements: '.slide_4',
        afterResize: function () {
            $('.slide_4.section.social_ftr').css({'height': 100 + "px"});
            $('.slide_4.section.social_ftr .fp-tableCell').css({'height': 100 + 'px'});
        },
        onLeave : function (index, nextIndex, direction) {
           if(nextIndex == 2){
               var slideHeight = $('#fullpage .slide_1').height();
               var t = 'translate3d(0px, -'+(slideHeight)+ 'px, 0px)';
               setTimeout(function(){
                   $('#fullpage .slide_2').css({'padding-top': (Math.ceil(totalHeight/2)) +'px'})
                   $("#fullpage").css({"transform": t });
               }, 0)
           }
       }
    });

    var p = $('.fp-tableCell').height() - $('.slider_body_container').height() - $('.slider_body_footer').height();
    var padding = (p/2) + 'px 0';
    $('.slider_body_container').css({
        'padding': padding
    });
    var sl3Pad = $('.fp-tableCell').height() - $('.client_descrbr').height();
    sl3Pad = (sl3Pad / 2) + 'px 0';
    $('.client_container').css({'padding': sl3Pad});
    $('.slide_4.section.social_ftr').css({'height': 100 + "px"});
    $('.slide_4.section.social_ftr .fp-tableCell').css({'height': 100 + 'px'});
    var ftrPad = $('.slide_4.section.social_ftr .fp-tableCell').height() - $('.container.ftr_container').height();
    ftrPad = (ftrPad / 2) + 'px 0';
    $('.slide_4.section.social_ftr').css({'padding': ftrPad});
    var totalSlides = $(".vr_slide .individual_slide").length;
    var maxPos = (totalSlides - 1) * 330;
    var activeEleIdx = $(".individual_slide.active").index();
    activeEleIdx = activeEleIdx + 1;
    var activePos = (activeEleIdx - 1) * 330;
    $(".vr_slide").css("top", "-" + activePos + "px");
    var currBtn = $(".indv_btn").eq(activeEleIdx - 1);
    $(currBtn).find(".btn_icons").addClass("active_btn");
    var ldrMsgMaxHgt = $('.fp-tableCell').height() - totalHeight - 20;
    $(".ldr_speech").css({"max-height": ldrMsgMaxHgt + "px"});

    //whether to show read more button in leader speak section ---- start
    var allParas = $(".ldr_speech").find(".ldr_msg_para");
    var actualHeight = 0;
    $(".ldr_msg_para").each(function (){
        console.log("actualHeight", actualHeight);
        console.log("$(this)", $(this));
        actualHeight += $(this).height();
        console.log("actualHeight", actualHeight);
    });
    var maxHeight = $(".ldr_speech").height();
    if(actualHeight > maxHeight) {
        $(".ldr_extra_info").css({"display": "inline-block"});
    }
    $(".ldr_extra_info").click(function (){
        console.log($(".ldr_speech").html());
        $(".ldr_msg_sec").html($(".ldr_speech").html());
        // $(".ldr_msg_para").each(function (){
        //     console.log("$(this).text()", $(this).text());
        //     var para = document.createElement("p");
        //     $(para).addClass("ldr_msg").text($(this).text());
        //     $(".ldr_msg_sec").append(para);
        //     console.log('$(".ldr_msg_sec").text()', $(".ldr_msg_sec").text());
        // });
        // $(".ldr_msg_sec").text($("."))
    });
    //whether to show read more button in leader speak section ---- end

    $(".up_slide").click(function() {
        var currPos = parseInt($(".vr_slide").css("top"), 10);
        var currPosNeg = - currPos;
        if(currPosNeg < maxPos) {
            var finalPos = (currPos - 330);
            $(".vr_slide").css("top", finalPos + "px");
            var currEle = $(".individual_slide.active");
            var nextEle = $(".individual_slide.active").next();
            $(currEle).removeClass("active");
            $(nextEle).addClass("active");
            var currBtnIdx = $(currEle).index();
            var nextBtnIdx = $(nextEle).index();
            $($(".indv_btn").eq(currBtnIdx)).find(".btn_icons").removeClass("active_btn");
            $($(".indv_btn").eq(nextBtnIdx)).find(".btn_icons").addClass("active_btn");
        }
    });
    $(".down_slide").click(function() {
        var currPos = parseInt($(".vr_slide").css("top"), 10);
        if(currPos < 0) {
            var finalPos = currPos + 330;
            $(".vr_slide").css("top", finalPos + "px");
            var currEle = $(".individual_slide.active");
            var prevEle = $(".individual_slide.active").prev();
            $(currEle).removeClass("active");
            $(prevEle).addClass("active");
            var currBtnIdx = $(currEle).index();
            var prevBtnIdx = $(prevEle).index();
            $($(".indv_btn").eq(currBtnIdx)).find(".btn_icons").removeClass("active_btn");
            $($(".indv_btn").eq(prevBtnIdx)).find(".btn_icons").addClass("active_btn");
        }
    });
    $(".custom_icon").click(function() {
        var videoStatus = $(".video_container").css("display");
        if (videoStatus == "block") {
            var myPlayer = videojs("comp_video");
            myPlayer.pause();
            $(".video_container").css("display", "none");
            $(".video_text").text("watch video");

        } else {
            var topPad = $('.declaration_hdr').height();
            var browserHeight = $(window).height();
            browserHeight = 0.7 * browserHeight;
            $(".video_container").css({"display" : "block", "height": browserHeight, "top": topPad + "px"});
            $("#comp_video").addClass("video-js vjs-default-skin vjs-big-play-centered");
            var vHght = $(".video_container").height();
            var vWdth = $(".video_container").width();
            $("video").attr({"height": vHght, "width": vWdth});
            videojs("comp_video", {"controls": true, "autoplay": false, "preload": "auto"}, function(){
                var myPlayer = this;
                myPlayer.play();
                myPlayer.requestFullscreen();
                $(".video_text").text("close video");
            });
        }
    });
    $(".read_more").click(function() {
        $(".rm_title").text($(".client_header").text());
        $(".more_content").text($(".client_para").text());
    });
    $(".ftrs_content").click(function() {
        $(".ftr_title_popup").text("feature - " + $(".ftrs_content .item.active .ftr_title").text());
        var bgImg = $(".ftrs_content").find(".item.active .ftr_title_container").css("background-image");
        var bgRpt = $(".ftrs_content").find(".item.active .ftr_title_container").css("background-repeat");
        var bgPosn = $(".ftrs_content").find(".item.active .ftr_title_container").css("background-position");
        var bgSize = $(".ftrs_content").find(".item.active .ftr_title_container").css("background-size");

        $(".pimg_indv.left_img").css({"background-image" : bgImg});
        $(".pimg_indv.left_img").css({"background-repeat" : bgRpt});
        $(".pimg_indv.left_img").css({"background-position" : bgPosn});
        $(".pimg_indv.left_img").css("background-size", bgSize);
        $(".ftr_popup_text").text($(".ftrs_content .item.active .ftr_descr").text());
    });

    var setTopPos = function() {
        var totalHeight = parseInt($(".hdr_container").css('height'), 10);
        var topPos = totalHeight;
        $(".slide_1").css({"padding-top": topPos});
    }
    $(window).resize(function() {
        setTopPos();
    });
    setTopPos();
    var spchHeight = $(".ldr_speech .ldr_msg_para").height();
    var overflowHeight = $(".ldr_speech").height();
    if(spchHeight > overflowHeight) {
        
    } else {

    }
    if($(".ldr_speech .ldr_msg_para").height() > $(".ldr_speech").height()) {
        $(".ldr_extra_info").css({"display": "inline-block"});
    }
    $(".modal-content.login_content").css({"height": $(window).height() + "px"});
    $(".modal-content.ftr_content_popup").css({"height": $(window).height() + "px"});
    $(".modal-content.rm_content").css({"height": $(window).height() + "px"});
    $(".modal-content.leader_content").css({"height": $(window).height() + "px"});

    $(".login").click(function (){
        setTimeout(function() {
            if($("body").hasClass("modal-open") && $("#logInModal").hasClass("in")) {
                var popupHeight =  $(".modal-content.login_content").height();
                var modalBodyHeight = $(".modal-body.credential").height();
                var pTop = parseInt($(".modal-body.credential").css("padding-top"), 10);
                modalBodyHeight = modalBodyHeight + (2 * pTop);
                var hdrHeight = parseFloat($(".modal-header.login_header button").css("height"), 10);
                hdrPad = parseInt($(".modal-header.login_header").css("padding-top"), 10);
                var mTop = ((popupHeight - modalBodyHeight) / 2) - hdrHeight;
                $(".modal-body.credential").css({"margin-top": mTop + "px"});
                $(".main_wrapper").css({"filter": "blur(7px)", "-webkit-filter": "blur(7px)"});
            }
        },200);
    });
    $("#user_mail").on("keyup", function (e1){
        if(e1.keyCode == 13) {
            var email = $(this).val();
            $("#user_mail").css({"display": "none"}).queue(function (){
                $("#user_pwd").css({"display": "inline-block"});
            });
            $("#user_pwd").on("keyup", function (e2){
                if(e2.keyCode == 13) {
                    var password = $(this).val();
                    $(".modal-header.login_header .close").click();
                }
            });
        }
    });
    $(".modal-header.login_header .close").on("click", function (){
        $(".main_wrapper").css({"filter": "blur(0px)", "-webkit-filter": "blur(0px)"});
    });
    $('.modal').on('shown.bs.modal', function() {
        $.fn.fullpage.setAllowScrolling(false);
        $.fn.fullpage.setKeyboardScrolling(false);
    });
    $('.modal').on('hidden.bs.modal', function() {
        $.fn.fullpage.setAllowScrolling(true);
        $.fn.fullpage.setKeyboardScrolling(true);
    });
});