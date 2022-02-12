$(document).ready(()=>{
    load();
});

function load()
{
    $.getJSON("json/pages.json", function( data ) {
        const hAnchor = 100/(countTitles(data)+1);
        $.each( data, function(key, val) {

            if((val.title!=null && val.type==4) || val.title == "Fonti") 
            {
                let d = document.createElement('div');
                $('#sideNavContainer').append(d);
                $(d).addClass('anchorCont');
                $(d).css({ 'height': hAnchor+'%'});

                let p = document.createElement('div');
                $(d).append(p);
                $(p).attr({'name': val.title});
                $(p).addClass('preAnchor');
                $(p).css({ 'height': hAnchor+'%'});

                let c = document.createElement('div');
                $(d).append(c);
                $(c).addClass('anchor');
                $(c).html(val.title);
                $(c).css({ 'height': hAnchor+'%'});
            }

            switch(val.type)
            {
                case 0:
                {

                    break;
                }
                case 1:
                {
                    let div = document.createElement('div');
                    let span = document.createElement('span');
                    let spanTit = document.createElement('span');

                    $(span).html(val.text);
                    $(span).addClass('text');
                    $(spanTit).html(val.title);
                    $(spanTit).addClass('title');
                    $(div).addClass('sectionText enter');
                    if(val.title!=null){
                        $(div).append(spanTit);
                    }
                    $(div).append(span);
                    
                    if(val.title=="Fonti"){
                        div.id = "Fonti"; 
                        $(div).addClass('scrollSpy');  
                    }
                    $("body").append(div);
                }
                break;
                case 2:
                {
                    let div= document.createElement('div');
                    let span= document.createElement('span');
                    
                    $(span).html(val.text);
                    $(span).addClass('cit');
                    $(div).addClass('sectionCit enter');
                    $(div).attr('id', val.title);
                    $(div).append(span);
                    if(val.bgImg!=null)
                        $(div).css('background-image', 'url("'+val.bgImg+'")');
                    else
                        $(div).css('background-color', val.bgColor);
                    
                    $("body").append(div);
                }
                break;
                case 3:
                {
                    let div = document.createElement('div');
                    let video= document.createElement('video');
                    let source= document.createElement('source');

                    $(div).addClass('sectionVideo enter');
                    $(source).attr('src', val.src );
                    video.controls = true;
                    video.setAttribute('name', 'go');
                    $(source).attr('type', 'video/mp4' );                    
                    $(video).append(source);
                    //$(video).attr('controls','');
                    $(div).append(video);
                    $("body").append(div);
                }
                break;
                case 4:
                {
                    let div= document.createElement('div');
                    let span= document.createElement('span');
                    
                    $(span).html(val.text);
                    $(span).addClass('titPar');
                    $(div).addClass('sectionCit enter scrollSpy');
                    $(div).attr('id', val.title);
                    $(div).append(span);
                    $(div).css('background-image', 'url("'+val.bgImg+'")');
                    $("body").append(div);
                }
                break;
                case 5:
                {
                    let contDiv= document.createElement('div');
                    $(contDiv).addClass("sectionCarousel enter");
                    let div= document.createElement('div');
                    div.id="carouselExampleControls";
                    $(div).addClass("carousel slide");
                    $(div).attr("data-ride", "carousel");
                    let d = document.createElement('div');
                    $(d).addClass("carousel-inner");
                    
                    $(d).append('<div class="carousel-item active"><img class="d-block w-100" src="media/img/giordano/giordano'+1+'.jpg"></div>');
                    for(let i = 2; i <= val.imgCount; i++){
                        $(d).append('<div class="carousel-item"><img class="d-block w-100" src="media/img/giordano/giordano'+i+'.jpg"></div>');
                    }
                    $(d).append('<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a>');
                    $(div).append(d);
                    $(contDiv).append(div);
                    $("body").append(contDiv);
                    break;
                }
            }
            
        });
        $.getScript("js/script.js");
    });    
}

const countTitles = (data)=>{
    let cnt = 0;
    data.forEach(d => {
        if(d.title!=null && d.type==1) cnt++;
    });
    return cnt;
}