let w = $('.preAnchor').css('width');
let goFrontespizio = false;

$(window).on('load', function() {
    init();
    $("html").animate({
    	scrollTop: "0px"
    },()=>{
    	$("body").addClass("lockScroll");
    });
    $(".backLoad").animate({
    	opacity: 0
    }, 500, ()=>{
    	$(".backLoad").removeClass("backLoad");
    });
});

function init(){
    console.log("DOM completamente caricato e analizzato");    
    let goVideo=true;
    $('.preAnchor').first().css({'background-color': 'coral'})
    toParoll();

    $(window).scroll(()=>{
        $('video[name = "go"]').each(function(){
            if (isElementInViewport(this) && goVideo){
                $(this)[0].play();
                this.setAttribute('name', 'goS');
            } else {
                $(this)[0].pause();
            }
        });

        $('video[name = "goS"]').each(function(){
            if (!isElementInViewport(this) && goVideo){
                $(this)[0].pause();
                this.setAttribute('name', '');
            }
        });
        
        scrollspy();

        fadeInOnScroll();
    });

    $('#sideNavContainer').mouseenter(()=>{
        $('#sideNavContainer').stop(true, false).animate({
            width: '220px'
        }, 350);
        
        $('.anchor').stop(true, false).animate({
            width: '208px'
        }, 350);
    });
    
    if($(window).width()>992){
        $('#sideNavContainer').trigger('mouseenter');
    }else{

    }

    $('.enter').mouseenter(()=>{
        closeNavbar(w);
    });

    $('.anchor').click((event)=>{
        if(goFrontespizio){
            goVideo=false;
            var top = document.getElementById(event.target.innerHTML).offsetTop;
            $("html, body").animate({ scrollTop: top+2 }, 1000, ()=>{
                goVideo=true; 
            });
        }
    });

    window.onresize = function(event) {
        toParoll();   
    };
}

let closeNavbar = ()=>{
    $('#sideNavContainer').stop(true, false).animate({
        width: w 
    }, 350);
    
    $('.anchor').stop(true, false).animate({
        width: '0px'
    }, 350);
}

function toParoll(){
    $(".sectionCit").paroller({
        factor: -0.3,  
        factorXs: -0.1,          // multiplier for scrolling speed and offset
        type: 'background',     // background, foreground
        direction: 'vertical' // vertical, horizontal
    });
}

function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= -100 &&
        rect.left >= -100 &&
        rect.bottom <= (window.innerHeight || document. documentElement.clientHeight)+100 &&
        rect.right <= (window.innerWidth || document. documentElement.clientWidth)+100
    );
}

function scrollspy() {
    let prevEl = $('.scrollSpy');
    let currentTop = $(window).scrollTop();
    let elems = $('.scrollSpy');
    elems.each(function(index){
        let elemTop = $(this).offset().top;
        let elemBottom = elemTop + $(this).height();
        if(currentTop >= elemTop && currentTop <= elemBottom){
            let val = $(this).attr('id');
            $('.preAnchor').css({'background-color': 'white'});
            $('div[name="'+ val +'"]').css({'background-color': 'coral'});
        }else if(!(currentTop >= elemTop && currentTop <= elemBottom) && currentTop >= prevEl.offset().top){
            let val = $(prevEl).attr('id');
            $('.preAnchor').css({'background-color': 'white'});
            $('div[name="'+ val +'"]').css({'background-color': 'coral'});
        }
        prevEl = $(this);
    });
}

function fadeInOnScroll(){
    let imgArr = $('img');
    let pArr = $('p');

    imgArr.each((i, v)=>{
        let top_of_object = $(v).offset().top;
        let bottom_of_window = $(window).scrollTop() + screen.height;
    
        if( top_of_object < bottom_of_window ){
            $(v).animate({'opacity':'1'}, 1600);   
        }
    });

    pArr.each((j, v)=>{
        let top_of_object = $(v).offset().top;
        let bottom_of_window = $(window).scrollTop() + screen.height;
    
        if( top_of_object < bottom_of_window ){
            $(v).animate({'opacity':'1'}, 1600);   
        }
    });
}

var unlockScroll = () => {
    closeNavbar();
    goFrontespizio=true;
    $("body").removeClass("lockScroll");
    $("#Introduzione").addClass('enter');
    $("#Introduzione").mouseenter(()=>{
        closeNavbar(w);
    });
	$("html, body").animate({
        scrollTop: document.getElementById("Biografia").offsetTop
    }, 1000);
}