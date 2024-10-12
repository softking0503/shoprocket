$(document).ready(function() {
    $('.register-tnc').on('click', function(e) {
        let tncDialog = bootbox.dialog({
            message: ' ',
            onEscape: true,
            backdrop: true,
            title: 'Terms and Conditions'
        });

        tncDialog.init(function() {
            tncDialog.find('.modal-header button').addClass('h-auto');
            tncDialog.find('.bootbox-body').html($('.register-tnc').closest('span').next('textarea').text());
        });
    });
    
    // dropdown nav
    $('.menu-horizontal > .dropdown').on('click', function(e){

        $("body").attr('data-overlay',5);

        e.stopPropagation();

        $(document).on('click', function(e) {
            // console.log("click");
            if ($(event.target).parents('.dropdown').length==0) {

                $("body").attr('data-overlay',0);
                
                $('.dropdown--active').removeClass('dropdown--active');

                //this event listener has done its job so we can unbind it.
                $(this).unbind(event);
            }
        });

        // $('.dropdown--active').not(e.currentTarget).removeClass('dropdown--active');
        $('.menu-horizontal > .dropdown--active').not(this).removeClass('dropdown--active');
        $(this).toggleClass('dropdown--active');
    });


    // dropdown sub nav
    $('.menu-vertical > .dropdown').on('click', function(e){

        // console.log("click V");

        e.stopPropagation();

        $(document).on('click', function(e) {
            console.log("click");
            if ($(event.target).parents('.dropdown').length==0) {
                $('.dropdown--active').removeClass('dropdown--active');

                //this event listener has done its job so we can unbind it.
                $(this).unbind(event);
            }
        });

        // $('.dropdown--active').not(e.currentTarget).removeClass('dropdown--active');
        $('.menu-vertical > .dropdown--active').not(this).removeClass('dropdown--active');
        $(this).toggleClass('dropdown--active');
    });

    // // close nav on outside click
    // $('.dropdown').on('focusout', function () {
    //     console.log("out");
    //     $(this).toggleClass('dropdown--active');
    // });

    // Get the navbar
    var navbar = document.getElementById("menu1");
    if (typeof navbar !== undefined && navbar !== null) {
        // When the user scrolls the page, execute myFunction
        window.onscroll = function() {stickyNav()};

        // Get the offset position of the navbar
        var sticky = navbar.offsetTop;    
    }
    
    // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function stickyNav() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("pos-fixed")
      } else {
        navbar.classList.remove("pos-fixed");
      }
    }

    // Global loading for form submits
    $(document).on('submit', 'form', function(event) {
        $(this).find("button[type=submit]").toggleClass("btn--loading");
    });

    $(".store-avatar").on("error", function () {
        $(this).attr("src", "/assets/img/logo.png");
    });

    $('body').tooltip({
        selector: '[data-toggle="tooltip"]'
    });

    $('[data-delay-src]').each(function(){
        var $el = $(this);
        $el.attr('src', $el.attr('data-delay-src'));
        $el.removeAttr('data-delay-src');
    });

    $('.alert__close').on('click touchstart', function(){
        jQuery(this).closest('.alert').addClass('alert--dismissed');
    });

    $('.background-image-holder').each(function() {
        var imgSrc = $(this).children('img').attr('src');
        $(this).css('background-image', 'url("' + imgSrc + '")').css('background-position', 'initial').css('opacity','1');
    });

    $('.notification-close').on('click', function(){
        $('.notif-session').addClass('notification--dismissed');
    });

    $('.notification').each(function(){
        setTimeout(function() {
            $('.notif-session').addClass('notification--dismissed');
        }, 5000);
    });

    setTimeout(function() {
        $('.typed-text').each(function(){
            var text = $(this);
            var strings = text.attr("data-typed-strings") ? text.attr("data-typed-strings").split(",") : [],
                themeDefaults = {
                    strings: [],
                    typeSpeed: 100,
                    loop: true,
                    showCursor: false
                }, ao = {};

            ao.strings = text.attr("data-typed-strings") ? text.attr("data-typed-strings").split(",") : undefined;

            $(text).typed(jQuery.extend({}, themeDefaults, ao));
        });
    }, 4000);
});
function InOut(elem) {
    window.slides = elem;
    elem.delay()
    .fadeIn(function() {
        elem.delay(5000)
        .fadeOut(
          function() {
            if (elem.next().length > 0) {
              InOut(elem.next());
            } else {
              InOut(elem.siblings(':first'));
            }
          }
        );
    });
}

$(function() {
  $('.slides li').fadeOut();
  InOut($('.slides li:first'));
});

// $(document).on('mouseleave','.slides',  function() {
//     $('.slides li').hide();
//     InOut($('.slides li:first'));
// });

//////////////// Utility Functions

$(document).on('click', '.play-btn', function(e) {
    let homeVideo = bootbox.dialog({
        size: 'large',
        backdrop: true,
        onEscape: true,
        message: '<iframe width="100%" height="400" src="https://www.youtube.com/embed/ql-8kKtCxxY?rel=0&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><span class="close"></span>'
    });

    homeVideo.init(function() {
        homeVideo.addClass('fe-bootbox-modal');
        homeVideo.attr('id', 'home_video_modal');

        homeVideo.find('.modal-header').remove();

        homeVideo.find('.close').click(function(e) {
            homeVideo.modal("hide");
        });
    });

    log_event("event", "Homepage video played");
});

// review bootbox


$(document).on('click', '.review', function() {
    displayReviewInBootbox($(this));
});

function displayReviewInBootbox(currentSnippet) {
    let title = currentSnippet.find('h4').text();
    let content = currentSnippet.find('.review-body').html();
    var bootboxContent = `
        <img class="review-stars" src="/assets/img/stars.svg">
        <div class="review-content">${content}</div>
        <div class="review-author">${currentSnippet.find('.reviewer').html()}</div>
        <span class="prev-review"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"/></svg></span>
        <span class="next-review"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg></span>
    `;

    let reviewModal = bootbox.dialog({
        title: title,
        message: bootboxContent,
        size: 'large',
        backdrop: true, // Close the modal when clicking outside of it
        onEscape: true  // Close the modal when the escape key is pressed
    });

    reviewModal.find('.prev-review').click(function() {
        let prevSnippet = currentSnippet.prevAll('.review').first();
        if (prevSnippet.length) {
            reviewModal.modal('hide');
            displayReviewInBootbox(prevSnippet);
        }
    });

    reviewModal.find('.next-review').click(function() {
        let nextSnippet = currentSnippet.nextAll('.review').first();
        if (nextSnippet.length) {
            reviewModal.modal('hide');
            displayReviewInBootbox(nextSnippet);
        }
    });
}





/// Checkbox & Radio Inputs
$('.input-checkbox input[type="checkbox"], .input-radio input[type="radio"]').each(function(index){
    var input = $(this),
        label = input.siblings('label'),
        id    = "input-assigned-"+index;
    if(typeof input.attr('id') === typeof undefined || input.attr('id') === ""){
        input.attr('id',id);
        label.attr('for',id);
    }else{
        id = input.attr('id');
        label.attr('for',id);
    }
});

// Switch for monthly/annually updates
$(document).on('click', '.pricing-switch', function(e) {

    $(this).attr('disabled', true);

    $(".pricing-switch").prop("checked", this.checked);
    $(".switch-data").not(".hide").fadeOut( 300 );

    // change hidden input value for submission
    $("input[name=pricing_cycle]").val('monthly');
    if ($(this).is(':checked'))
    {
        $("input[name=pricing_cycle]").val('yearly');
    }

    setTimeout(function() {
        $(".switch-data.hide").fadeIn( 300 );
        $(".switch-data").toggleClass( "hide");
    }, 300);

    setTimeout(function() {
        $(".pricing-switch").attr('disabled', false);
    }, 600);
});

$(document).on('click', '.accordion-item', function(e) {
    if( $(this).hasClass("active") )
    {
        $(this).removeClass("active");
    }
    else
    {
        $(".accordion-item").removeClass("active");
        $(this).addClass("active");

        log_event("faq", $(this).find('h5').html());
    }
});

$(document).on('click', '.api-docs-link', function(e) {
    log_event("api docs link clicked");
});

$(document).on('click', '.price_plan', function(e) {
    log_event("register_button", $(this).attr('data-plan'));   
});

// reCAPTCHA loaded and ready to use
function recaptchaLoaded() {
    // console.log("recaptcha loaded");
    // execute required for invisible captcha
    // execute grecaptcha on login/register forms
    if (document.querySelector('#auth') !== null)
    {
        grecaptcha.execute();
    }

    // $(document).find("button[type=submit]").removeClass("btn--loading");
}

// reCAPTCHA token returned, allow buttons to be clicked now
function recaptchaCallback(token) {
    $("#auth").append('<input type="hidden" name="g-recaptcha-response" value="'+token+'">');
    $("#auth").find("button[type=submit]").removeClass("btn--loading");
}

// try now demo
$(document).on('submit', '#try-now', function(event) {
    event.preventDefault(); // Prevent form submission

    var form = $(this);
    var submitButton = form.find("button[type=submit]");

    // Get the entered URL
    var inputUrl = $("#demo-url").val();

    $.ajax({
        url: '/ajax/event',
        type: 'POST',
        dataType: 'JSON',
        data: {
            'type': 'try now demo',
            'description': inputUrl,
        }
    });
    
    // Prepend 'https://' if it's missing
    if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://'))
    {
        inputUrl = 'https://' + inputUrl;
    }

    try {
        // Validate the URL
        var urlObj = new URL(inputUrl);
    } catch (error) {
        // Display error message
        form.attr("data-toggle", "tooltip");
        form.attr("data-placement", "top");
        form.attr("data-bs-original-title", "Invalid URL, please try again");
        form.tooltip("show");

        // Toggle loading state back
        setTimeout(function() {
            submitButton.removeClass("btn--loading");
        }, 250);

        return;
    }

    // Toggle loading state back
    setTimeout(function() {
        submitButton.removeClass("btn--loading");
    }, 250);

    // Open a new tab with the Shoprocket URL
    var shoprocketUrl = 'https://try.shoprocket.io/?url=' + encodeURIComponent(inputUrl);
    window.open(shoprocketUrl, '_blank');
});

////////////////////////////// lazysizes //////////////////////////////
/*! lazysizes - v5.2.0-beta1 */
!function(a,b){var c=b(a,a.document);a.lazySizes=c,"object"==typeof module&&module.exports&&(module.exports=c)}("undefined"!=typeof window?window:{},function(a,b){"use strict";var c,d;if(function(){var b,c={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:1.5,hFac:.8,loadMode:2,loadHidden:!0,ricTimeout:0,throttleDelay:125};d=a.lazySizesConfig||a.lazysizesConfig||{};for(b in c)b in d||(d[b]=c[b])}(),!b||!b.getElementsByClassName)return{init:function(){},cfg:d,noSupport:!0};var e=b.documentElement,f=a.Date,g=a.HTMLPictureElement,h="addEventListener",i="getAttribute",j=a[h],k=a.setTimeout,l=a.requestAnimationFrame||k,m=a.requestIdleCallback,n=/^picture$/i,o=["load","error","lazyincluded","_lazyloaded"],p={},q=Array.prototype.forEach,r=function(a,b){return p[b]||(p[b]=new RegExp("(\\s|^)"+b+"(\\s|$)")),p[b].test(a[i]("class")||"")&&p[b]},s=function(a,b){r(a,b)||a.setAttribute("class",(a[i]("class")||"").trim()+" "+b)},t=function(a,b){var c;(c=r(a,b))&&a.setAttribute("class",(a[i]("class")||"").replace(c," "))},u=function(a,b,c){var d=c?h:"removeEventListener";c&&u(a,b),o.forEach(function(c){a[d](c,b)})},v=function(a,d,e,f,g){var h=b.createEvent("Event");return e||(e={}),e.instance=c,h.initEvent(d,!f,!g),h.detail=e,a.dispatchEvent(h),h},w=function(b,c){var e;!g&&(e=a.picturefill||d.pf)?(c&&c.src&&!b[i]("srcset")&&b.setAttribute("srcset",c.src),e({reevaluate:!0,elements:[b]})):c&&c.src&&(b.src=c.src)},x=function(a,b){return(getComputedStyle(a,null)||{})[b]},y=function(a,b,c){for(c=c||a.offsetWidth;c<d.minSize&&b&&!a._lazysizesWidth;)c=b.offsetWidth,b=b.parentNode;return c},z=function(){var a,c,d=[],e=[],f=d,g=function(){var b=f;for(f=d.length?e:d,a=!0,c=!1;b.length;)b.shift()();a=!1},h=function(d,e){a&&!e?d.apply(this,arguments):(f.push(d),c||(c=!0,(b.hidden?k:l)(g)))};return h._lsFlush=g,h}(),A=function(a,b){return b?function(){z(a)}:function(){var b=this,c=arguments;z(function(){a.apply(b,c)})}},B=function(a){var b,c=0,e=d.throttleDelay,g=d.ricTimeout,h=function(){b=!1,c=f.now(),a()},i=m&&g>49?function(){m(h,{timeout:g}),g!==d.ricTimeout&&(g=d.ricTimeout)}:A(function(){k(h)},!0);return function(a){var d;(a=!0===a)&&(g=33),b||(b=!0,d=e-(f.now()-c),d<0&&(d=0),a||d<9?i():k(i,d))}},C=function(a){var b,c,d=99,e=function(){b=null,a()},g=function(){var a=f.now()-c;a<d?k(g,d-a):(m||e)(e)};return function(){c=f.now(),b||(b=k(g,d))}},D=function(){var g,m,o,p,y,D,F,G,H,I,J,K,L=/^img$/i,M=/^iframe$/i,N="onscroll"in a&&!/(gle|ing)bot/.test(navigator.userAgent),O=0,P=0,Q=0,R=-1,S=function(a){Q--,(!a||Q<0||!a.target)&&(Q=0)},T=function(a){return null==K&&(K="hidden"==x(b.body,"visibility")),K||!("hidden"==x(a.parentNode,"visibility")&&"hidden"==x(a,"visibility"))},U=function(a,c){var d,f=a,g=T(a);for(G-=c,J+=c,H-=c,I+=c;g&&(f=f.offsetParent)&&f!=b.body&&f!=e;)(g=(x(f,"opacity")||1)>0)&&"visible"!=x(f,"overflow")&&(d=f.getBoundingClientRect(),g=I>d.left&&H<d.right&&J>d.top-1&&G<d.bottom+1);return g},V=function(){var a,f,h,j,k,l,n,o,q,r,s,t,u=c.elements;if((p=d.loadMode)&&Q<8&&(a=u.length)){for(f=0,R++;f<a;f++)if(u[f]&&!u[f]._lazyRace)if(!N||c.prematureUnveil&&c.prematureUnveil(u[f]))ba(u[f]);else if((o=u[f][i]("data-expand"))&&(l=1*o)||(l=P),r||(r=!d.expand||d.expand<1?e.clientHeight>500&&e.clientWidth>500?500:370:d.expand,c._defEx=r,s=r*d.expFactor,t=d.hFac,K=null,P<s&&Q<1&&R>2&&p>2&&!b.hidden?(P=s,R=0):P=p>1&&R>1&&Q<6?r:O),q!==l&&(D=innerWidth+l*t,F=innerHeight+l,n=-1*l,q=l),h=u[f].getBoundingClientRect(),(J=h.bottom)>=n&&(G=h.top)<=F&&(I=h.right)>=n*t&&(H=h.left)<=D&&(J||I||H||G)&&(d.loadHidden||T(u[f]))&&(m&&Q<3&&!o&&(p<3||R<4)||U(u[f],l))){if(ba(u[f]),k=!0,Q>9)break}else!k&&m&&!j&&Q<4&&R<4&&p>2&&(g[0]||d.preloadAfterLoad)&&(g[0]||!o&&(J||I||H||G||"auto"!=u[f][i](d.sizesAttr)))&&(j=g[0]||u[f]);j&&!k&&ba(j)}},W=B(V),X=function(a){var b=a.target;if(b._lazyCache)return void delete b._lazyCache;S(a),s(b,d.loadedClass),t(b,d.loadingClass),u(b,Z),v(b,"lazyloaded")},Y=A(X),Z=function(a){Y({target:a.target})},$=function(a,b){try{a.contentWindow.location.replace(b)}catch(c){a.src=b}},_=function(a){var b,c=a[i](d.srcsetAttr);(b=d.customMedia[a[i]("data-media")||a[i]("media")])&&a.setAttribute("media",b),c&&a.setAttribute("srcset",c)},aa=A(function(a,b,c,e,f){var g,h,j,l,m,p;(m=v(a,"lazybeforeunveil",b)).defaultPrevented||(e&&(c?s(a,d.autosizesClass):a.setAttribute("sizes",e)),h=a[i](d.srcsetAttr),g=a[i](d.srcAttr),f&&(j=a.parentNode,l=j&&n.test(j.nodeName||"")),p=b.firesLoad||"src"in a&&(h||g||l),m={target:a},s(a,d.loadingClass),p&&(clearTimeout(o),o=k(S,2500),u(a,Z,!0)),l&&q.call(j.getElementsByTagName("source"),_),h?a.setAttribute("srcset",h):g&&!l&&(M.test(a.nodeName)?$(a,g):a.src=g),f&&(h||l)&&w(a,{src:g})),a._lazyRace&&delete a._lazyRace,t(a,d.lazyClass),z(function(){var b=a.complete&&a.naturalWidth>1;p&&!b||(b&&s(a,"ls-is-cached"),X(m),a._lazyCache=!0,k(function(){"_lazyCache"in a&&delete a._lazyCache},9)),"lazy"==a.loading&&Q--},!0)}),ba=function(a){if(!a._lazyRace){var b,c=L.test(a.nodeName),e=c&&(a[i](d.sizesAttr)||a[i]("sizes")),f="auto"==e;(!f&&m||!c||!a[i]("src")&&!a.srcset||a.complete||r(a,d.errorClass)||!r(a,d.lazyClass))&&(b=v(a,"lazyunveilread").detail,f&&E.updateElem(a,!0,a.offsetWidth),a._lazyRace=!0,Q++,aa(a,b,f,e,c))}},ca=C(function(){d.loadMode=3,W()}),da=function(){3==d.loadMode&&(d.loadMode=2),ca()},ea=function(){if(!m){if(f.now()-y<999)return void k(ea,999);m=!0,d.loadMode=3,W(),j("scroll",da,!0)}};return{_:function(){y=f.now(),c.elements=b.getElementsByClassName(d.lazyClass),g=b.getElementsByClassName(d.lazyClass+" "+d.preloadClass),j("scroll",W,!0),j("resize",W,!0),j("pageshow",function(a){if(a.persisted){var c=b.querySelectorAll("."+d.loadingClass);c.length&&c.forEach&&l(function(){c.forEach(function(a){a.complete&&ba(a)})})}}),a.MutationObserver?new MutationObserver(W).observe(e,{childList:!0,subtree:!0,attributes:!0}):(e[h]("DOMNodeInserted",W,!0),e[h]("DOMAttrModified",W,!0),setInterval(W,999)),j("hashchange",W,!0),["focus","mouseover","click","load","transitionend","animationend"].forEach(function(a){b[h](a,W,!0)}),/d$|^c/.test(b.readyState)?ea():(j("load",ea),b[h]("DOMContentLoaded",W),k(ea,2e4)),c.elements.length?(V(),z._lsFlush()):W()},checkElems:W,unveil:ba,_aLSL:da}}(),E=function(){var a,c=A(function(a,b,c,d){var e,f,g;if(a._lazysizesWidth=d,d+="px",a.setAttribute("sizes",d),n.test(b.nodeName||""))for(e=b.getElementsByTagName("source"),f=0,g=e.length;f<g;f++)e[f].setAttribute("sizes",d);c.detail.dataAttr||w(a,c.detail)}),e=function(a,b,d){var e,f=a.parentNode;f&&(d=y(a,f,d),e=v(a,"lazybeforesizes",{width:d,dataAttr:!!b}),e.defaultPrevented||(d=e.detail.width)&&d!==a._lazysizesWidth&&c(a,f,e,d))},f=function(){var b,c=a.length;if(c)for(b=0;b<c;b++)e(a[b])},g=C(f);return{_:function(){a=b.getElementsByClassName(d.autosizesClass),j("resize",g)},checkElems:g,updateElem:e}}(),F=function(){!F.i&&b.getElementsByClassName&&(F.i=!0,E._(),D._())};return k(function(){d.init&&F()}),c={cfg:d,autoSizer:E,loader:D,init:F,uP:w,aC:s,rC:t,hC:r,fire:v,gW:y,rAF:z}});