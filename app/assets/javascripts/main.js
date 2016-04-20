(function($) {

    window.site = {

        init: function() {

            window.site.custom_nav.init();
            window.site.typography.init();
            window.site.homepage.init();
            window.site.artworks.init();
            window.site.exhibition_list.init();
            window.site.accordion_list.init();
            window.site.artist_list.init();
            window.site.news.init();
            window.site.search.init();
            window.site.artist_overview.init();
            window.site.aboutpage_video.init();
            window.site.store.init();
            window.site.dynamic_grid_image_size.init();
            window.site.dynamic_grid_image_size.grid_resize();
            ///window.galleries.image_popup.afterShow = window.site.fancybox.init();
            //window.site.fancybox.init();

        },
        custom_nav: {

            init: function() {
                // TOPNAV
                $('#custom_top_nav_reveal').click(function() {
                    if ($('.topnav').css('display') == 'none') {
                        $('.topnav').slideDown();
                        $('#header').addClass('responsive-nav-open');
                    }
                    else {
                        $('.topnav').slideUp(170, function() {
                            $(this).attr('style', '');
                        });
                        $('#header').removeClass('responsive-nav-open');
                    }
                    return false;
                });

                // SUBNAV
                $('#custom_sub_nav_reveal, .subnav_active_indicator').click(function() {
                    if ($('#sub_nav ul').css('display') == 'none') {
                        $('#sub_nav ul').slideDown();
                    }
                    else {
                        $('#sub_nav ul').slideUp(170, function() {
                            $(this).attr('style', '');
                        });
                    }
                    return false;
                });

                // MENU NAV BUTTON DISPLAY AND INDICATOR TEXT
                if ($('.subsection-artists-list').length == 0){

                    if ($('.subsection-exhibition-detail-page').length) {

                        // EXHIBITION INNER PAGE
                        if ($('.exhibition-header #sub_nav ul li.active').length){
                            $('#custom_sub_nav_reveal').show();
                            $('.subnav_active_indicator').each(function(){
                                var this_indicator = $(this);
                                var this_menu_icon = $(this_indicator).closest('#sub_nav').find('#custom_sub_nav_reveal');
                                var number_of_subnav_items = $(this_indicator).closest('#sub_nav').find('ul li').length;
                                var active_subnav_item = $(this_indicator).closest('#sub_nav').find('ul li.active a');

                                if ($(number_of_subnav_items).length == 0){
                                    $(this_menu_icon,this_indicator).hide();
                                } else {
                                    var item_text = $(active_subnav_item).text();
                                    $(this_indicator).text(item_text);
                                }
                            });
                        }

                    } else {
                        // EVERYWHERE ELSE
                        if ($('#sub_nav ul li.active').length){
                            $('#custom_sub_nav_reveal').show();
                            $('.subnav_active_indicator').each(function(){
                                var this_indicator = $(this);
                                var this_menu_icon = $(this_indicator).closest('#sub_nav').find('#custom_sub_nav_reveal');
                                var number_of_subnav_items = $(this_indicator).closest('#sub_nav').find('ul li').length;
                                var active_subnav_item = $(this_indicator).closest('#sub_nav').find('ul li.active a');
                                if ($(number_of_subnav_items).length == 0){
                                    $(this_menu_icon,this_indicator).hide();
                                } else {
                                    var item_text = $(active_subnav_item).text();
                                    $(this_indicator).text(item_text);
                                }
                            });
                        }
                    }
                }
            }
        },

        search: {

            init: function() {

                $('.search-activate').click(function() {
                        if($(this).hasClass('closed')){
                            $('#header_quick_search').animate({opacity:1.0,width:300}, 200);
                            $('#header_quicksearch_field').focus().addClass('active');
                            $('ul.topnav').fadeOut();
                            $('.search-activate').addClass('open').removeClass('closed');
                        }else{
                            if($('#header_quicksearch_field').val() != 'Search'){
                                $('#header_quicksearch_btn').click();
                            }else{
                                $('#header_quick_search').animate({opacity:0,width:0}, 200);
                                $('#header_quicksearch_field').removeClass('active');
                                $('ul.topnav').fadeIn(200);
                                $('.search-activate').addClass('closed').removeClass('open');
                            }
                        }
                });

                $(document).mouseup(function (e){
                    if (!$('.search-activate img').is(e.target) && !$('.search-activate').is(e.target) && !$('#header_quicksearch_field').is(e.target) && $('.search-activate ').hasClass('open')){
                        $('#header_quick_search').animate({opacity:0,width:0}, 200);
                        $('#header_quicksearch_field').removeClass('active');
                        $('ul.topnav').fadeIn(200);
                        $('.search-activate').addClass('closed').removeClass('open');

                    }
                });
            }
        },

        typography: {

            init: function() {

                ////Split lines of text into spans
                if ($('.mesh-text').length){

                    $('.mesh-text').css('opacity', 0);

                    //Timeout to allow font to load
                    setTimeout(function(){

                        $('.mesh-text').each(function(){
                            var $this = $(this);
                            var originalText = $this.text();

                            $(this).attr( "data-original", originalText );
                            $this.empty();
                            var sections = [];

                            $.each( originalText.split(" "), function(){
                                var $span = $("<span>" + this + "</span>");
                                $this.append($span);

                                var index = $span.position().top;

                                if( sections[index] === undefined ){
                                    sections[index] = "";
                                }
                                sections[index] += $span.text() + " ";
                            });
                            $this.empty();
                            for(var i = 0; i< sections.length; i++){
                                if( sections[i] !== undefined ){
                                    var spanText = $.trim(sections[i]);
                                    $this.append("<span class='line'>" + spanText + "</span>");
                                }
                            }
                        });


                        $('.mesh-text').fadeTo( "fast" , 1.0);

                    }, 100);



                    $( window ).resize(function() {
                        $('.mesh-text').each(function(){
                            var $this = $(this);
                            var originalText = $(this).data( "original");

                            $this.empty();
                            var sections = [];

                            $.each( originalText.split(" "), function(){
                                var $span = $("<span>" + this + "</span>");
                                $this.append($span);

                                var index = $span.position().top;

                                if( sections[index] === undefined ){
                                    sections[index] = "";
                                }
                                sections[index] += $span.text() + " ";
                            });
                            $this.empty();
                            for(var i = 0; i< sections.length; i++){
                                if( sections[i] !== undefined ){
                                    var spanText = $.trim(sections[i]);
                                    $this.append("<span class='line'>" + spanText + "</span>");
                                }
                            }
                        });
                    });
                }


            }
        },

        homepage: {

            init: function() {

                if ($('#fullpage').length) {
                    homepage_anchors = $('.pager-item').map(function() {
                        return $(this).data('menuanchor');
                    }).get();

                    //console.log(homepage_anchors.length)

                    $('#fullpage .content').css({ marginBottom: '0', opacity: 0 });

                    $('#fullpage').fullpage({
                            anchors: homepage_anchors,
                            scrollBar: false,
                            verticalCentered: false,
                            responsive: 0,
                            css3: true,
                            autoScrolling: true,
                            navigation: false,  //custom navigation used
                            //navigationPosition: 'right',
                            sectionSelector:'.slidesection',
                            menu: '#slidemenu',
                            easing: 'easeOutQuart',
                            scrollingSpeed: 700,
                            afterRender: function(){
                                ///fade in relevant caption
                                $('.slidesection.active .content').animate({ marginBottom: '50px', opacity: 1.0 }, 700);
                                $('.pager-item.active .preview-thumb').show();
                            },
                            afterLoad: function( anchorLink, index){
                                ///fade in relevant caption
                                $('.slidesection:not(.active) .content').css({ marginBottom:0, opacity: 0 });
                            },
                            onLeave: function(){
                                ///fade in relevant caption
                                $('.slidesection.active .content').delay(200).animate({ marginBottom: '50px', opacity: 1.0 }, 700);
                                var next_slide = $('.slidesection.active').attr('data-anchor');
                                $('.preview-thumb').hide();
                                $('.pager-item[data-menuanchor="' + next_slide + '"] .preview-thumb').delay(200).fadeIn();
                            }
                    });





                    $('.home-down-arrow').click(function() {
                        $.fn.fullpage.moveSectionDown();
                    });

                }
            }
        },

        artworks: {
            init: function() {
                window.site.artworks.max_height();
                $( window ).resize(function() {
                    window.site.artworks.max_height();
                });
                window.site.artworks.loadImages();
                window.site.artworks.popup();
            },

            loadImages: function() {
                var initialSlide = window.site.artworks.hash();
                $('.slick-artworks, .slick-store, .slick-exhibition-current').slick({
                    infinite: true,
                    speed: 300,
                    slidesToShow: 1,
                    accessibility:true, //left right arrow keys
                    centerMode: true,
                    variableWidth: true,
                    autoplay: false,
                    autoplaySpeed: 6000,
                    arrows:true,
                    centerPadding:'0',
                    lazyLoad: 'progressive',
                    initialSlide: initialSlide
                });
                $(".slick-item:not(.slick-active.slick-center) .slideshade").show();
                $(".slick-active.slick-center .slideshade").fadeOut('fast');

                if ($('.slick-artwork-caption').length){
                    window.site.artworks.caption();
                }
                // On before slide change
                $('.slick-artworks, .slick-exhibition-current').on('afterChange', function(slick, currentSlide){
                    window.site.artworks.change_hash();
                    window.site.artworks.caption();
                    $(".slick-item:not(.slick-active.slick-center) .slideshade").show();
                    $(".slick-active.slick-center .slideshade").fadeOut('fast');
                });


                ///$(".slick-item").find('a').addClass('test');


                $(".slick-item").each(function() {
                    var popup_index = $(this).attr('data-slick-index');
                    $(this).find('a').attr('data-popup-index', popup_index);
                });

            },

            hash: function() {
                var position = 0
                if($('body').hasClass('page-artists') || $('body').hasClass('page-param-overview')){
                    if (window.location.hash && window.location.hash != '#') {
                        var hash_path = window.location.hash.split('#')[1];
                        if (hash_path) {
                            $(".slick-item").each(function() {
                                if('/' + $(this).find('img').attr('data-artwork_path') == hash_path){
                                    return false;
                                }
                                position ++;
                            });
                        }
                     }
                  }
                  return position;
            },
            change_hash: function(){
                if($('body').hasClass('page-artists') || $('body').hasClass('page-param-overview')){
                    var data_artwork_path = $(".slick-item.slick-center .slideshow-img, .single-item img").attr('data-artwork_path');
                    window.location.replace('#/' + data_artwork_path);
                }
            },
            caption: function(){

                ////Load the caption into the caption space, from data attribute

                var caption = $(".slick-item.slick-center, .artworks-slideshow .single-item").attr('data-caption');
                $('.slick-artwork-caption span').empty().append( caption );
                var enlarge_link = $(".artworks-slideshow .slick-item.slick-center a, .artworks-slideshow .single-item a").attr('href');
                var enlarge_caption = $(".artworks-slideshow .slick-item.slick-center a, .artworks-slideshow .single-item a").attr('data-fancybox-title');
                //get id from image
                var artwork_id = $(".slick-item.slick-center .slideshow-img, .single-item img").attr('data-artwork_id');
                //set link and class
                var store_link = '/store/artworks/' + artwork_id;

                var button_text = $('.slick-item.slick-center img').attr('data-shop_button');

                if ($('.slick-item.slick-center .slideshow-img, .artworks-slideshow .single-item .single-img').hasClass( "in_online_shop" )){
                    $('.artwork-buy-button a').addClass('active').attr('href', store_link).text(button_text);

                } else {
                    $('.artwork-buy-button a').removeClass('active').attr('href', '').text(button_text);
                }
                //this currently only shows the first opened caption
                $('.slick-artwork-enlarge a').attr('href', enlarge_link).attr('data-fancybox-title', enlarge_caption);
            },

            max_height: function(){

                ////Use original image dimensions to scale proportionally
                var slideshow_width = $('#container').width();
                var windowHeight = $( window ).height();

                //ideal slideshow height, a ratio of the width
                var proportional_height = Math.floor(slideshow_width/1.8);

                ///Set an upper limit for the max slideshow height
                var upperLimit = 700
                var set_height = upperLimit;

                //if the proportional height can't fit into the window height, use the window height instead
                if (proportional_height > windowHeight) {
                    proportional_height = windowHeight;
                }

                //allow the slideshow to scale proportionately, up to the upper limit
                if (proportional_height < upperLimit) {
                    set_height = proportional_height;
                } else {
                    set_height = upperLimit;
                }
                //$('.slick-artworks, .slick-artworks .slick-list, .slick-exhibition-current .slick-list, .slick-exhibition-current .slick-item, .slick-artworks .slick-item, .artworks-slideshow, .cover-img-wrapper, .cover-img, .single-item, .single-item img').css({'height' : set_height, 'max-height': set_height});


                $('.slideshow-img, .single-img').each(function(){

                    var scaleRatio = set_height  /  $(this).data('imgheight');
                    var scaledWidth = Math.round($(this).data('imgwidth') * scaleRatio);
                    var scaledHeight = Math.round($(this).data('imgheight') * scaleRatio);
                    var scaledWidth = Math.round($(this).data('imgwidth') * scaleRatio);

                    ////VERY WIDE IMAGES ARE SCALED DOWN AND PADDED
                    var slideshow_width = $('#container').width();
                    if (scaledWidth > slideshow_width){
                        scaleRatio = slideshow_width  /  $(this).data('imgwidth');
                        scaledWidth = slideshow_width - 50;
                        scaledHeight = Math.round($(this).data('imgheight') * scaleRatio);
                        var padding = (set_height - scaledHeight) / 2;
                        //console.log(padding);
                        $(this).css({'padding-top' : padding,'padding-bottom' : padding});
                    }

                    $(this).css({'height' : scaledHeight, 'width': scaledWidth});
                    var main_set = scaledHeight
                });


                $('.slick-list, .slick-track, .slick-store').height(set_height);

            },

            popup: function(){

                $("#container").each(function(){
                    //console.log('clicked');
                    var This = this;

                    $('.slick_image_popup').fancybox({
                        'overlayShow': true,
                        'overlayOpacity': 0.7,
                        'overlayColor': '#d9d9d9',
                        'imageScale': 'true',
                        'zoomOpacity': 'true',
                        'wrapCSS':'artwork_popup_wrapper',
                        // Fancybox 2.0 and above
                        prevEffect: 'fade',
                        nextEffect: 'fade',
                        closeEffect: 'fade',
                        openEffect: 'fade',
                        helpers : {
                            title: {
                                type: 'inside'
                            }
                        },
                        beforeLoad:function(current, previous) {
                            window.galleries.image_popup.beforeLoad(current, previous);
                            $('.zoomContainer').remove();
                            $('.fancybox-overlay .artwork-buy-button').remove();
                        },
                        beforeShow : function() {
                        },
                        afterLoad: function(current, previous) {
                            var slide_number = current.element.attr('data-popup-index');
                            $('.slick-artworks').slick('slickGoTo', slide_number,true);
                            big_image_link = current.element.attr('data-zoomimage');
                            window.galleries.image_popup.afterLoad(current, previous);
                        },
                        afterShow: function() {
                            window.galleries.image_popup.afterShow();
                            //window.site.artworks.zoom();
                            $('.fancybox-image').addClass('elevatezoom').attr( "data-zoom-image", big_image_link);
                            window.site.artworks.zoom2();

                            //console.log($('.artwork-buy-button a.active').attr('href'));
                            $('.artwork-buy-button a.active').closest('.artwork-buy-button').clone().appendTo('.fancybox-overlay');

                        },
                        afterClose: function() {
                            window.galleries.image_popup.afterClose();
                            $('.zoomContainer').remove();
                            $('.fancybox-overlay .artwork-buy-button').remove();
                        }
                    })
                });


            },

            //zoom: function(){
                //CLOUDZOOM - DEPRICATED
                //var source = $('.fancybox-image').attr('src');
                //$('.fancybox-image').wrap(
                    //$('<a></a>').attr('href',source).addClass('cloud-zoom')
                //);
                //$('a.cloud-zoom').CloudZoom({
                    //zoomPosition: 'inside',
                    //zoomInsideClass: '.fancybox-overlay',
                    //mouseTriggerEvent : 'click',
                    //zoomImage:''
                //});
            //},

            zoom2: function(){
                //ELEVATE ZOOM
                $(".elevatezoom").elevateZoom({
                    zoomType: "inner",
                    cursor: "crosshair"
                });
            }

        },
        exhibition_list: {

            init: function() {
                window.site.exhibition_list.reveal_archive();
            },

            reveal_archive: function(){
                $('.exhibition-archive-preview-reveal').click(function() {
                    $('.exhibition-archive-preview').slideToggle('fast');
                    $('.exhibition-archive-preview-reveal').hide();
                });
            }
        },

        accordion_list: {
            /// Accordion lists - eg. Past exhibitions, news etc where the lists open/close to reveal content
            init: function() {
                window.site.accordion_list.add_classes();
                window.site.accordion_list.open_item();
                window.site.accordion_list.init_slideshow();
            },
            add_classes: function() {

                //Set initial classes and opacity

                //Add lists that should have accordian functionality
                var class_list = '\
                    #exhibitions-grid-past, \n\
                    .subsection-exhibitions, \n\
                    .subsection-press, \n\
                    .section-news .subsection-news-grid, \n\
                    .subsection-news, \n\
                    .exhibition-archive-preview, \n\
                    #exhibitions-grid-online, \n\
                    #exhibitions-grid-external, \n\
                    #searchresults_rows_wrapper,\n\
                    #mobile_artist_list'

                //Set accordian class
                $(class_list).addClass('accordion_list');

                //Open first item (not on forthcoming exhibition page)
                if (!$('.section-exhibitions.page-param-current-forthcoming').length) {
                    var first_item = $('.accordion_list ul li').first()
                    $(first_item).first().addClass('accordion_active');

                    //lazyload a the image inside
                    var lazy_image = $(first_item).find('.lazyload-list-image')
                    var lazyImgPath = lazy_image.data('src');
                    $(lazy_image).attr('src', lazyImgPath);

                    $(lazy_image).imagesLoaded( function() {
                        $(lazy_image).animate({"opacity": 1},200);
                    });
                }

                //Set content opacity back to 0 in inactive panels
                $('.accordion_list li:not(.accordion_active)').find('.fade-wrapper').css({"opacity": 0});

                var list_slideshow_width = $('.image.slides').width();
                $('.slick-accordian-slideshow').width(list_slideshow_width);

            },

            open_item: function() {
                $('.accordion_list li').click(function(event) {

                    if (!$(this).hasClass('accordion_active')) {
                        //event.preventDefault();
                        $('.accordion_list ul li').removeClass('accordion_active');
                        $(this).addClass('accordion_active');

                        ///Load slideshow images
                        $(this).find('.fade-wrapper').animate({"opacity": 1});
                        $('.accordion_list li:not(.accordion_active)').find('.fade-wrapper').css({"opacity": 0});

                        window.site.accordion_list.init_slideshow();

                        //lazyload a the image inside
                        var lazy_image = $(this).find('.lazyload-list-image')
                        var lazyImgPath = lazy_image.data('src');
                        $(lazy_image).attr('src', lazyImgPath);

                        $(lazy_image).imagesLoaded( function() {
                            $(lazy_image).animate({"opacity": 1},200);
                        });

                        $('html,body').animate({scrollTop: $(this).offset().top - 60}, 500);
                    }

                });
            },

            init_slideshow: function() {


                var list_slideshow_height = $('.image.slides').height();


                $('.accordion_active .slick-accordian-slideshow img').each(function () {
                    var imagex = $(this);
                    var imgOriginal = imagex.data('src');
                    $(imagex).attr('src', imgOriginal).height(list_slideshow_height);
                });
                 $( window ).resize(function() {
                     list_slideshow_height = $('.image.slides').height();
                    $('.accordion_active .slick-accordian-slideshow img').each(function () {
                        var imagex = $(this);
                        var imgOriginal = imagex.data('src');
                        $(imagex).attr('src', imgOriginal).height(list_slideshow_height);
                        list_slideshow_width = $('.image.slides').width();
                        $('.slick-accordian-slideshow').width(list_slideshow_width);
                    });
                });
                $('.accordion_active .slick-accordian-slideshow').imagesLoaded( function() {
                    $('.accordion_active .slick-accordian-slideshow').slick({
                        infinite: false,
                        speed: 300,
                        slidesToShow: 1,
                        accessibility:true, //left right arrow keys
                        centerMode: false,
                        variableWidth: true,
                        autoplay: false,
                        autoplaySpeed: 4000,
                        arrows:true,
                        appendArrows:$('.accordion_active .slideshow-buttons:not(.buttons-initialised)')
                    });
                    $('.accordion_active .slick-accordian-slideshow').animate({"opacity": 1});
                    $('.accordion_active .slideshow-buttons:not(.buttons-initialised)').addClass('buttons-initialised');
                });
            }
        },

        artist_overview: {

            init: function() {

                $('#sub-item-overview a[href*=#]:not([href=#])').click(function() {
                    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                        if (target.length) {
                            $('html,body').animate({
                                scrollTop: target.offset().top - 50
                            }, 400);
                            return false;
                        }
                    }
                });

                $('.full-bio-link a').click(function(event) {

                    event.preventDefault();
                    var fullBioLink = $(this)

                    if ($(fullBioLink).hasClass('active')){
                        $(fullBioLink).text('Full Biography');
                        $(fullBioLink).removeClass('active');
                        $('.full-bio-wrapper').hide().removeClass('active');;
                        $('.overview-text-wrapper').fadeIn().addClass('active');
                    } else {
                        $(fullBioLink).text('Overview');
                        $(fullBioLink).addClass('active');
                        $('.overview-text-wrapper').hide().removeClass('active');;
                        $('.full-bio-wrapper').fadeIn().addClass('active');
                    }

                });




            }
        },

        artist_list: {

            init: function() {
                window.site.artist_list.filter();
                window.site.artist_list.scroll();
            },

            scroll: function(){

                var windowHeight = $( window ).height();
                var default_list_height = 600 + 200;

                if (windowHeight < default_list_height) {
                    var newheight = windowHeight - 200;
                    $(".page-artists .subsection-artist-list-preview-letters #list_preview_navigation, .subsection-artist-list-preview-letters #sidebar .image, .subsection-artist-list-preview-letters #sidebar .image a").height(newheight);
                }
                $("#list_preview_navigation").mThumbnailScroller({
                  setWidth: true,
                  setHeight: true,
                  axis:"y",
                  setTop: -1000,
                  type:"click-90",
                  markup:{
                      thumbnailsContainer: ".artist-list-inner",
                      thumbnailContainer: ".letter_group",
                      buttonsPlaceholder: ".artist-list-buttons",
                      buttonsHTML:{
                          up:'<i class="fa fa-angle-up"></i>',
                          down:'<i class="fa fa-angle-down"></i>',
                          left:"left",
                          right:"right"
                      }
                    }
                });
                $("#list_preview_navigation").mThumbnailScroller("scrollTo", "top", {
                    duration: 800,
                    easing: "easeOutSmooth"
                });

            },

            filter: function() {
                //works out which divider letters should show
                function show_selected_letters(){
                    $('#list_preview_navigation ul').each(function(){
                         $(this).find('.letter_divider').hide();

                        if($(this).children(".visible").length == 0){
                            $(this).find('.letter_divider').hide();
                        } else {
                            $(this).find('.letter_divider').fadeIn();
                        }
                    });
                }
                function goto_random_visible(){
                    var arrayOfVisibleArtists = [];
                        $('.artist_name.visible a').each(function(){
                        var $this = $(this);
                        arrayOfVisibleArtists.push($this.data('index')-1);
                    });
                    var randomArtist = arrayOfVisibleArtists[Math.floor(Math.random() * arrayOfVisibleArtists.length)];
                    $('#list_preview_slideshow').cycle('goto', randomArtist);
                }

                if (window.galleries.device.handheld()) {
                    $('#list_preview_navigation a').unbind('mouseover');
                }


                //SETUP PAGE TO INITIALLY ONLY SHOW NON-GALLERY ARTISTS
                $('#list_preview_navigation ul li.represented').hide().addClass('hidden').removeClass('visible');
                $('#list_preview_navigation ul li.work_by').show().addClass('visible').removeClass('hidden');
                //mobile
                $('#mobile_artist_list ul li.work_by').addClass('visible').removeClass('hidden');
                $('#mobile_artist_list ul li.represented').removeClass('visible').addClass('hidden');
                show_selected_letters();

                //UPDATE LIST ON FILTER CLICK
                $('.subsection-artists-list #artist_list_selector li a').click(function(event) {
                    event.preventDefault();
                    if (!$(this).hasClass('active')) {
                        $('.subsection-artists-list #artist_list_selector li').removeClass('active');
                        $(this).closest('li').addClass('active');

                        var selector = $(this).closest('li').attr('id');

                        if (selector == 'all'){
                            $('#list_preview_navigation ul li').hide().fadeIn().addClass('visible').removeClass('hidden');
                            $('.letter_divider').fadeIn();

                            //mobile
                            $('#mobile_artist_list ul li').addClass('visible').removeClass('hidden');
                             goto_random_visible()

                        } else if (selector == 'work_by') {
                            $('#list_preview_navigation ul li').hide().addClass('hidden').removeClass('visible');
                            $('#list_preview_navigation ul .artist_name.work_by').fadeIn().addClass('visible').removeClass('hidden');

                            //mobile
                            $('#mobile_artist_list ul li.work_by').addClass('visible').removeClass('hidden');
                            $('#mobile_artist_list ul li.represented').removeClass('visible').addClass('hidden');

                            //Set Slideshow
                            show_selected_letters();
                            goto_random_visible()

                        } else if (selector == 'represented') {
                            $('#list_preview_navigation ul li').hide().addClass('hidden').removeClass('visible');
                            $('#list_preview_navigation ul .artist_name.represented').fadeIn().addClass('visible').removeClass('hidden');

                            //mobile
                            $('#mobile_artist_list ul li.represented').addClass('visible').removeClass('hidden');
                            $('#mobile_artist_list ul li.work_by').removeClass('visible').addClass('hidden');

                            //Set Slideshow
                            show_selected_letters();
                            goto_random_visible()
                        }
                        var active_subnav_item_text = $('#sub_nav ul li.active a').text();
                        $('.subnav_active_indicator').text(active_subnav_item_text);
                        $('#mobile_artist_list ul li.first').removeClass('first');
                        $('#mobile_artist_list ul li.visible').first().addClass('first');
                    }

                });
            }


        },

        aboutpage_video: {

            init: function() {
                if ($('.section-about, .section-about_zh').length) {
                    var isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
                    // For testing the mobile version: var isMobile = true;
                    if (!isMobile) {
                         $("#video img").remove();
                         $("#video").html(
                            "<video autoplay='autoplay' loop='loop' currentTime='10' width='100%' poster='/images/about.jpg' preload='auto'>  \n\
                                <source src='http://artlogic-clientstore.s3.amazonaws.com/michaelhoppen/media/about/about.mp4' type='video/mp4'/> \n\
                                <source src='http://artlogic-clientstore.s3.amazonaws.com/michaelhoppen/media/about/about.ogv' type='video/ogv'/> \n\
                                <source src='http://artlogic-clientstore.s3.amazonaws.com/michaelhoppen/media/about/about.webm' type='video/webm'/> \n\
                            </video> \n\
                         ");

                    }
                }
            }

        },

        news: {
             init: function() {

                if ($('#instafeed').length){
                    var feed = new Instafeed({
                        clientId: 'e87105fdae8b4b28a9e90707fd5b362e',
                        accessToken: '1220247057.467ede5.81ccc15b2df0496a861caefb185d673e',
                        get: 'user',
                        tagName: 'mhgnews',
                        userId: 1220247057,
                        limit:6,
                        resolution:'standard_resolution',
                        template: '<a class="instagram-tile" href="{{link}}"><img class="instagram-tile-img" src="{{image}}"/><div class="instagram-tile-caption-wrapper"><div class="instagram-tile-caption">{{likes}} Likes</div><i class="fa fa-instagram tile-icon"></i></div></a>',
                        after: function () { $('#instafeed').children().slice(0,2).addClass('big'); }
                    });
                    feed.run();
                }

                $('.twitter_feed').cycle({
                    fx:     'fade',
                    speed:    1200,
                    timeout:  4000,
                    pause:   0,
                    slides: '>',
                    swipe: true
                });

                $('.twitter-atreply[href]').each(function(){
                    $(this).attr('href', ('https://twitter.com/' + $(this).attr('href')))
                });


            }
        },

        store: {
            init: function() {
                //window.site.store.feature_article();
                window.site.store.section_selector();
                window.site.store.product_slideshows();
            },

            feature_article: function (){
                $('.slick-store').imagesLoaded( function() {
                    $('.slick-store').slick({
                        infinite: true,
                        speed: 300,
                        slidesToShow: 1,
                        accessibility:true, //left right arrow keys
                        //centerMode: true,
                        variableWidth: true,
                        autoplay: true,
                        autoplaySpeed: 4000,
                        arrows:true
                    });
                });
            },

            section_selector: function (){

                ////The grey section selector panel on the store landing page
                function setPanel(){
                    //dynamically set panel height
                    var panelwidth = $('.ss-panel.panel-selector').width();
                    if ($( window ).width() < 769){
                        panelwidth = $('.ss-panel.panel-selector').width() / 2;
                    }
                    $('.ss-panel.panel-selector').height(panelwidth);
                } setPanel();

                $( window ).resize(function() {
                    setPanel();
                });

                //show initial panels
                $('.ss-panel:not(.panel-selector)').hide();
                var active_section = '.' + $('.ps-row').first().data('show');
                $(active_section).show();

                //initial row setup
                $('.ps-row').first().addClass('active').find('.ps-row-content').show();

                //on click
                $('.ps-row').click(function() {
                    if (!$(this).hasClass('active')){
                        $('.ps-row').removeClass('active');
                        $(this).addClass('active');

                        $('.ps-row-content').hide();
                        $(this).find('.ps-row-content').show();

                        $('.ss-panel:not(.panel-selector)').hide();
                        var active_section = '.' + $(this).data('show');
                        $(active_section).fadeIn();
                    }
                });
            },

            product_slideshows: function(){

                $('#detail-slideshow').cycle({
                    fx:     'fade',
                    speed:    1200,
                    timeout:  4000,
                    pause:   0,
                    slides: '>',
                    swipe: true,
                    autoHeight:'calc'
                });

                //setup thumbs
                $('#detail-slideshow-pager ul li:nth-child(1)').addClass('active');

                //thumb click
                $('#detail-slideshow-pager ul li').click(function() {
                    $('#detail-slideshow').cycle(parseInt($(this).attr('data-rel')));
                    $('#detail-slideshow-pager ul li').removeClass('active');
                    $(this).addClass('active');
                });

                //auto thumb change on cycle
                $('#detail-slideshow').on('cycle-after',function(e, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag){
                    $('#product-slideshow-pager ul li').removeClass('active');
                    $('#product-slideshow-pager ul li:nth-child('+ (optionHash.nextSlide + 1) + ')').addClass('active');
                    $('#detail-slideshow-caption').html($('#detail-slideshow .item.cycle-slide-active').attr('data-caption'));

                });
            }
        },

        dynamic_grid_image_size: {

            init: function() {
                //if ($('.store-grid').length) {
                    var selector_context = $('.section-store .records_list.detail_list, .section-store  .records_list.feature_list');
                    $(selector_context).each(function() {

                        $('li', this).each(function() {
                            var image_wrapper_height = $('.image', this).width();
                            $('.image, .image span', this).attr('style', 'height:' + image_wrapper_height + 'px !important');
                            $('.image img', this).attr('style', 'max-height:' + image_wrapper_height + 'px !important');
                            $('.image img', this).attr('style', 'max-width:' + image_wrapper_height + 'px !important');
                        });
                    });
                //}
                if ($('.section-store .feature_panels').length) {
                    $('.panels').each(function() {
                        var setWidth = $(this).width();
                        $( this ).find('.content').width(setWidth);
                    });
                }

            },
            grid_resize: function() {
                $(window).resize(function() {
                    window.site.dynamic_grid_image_size.init();
                });
            }

        }
    };


    $(document).ready(function() {
        window.site.init();

    });

})(jQuery);
