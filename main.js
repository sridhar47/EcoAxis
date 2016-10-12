var getEnergy = function () {
	console.log("surya");
	alert("surya");
	var energies = {
				  		"energyconsumption" : [
				      		{
				         		"name": "ee-ytd",
				         		"displayname":"Electrical Energy YTD",
				         		"uom":"kWh",
				         		"value":"98665",
				         		"rvalue":"88890",
				         		"rvaluedesc":"Same period last year",
				         		"thresholdflag":false
				      		},
						],
				   		"waterconsumption" : [
				      		{
				         		"name": "per-capita-emissions-ytd",
				         		"displayname":"Per Capita GHG Emissions YTD",
				         		"uom":"kWh",
				         		"value":"98665",
				         		"rvalue":"88890",
				         		"rvaluedesc":"Same period last year",
				         		"thresholdflag":false
				      		},
				   		],
				   		"gasemission" : [
				      		{
				         		"name": "per-capita-emissions-ytd",
				        		"displayname":"Per Capita GHG Emissions YTD",
				         		"uom":"kWh",
				         		"value":"98665",
				         		"rvalue":"88890",
				         		"rvaluedesc":"Same period last year",
				         		"thresholdflag":false
				      		},
				   		]
					}
	return energies;
};


$(document).ready(function() {
    var all = getEnergy();
    console.log("all", all);
    $("#fullpage").fullpage({
        sectionSelector: '.section',
        slideSelector: '.slideme',
    });
    var totalSlides = $(".vr_slide .individual_slide").length;
    var maxPos = (totalSlides - 1) * 330;
    var activeEleIdx = $(".individual_slide.active").index();
    activeEleIdx = activeEleIdx + 1;
    var activePos = (activeEleIdx - 1) * 330;
    $(".vr_slide").css("top", "-" + activePos + "px");
    var currBtn = $(".indv_btn").eq(activeEleIdx - 1);
    $(currBtn).find(".btn_icons").addClass("active_btn");
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
        var videoStatus = $("#comp_video").css("display");
        if (videoStatus == "block") {
            var myPlayer = videojs("comp_video");
            myPlayer.pause();
            $("#comp_video").css("display", "none");
            $(".video_text").text("watch video");

        } else {
            var browserHeight = $(window).height();
            browserHeight = 0.5 * browserHeight;
            $("#comp_video").css({"display" : "block", "height" : browserHeight + "px"});
            $("#comp_video").addClass("video-js vjs-default-skin vjs-big-play-centered");

            videojs("comp_video", {"controls": true, "autoplay": false, "preload": "auto"}, function(){
                var myPlayer = this;
                myPlayer.play();
                myPlayer.requestFullscreen();
                $(".video_text").text("close video");
            });
        }
    });
});