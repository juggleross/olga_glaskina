(function($) {

    window.app = {
        checkEmail: {
            check: function(which) {

                if ($(which).val() != "") {
                    var str=$(which).val();
                    var at="@";
                    var dot=".";
                    var lat=str.indexOf(at);
                    var lstr=str.length;
                    var ldot=str.indexOf(dot);

                    if (str.indexOf(at)==-1){
                       return false;
                    }

                    if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
                       return false;
                    }

                    if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
                        return false;
                    }

                    if (str.indexOf(at,(lat+1))!=-1){
                        return false;
                    }

                    if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
                        return false;
                    }

                    if (str.indexOf(dot,(lat+2))==-1){
                        return false;
                    }

                    if (str.indexOf(" ")!=-1){
                        return false;
                    }

                    return true;
                }

                else {
                    return false;
                }
            }
        }
    }

    window.galleries = {

        init: function() {

            window.galleries.plugin_tweaks.init();
            window.galleries.device.init();
            window.galleries.layout.init();
            window.galleries.navigation.init();
            window.galleries.responsive.init();
            window.galleries.lists.init();
            window.galleries.slideshow.init();
            window.galleries.artworks.init();
            window.galleries.image_gallery.init();
            window.galleries.artist_list_slideshow.init();
            window.galleries.artist_list_preview.init();
            window.galleries.image_popup.init();
            window.galleries.publications.init();
            window.galleries.quicksearch.init();
            window.galleries.artist.init();
            //window.galleries.contact_form.init();
            window.galleries.contact_form_popup.init();
            window.galleries.mailinglist_signup_form_popup.init();
            window.galleries.google_map_popup.init();
            window.galleries.homepage_splash.init();
            window.galleries.parallax.init();

            // Fix for IE6-7 image link problem..
            // Image links in record lists are unclickable in IE6/7
            if (navigator.userAgent.indexOf('MSIE 7') > -1 || navigator.userAgent.indexOf('MSIE 6') > -1) {

                $('div.records_list a span.image img').click(function() {
                    var parent_a = $(this).parents('a');
                    if (!parent_a.hasClass('image_popup')) {
                        window.location.href = parent_a.attr('href');
                    }

                })

            }

        },


        sharing: {

            init: function() {
                window.modules.sharing.init();
            }

        },

        device: {

            init: function() {
                
                // Find out the current browser
                
                if ($.browser.name) {
                    var browserVersion = parseInt($.browser.version);
                    var browserName = $.browser.name;
                    if (browserVersion) {
                        $('body').addClass('browser-' + browserName);
                        $('body').addClass('browser-' + browserName + '-' + browserVersion);
                    }
                    if ($.browser.platform) {
                        $('body').addClass('platform-' + $.browser.platform);
                    }
                }

                // Find out if this is the Android default browser and add a class to the body
                // This is NOT a very good way of testing for this browser, but there does not seem to be a conclusive way to do it
                var nua = navigator.userAgent;
                var is_android_default_browser = ((nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1) && !(nua.indexOf('Chrome') > -1));
                if (is_android_default_browser) {
                    $('body').addClass('browser-android-internet');
                }

                // Find outo if this is a high res device and add a class to the body
                // This allows us to change graphics to high-res versions on compatible devices
                if (window.devicePixelRatio > 1) {
                    $('body').addClass('device-highres');
                }

                if (window.galleries.device.handheld()) {
                    $('body').addClass('device-handheld');
                }

            },

            handheld: function() {

                /* Detect mobile device */
                return (
                    //Detect iPhone
                    (navigator.platform.indexOf("iPhone") != -1) ||
                    //Detect iPod
                    (navigator.platform.indexOf("iPod") != -1) ||
                    //Detect iPad
                    (navigator.platform.indexOf("iPad") != -1) ||
                    //Detect Android
                    (navigator.userAgent.toLowerCase().indexOf("android") != -1) ||
                    //Detect Surface (ARM chip version e.g. low powered tablets) will also detect other windows tablets with the same chip
                    (navigator.userAgent.toLowerCase().indexOf("arm;") != -1 && navigator.userAgent.toLowerCase().indexOf("windows nt") != -1) ||
                    //Detect Opera Mini
                    (navigator.userAgent.toLowerCase().indexOf("opera mini") != -1) ||
                    //Detect Blackberry
                    (navigator.userAgent.toLowerCase().indexOf("blackberry") != -1) ||
                    //Detect webos
                    (navigator.userAgent.toLowerCase().indexOf("webos") != -1) ||
                    //Detect iemobile (old version of windows phone)
                    (navigator.userAgent.toLowerCase().indexOf("iemobile") != -1)
                );

            }

        }, //end of isphone


        layout: {

            init: function() {

                if ($("#container").fitVids) {
                    $("#container").fitVids();
                }

                //Depricated. Sites now use inline-block to center the nav
                if ($(window).width() >= 768) {
                    $('#top_nav.center').css('float', 'none');
                    window.galleries.layout.navigation_centered('#top_nav.center .topnav');
                }
                if ($('#header').hasClass('header_fixed')) {
                    window.galleries.layout.header_fixed();
                }
            },

            header_fixed: function() {

                $('body').addClass('layout-fixed-header');
                $(window).scroll(function() {
                    if ($(window).width() > 767) {
                         var is_active = $('#header').hasClass('page-scroll');
                         if ($(window).scrollTop() > 30 && !is_active) {
                             $('#header').addClass('page-scroll');
                         } else if ($(window).scrollTop() <= 30 && is_active) {
                             $('#header').removeClass('page-scroll');
                         } else {

                         }
                     } else {
                         $('#header').removeClass('page-scroll');
                     }
                 });

                 if ($('body').hasClass('site-type-template') && $('body').hasClass('layout-fixed-header') && !$('body').hasClass('layout-hero-header') && ($('#header.header_fixed').css('position') == 'fixed' || $('#header.header_fixed').css('position') == 'absolute') && !$('#content #slideshow.fullscreen_slideshow').length) {
                     var minimum_margin = 30; // The minimum margin expected between the header and main content
                     var header_height = ($('#header').is(':visible') ? $('#header').outerHeight() : 0);
                     var main_content_padding = parseInt($('#main_content').css('padding-top'));
                     if (header_height + minimum_margin > main_content_padding) {
                         $('#main_content').css('padding-top', header_height + minimum_margin + 'px');
                         $(window).bind("load", function() {
                             // If the header height has changed after the page 'load' event, update the main_content padding again
                             // e.g. the height may change after webfonts have properly loaded
                             if (($('#header').is(':visible') ? $('#header').outerHeight() : 0) != header_height) {
                                 var header_height = ($('#header').is(':visible') ? $('#header').outerHeight() : 0);
                                 $('#main_content').css('padding-top', header_height + minimum_margin + 'px');
                             }
                         });
                     }
                 }

            },

            navigation_centered: function(element) {
                $(element).fadeTo(0, 0).css({'float': 'left', 'visibility': 'visible'});
                $(window).bind("load", function() {
                    $(element)
                        .css({
                            'width': $(element).width() + 2,
                            'margin': '0 auto',
                            'float': 'none'
                        })
                        .fadeTo(250, 1)
                    ;
                    $(element).css({'display': '', 'float': ''});
                });
            },

            content_follower: function(element) {
                if ($(element).length > 0){
                    var $scrolling_div = $(element);
                    var offset = $scrolling_div.offset().top;
                    if ($('#header.header_fixed').length > 0) {
                        var offset = offset - $('#header.header_fixed').outerHeight();
                    }
                    if ($('#cms-frontend-toolbar-container').length > 0) {
                        var offset = offset - $('#cms-frontend-toolbar-container').outerHeight();
                    }
                    $(window).scroll(function() {
                        var window_scroll_pos = $(window).scrollTop();
                        if(window_scroll_pos > offset) {
                            $scrolling_div.stop().animate({"marginTop": (window_scroll_pos - offset) + 10 + "px"}, "slow");
                        }
                        else if(window_scroll_pos == 0) {
                            $scrolling_div.stop().animate({"marginTop": (window_scroll_pos) + "px"}, "slow");
                        }
                    });
                }
            }


        },

        navigation: {

            init: function() {

                if ($('.navigation.navigation_expandable').size() > 0) {
                    window.galleries.navigation.expandable();
                }

            },

            expandable: function() {

                $('.navigation.navigation_expandable').each(function() {
                    var this_instance = $(this);
                    $('ul > li', this).each(function() {
                        if (false && $('.expandable_item_container ul li', this).size() == 1) {
                            $('> a', this).click(function() {
                                window.location.href = $(this).parent().find('.expandable_item_container ul li:eq(0) a').attr('href');
                                return false;
                            });
                        } else if ($('.expandable_item_container ul li', this).size() > 0) {
                            $('> a', this).click(function() {
                                $('.expandable_item_container', this_instance).slideUp();
                                $(this).parent().find('.expandable_item_container').slideDown();
                                return false;
                            });
                        }
                    });
                    $('ul li .expandable_item_container', this).each(function() {
                        if (!$(this).parent().hasClass('active')) {
                            $(this).hide();
                        }
                    });
                });

            }

        },

        responsive: {

            init: function() {
                if ($('body').hasClass('site-responsive')) {

                    window.galleries.responsive.navigation();
                    window.galleries.responsive.records_lists();

                }
            },

            navigation: function() {

                if ( $('body').hasClass('responsive-nav-slide-nav') ) {


                    $('#header .navigation').wrapAll('<div id="responsive_slide_nav_wrapper"></div>');
                    $('<div id="slide_nav_reveal">Menu</div>').appendTo('#header .inner');
                    
                    $('#top_nav_reveal, #slide_nav_reveal').click(function() {

                        if ($('body').hasClass('slide-nav-open')) {
                            $('body').removeClass('slide-nav-open');
                        } else {
                            $('body').addClass('slide-nav-open');
                        }
                    });

                } else {

                    // Initialise the menu button

                    $('#top_nav_reveal').click(function() {
                        ///$('.parallax-mirror').animate({'margin-top': '300px'}, 300);
                        if ($('.topnav').css('display') == 'none') {
                            $('.topnav, #translations_nav, #header_quick_search').slideDown();
                            $('#header').addClass('responsive-nav-open');
                        } else {
                            $('.topnav, #translations_nav, #header_quick_search').slideUp(function() {
                                $(this).attr('style', '');
                            });
                            $('#header').removeClass('responsive-nav-open');
                        }
                        return false;
                    });


                } // end of if

            },

            records_lists: function() {
                
                $('.records_list').not('.columns_list').not('.tile_list').not('.reading_list').not('.records_list_noprocess').each(function() {

                    if ($('ul', this).length) {
                        // Remove extra ULs in lists, these are not responsive friendly

                        $('ul', this).replaceWith(function() {
                            return $(this).html();
                        });
                        $(this).wrapInner('<ul></ul>');


                        // Remove whitespace between list items (removes space between inline-block elements)

                        $(this).html($(this).html().replace(/>\s+</g,'><'));


                        $('li', this).each(function() {
                            $('.image', this).wrap('<span class="outer"></span>');
                            $('.image', this).wrap('<span class="image_wrapper"></span>');
                            $('.outer', this).prepend('<span class="fill"></span>');
                        });
                    }

                });

                $('.records_list.columns_list').each(function() {
                    // Remove whitespace between list items (removes space between inline-block elements)
                    $(this).html($(this).html().replace(/>\s+</g,'><'));
                });

                // Run the archimedes core init again, as removing spaces between elements will have removed any javascript events on the modified grid
                window.archimedes.archimedes_core.init();

                $(".records_list ul").each(function() {
                    var item_count = $( this ).children('li').length;
                    $(this).closest('.records_list').addClass('record-count-' + item_count);
                });

                window.galleries.responsive.dynamic_grid_image_size();
                $(window).resize(function() {
                    window.galleries.responsive.dynamic_grid_image_size();
                });

                window.galleries.responsive.tile_list_setup();
                var id;
                $(window).resize(function() {
                    clearTimeout(id);
                    id = setTimeout(resize_finished, 500);
                });
                function resize_finished(){
                    window.galleries.responsive.tile_list_init();
                }

            },

            tile_list_setup: function() {
                $('.records_list.tile_list').each(function() {
                    var original_html = $(this).html();
                    $(this).html('');
                    $(this).append('<div class="tile_list_formatted"></div>');
                    $(this).append('<div class="tile_list_original"></div>');
                    $('.tile_list_original', this).html(original_html).css('visibility', 'hidden');
                });
                window.galleries.responsive.tile_list_init();
            },

            tile_list_init: function() {
                $('.records_list.tile_list').each(function() {

                    $('.tile_list_original', this).removeClass('hidden');

                    tile_list_instance = $(this);
                    tile_list_width = $(this).width();
                    tile_list_column_width = $('.tile_list_original ul', this).width();
                    var column_count = 3;
                    var column_count_calculated = Math.floor(tile_list_width / tile_list_column_width);
                    if (column_count_calculated < 7) {
                        var column_count = column_count_calculated;
                    }

                    $('.tile_list_original', this).addClass('hidden');

                    var columns = {}
                    $.each(Array(column_count), function(index, value) {
                        columns[index] = {'height': 0, 'objects': []};
                    });

                    $('.tile_list_original li', this).each(function() {
                        if ($(this).attr('data-width') && $(this).attr('data-height')) {
                            var height_to_width_factor = parseInt($(this).attr('data-width')) / tile_list_column_width;
                            var relative_item_height = Math.ceil(parseInt($(this).attr('data-height')) / height_to_width_factor);
                            lowest_height_index = 0;
                            loop_current_lowest_height = columns[0]['height'];
                            $.each(columns, function(index, value) {
                                if ((value.height < loop_current_lowest_height)) {
                                    lowest_height_index = index;
                                    loop_current_lowest_height = value.height;
                                }
                            });
                            columns[lowest_height_index]['height'] = columns[lowest_height_index]['height'] + relative_item_height;
                            columns[lowest_height_index]['objects'].push($(this).clone());
                        } else {
                            console.log('Width and height of each image is required as a data attribute for this script work.');
                        }
                    });

                    $('.tile_list_formatted', tile_list_instance).html('');

                    $.each(columns, function(index, value) {
                        $('.tile_list_formatted', tile_list_instance).append('<ul></ul>');
                        $('.tile_list_formatted', tile_list_instance).find('ul:last-child').append(value.objects);
                    });
                    $('.tile_list_formatted', tile_list_instance).find('ul:last-child').addClass('last');
                    window.galleries.responsive.tile_list_after_init();
                });
            },

            tile_list_after_init: function() {

            },

            dynamic_grid_image_size: function() {

                if ($('body').hasClass('responsive-layout-forced-image-lists')) {
                    var selector_context = $('body.responsive-layout-forced-image-lists .records_list.image_list, body.responsive-layout-forced-image-lists .records_list.detail_list');
                    $(selector_context).each(function() {
                        $('li', this).each(function() {
                            if ($('.fill', this).css('display') == 'block') {
                                var image_wrapper_height = $('.image_wrapper', this).height();
                                $('.image, .image > span', this).attr('style', 'height:' + image_wrapper_height + 'px !important');
                                $('.image span > img', this).attr('style', 'max-height:' + image_wrapper_height + 'px !important');
                            } else if ($('.image, .image > span', this).attr('style')) {
                                $('.image, .image > span', this).attr('style', '');
                                $('.image img', this).attr('style', '');
                            }
                        });
                    });
                }

            }

        },

        lists: {

            init: function() {
                window.galleries.lists.ajax.init();
                window.galleries.lists.ajax.rewrite_links();
                window.galleries.lists.cleanup_whitespace.init();
            },

            cleanup_whitespace: {
                init: function() {
                    $('.remove_html_whitespace').each(function() {
                        $(this).html($(this).html().replace(/>\s+</g,'><'));
                    });
                }
            },

            ajax: {

                init: function() {

                    ajax_list_loopcount = 0;
                    $('.records_list_ajax').each(function() {
                        if ($('ul li > a', this).size() > 0) {

                            ajax_list_loopcount = ajax_list_loopcount + 1;
                            $(this).attr('data-relative', String(ajax_list_loopcount));

                            var ajax_preview_area = '<div class="records_list_preview" data-relative="' + String(ajax_list_loopcount) + '"><div class="loader_simple">Loading</div><div class="ajax_content"></div></div>';

                            if ($(this).closest('.records_list_ajax').attr('data-ajax-preview-position') == 'top') {
                                $(this).before(ajax_preview_area);
                            } else {
                                $(this).after(ajax_preview_area);
                            }

                            if ($(this).attr('data-ajax-list-type') == 'hover') {
                                $('ul li > a', this).each(function() {
                                    var instance = $(this).closest('li');
                                    $(this)
                                        .mouseover(function() {
                                            $(this).closest('.records_list_ajax').stop().clearQueue();
                                            $(this).closest('.records_list_ajax').animate({'min-height': 0}, 300, function() {
                                                window.galleries.lists.ajax.load(instance, '', true);
                                            });
                                            return false;
                                        })
                                        .mouseout(function() {
                                            $(this).closest('.records_list_ajax').stop().clearQueue();
                                        })
                                    ;
                                });
                            } else {
                                $('ul li > a', this).each(function() {
                                    $(this).addClass('ajax_link').click(function() {
                                        window.galleries.lists.ajax.load($(this).closest('li'));
                                        return false;
                                    });
                                });
                            }

                            if (window.location.hash && window.location.hash != '#' && window.location.hash != '#'+window.location.pathname && window.location.hash != '#undefined') {
                                var this_hash = window.location.hash.split('#')[1];
                                if (this_hash != window.location.pathname) {
                                    window.galleries.lists.ajax.load([], this_hash, false);
                                }
                            } else {
                                $('li:eq(0) > a', this).each(function() {
                                    // Display the first one by default
                                    window.galleries.lists.ajax.load($(this).closest('li'), '', true);
                                });
                            }

                        }
                    });

                },

                load: function(instance, url, background_load, no_scroll) {

                    if (!$(instance).closest('li').hasClass('active') || url) {

                        if (url) {
                            url = url;
                            var preview_area = $('.records_list_preview');
                        } else {
                            url = $('a', instance).attr('href');
                            $(instance).closest('.records_list_ajax').find('ul li').removeClass('active');
                            $(instance).addClass('active');
                            var preview_area = $('.records_list_preview[data-relative=' + $(instance).closest('.records_list_ajax').attr('data-relative') + ']');
                        }

                        if ($(preview_area).is(':visible')) {

                            // Position the preview area so it can be seen by the user
                            if ($(instance).size() > 0) {
                                var top_offset = $(window).scrollTop() - $(instance).closest('.records_list_ajax').offset().top + 140;
                                if (top_offset < 0) {
                                    var top_offset = 0;
                                }
                                $('.records_list_preview').animate({'padding-top': top_offset}, 0, 'easeInOutQuint');
                            }

                            $('.loader_simple', preview_area).show();
                            $('.ajax_content', preview_area).fadeTo(0, 0);

                            window.galleries.lists.ajax.before(instance, preview_area, url);

                            $.ajax({
                                url: url,
                                data: 'modal=1',
                                cache: false,
                                dataType: 'html',
                                success: function(data) {
                                    $('.loader_simple', preview_area).hide();
                                    $('.ajax_content', preview_area).html(data).fadeTo(500, 1);
                                    $('#content, #content_module, #sidebar', preview_area).each(function() {
                                        $(this).attr('id', $(this).attr('id') + '_ajax');
                                    });
                                    $('.navigation', preview_area).remove();

                                    if (!background_load) {
                                        if ($(preview_area).offset().top > $(window).scrollTop() + ($(window).height() / 1.5)) {
                                            // Scrolls to the preview area if it is out of view (e.g. responsive version)
                                            $('html,body').animate(
                                                {scrollTop: $(preview_area).offset().top + (-140)},
                                                800,
                                                'easeInOutQuad'
                                            );
                                        }
                                    }

                                    if (false) {
                                                        // Removed as we are now just showing the preview area relative to the user scroll, this is done above the ajax call
                                                        if (!background_load) {
                                                            if ($(instance).size() > 0) {
                                                                $('html,body').animate(
                                                                    {scrollTop: $(instance).offset().top + (-180)},
                                                                    800,
                                                                    'easeInOutQuad'
                                                                );
                                                            }
                                                        }
                                                        if ($(instance).size() > 0) {
                                                            var top_offset = $(instance).offset().top - $(instance).closest('.records_list_ajax').offset().top;
                                                            $('.records_list_preview').animate({'padding-top': top_offset}, 0, 'easeInOutQuint');
                                                        }
                                    }

                                    window.location.hash = url;
                                    window.galleries.lists.ajax.after(instance, preview_area, url);
                                }
                            });
                        }
                    }

                },

                before: function(original_instance, preview_area, url) {

                },

                after: function(original_instance, preview_area, url) {

                },

                rewrite_links: function() {
                    if (window.core.ajax_sections_link_rewrite) {
                        var t;
                        for (var i = 0; i < window.core.ajax_sections_link_rewrite.length; i ++) {
                            t = '/' + window.core.ajax_sections_link_rewrite[i] + '/';
                            if (window.location.pathname.substring(0, t.length) != t) {
                                $("a[href^='" + t + "']").not("a[href='" + t + "']").not('.ajax_link').each(function() {
                                    var new_href = '' + t + '#' + $(this).attr('href');
                                    $(this).attr('href', new_href);
                                });
                            }
                        }
                    }
                }

            }

        },

        homepage_splash: {

            init: function() {
                if ($('#content.homepage_splash_intro').length && $('body.section-home').length) {
                    var site_title = '';
                    if ($('#logo a').text()) {
                        var site_title = $('#logo a').text();
                    }
                    var container_class = '';
                    var container_style = '';
                    var content_class = '';
                    var content_style = '';
                    if ($('#content').attr('data-splash-intro-image')) {
                        var container_class = 'background_image_exists';
                        var container_style = 'background-image:url(' + $('#content').attr('data-splash-intro-image') + ');';
                    }
                    if ($('#content').attr('data-splash-intro-background-color')) {
                        var container_style = container_style + 'background-color:' + $('#content').attr('data-splash-intro-background-color') + ';';
                    }
                    if ($('#content').attr('data-splash-intro-text-color')) {
                        var content_style = content_style + 'color:' + $('#content').attr('data-splash-intro-text-color') + ';';
                    }
                    if ($('#content').attr('data-splash-intro-logo')) {
                        var content_class = 'logo_image_exists';
                        var content_style = content_style + 'background-image:url(' + $('#content').attr('data-splash-intro-logo') + ');';
                        if ($('#content').attr('data-splash-intro-logo-width')) {
                            var content_style = content_style + 'background-size:' + $('#content').attr('data-splash-intro-logo-width') + ' auto;';
                        }
                        if ($('#content').attr('data-splash-intro-logo-height')) {
                            var content_style = content_style + 'min-height:' + $('#content').attr('data-splash-intro-logo-height') + ' !important;';
                        }
                    }
                    $('#container').append('<div id="home_splash" class="' + container_class + '" style="' + container_style + '"><div class="inner"><div class="content ' + content_class + '" style="' + content_style + '">' + site_title + '</div></div></div>');
                    $('#home_splash').click(function() {
                        $(this).clearQueue().fadeOut(400);
                    });
                    $('#home_splash').show(0, function() {
                        $(this).addClass('active');
                    }).delay(2000).fadeOut(1500,function() {
                        $(this).removeClass('active');
                    });
                }
            }

        },

        slideshow: {

            init: function() {

                if (window.galleries.device.handheld()) {
                    $('.hero-parallax-element').removeClass('hero-parallax-element');
                }

                $('#slideshow ul, #mirror-slideshow ul').each(function() {

                    if (!$(this).hasClass('hero-parallax-element')) {
                        var autoHeight = 'calc';
                        if ($("#slideshow, #mirror-slideshow").attr('data-cycle-autoheight-setting'))  {
                            var autoHeight = $("#slideshow").attr('data-cycle-autoheight-setting');
                        }

                        var slideshowtimeout = 5500;
                        if ($("#slideshow, #mirror-slideshow").attr('data-cycle-timeout-setting'))  {
                            var slideshowtimeout = parseInt($("#slideshow").attr('data-cycle-timeout-setting'));
                        }

                        var newsettings;
                        if ($("#slideshow, #mirror-slideshow").attr('data-cycle-custom-settings'))  {
                            var newsettings = $.parseJSON($("#slideshow, #mirror-slideshow").attr('data-cycle-custom-settings'));
                        }

                        var mastersettings = {
                            fx:     'fade',
                            speed:    1200,
                            timeout:  slideshowtimeout,
                            pause:   0,
                            slides: '>',
                            autoHeight: autoHeight,
                            swipe: true
                        }

                        for (var newkey in newsettings) {
                            mastersettings[newkey] = newsettings[newkey];
                        }

                        var onfunction = $('#slideshow').on;
                        if (onfunction) {
                            $('#slideshow ul, #mirror-slideshow ul').on('cycle-post-initialize', function(event, optionHash) {
                                window.galleries.slideshow.initialized(event, optionHash);
                            });
                            // Function fired directly before the slide has changed
                            $('#slideshow ul, #mirror-slideshow ul').on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
                                window.galleries.slideshow.after(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag);
                            });
                        }
                        
                        $('#slideshow ul, #mirror-slideshow ul').cycle(mastersettings);

                        $('#slideshow.paused, #mirror-slideshow.paused')
                            .each(function () {
                                pausePlay();
                            })
                        ;
                    }

                    window.galleries.slideshow.homepage_slideshow.init();
                });
            },

            initialized: function(event, optionHash) {

            },

            after: function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {

            },

            homepage_slideshow: {

                init: function() {

                    if ($('#content #slideshow.fullscreen_slideshow').length) {
                        var header_size = ($('#header').is(':visible') ? $('#header').outerHeight() : 0);
                        if (!$('.parallax-mirror #slideshow').length && header_size > 0) {
                            $('#slideshow.fullscreen_slideshow').css('top', header_size);

                            $(window).bind("load", function() {
                                // If the header height has changed after the page 'load' event, update the main_content padding again
                                // e.g. the height may change after webfonts have properly loaded
                                var header_size = $('#header').outerHeight();
                                if (parseInt($('#slideshow.fullscreen_slideshow').css('top')) > header_size) {
                                    $('#slideshow.fullscreen_slideshow').css('top', header_size);
                                    window.galleries.slideshow.homepage_slideshow.process();
                                }
                            });
                        }
                        $('body').addClass('type-fullscreen');
                        window.galleries.slideshow.homepage_slideshow.process();
                        $(window).resize(function() {
                            window.galleries.slideshow.homepage_slideshow.process();
                        });

                        if ($('#content #slideshow.fullscreen_slideshow').hasClass('fullscreen_video')) {
                            var isMobile = window.galleries.device.handheld();
                            if (!isMobile) {
                                var videobackground = new $.backgroundVideo($('#slideshow .fullscreen_slideshow_video'), {
                                    "align": "centerX",
                                    "width": 1920,
                                    "height": 1080,
                                    "path": "",
                                    "filename": $('#slideshow .fullscreen_slideshow_video').attr('data-video'),
                                    "types": ["mp4","webm"]
                                });
                                if ($.browser.safari) {
                                    $('#video_background').get(0).play();
                                }
                            }
                        }
                    }
                },

                process: function() {

                    if ($('#slideshow.fullscreen_slideshow').length) {
                        var cms_toolbar_height = 0;
                        if ($('#cms-frontend-toolbar-container').length) {
                            var cms_toolbar_height = $('#cms-frontend-toolbar-container').outerHeight();
                        }
                        var header_offset = ($('#header').is(':visible') ? $('#header').outerHeight() : 0);
                        if ($('#header').css('position') == 'fixed' || $('#header').css('position') == 'absolute') {
                            var header_offset = 0;
                        }
                        var slideshow_offset_top = parseInt($('#content #slideshow.fullscreen_slideshow').offset().top);
                        var slideshow_height = $(window).height() - ($('#header').is(':visible') ? slideshow_offset_top : 0) - cms_toolbar_height;
                        $('#content #slideshow.fullscreen_slideshow').height(slideshow_height);
                        $('#main_content').css('padding-top', $('#content #slideshow.fullscreen_slideshow').outerHeight(true) + slideshow_offset_top);
                        if (!window.galleries.device.handheld()) {
                            $('.fullscreen_slideshow_parallax').each(function() {
                                //$(this).parallax({imageSrc: $(this).attr('data-image-src')});
                            });
                        }
                    }

                }

            }

        },

        artist_list_preview: {

            init: function() {
                if (h.element_exists('#list_preview_slideshow') && !$('#list_preview_slideshow').hasClass('no-slideshow')) {

                    var selector = $("#list_preview_slideshow >").not('.cycle-sentinel');
                    var random_slide_index = Math.floor(Math.random() * selector.length);

                    if ($('#list_preview_slideshow').hasClass('content_follow')) {
                        window.galleries.layout.content_follower('#list_preview_slideshow');
                    }

                    var params = {
                        fx:     'fade',
                        speed:    400,
                        timeout:  4500,
                        pause:   0,
                        before: function(cSlide, nSlide, options) {

                        },
                        after: function(cSlide, nSlide, options) {

                        },
                        slides: '>',
                        startingSlide: parseInt(random_slide_index),
                        autoHeight: 'calc'
                    };


                    //if($.browser.safari){
                    //    params["loader"] = "wait";
                    //}

                    $('#list_preview_slideshow').cycle(params);

                    $('#list_preview_navigation a').mouseover(function () {
                        if ($('#list_preview_slideshow').is(':visible')) {
                            $('#list_preview_slideshow').cycle('pause');
                            $('#list_preview_slideshow').cycle(parseInt($(this).attr('data-index')) - 1);
                            return false;
                        }
                    });

                }

            }

        },

        artist_list_slideshow: {

            init: function() {
                if (h.element_exists('#artist_list_slideshow') && !$('#artist_list_slideshow').hasClass('no-slideshow')) {

                    if ($('#artist_list_slideshow').hasClass('content_follow')) {
                        window.galleries.layout.content_follower('#artist_list_slideshow');
                    }

                    $('#artist_list_slideshow ul').cycle({
                        fx:     'fade',
                        speed:    400,
                        timeout:  7000,
                        pause:   0,
                        before: function(cSlide, nSlide, options) {
                            $('#artist_list_slideshow_nav a').removeClass('active');
                            link_id = nSlide.id.replace('artist_list_slideshow_', 'artist_list_');
                            $('#artist_list_slideshow_nav #' + link_id).addClass('active');
                        },
                        after: function(cSlide, nSlide, options) {
                            link_id = nSlide.id.replace('artist_list_slideshow_', 'artist_list_');
                            $('#artist_list_slideshow_nav #' + link_id).addClass('active');
                        },
                        slides: '>',
                        autoHeight: 'calc'
                    });

                    var onfunction = $('#artist_list_slideshow ul').on;
                    if (onfunction) {
                        // Method for jQuery Cycle 2 ONLY

                        // Function fired directly before the slide changes
                        $('#artist_list_slideshow ul').on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
                            $('#artist_list_slideshow_nav a').removeClass('active');
                            link_id = $(incomingSlideEl).attr('id').replace('artist_list_slideshow_', 'artist_list_');
                            $('#artist_list_slideshow_nav #' + link_id).addClass('active');
                        });
                    }

                    if ($('#artist_list_slideshow.slideshow_pause').size() > 0) {
                        $('#artist_list_slideshow ul').cycle('pause');
                    }

                    $('#artist_list_slideshow_nav a').mouseover(function () {
                        if ($('#artist_list_slideshow').is(':visible')) {
                            $('#artist_list_slideshow ul').cycle('pause');
                            $('#artist_list_slideshow ul').cycle(parseInt($(this).attr('id').split('artist_list_item')[1] - 1));
                            return false;
                        }
                    });

                }

            }

        },

        artworks: {

            init: function() {
                if ($('#artwork_description2_reveal_button').size() > 0) {
                    window.galleries.artworks.artwork_description2_reveal_button();
                }
                if ($('#artwork_description2_hide_button').size() > 0) {
                    window.galleries.artworks.artwork_description2_hide_button();
                }
                if ($('#artist_list.artist_image_on_hover').size() > 0) {
                    window.galleries.artworks.artist_list_artist_image_on_hover();
                }
            },

            artwork_description2_reveal_button: function() {
                $('#artwork_description2_reveal_button').click(function() {
                    //$('#artwork_description').slideUp();
                    $(' #artwork_description2_reveal_button, #artwork_description_container').slideUp();
                    $(' #artwork_description2_hide_button').slideDown();
                    $('#artwork_description_2').slideDown();
                    $('#image_gallery').addClass('artwork_full_details_open');
                    return false;
                });
            },

            artwork_description2_hide_button: function() {
                $('#artwork_description2_hide_button').click(function() {
                    //$('#artwork_description').slideUp();
                    $(' #artwork_description2_hide_button').slideUp();
                    $(' #artwork_description2_reveal_button, #artwork_description_container').slideDown();
                    $('#artwork_description_2').slideUp();
                    $('#image_gallery').removeClass('artwork_full_details_open');
                    return false;
                });
            },

            artist_list_artist_image_on_hover: function() {
                $('#artist_list.artist_image_on_hover ul li a img')
                    .each(function() {
                        if (!$(this).closest('a').hasClass('no-hover')) {
                            $(this).mouseover(function() {
                                $(this).stop().clearQueue().fadeTo(300, 0.0001);
                            });
                            $(this).mouseout(function() {
                                $(this).fadeTo(500, 1);
                            });
                        }
                    })
                ;
            }

        },

        image_gallery: {

            init: function() {

                var first_load = true

                if (h.element_exists('.image_gallery_multiple') && h.element_exists('#secondary_image_thumbnails')) {
                    window.galleries.image_gallery.standard();
                }

                if (h.element_exists('#ig_slideshow')) {
                    window.galleries.image_gallery.dynamic();
                }

                if (h.element_exists('#ig_slider') || h.element_exists('.ig_slider')) {
                    window.galleries.image_gallery.slider.init();
                }

            },

            standard: function() {

                $('.image_gallery_multiple')
                    .cycle({
                        fx:       'fade',
                        speed:    600,
                        timeout:  12000,
                        paused:    true,
                        slides: '>',
                        autoHeight: 'calc',
                        swipe: true
                    })
                ;
                $('#secondary_image_thumbnails a')
                    .click(function() {
                        if ($(window).scrollTop() > $('.image_gallery_multiple').offset().top) {
                            $('html,body').animate(
                                {scrollTop: $('.image_gallery_multiple').offset().top + (-20)},
                                300,
                                'easeInOutQuad'
                            );
                        }
                        $('.image_gallery_multiple').cycle(parseInt($(this).attr('data-index')));
                        return false;
                    })
                ;

            },

            slider: {

                init: function() {
                    $('#ig_slider, .ig_slider').each(function() {
                        if (!$(this).hasClass('ig_slider_single_image')) {
                            window.galleries.image_gallery.slider.max_height();
                            window.galleries.image_gallery.slider.load(this);
                            $( window ).resize(function() {
                                window.galleries.image_gallery.slider.max_height();
                                $('#ig_slider, .ig_slider').slick('setPosition');
                            });
                        } else {
                            window.galleries.image_gallery.slider.max_height();
                            $( window ).resize(function() {
                                window.galleries.image_gallery.slider.max_height();
                            });
                        }
                    });
                },

                load: function(ig_instance) {
                    var slide_count = $('.item', ig_instance).length;
                    var variable_width = true;
                    if (slide_count <= 2) {
                        var variable_width = false;
                    }
                    $(ig_instance).slick({
                        infinite: true,
                        speed: 300,
                        slidesToShow: 1,
                        accessibility:true, //left right arrow keys
                        centerMode: true,
                        variableWidth: variable_width,
                        autoplay: false,
                        autoplaySpeed: 6000,
                        arrows:true,
                        centerPadding:'0',
                        lazyLoad: 'progressive'
                        //initialSlide: initialSlide
                    });
                    // Before slide change
                    $(ig_instance).on('beforeChange', function(slick, currentSlide){
                        ig_slideshow_wrapper = slick.target.closest('.ig_slider_container_wrapper');
                        if ($('#ig_slider_caption, .ig_slider_caption', ig_slideshow_wrapper).length){
                            $('#ig_slider_caption, .ig_slider_caption', ig_slideshow_wrapper).addClass('transition');
                        }
                    });
                    $(ig_instance).on('afterChange', function(slick, currentSlide){
                        ig_slideshow_wrapper = slick.target.closest('.ig_slider_container_wrapper');
                        if ($('#ig_slider_caption, .ig_slider_caption', ig_slideshow_wrapper).length){
                            window.galleries.image_gallery.slider.caption(ig_slideshow_wrapper);
                        }
                    });

                },

                max_height: function(){
                    $('#ig_slider, .ig_slider').each(function() {
                        var slick_carousel_container = $(this);
                        ////Use original image dimensions to scale proportionally
                        var slideshow_width = $(slick_carousel_container).width();
                        var windowHeight = $(window).height();

                        //ideal slideshow height, a ratio of the width
                        var proportional_height = Math.floor(slideshow_width/1.8);

                        var upperLimit = 550;
                        if ($(slick_carousel_container).attr('data-carousel-max-height')) {
                            upperLimit = $(slick_carousel_container).attr('data-carousel-max-height');
                        }

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
                        $('.item', this).each(function(){
                            var scaleRatio = set_height  /  $(this).data('imgheight');
                            var scaledWidth = Math.round($(this).data('imgwidth') * scaleRatio);
                            var scaledHeight = Math.round($(this).data('imgheight') * scaleRatio);
                            var scaledWidth = Math.round($(this).data('imgwidth') * scaleRatio);

                            $(this).height(scaledHeight).width(scaledWidth).find('img').height(scaledHeight).width(scaledWidth);
                        });
                        $('#ig_slider_container_outer, #ig_slider_container, #ig_slider, .ig_slider_container_outer, .ig_slider_container, .ig_slider, .slick-list, .slick-track, .feature_panels .panel_slider .slider_panel_fill').height(set_height);
                    });
                },

                caption: function(slick_carousel_wrapper){
                    $('#ig_slider_caption, .ig_slider_caption', slick_carousel_wrapper).removeClass('transition');
                    ////Load the caption into the caption space, from data attribute
                    var caption = $(".slick-slide.slick-center", slick_carousel_wrapper).attr('data-caption');
                    $('#ig_slider_caption, .ig_slider_caption', slick_carousel_wrapper).html(caption);
                }

            },

            dynamic: function() {

                var slideshow_selector = '.ig_slideshow_container';
                if ($(slideshow_selector).size() < 1) {
                    var slideshow_selector = '#ig_slideshow_container';
                }

                $(slideshow_selector).each(function() {

                    var onfunction = $('#ig_slideshow', this).on;
                    if (onfunction) {
                        // Method for jQuery Cycle 2 ONLY

                        // Function fired directly after the slideshow is initialized
                        $('#ig_slideshow', this).on('cycle-post-initialize', function(event, optionHash) {
                            window.setTimeout(function() {
                                var this_instance = $(this).closest('#ig_slideshow_container');
                                if ($('#ig_slideshow .item.cycle-slide:eq(0)', this_instance).find('img').height() > 0 && $('#ig_slideshow .item.cycle-slide:eq(0)', this_instance).find('img').height() > $('#ig_slideshow', this_instance).height()) {
                                    $('#ig_slideshow', this_instance).height($('#ig_slideshow .item.cycle-slide:eq(0)', this_instance).find('img').height());
                                }
                            }, 400);
                        });

                        // Display the controller count
                        if ($('#ig_slideshow_controller_count').size() > 0) {
                            $('#ig_slideshow_controller_count').html('1 ' + $('#ig_slideshow_controller_count').attr('data-separator') + ' ' + $('#ig_slideshow >').not('cycle-sentinel').size());
                            if ($('#ig_slideshow >').not('cycle-sentinel').length < 2) {
                                $('#ig_slideshow_controller').addClass('ig_slideshow_controller_single_item');
                            }
                        }

                        // Display the first caption
                        $('#ig_slideshow_caption, .ig_slideshow_caption', this).html($('#ig_slideshow > :eq(0)', this).attr('rel').replace(/\n/g,''));

                        // Optional: Some sites can include an external custom defined caption area, this doesn't relate to the current slideshow instance
                        $('#ig_slideshow_caption_external').html($('#ig_slideshow > :eq(0)', this).attr('rel').replace(/\n/g,''));

                        // Function fired directly before the slide changes
                        $('#ig_slideshow', this).on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
                            var this_instance = $(this).closest('#ig_slideshow_container');
                            $('#ig_slideshow_caption, .ig_slideshow_caption', this_instance).html($(incomingSlideEl, this_instance).attr('rel').replace(/\n/g,''));
                            // Optional: Some sites can include an external custom defined caption area, this doesn't relate to the current slideshow instance
                            $('#ig_slideshow_caption_external').html($(incomingSlideEl, this_instance).attr('rel').replace(/\n/g,''));
                            if ($('#ig_slideshow_controller_count').size() > 0) {
                                $('#ig_slideshow_controller_count').html(optionHash.nextSlide + 1 + ' ' + $('#ig_slideshow_controller_count').attr('data-separator') + ' ' + optionHash.slideCount);
                            }
                            $('#ig_slideshow_thumbnails a', this_instance).removeClass('active');
                            $('#ig_slideshow_thumbnails a[rel=' + $('#ig_slideshow >', this_instance).not('.cycle-sentinel').index(incomingSlideEl) + ']').addClass('active');
                        });

                        // Function fired directly after the slide has changed
                        $('#ig_slideshow', this).on('cycle-after', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {

                        });
                    }


                    var autoHeight = 'container';
                    if ($('#ig_slideshow', this).attr('data-cycle-autoheight-setting'))  {
                        var autoHeight = $("#ig_slideshow", this).attr('data-cycle-autoheight-setting');
                    }

                    var cycleSpeed = 1200;
                    if ($('#ig_slideshow', this).attr('data-cycle-speed-setting'))  {
                        var cycleSpeed = $("#ig_slideshow", this).attr('data-cycle-speed-setting');
                    }

                    $('#ig_slideshow', this)
                        .cycle({
                            fx:       'fade',
                            //loader: 'wait',
                            speed:    cycleSpeed,
                            timeout:  6000,
                            pause:    0,
                            before:   function(currSlideElement, nextSlideElement, options, forwardFlag) {
                                // Depricated: For jQuery Cycle 1 ONLY
                                $('#ig_slideshow_caption, .ig_slideshow_caption').html($(this).attr('rel').replace(/\n/g,''));
                                if ($('#ig_slideshow_controller_count').size() > 0) {
                                    $('#ig_slideshow_controller_count').html(options.nextSlide + 1 + ' ' + $('#ig_slideshow_controller_count').attr('data-separator') + ' ' + options.slideCount);
                                }
                            },
                            after:   function(currSlideElement, nextSlideElement, options, forwardFlag) {
                                // Depricated: For jQuery Cycle 1 ONLY
                                if ($('#ig_slideshow_controller_count').size() > 0) {
                                    $('#ig_slideshow_controller_count').html(options.currSlide + 1 + ' ' + $('#ig_slideshow_controller_count').attr('data-separator') + ' ' + options.slideCount);
                                }
                            },
                            slides: '>',
                            //autoHeight: 'calc',
                            autoHeight: autoHeight,
                            swipe: true
                        })
                        .each(function () {
                            if ($('.artwork_video_link', this).size() > 0) {
                                var artwork_video_object = $('.artwork_video_object', this);
                                $('.artwork_video_link', this).click(function () {
                                    $(this).hide();
                                    artwork_video_object.html($(this).attr('rel'));
                                    return false;
                                });
                            }

                            $(this).bind('cycle-initialized', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
                                if ($('.artwork_video_link', this).size() > 0) {
                                    var artwork_video_object = $('.artwork_video_object', this);
                                    $('.artwork_video_link', this).click(function () {
                                        $(this).hide();
                                        artwork_video_object.html($(this).attr('rel'));
                                        return false;
                                    });
                                }
                            });
                        })
                    ;


                    $('#ig_slideshow_thumbnails a:eq(0)', this).addClass('active');

                    $('#ig_slideshow_thumbnails a', this).click(function () {
                        var this_instance = $(this).closest('#ig_slideshow_container');
                        $('#ig_slideshow .artwork_video_object', this_instance).html('');
                        $('#ig_slideshow .artwork_video_link', this_instance).show();
                        $('#ig_slideshow', this_instance).cycle('pause');
                        if ($(this).attr('rel')) {
                            $('#ig_slideshow', this_instance).cycle(parseInt($(this).attr('rel')));
                        }
                        return false;
                    });

                    if ($("#ig_slideshow_thumbnails_container", this).hasClass('ig_thumbnails_type_scroller')) {
                        if (!$("#ig_slideshow_thumbnails_container", this).hasClass('ig_thumbnails_type_scroller_disabled')) {

                            var scroller_type = '';
                            if ($("#ig_slideshow_thumbnails_container", this).hasClass('ig_thumbnails_type_scroller_click')) {
                                var scroller_type = 'clickButtons';
                            }

                            if (!window.galleries.device.handheld()) {

                                window.galleries.jscroller_start.init($("#ig_slideshow_thumbnails_container", this), scroller_type);

                                $(window).resize(function() {
                                    // TODO: Need to re-initialise this script on resize, but to do this we also need to find a way of destroying the function first
                                    // window.galleries.jscroller_start.init("#ig_slideshow_thumbnails_container");
                                });

                            } else {

                                $("#ig_slideshow_thumbnails_container", this).addClass('ig_thumbnails_type_scroller_handheld');

                            }

                            if ($('#ig_slideshow_thumbnails', this).width() < $('#ig_slideshow_thumbnails_container', this).width()) {
                                $('#ig_slideshow_thumbnails_container', this).addClass('ig_slideshow_thumbnails_inactive');
                            }

                        }
                    } else {

                        //count the ul's and add first and last classes
                        var ul_count = parseInt($('#ig_slideshow_thumbnails', this).find('ul').length) -1;
                        $('#ig_slideshow_thumbnails ul', this).eq(0).addClass('first');
                        $('#ig_slideshow_thumbnails ul', this).eq(ul_count).addClass('last');
                        //check if support for on method
                        if (onfunction) {
                            $( '#ig_slideshow_thumbnails', this).on( 'cycle-update-view', function( event, optionHash, slideOptionsHash, currentSlideEl) {
                                var this_instance = $(this).closest('#ig_slideshow_container');
                                $('#ig_slideshow_thumbnails_container', this_instance).removeClass('last_slide_active').removeClass('first_slide_active');
                                //slidecount
                                //optionHash.slideCount
                                //optionHash.currSlide
                                //console.log(optionHash.slideCount);
                                if (optionHash.slideCount > 1) {
                                    //check if current slide is last and add class
                                    if (optionHash.currSlide == optionHash.slideCount-1) {
                                        $('#ig_slideshow_thumbnails_container', this_instance).addClass('last_slide_active');
                                    }
                                    //check if current slide is the first add class first
                                    if (optionHash.currSlide == 0) {
                                        $('#ig_slideshow_thumbnails_container', this_instance).addClass('first_slide_active');
                                    }
                                }
                            });
                        }//end of if onfunction


                        $('#ig_slideshow_thumbnails', this).cycle({
                            fx:      'scrollHorz',
                            speed:    500,
                            timeout:  1000,
                            slides: '>'
                        });
                        $('#ig_slideshow_thumbnails', this).cycle('pause');
                        $('#ig_slideshow_thumbnails_prev a', this).click(function () {
                            var this_instance = $(this).closest('#ig_slideshow_container');
                            $('#ig_slideshow_thumbnails', this_instance).cycle('prev');
                            return false;
                        });
                        $('#ig_slideshow_thumbnails_next a', this).click(function () {
                            var this_instance = $(this).closest('#ig_slideshow_container');
                            $('#ig_slideshow_thumbnails', this_instance).cycle('next');
                            return false;
                        });
                    }

                    $('#ig_slideshow_controller').each(function() {
                        $('#ig_slideshow_controller_prev a').click(function() {
                            var this_instance = $('#ig_slideshow_container');
                            $('#ig_slideshow').cycle('pause').cycle('prev');
                            return false;
                        });
                        $('#ig_slideshow_controller_next a').click(function() {
                            var this_instance = $('#ig_slideshow_container');
                            $('#ig_slideshow').cycle('pause').cycle('next');
                            return false;
                        });
                    });

                });

            }

        },

        jscroller_start: {

            init: function(element, scroller_type) {

                $(element).thumbnailScroller({
                    /* scroller type based on mouse interaction
                    values: "hoverPrecise", "hoverAccelerate", "clickButtons"
                    default: "hoverPrecise" */
                    scrollerType: scroller_type,
                    /* scroller orientation
                    values: "horizontal", "vertical"
                    default: "horizontal" */
                    scrollerOrientation:"horizontal",
                    /* scroll easing type only for "hoverPrecise" scrollers
                    available values here: http://jqueryui.com/demos/effect/easing.html
                    default: "easeOutCirc" */
                    scrollEasing:"easeOutCirc",
                    /* scroll easing amount only for "hoverPrecise" and "clickButtons" scrollers (0 for no easing)
                    values: milliseconds
                    default: 800 */
                    scrollEasingAmount:800,
                    /* acceleration value only for "hoverAccelerate" scrollers
                    values: integer
                    default: 2 */
                    acceleration:1,
                    /* scrolling speed only for "clickButtons" scrollers
                    values: milliseconds
                    default: 600 */
                    scrollSpeed:800,
                    /* scroller null scrolling area only for "hoverAccelerate" scrollers
                    0 being the absolute center of the scroller
                    values: pixels
                    default: 0 */
                    noScrollCenterSpace:80,
                    /* initial auto-scrolling
                    0 equals no auto-scrolling
                    values: amount of auto-scrolling loops (integer)
                    default: 0 */
                    autoScrolling:0,
                    /* initial auto-scrolling speed
                    values: milliseconds
                    default: 8000 */
                    autoScrollingSpeed:2000,
                    /* initial auto-scrolling easing type
                    available values here: http://jqueryui.com/demos/effect/easing.html
                    default: "easeInOutQuad" */
                    autoScrollingEasing:"easeInOutQuad",
                    /* initial auto-scrolling delay for each loop
                    values: milliseconds
                    default: 2500 */
                    autoScrollingDelay:500
                });
            }

        },

        image_popup: {

            init: function() {
                
                reset_hash_on_close = false;

                var fancybox_options = {
                    overlayShow: true,
                    overlayOpacity: 0.7,
                    overlayColor: '#d9d9d9',
                    imageScale: 'true',
                    zoomOpacity: 'true',
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
                        if (window.location.hash.indexOf('#/image_popup/') == -1) {
                            original_page_hash = window.location.hash;
                        } else {
                            original_page_hash = false;
                        }
                    },
                    afterLoad: function(current, previous) {
                        popup_has_zoom = $(current.element).hasClass('image_popup_zoom');
                        if (popup_has_zoom) {
                            big_image_link = current.element.attr('data-popup_zoom_image');
                        }
                        if (current.element.attr('data-fancybox-hash')) {
                            var image_popup_hash = '#/image_popup/' + current.element.attr('data-fancybox-hash') + '/';
                            location.replace(image_popup_hash);
                            reset_hash_on_close = true;
                        }
                        window.galleries.image_popup.afterLoad(current, previous);
                    },
                    afterShow: function() {
                        window.galleries.image_popup.afterShow();
                        if (popup_has_zoom) {
                            $('.fancybox-image').addClass('elevatezoom').attr( "data-zoom-image", big_image_link);
                            $(".elevatezoom").elevateZoom({
                                zoomType: "inner",
                                cursor: "default",
                                zoomWindowFadeIn: 200,
                                zoomWindowFadeOut: 200,
                                zoomWindowWidth: 1100,
                                zoomWindowHeight: 800
                            });
                        }
                    },
                    beforeClose: function() {
                        window.galleries.image_popup.beforeClose();
                        if ($('.powerzoom_image').length) {
                            if ($('.fancybox-image').powerzoom) {
                                $('.powerzoom_image').hide();
                                $('.powerzoom_image').powerzoom("destroy");
                            }
                        }

                        if (reset_hash_on_close == true) {
                            if(history.pushState) {
                                var original_page_state = ((original_page_hash.length) ? original_page_hash : ' ');
                                history.pushState(null, null, original_page_state);
                            } else {
                                original_page_state = ((original_page_hash.length) ? original_page_hash : '#/');
                                location.hash = original_page_state;
                            }
                        }

                    },
                    afterClose: function() {
                        window.galleries.image_popup.afterClose();
                        $('.zoomContainer').remove();
                    }
                };

                $("a.image_popup, a.fancybox").fancybox(fancybox_options);

                has_been_clicked = false;

                var fancybox_options_with_zoom = {
                    overlayShow: true,
                    overlayOpacity: 0.7,
                    overlayColor: '#d9d9d9',
                    imageScale: 'true',
                    zoomOpacity: 'true',
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
                    },
                    afterLoad: function(current, previous) {
                        popup_has_zoom = $(current.element).hasClass('image_popup_zoom');
                        if (popup_has_zoom) {
                            big_image_link = current.element.attr('data-popup_zoom_image');
                        }
                        popup_has_zoom_buttons = $(current.element).hasClass('image_popup_zoom_buttons');
                        if (popup_has_zoom_buttons) {
                            $('body').addClass('fancybox-powerzoom');
                            original_image_link = current.element.attr('href');
                            $('.fancybox-inner').text('');
                            $('.fancybox-inner').html('<div class="fancybox-image disabled"><span class="powerzoom-lowres" style="background-image:url(' + original_image_link +' );"><span class="powerzoom-lowres-upscale"></span></span></div>');
                            big_image_link = current.element.attr('data-popup_zoom_image');

                            $('.fancybox-inner').append('<div class="powerzoom_controls loading powerzoom-initial"><div class="powerzoom_pan"><div class="zoom-button pz_n"><i class="fa fa-chevron-up"></i></div><div class="zoom-button pz_s"><i class="fa fa-chevron-down"></i></div><div class="zoom-button pz_e"><i class="fa fa-chevron-right"></i></div><div class="zoom-button pz_w"><i class="fa fa-chevron-left"></i></div></div><div class="powerzoom_loading_indicator zoom-button powerzoom_zoom"> <span class="loading-dots"><i class="fa fa-circle"></i><i class="fa fa-circle"></i><i class="fa fa-circle"></i></span></div> <div id="zoomOutButton" class="zoomOutButton zoom-button powerzoom_zoom"><i class="fa fa-search-minus"></i></div><div id="zoomInButton" class="zoomInButton zoom-button powerzoom_zoom"><i class="fa fa-search-plus"></i></div><div id="zoomResetButton" class="zoomResetButton zoom-button powerzoom_zoom"><i class="fa fa-repeat"></i></div></div>');
                            $('.fancybox-image').append('<img src="" class="powerzoom-highres powerzoom-min powerzoom-transition preloading"/>');

                            $('.powerzoom_controls .zoom-button, .powerzoom-lowres').click(function(event) {
                                if ($('.powerzoom_controls').hasClass('powerzoom-initial')) {
                                    $('.powerzoom_controls').addClass('showloader');
                                    has_been_clicked = true;
                                }
                            });
                            $('img.powerzoom-highres').attr('src', big_image_link).on('load', function() {
                                $('.powerzoom_controls .zoom-button, .powerzoom-lowres').unbind('click');
                                var original_image_width = $('img.powerzoom-highres').width();
                                var original_image_height = $('img.powerzoom-highres').height();
                                $(this).addClass('loaded');
                                if ($(window).width() > 950) {
                                    $('.powerzoom-lowres-upscale').css({'background-image': "url(" + big_image_link + ")"});
                                    setTimeout(function(){
                                        $('.powerzoom-lowres').css({'background-image': "none"});
                                    },3000);
                                }
 
                                window.galleries.image_popup.powerzoom(original_image_width,original_image_height);
                                if (has_been_clicked) {
                                    $('.powerzoom_controls #zoomInButton.zoom-button').trigger('click');
                                }
                            });
                        }
                        window.galleries.image_popup.afterLoad(current, previous);
                    },
                    afterShow: function() {
                        window.galleries.image_popup.afterShow();
                        if (popup_has_zoom) {
                            $('.fancybox-image').addClass('elevatezoom').attr( "data-zoom-image", big_image_link);
                            $(".elevatezoom").elevateZoom({
                                zoomType: "inner",
                                cursor: "default",
                                zoomWindowFadeIn: 200,
                                zoomWindowFadeOut: 200,
                                zoomWindowWidth: 1100,
                                zoomWindowHeight: 800
                            });
                        }
                        if (popup_has_zoom_buttons) {
                            $('body').addClass('fancybox-powerzoom');
                            $('.fancybox-image').css('line-height', $('.fancybox-inner').height() + 'px');
                            //window.galleries.image_popup.powerzoom();
                        }
                    },
                    beforeClose: function() {
                        window.galleries.image_popup.beforeClose();
                    },
                    afterClose: function() {
                        window.galleries.image_popup.afterClose();
                        $('.zoomContainer').remove();
                        $('body').removeClass('fancybox-powerzoom');
                        $('.powerzoom_controls').addClass('initial');
                        $('.powerzoom-lowres').removeClass('hidden');
                        $('.powerzoom-highres').addClass('preloading');
                    }
                };

                //Additional fancybox settings, for powerzoom only
                fancybox_options_with_zoom['width'] = '100%';
                fancybox_options_with_zoom['height'] = '100%';
                fancybox_options_with_zoom['autoSize'] = false;
                fancybox_options_with_zoom['type'] = 'html';
                fancybox_options_with_zoom['content'] = '<div></div>';
                fancybox_options_with_zoom['closeClick'] = false;
                fancybox_options_with_zoom['helpers'] = {overlay:{closeClick: false}};

                $("a.image_popup_zoom_buttons").fancybox(fancybox_options_with_zoom);


                 if (window.location.hash.indexOf('/image_popup/') == 1) {

                     window.galleries.image_popup.detect_popup_hash();
                 }

            },

            beforeLoad: function(current, previous) {
                //call this in main.js
            },
            afterLoad: function(current, previous) {
                //call this in main.js
            },
            afterShow: function() {
                //call this in main.js
            },
            beforeClose: function() {
                //call this in main.js
            },
            afterClose: function() {
                //call this in main.js
            },

            powerzoom: function (original_image_width, original_image_height) {
                
                $('.powerzoom_controls').addClass('loaded').removeClass('loading');

                function get_framesize() {
                    var window_width = $('.fancybox-inner').width();
                    var window_height = $('.fancybox-inner').height();
                    return {w: window_width, h: window_height};
                }
                
                function min_max_zoom() {

                    var powerzoom = $('.powerzoom-highres').data('powerzoom');
                    if (powerzoom.percent > 1.99){
                        $('.powerzoom_controls').addClass('powerzoom-max');
                    } else {
                        $('.powerzoom_controls').removeClass('powerzoom-max');
                    }
                    if (powerzoom.percent == powerzoom.minPercent){
                        $('.powerzoom_controls').addClass('powerzoom-min');
                    } else {
                        $('.powerzoom_controls').removeClass('powerzoom-min');
                    }
                }

                $( window ).resize(function() {
                    setTimeout(function(){
                        var new_height = get_framesize().h
                        var new_width = get_framesize().w
                        $('.powerzoom-highres').powerzoom({width: new_width, height:new_height });
                        $('.fancybox-image').css('line-height', new_height + 'px');
                        var powerzoom = $('.powerzoom-highres').data('powerzoom');
                    },600);
                });

                //CHECK FRAME SIZE TO RENDER ZOOM AREA
                var height = get_framesize().h
                var width = get_framesize().w

        
                //RENDER ZOOM AREA AT CORRECT SIZE
                $('.powerzoom-highres').powerzoom({
                    zoom: 5,
                    maxZoom: 2,
                    zoomTouch: 40,
                    maxZoomTouch:2,
                    image_width: original_image_width,
                    image_height: original_image_height,
                    width: width,
                    height: height,
                    controls: '<span style="display:none;"></span>'
                });

                $(".powerzoom-highres").mousedown(function() {
                    $(this).removeClass('powerzoom-transition');
                    return false;
                });
                //SAVE ZOOM OBJECT AS VARIABLE, AND UPDATE ALL PARAMETERS
                var powerzoom = $('.powerzoom-highres').data('powerzoom');


                //LOAD HI-RES IF CLICK ON LOW-RES VERSION
                $('.powerzoom-lowres').click(function(event) {
                    if ($('.powerzoom_controls').hasClass('powerzoom-initial')) {
                        has_been_clicked = true;
                        if ($('.powerzoom_controls').hasClass('loaded')){
                            window.setTimeout(function() {
                                $('.powerzoom_controls').removeClass('powerzoom-initial showloader');
                                $('.powerzoom-lowres').hide().addClass('hidden');
                                $('.powerzoom-highres').hide().removeClass('preloading').fadeIn();
                            }, 400);
                        } else {
                          //show loader
                            $('.powerzoom_controls').addClass('showloader');
                        }
                        powerzoom.update();
                    }
                });

                $('.powerzoom_controls .zoom-button').click(function(event) {

                    $('.powerzoom-highres').addClass('powerzoom-transition');
                    var powerzoom = $('.powerzoom-highres').data('powerzoom');
                    var scrollValue = 300
                    var curX = powerzoom.img_left
                    var curY = powerzoom.img_top
                    if ($(this).hasClass('zoomInButton') && $('.powerzoom_controls').hasClass('powerzoom-initial')) {
                        has_been_clicked = true;
                        if ($('.powerzoom_controls').hasClass('loaded')){
                            window.setTimeout(function() {
                                $('.powerzoom_controls').removeClass('powerzoom-initial showloader');
                                $('.powerzoom-lowres').hide().addClass('hidden');
                                $('.powerzoom-highres').hide().removeClass('preloading').fadeIn();
                            }, 400);
                        } else {
                          //show loader  
                            $('.powerzoom_controls').addClass('showloader');
                        }
                        powerzoom.update();
                    } else if ($(this).hasClass('pz_w')){
                        powerzoom.drag({startX: curX, startY: curY, dx: scrollValue, dy: 0});
                    } else if ($(this).hasClass('pz_e')) {
                        powerzoom.drag({startX: curX, startY: curY, dx: -scrollValue, dy: 0});
                    } else if ($(this).hasClass('pz_n')) {
                        powerzoom.drag({startX: curX, startY: curY, dx: 0, dy: scrollValue});
                    } else if ($(this).hasClass('pz_s')) {
                        powerzoom.drag({startX: curX, startY: curY , dx: 0, dy: -scrollValue});
                    } else if ($(this).hasClass('zoomInButton')) {
                        powerzoom.zoomIn();
                    } else if ($(this).hasClass('zoomOutButton') && $('.powerzoom_controls').hasClass('powerzoom-min')) {
                        if (!$('.powerzoom_controls').hasClass('powerzoom-initial')){
                            $('.powerzoom_controls').addClass('powerzoom-initial');
                            $('.powerzoom-highres').hide().addClass('hidden');
                            $('.powerzoom-lowres').hide().fadeIn().removeClass('hidden');
                        }
                    } else if ($(this).hasClass('zoomOutButton')) {
                        powerzoom.zoomOut();
                    } else if ($(this).hasClass('zoomResetButton') && $('.powerzoom_controls').hasClass('powerzoom-min')) {
                        if (!$('.powerzoom_controls').hasClass('powerzoom-initial')){
                            $('.powerzoom_controls').addClass('powerzoom-initial');
                            $('.powerzoom-highres').hide().addClass('hidden');
                            $('.powerzoom-lowres').hide().fadeIn().removeClass('hidden');
                        }
                    } else if ($(this).hasClass('zoomResetButton')) {
                        powerzoom.zoom(0);
                    }

                });

                $('.powerzoom-highres').powerzoom().on('powerzoom', function (e, result) {
                    min_max_zoom();
                });

                powerzoom.update();

            },
            
            detect_popup_hash: function() {
                //detect image_popup hash on load and
                //trigger click for relevant image popup
                var hash_segments = window.location.hash.split('/');
                if (hash_segments.length >= 3 && hash_segments[1] == 'image_popup'){
                    $('a[data-fancybox-hash="' + hash_segments[2] + '"]').trigger('click');
                }
  
            }

        },

        quicksearch: {

           init: function() {

                if ($('#header_quick_search').length) {
                    $('#header_quick_search .inputField')
                        .each(function() {
                            if ($(this).attr('data-default-value') && !$(this).val()) {
                                $(this).val($(this).attr('data-default-value'));
                            }
                            if ($('#header_quick_search').hasClass('header_quick_search_reveal')) {
                                //$(this).attr('data-width', '68');
                                //$(this).width(0);
                            }
                        })
                        .focus(function(){
                            if ($('#header_quick_search .inputField').val() == 'Search'){
                                $('#header_quick_search .inputField').val( '' ).closest('#header_quick_search').addClass('active');
                            }
                        })
                        .blur(function(){
                            if ($('#header_quick_search .inputField').val() == ''){
                                if ($('#header_quick_search').hasClass('header_quick_search_reveal')) {
                                    //$(this).animate({'width': '0'});
                                }
                                $('#header_quick_search .inputField').val('Search').closest('#header_quick_search').removeClass('active');
                            }
                        })
                    ;
                    $('#header_quick_search #header_quicksearch_btn').click(function() {
                        if (!$('#header_quicksearch_field').val() || $('#header_quicksearch_field').val() == $('#header_quicksearch_field').attr('data-default-value')) {

                            if ($('#header_quick_search').hasClass('header_quick_search_reveal')) {
                                //$('#header_quicksearch_field').animate({'width': $('#header_quicksearch_field').attr('data-width') + 'px'});
                            }
                            $('#header_quicksearch_field').select().focus();
                            return false;
                        } else {
                            $('#header_quicksearch_form')[0].submit()
                        }

                        $(this).closest('form').submit();
                        return false;
                    });
                }

                $('#quicksearch_field')
                    .each(function() {
                        if ($(this).attr('data-default-value') && !$(this).val()) {
                            $(this).val($(this).attr('data-default-value'));
                        }
                    })
                    .click(function() {
                        if ($('#quicksearch_field').val() == $('#quicksearch_field').attr('data-default-value') || $('#quicksearch_field').val() == 'Search...') {
                            $('#quicksearch_field').val('');
                        }
                        $('#quicksearch_field').addClass('active');
                    })
                ;

                $('#quicksearch_btn').click(function() {
                    if (!$('#quicksearch_field').val() || $('#quicksearch_field').val() == $('#quicksearch_field').attr('data-default-value')) {
                        h.alert('You have not entered a search term!');
                        $('#quicksearch_field').select();
                    } else {
                        $('#quicksearch_form')[0].submit()
                    }
                });

           }

        },

        publications: {
            init: function() {
                //$(".publications_show_samples").click(function() {
                    $("a.fancybox_gallery").fancybox();
                //    $("a.fancybox_gallery#sample_image_1").click();
                //})
            }
        },

        artist: {
            init: function() {
                window.galleries.artist.enquire.init();
            },

            enquire: {
                init: function() {
                    if ($('#artist_enquire_form.errorOccurred').size() != 0) {
                            h.alert('Error: Some of the information entered was missing or incorrect.');
                    } else if ($('#artist_enquire_form.captchaError').size() != 0) {
                            h.alert('Error: The text entered did not match the image. Please try again.');
                    }
                },

                check_form: function() {
                        if ($('#f_name').val()=='') {
                                h.alert('Please enter your name.');
                                return false
                        } else if (window.app.checkEmail.check('#f_email') == false) {
                                h.alert('Please enter a valid email address.');
                                return false
                        } else if ($('#f_message').val()=='') {
                                h.alert('Please enter a message.');
                                return false
                        } else if ($('#captcha_answer').val()=='') {
                                h.alert('Ooops! The text entered did not match the image. Please try again.');
                                return false
                        }

                        return true;

                },

                submit: function() {

                    if (window.galleries.artist.enquire.check_form()) {
                        document.artist_enquire_form.submit();
                    }

                }
            }
        },

        depricated_contact_form: {

            init: function(which) {

                $('#contact_form .link a, #contact_form .button a').click(function () {
                        if (window.galleries.depricated_contact_form.doOnSubmit()) {
                                $('#contact_form').submit();
                        }
                        return false;
                });

                if ($('#contact_form.errorOccurred').size() != 0) {
                        window.location = '#contact_form';
                        h.alert('Please fill in the required information.');
                } else if ($('#contact_form.captchaError').size() != 0) {
                        window.location = '#contact_form';
                        h.alert('The verification text did not match the image.');
                }
            },

            doOnSubmit: function() {

                    if ($('#f_name').val()=='') {
                            h.alert('Please enter your name.');
                            return false
                    } else if ($('#f_email').val()=='') {
                            h.alert('Please enter your email address.');
                            return false
                    } else if ($('#f_email').val()!='' && window.app.checkEmail.check('#f_email') == false) {
                            h.alert('Please enter a valid email address.');
                            return false
                    } else if ($('#f_phone').val()=='') {
                            h.alert('Please enter your phone number.');
                            return false
                    } else if ($('#f_occupation').val()=='') {
                            h.alert('Please enter your occupation.');
                            return false
                    } else if ($('#f_organisation').val()=='') {
                            h.alert('Please enter your occupation.');
                            return false
                    } else if ($('#f_address').val()=='') {
                            h.alert('Please enter your address.');
                            return false
                    } else if ($('#f_message').val()=='') {
                            h.alert('Please enter your message.');
                            return false
                    }

                    return true;

            }

        },

        contact_form_popup: {

            init: function() {

                window.galleries.contact_form_popup.inline();
                window.galleries.contact_form_popup.custom();

                $('a[href$="/contact/form/"], .website_contact_form')
                    .unbind()
                    .each(function() {
                        if ($(this).hasClass('website_contact_form')) {
                            $(this).attr('href', '/contact/form/?modal=1');
                        } else {
                            $(this).attr('href', $(this).attr('href') + '?modal=1');
                        }
                    })
                    .addClass('website_contact_form')
                    .click(function() {

                        var additional_field_content = $(this).attr('data-contact-form-details');
                        var additional_field_image = $(this).attr('data-contact-form-image');
                        var additional_field_parent_id = $(this).attr('data-contact-form-parent-id');

                        var form_url_params = '?modal=1';
                        if (additional_field_parent_id) {
                            var form_url_params = form_url_params + '&id=' + additional_field_parent_id;
                        }

                        var url_prefix = '';
                        if (typeof window.archimedes.proxy_dir != 'undefined') {
                            var url_prefix = window.archimedes.proxy_dir;
                        }

                        $.fancybox.open(
                            url_prefix + '/contact/form/' + form_url_params,
                            {
                                type: 'ajax',
                                autoSize: false,
                                height: 'auto',
                                width: 420,
                                arrows: false,
                                prevEffect: 'fade',
                                nextEffect: 'fade',
                                closeEffect: 'fade',
                                openEffect: 'fade',
                                wrapCSS: 'fancybox_ajax_popup',
                                prevSpeed: 750,
                                nextSpeed: 750,
                                closeSpeed: 200,
                                openSpeed: 400,
                                afterShow: function() {
                                    window.galleries.contact_form_popup.after_popup();
                                    if (additional_field_content) {
                                        if ($('#contact_form #contact_form_item_preview').length) {
                                            $('#contact_form #contact_form_item_preview .inner').html('<div class="content">' + decodeURIComponent(additional_field_content) + '</div>');
                                            if (additional_field_image) {
                                                var website_domain = '';
                                                if (additional_field_image.substr(0,7) != 'http://' && additional_field_image.substr(0,8) != 'https://') {
                                                    var website_domain = 'http://' + document.location.host;
                                                }
                                                $('#contact_form #contact_form_item_preview .inner').prepend('<div class="image"><img src="' + website_domain + additional_field_image + '"/></div>');
                                            }
                                            $('#contact_form #contact_form_item_preview').slideDown(function() {
                                                if ($(window).height() < $('.fancybox-wrap').height()) {
                                                    $.fancybox.update();
                                                }
                                            });
                                            $('#contact_form #f_product').val(encodeURIComponent($('#contact_form #contact_form_item_preview').html()));
                                        } else {
                                            $('#contact_form #f_message').val(additional_field_content);
                                        }
                                    }
                                }
                            }
                        );

                        return false;
                    })
                ;

            },

            custom: function() {

                $('#contact_form_custom').each(function() {
                    $('#contact_form_custom .link a, #contact_form_custom .button a').click(function() {
                        window.galleries.contact_form_popup.submit_form($(this).closest('#contact_form'));
                        return false;
                    });
                });

            },

            inline: function() {

                $('#contact_form_inline').each(function() {
                    $.ajax({
                        url: "/contact/form/",
                        data: 'modal=1&inline=1',
                        cache: false,
                        dataType: 'html',
                        success: function(data) {
                            $('#contact_form_inline').html(data);
                            $('#contact_form .link a, #contact_form .button a').click(function() {
                                window.galleries.contact_form_popup.submit_form($(this).closest('#contact_form'));
                                return false;
                            });
                        }
                    });
                });

            },

            after_popup: function() {

                $('#contact_form .link a').click(function() {
                    window.galleries.contact_form_popup.submit_form($(this).closest('#contact_form'));
                    return false;
                });

            },

            submit_form: function(instance) {

                if (instance) {
                    $('.button', instance).addClass('loader');

                    data = '';

                    $('input, select, textarea', instance).each(function() {
                        data = data + $(this).attr('name') + '=' + $(this).val().replace(/\n/g, '<br />') + '&';
                    });

                    data = data + 'originating_page=' + encodeURIComponent(window.location.pathname + window.location.search) + '&';

                    $.ajax({
                        url: "/contact/form/process/",
                        data: data,
                        cache: false,
                        method: 'POST',
                        dataType: 'json',
                        success: function(data) {
                            $('.button', instance).removeClass('loader');
                            if (data['success'] == 1) {
                                $.fancybox(('/contact/form/?modal=1&complete=1'), window.galleries.fancybox.ajax_defaults());

                                $('input, select, textarea', instance).each(function() {
                                    $(this).val('');
                                });
                            } else {
                                window.galleries.effects.pulsate($('.error_row', instance));
                            }
                        }
                    });
                }

            }

        },

        mailinglist_signup_form_popup: {

            init: function() {

                $('a#mailinglist_signup_popup_link')
                    .each(function() {
                        $(this).attr('href', '/contact/mailinglist_signup/?modal=1');
                    })
                    .click(function() {

                        $.fancybox.open(
                            '/contact/mailinglist_signup/?modal=1',
                            {
                                type: 'ajax',
                                autoSize: false,
                                height: 'auto',
                                width: 420,
                                arrows: false,
                                prevEffect: 'fade',
                                nextEffect: 'fade',
                                closeEffect: 'fade',
                                openEffect: 'fade',
                                wrapCSS: 'fancybox_ajax_popup',
                                prevSpeed: 750,
                                nextSpeed: 750,
                                closeSpeed: 200,
                                openSpeed: 400,
                                afterShow: function() {
                                    window.galleries.mailinglist_signup_form_popup.after_popup();
                                }
                            }
                        );

                        return false;
                    })
                ;

            },

            after_popup: function() {
                window.galleries.mailing_list_form.init();
            }

        },

        mailing_list_form: {

            _send_url: '/custom/send/',
            _error_messages: '',

            init: function() {
                var self = this;
                $('#mailing_list_form')
                    .each(function() {
                        $('.field', this)
                            .each(function() {
                                $(this).val($(this).attr('data-default-value'));
                            })
                            .focus(function() {
                                if ($(this).val() == $(this).attr('data-default-value')) {
                                    $(this).addClass('active').val('');
                                }
                            })
                            .blur(function() {
                                if ($(this).val() == '') {
                                    $(this).removeClass('active').val($(this).attr('data-default-value'));
                                }
                            })
                        ;
                    })
                    .submit(function(e){
                        e.preventDefault();
                        self._send_form();
                    })
                ;
            },

            _form_data: function() {

                var data = {}
                $('#mailing_list_form input, #mailing_list_form textarea').each(function() {
                    if ($(this).val() != $(this).attr('data-default-value')) {
                        data[$(this).attr('name')] = $(this).val();
                    } else {
                        data[$(this).attr('name')] = false;
                    }
                });
                return data;
            },

            _clear_form_data: function() {
                $('#mailing_list_form input, #mailing_list_form textarea').each(function() {
                    $(this).val($(this).attr('data-default-value'));
                });
            },

            _mandatory_fields: function() {

            },

            _email_is_valid: function() {
                var self = this,
                    flag = false,
                    email = self._form_data()['email'];

                if (!self._form_data()['email']) {
                    flag = false;
                } else if (email.indexOf('@') > -1 && email.split('@')[1].indexOf('.') > -1 && email.indexOf(' ') == -1) {
                    flag = true;
                }

                /* Set error message */
                if (!flag) {
                     self._set_error('Please enter a valid email address.');
                     return false
                }
                return flag;


            },

            _emails_match: function() {

                // We are NOT matching the emails on this form
                return true;

                var self = window.galleries.mailing_list_form,
                    flag = false;

                self._form_data()['email2'] == self._form_data()['email'] ? flag = true : flag = false;

                /* Set error message */
                if (!flag) {
                    self._set_error('Your email addresses do not match.');
                }
                return flag;
            },

            _email_not_exists: function() {

                var self = window.galleries.mailing_list_form,
                    flag = false;

                $.ajax({
                    url: '/custom/email_exists/',
                    type: "POST",
                    data: {'email': self._form_data()['email']},
                    success: function(data){
                        data = JSON.parse(data);
                        flag = data['exists'] ? flag = false : flag = true;
                    },
                    async: false
                });

                /* Set error message */
                if (!flag) {
                    self._set_error('Your email address already exists on our mailing list.');
                }
                return flag;
            },

            _set_error: function(error) {
                this._error_messages = error;
            },

            _display_error: function() {
                var self = this;
                error_messages_str = '' + self._error_messages + ''

                //h.alert(error_messages_str);
                $('.error').text(error_messages_str);

            },

            _send_form: function() {

                var self = this;

                if (self._email_is_valid() && self._email_not_exists() && self._emails_match()) {
                    $.ajax({
                        url: self._send_url,
                        type: "POST",
                        data: self._form_data(),
                        success: function(data) {
                            $.fancybox(('/contact/form/?modal=1&complete=1'), window.galleries.fancybox.ajax_defaults());
                            //h.alert('<h2>Thank you</h2> You have been added to our mailing list.');
                            self._clear_form_data();
                        }
                    });
                } else {
                    self._display_error();
                }
            }
        },

        google_map_popup: {

            init: function() {

                $('#footer .website_map_popup')
                    .addClass('website_map_popup')
                    .click(function() {

                        $.fancybox.open(
                            '/contact/map/?modal=1',
                            {
                                type: 'iframe',
                                autoSize: false,
                                width: 900,
                                height: '90%',
                                arrows: false,
                                prevEffect: 'fade',
                                nextEffect: 'fade',
                                closeEffect: 'fade',
                                openEffect: 'fade',
                                prevSpeed: 750,
                                nextSpeed: 750,
                                closeSpeed: 300,
                                openSpeed: 750,
                                iframe     : {
                                   preload : false // this will prevent to place map off center
                                },
                                afterLoad: function () {

                                    $(".fancybox-overlay").addClass("no_max_height");
//                                    if ($(this.element).hasClass("i300")) {
//                                        $.extend(this, f300);
//                                        $(".fancybox-overlay").addClass("iphone_300");
//                                    } else if ($(this.element).hasClass("i420")) {
//                                        $.extend(this, f420);
//                                        $(".fancybox-overlay").addClass("iphone_420");
//                                    }
                                }

                            }
                        );

                        return false;
                    })
                ;

            }

        },

        effects: {

            pulsate: function(effect_element) {
                $(effect_element)
                    .clearQueue()
                    .hide()
                    .fadeTo(250, 1)
                    .fadeTo(250, 0)
                    .fadeTo(250, 1)
                    .fadeTo(250, 0)
                    .fadeTo(250, 1)
                    .fadeTo(250, 0)
                    .fadeTo(250, 1)
                ;
            }

        },

        fancybox: {

            ajax_defaults: function() {
                return {
                    type: 'ajax',
                    autoSize: false,
                    height: 'auto',
                    width: 495,
                    arrows: false,
                    prevEffect: 'fade',
                    nextEffect: 'fade',
                    closeEffect: 'fade',
                    openEffect: 'fade',
                    wrapCSS: 'fancybox_ajax_popup',
                    prevSpeed: 750,
                    nextSpeed: 750,
                    closeSpeed: 300,
                    openSpeed: 750,
                    afterShow: function() {

                    }
                }
            }

        },

        plugin_tweaks: {

            init: function() {
                $('#mc_embed_signup .mc-field-group #mce-EMAIL').not('[name]').attr('name', 'EMAIL');
            }

        },

        parallax: {

            init: function() {
                if (!window.galleries.device.handheld()) {
                    $('.parallax-element').each(function() {
                        $(this).parallax({imageSrc: $(this).attr('data-image-src')});
                    });
                }
            }

        }


    };

    $(document).ready(function() {

        window.galleries.init();

    });


})(jQuery);

