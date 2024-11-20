1 // main js//

// back button animation
let backBtnTL = gsap.timeline({paused: true});
backBtnTL. from ('#back-btn', {
duration: 0.5,
x: -$(this).outerWidth ()
}) ;

// back button to go to screen 1
$ ('#back-btn'). click(function () {
    let screen = $(this).attr("data-screen");
    gsap. to('#screen' + screen, {
        duration: 0.5, 
        x: "+=250", 
        autoAlpha: 0,
        onComplete: function () {
        $( '#screen' + screen) .attr("style", ""); 
        screen2TL.restart().pause();
        screen3TL.restart().pause();
        gsap.to('#screen3 .content',{ opacity:0, duration: 0.2})
        gsap.to('#screen3 .pointer',{ opacity:0, duration: 0.2})
        $('#screen3 .icon').removeClass('active')
        exploreBtn.restart().pause();
        gsap. to ('#screen1', {
            autoAlpha: 1
        }) ;
    }
})
    backBtnTL. reverse();
})

let openingTL = gsap.timeline({
    paused: true
});

openingTL.add(function() {
    let i = 1;
    setInterval(function(){
        $("#frame" + i).hide();
        $("#frame" +(i+1)).show();
        if (i<8){
            i++
        } else{
            clearInterval(this);
        }
    }, 120);
});

openingTL.from("#map, #title-txt", {
    duration: 1,
    opacity: 0
}, "+=1");

openingTL.to("#title-txt", {
    duration: 1,
    opacity: 0.3
}, "+=3");

openingTL.from("#trillium", {
    duration: 1,
    opacity: 0
}, "-=3");

openingTL.from("#bird, #bird-bg", {
    duration: 1,
    opacity: 0
}, "-=2.5");

openingTL.from(".intro", {
    opacity: 0,
    y: 20,
    stagger: 0.25,
    ease: "power1.out"
});

$("#start-btn").click (function(){
    $(this).fadeOut("fast");
    openingTL.play();
});

//Screen 2
let screen2TL = gsap.timeline({
    paused: true
});
screen2TL.to(".page-title", {
    duration: 1,
    opacity:1
});
screen2TL.to("#map", {
    duration: 1,
    scale:1.4,
    y:-154
});
screen2TL.from(".map-marker", {
    duration: 1,
    opacity:0,
    stagger:1
});

//Screen 3
let screen3TL = gsap.timeline({
    paused: true
});
screen3TL.to(".page-title", {
    duration: 1,
    opacity:1
});
screen3TL.to("#screen3 .icon", {
    duration: 0.5,
    opacity:1,
    stagger:1,
});

let exploreBtn =gsap.to("#screen3 h3", {
    duration: 1,
    delay:3,
    opacity:1,
    paused:true
});

let zoomInIcons = gsap.to("#screen3 .left, #screen3 .right", {
    duration: 1,
    delay:4,
    scale:1.2,
    repeat:-1,
    yoyo:true,
    paused:true
});


$(".to-screen-btn").click(function(){
    let screen = $(this).attr("data-screen");
    gsap.to("#screen1",{
        duration: 0.5,
        autoAlpha: 0,
        x: -250,
        onComplete: function() {
            gsap.set("#screen1", {
                x: 0,
                opacity: 1
            });
            $("#screen" + screen).show();
            $('#back-btn').attr("data-screen", screen);
            backBtnTL.play();

            if (screen == "2"){
                screen2TL.play();
                $(".map-marker").mouseenter(function () {
                  // Hide all .history-content boxes
                  $(".history-content").css({
                    opacity: 0,
                    transform: "translateY(-20px)",
                  });

                  // Show the corresponding content box
                  $(this).next(".history-content").css({
                    opacity: 1,
                    transform: "translateY(0)",
                  });
                });

            }
            else if(screen == "3" || screen == "4"){
                let screenTL = (screen == "3") ? screen3TL : screen4TL;
                let exploreBtn = (screen == "3") ? exploreBtn3 : exploreBtn4;
                let zoomInIcons = (screen == "3") ? zoomInIcons3 : zoomInIcons4;

                screenTL.play();
                exploreBtn.play();

                gsap.to(`#screen${screen} .pointer`, { left:"750px", duration: 0.2 });

                $(`#screen${screen} .icon`).click(function(e){
                    let type = $(this).hasClass('activity') ? 'activity' : ($(this).hasClass('info') ? 'info' : 'classification');
                    exploreBtn.reverse();
                    if (type !== 'classification') zoomInIcons.restart();

                    $(this).addClass('active');
                    $(`#screen${screen} .icon:not(.${type})`).removeClass('active');

                    let pointerLeft = (type === 'activity') ? '699px' : (type === 'info' ? '980px' : '1210px');
                    gsap.to(`#screen${screen} .pointer`, { opacity:1, left:pointerLeft, duration: 0.2, delay:0.2 });

                    gsap.to(`#screen${screen} .content:not(.${type}-content)`, { opacity:0, duration: 0.2 });
                    gsap.to($(this).next(), { opacity:1, duration: 0.5 });
                });
            }
        }
    });
});

// Add these new timelines and animations for screen4
let screen4TL = gsap.timeline({
    paused: true
});
screen4TL.to("#screen4 .page-title", {
    duration: 1,
    opacity:1
});
screen4TL.to("#screen4 .icon", {
    duration: 0.5,
    opacity:1,
    stagger:1,
});

let exploreBtn4 = gsap.to("#screen4 h3", {
    duration: 1,
    delay:3,
    opacity:1,
    paused:true
});

let zoomInIcons4 = gsap.to("#screen4 .left, #screen4 .right", {
    duration: 1,
    delay:4,
    scale:1.2,
    repeat:-1,
    yoyo:true,
    paused:true
});

// Rename existing variables for screen3
let exploreBtn3 = exploreBtn;
let zoomInIcons3 = zoomInIcons;