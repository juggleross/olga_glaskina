// Core frontend JS for Archimedes sites
// Copyright (c) 2011 Artlogic Media Limited - http://www.artlogic.net/


// prevent firebug errors
if (!window.console) {
    window.console = {
        log: function() {
            // do nothing...
        }
    };
}

(function($) {

    window.archimedes = {

        // please store all archimedes functions and vars
        // inside this object...

        archimedes_toolbar: {

            init: function() {
                $('#archimedes-toolbar-hide a').click(function() {
                    window.archimedes.archimedes_toolbar.hide();
                    $('#archimedes-toolbar')
                        .addClass('archimedes-toolbar-hidden')
                    ;
                    return false;
                });
                $('#archimedes-toolbar-hitarea')
                    .mouseover(function() {
                        $('#archimedes-toolbar-hitarea')
                            .clearQueue()
                            .delay(500)
                            .queue(function () {
                                window.archimedes.archimedes_toolbar.show();
                            });
                        ;
                    })
                    .mouseout(function() {
                        $('#archimedes-toolbar-hitarea').clearQueue();
                    })
                    .click(function() {
                        $('#archimedes-toolbar-hitarea').clearQueue();
                        window.archimedes.archimedes_toolbar.show();
                    })
                ;

                if (g.has_local_storage()) {
                    if (localStorage.getItem('archimedes-toolbar-display') == 'hidden') {
                        window.archimedes.archimedes_toolbar.hide(0);
                    }
                }

                $('#archimedes-toolbar-editpage a')
                    .each(function() {
                        var href = $(this).attr('href');
                        $(this).click(function() {
                        	var win_name = $(this).attr('id');
                            h.open_win({url: href, name: win_name, width: 1000, height: 670, scrollbars: true});
                            return false;
                        });
                    })
                    .attr('href', '#')
                    .removeAttr('target')
                ;

                $('#archimedes-toolbar-inactive')
                    .click(function() {
                        return false;
                    })
                ;
            },

            hide: function(speed) {
                var hideSpeed = 800;
                if (speed == 0) {
                    var hideSpeed = 0;
                }
                if (g.has_local_storage()) {
                    localStorage.setItem('archimedes-toolbar-display', 'hidden');
                }
                $('#archimedes-toolbar-inactive').css('display', 'block');
                $('#archimedes-toolbar-container')
                    .clearQueue()
                    .fadeTo(hideSpeed, 0, function() {
                        $(this).css('display', 'none');
                        $('#archimedes-toolbar-inactive').css('display', 'none');
                    })
                ;
                $('#archimedes-toolbar-faux')
                    .clearQueue()
                    .animate({height: 5}, hideSpeed)
                ;
                $('#archimedes-toolbar-hitarea')
                    .clearQueue()
                    .css('display', 'block')
                ;
            },

            show: function() {
                if (g.has_local_storage()) {
                    localStorage.setItem('archimedes-toolbar-display', 'visible');
                }
                $('#archimedes-toolbar-inactive').css('display', 'block');
                $('#archimedes-toolbar-container')
                    .css('display', 'block')
                    .fadeTo(800, 1, function() {
                        $('#archimedes-toolbar-inactive').css('display', 'none');
                    })
                ;
                $('#archimedes-toolbar-faux').animate({height: 41}, 500);
                $('#archimedes-toolbar-hitarea').css('display', 'none');
            }

        },

        archimedes_core: {

            init: function() {
                // check for window.core object. If present, run various functions...
                if (window.core) {
                    this.rewrite_proxy_dir_urls();
                    this.no_autocomplete();
                    this.process_links();
                }
                this.analytics.init();
            },

            process_links: function() {

                // elements with an attribute of 'data-onclick-url' should behave as a link'
                $('[data-onclick-url]:not([data-onclick-url=""])')
                    .addClass('cms-clickable')
                    .click(function() {
                        document.location.href = $(this).attr('data-onclick-url');
                    })
                ;

                // external links open in new win (unless they already have a class of 'noPopup' or 'nopopup')
                $('a').each(function() {
                    var el = $(this);
                    var href = el.attr('href');
                    if (href && href.indexOf('http') == 0 && !el.hasClass('noPopup')
                        && !el.hasClass('nopopup')
                        && !$('body').hasClass('no_pop_ups')
                        && !$('body').hasClass('nopopups')
                        && href.indexOf(window.location.hostname) == -1) {
                            el.attr('target', '_blank').addClass('external');
                    }
                });

                // elements with a class of 'behave_as_link' set an onclick value
                // based on the 'data-behave_as_link_url' attribute (html5 only)
                $('.behave_as_link').each(function() {
                    var el = $(this);
                    if (el.attr('data-behave_as_link_url')) {
                        el.css('cursor', 'pointer')
                            .click(function() {
                                document.location.href = el.attr('data-behave_as_link_url');
                            });
                    }
                });

            },

            no_autocomplete: function() {

                $('.no-autocomplete').each(function(){

                    /* Google Chrome fix - autocomplete attr is assigned to each text
                     * field, rather that the whole form  */

                    $(this).removeAttr('autocomplete');
                    $(this).find('input[type="text"]').each(function(){
                        $(this).attr('autocomplete', 'off')
                    });
                });

            },

            rewrite_proxy_dir_urls: function() {

                // do we need to rewrite urls to prepend a proxy dirname (e.g.
                // for mobile site under /m/... etc.
                if (window.core.top_level_proxy_dirs && !window.core.rewrite_top_level_proxy_dirs_server_side) {
                    var t;
                    for (var i = 0; i < window.core.top_level_proxy_dirs.length; i ++) {
                        t = window.core.top_level_proxy_dirs[i];
                        if (document.location.pathname.indexOf(t) == 0 ||
                            document.location.pathname == t.substring(0, t.length - 1)) {
                            window.archimedes.proxy_dir = t.substring(0, t.length - 1);
                            break;
                        }
                    }
                    if (window.archimedes.proxy_dir) {
                        /* rewrite urls, prepending proxy_dir if
                         * a) it is not already there
                         * b) it is not an external link
                         * c) the link begins with '/'
                         * d) the tag does NOT have a classname 'no_proxy_dir_rewrite'
                         */
                        $('a').each(function() {
                            var el = $(this);
                            var href = el.attr('href');
                            if (href && href.indexOf('http') != 0 &&
                                href.indexOf('/media/') != 0 &&
                                href.indexOf('/custom_images/') != 0 &&
                                href.indexOf('/usr/') != 0 &&
                                href.indexOf('/') == 0 &&
                                !el.hasClass('no_proxy_dir_rewrite') &&
                                !href.indexOf(window.archimedes.proxy_dir + '/') == 0) {
                                    el.attr('href', window.archimedes.proxy_dir + el.attr('href'));
                            }
                        });
                        $('form').each(function() {
                            var el = $(this);
                            var href = el.attr('action');
                            if (href && href.indexOf('action') != 0 &&
                                href.indexOf('/media/') != 0 &&
                                href.indexOf('/custom_images/') != 0 &&
                                href.indexOf('/') == 0 &&
                                !el.hasClass('no_proxy_dir_rewrite') &&
                                !href.indexOf(window.archimedes.proxy_dir + '/') == 0) {
                                el.attr('action', window.archimedes.proxy_dir + el.attr('action'));
                            }
                        });
                    }

                }
                
            },

            analytics: {
                init: function() {
                    /* Google Analytics tracking */
                    if (window._gaq || window.ga) {
                        $('a.analytics, .analytics a').click(function() {
                            var href = $(this).attr('href');
                            var path = href.replace(location.protocol + '//' + location.host, '');
                            $(this).attr('href', 'javascript:void(0)');
                            if (window.ga) {
                                // Universal analytics
                                ga('send', 'pageview', path);
                            } else if (window._gaq) {
                                // Legacy analytics
                                _gaq.push(['_trackPageview', path]);
                            }
                            setTimeout(function() {
                                document.location.href = href;
                            }, 200);
                        });

                        // Track all documents automatically in Google Analytics
                        if ($('body').hasClass('analytics-track-documents') || $('body').hasClass('analytics-track-all-links')) {
                            $('a').each(function() {
                                // Dont track this link if it is already being tracked using the .analytics class
                                if (!$(this).hasClass('.analytics') && !$(this).parent().hasClass('.analytics')) {
                                    // Check that this link is a document
                                    var element_href = $(this).attr('href');
                                    if (element_href) {
                                        if (element_href.substr(-4)[0] == '.' || element_href.substr(-5)[0] == '.' || element_href.substr(-6)[0] == '.') {
                                            $(this).click(function() {
                                                if (window._gaq || window.ga) {
                                                    var href = $(this).attr('href');
                                                    var path = href.replace(location.protocol + '//' + location.host, '');
                                                    if (window.ga) {
                                                        // Universal analytics
                                                        ga('send', 'pageview', path);
                                                    } else if (window._gaq) {
                                                        // Legacy analytics
                                                        _gaq.push(['_trackPageview', path]);
                                                    }
                                                    if (!$(this).hasClass('external') && !$(this).attr('target') == '_blank') {
                                                        setTimeout(function() {
                                                            document.location.href = href;
                                                        }, 200);
                                                    }
                                                }
                                            });
                                        }
                                    }
                                }
                            });
                        }

                        // Track all external links automatically in Google Analytics
                        if ($('body').hasClass('analytics-track-all-links')) {
                            $('a').each(function() {
                                // Dont track this link if it is already being tracked using the .analytics class
                                if (!$(this).hasClass('.analytics') && !$(this).parent().hasClass('.analytics')) {
                                    // Check that this link is a document
                                    var element_href = $(this).attr('href');
                                    if (element_href) {
                                        if (element_href.substr(0,7) == 'http://' || element_href.substr(0,8) == 'https://') {
                                            $(this).click(function() {
                                                if (window._gaq || window.ga) {
                                                    var href = $(this).attr('href');
                                                    var path = href;
                                                    if (window.ga) {
                                                        // Universal analytics
                                                        ga('send', 'event', {
                                                          'eventCategory': 'External link click',
                                                          'eventAction': path
                                                        });
                                                    } else if (window._gaq) {
                                                        // Legacy analytics
                                                        _gaq.push(['_trackPageview', path]);
                                                    }
                                                }
                                            });
                                        }
                                    }
                                }
                            });
                        }
                    }

                }
            }

        }

    };

    window.h = window.helpers = {

        format_number: {

            prep: function(v) {
                // remove commas...
                return h.replace_all(v, ',', '');
            },

            trim_zeros: function(v) {
                v = this.prep(v);
                return (v) ? parseFloat(v) : 0;
            },

            decimal: function(v, params) {
                var blank_zero = (params.blank_zero) ? true : false;
                var drop_trailing_zeros = (params.drop_trailing_zeros) ? true : false;
                v = this.prep(v);
                v = this.trim_zeros(v).toFixed(2);
                if (blank_zero && v == 0) {
                    v = '';
                }
                if (v.toString().indexOf('.') > -1) {
                    var delim = ',';
                    var vsplit = v.toString().split('.');
                    var pre = vsplit[0].split('');
                    var post = vsplit[1];
                    pre.reverse();
                    var m = 3, seg = [], segs = [], rev, new_v;
                    for (var i = 0; i < pre.length; i ++) {
                        seg[seg.length] = pre[i];
                        if (seg.length == 3) {
                            segs[segs.length] = seg.join("");
                            seg = [];
                        }
                    }
                    if (seg.length > 0) {
                        segs[segs.length] = seg.join("");
                    }
                    rev = segs.join(delim).split('');
                    rev.reverse();
                    pre = rev.join('');
                    if (!pre) {
                        pre = 0;
                    }
                    if (post == '00' && drop_trailing_zeros) {
                        new_v = pre;
                    } else {
                        new_v = pre + '.' + post;
                    }
                    v = new_v;
                }
                return v;
            }


        },

        is_int: function(value) {
            if((parseFloat(value) == parseInt(value)) && !isNaN(value)){
                return true;
            } else {
                return false;
            }
        },

        element_exists: function(sel) {
            // given a jquery selector, return true if the element exists, e.g.:
            // h.element_exists('.foo');
            // h.element_exists('#bar');
            return $(sel).length > 0;
        },

        create_html_select: function(params) {
            // note: this helper function is used by the new
            // invoice screen
            if (!params) { return; }
            var html_rows = [];
            html_rows[html_rows.length] = '<select id="' + params.el_id +
                '" name="' + params.el_name + '">';
            var sel, id;
            if (params.allow_empty) {
                sel = (!params.selected_value) ? ' selected' : '';
                html_rows[html_rows.length] = '<option value=""' + sel +
                '></option>';
            }
            for (var i = 0; i < params.option_ids_in_order.length; i ++) {
                id = params.option_ids_in_order[i];
                sel = false;
                if (params.selected_value) {
                    if (params.options[id] == params.selected_value) {
                        sel = true;
                    }
                }
                html_rows[html_rows.length] = '<option value="' + id + '"' +
                    ((sel) ? ' selected' : '') + '>' + params.options[id] +
                    '</option>';
            }
            html_rows[html_rows.length] = '</select>';
            return html_rows.join("");
        },

        open_win: function(params) {
            // a quick syntax for a new pop-up window:
            // h.open_win({url: 'url/', params: {'hello': 'world'}, width: 350, height: 350, scrollbars: true})
            if (!params) return false;
            if (!params.params) params.params = {};
            params.url = h.construct_url(params.url, params.params);
            delete params.params;
            fl_win(params);
        },

        construct_url: function(url, params) {
            // construct a GET url from a given url, plus (optionally)
            // an object contining parameters to be sent, e.g.
            // this.construct_url('/path_to_file/', {'id': 1, 'name': 'a value'})
            // -> '/path_to_file/?id=1&name=a%20value'
            // NOTE: this is the jquery equivaluent of prototype's Object.toQueryString() function
            params_str = (params) ? jQuery.param(params) : null;
            var sep = (url.indexOf("?") > -1) ? "&" : "?";
            return this.concat_ws(sep, url, params_str);
        },

        concat_ws: function() {
            // this is an improvement on the fl_concatWS
            // function in /flgui/scripts/main.js
            var out = [];
            if (!arguments || arguments.length == 0) return "";
            var sep = arguments[0]
            for (var i = 1; i < arguments.length; i ++) {
                if (arguments[i]) {
                    out[out.length] = arguments[i].toString();
                }
            }
            return out.join(sep);
        },

        decode_html_entities: function(t) {
            // converts an html entity (e.g. the html entity representing
            // the Euro symbol) to the real character. The results are cached
            // for speedy retrieval.
            // Based on a free script found here (thanks due to the author):
            // http://javascript.internet.com/snippets/convert-html-entities.html
            if (!this.html_entities_map) {
                this.html_entities_map = {};
            }
            if (this.html_entities_map[t]) {
                return this.html_entities_map[t];
            }
            var el=document.createElement("textarea");
            el.innerHTML = t.replace(/\</g,"&lt;").replace(/\>/g,"&gt;");
            this.html_entities_map[t] = el.value;
            return this.html_entities_map[t];
        },

        in_array: function(value, array) {
            /*
             * Peter is not crazed for the jQuery $.inArray syntax which returns
             * the index of the found item, or -1 if it is not in the array.
             * Sometimes we just want to know True or False if an item is in
             * an array. This function uses the jQuery function to do just that:
             * h.in_array(value, array) -> true or false
             */
            if ($.inArray(value, array) > -1) {
                return true;
            } else {
                return false;
            }
        },

        remove_leading: function(value, match_string) {
            while(value.indexOf(match_string) == 0) {
                value = ('___start___' + value).replace('___start___' + match_string, '')
            }
            return value;
        },

        display_date: function(input_date, short_month_name) {
            /*
                Display a date in SQL format to our preferred format:
                >>> display_date('2009-10-22');
                'October 22, 2009'
                >>> display_date('2009-10-22', true); // short month name
                'Oct 22, 2009'
            */
            if (!input_date || input_date == "" || parseInt(input_date) == 0) {
                return "";
            } else {
                var t="";
                var dt = "";
                var tm = "";
                if (short_month_name) {
                    var month_names=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                } else {
                    var month_names=["January","February","March","April","May","June","July","August","September","October","November","December"];
                }
                var input_array = input_date.split(" ")[0].split("-");
                var time_segment = '';
                if (input_date.indexOf(':') > -1) {
                    time_segment = input_date.split(' ')[1];
                }
                if (time_segment == '00:00:00') {
                    time_segment = '';
                }
                var y = parseInt(input_array[0], 10);
                /*
                    Note about the above syntax (javacript bug): parseInt("09") returns 0 not
                    9, and parseInt("08") returns 0 not 8, whereas all other numbers are returned
                    correctly. This is because parseInt incorrectly thinks they are invalid octal
                    numbers. The workaround is to force parseInt to base 10, eg. parseInt("09", 10)
                    returns 9. See article here:
                    http://www.breakingpar.com/bkp/home.nsf/0/87256B280015193F87256C85006A6604
                */
                var m = (parseInt(input_array[1], 10)>0) ? month_names[input_array[1]-1] : "";
                var d = parseInt(input_array[2], 10);
                t += (m != "") ? m+" " : "";
                t += (d>0) ? d+", " : "";
                t += y;
                return this.concat_ws(', ', t, time_segment);
            }
        },

        add_warning_if_greater_than_today: function() {
            // if the variable h.today exists (set it if you need to), and any field exists on
            // the page with a class of 'gt_today', check dates against today, and add a class
            // of 'warning'.
            var today = this.today;
            if (today) {
                $('.gt_today').each(function() {
                    var v = $(this).val();
                    if (v == 0 || v == '' || v == '0000-00-00') {
                         $(this).removeClass('tick');
                        $(this).removeClass('warning');
                    } else if (v < today) {
                         $(this).removeClass('tick');
                        $(this).addClass('warning');
                    } else {
                        $(this).removeClass('warning');
                        $(this).addClass('tick');
                    }
                });
            }
        },

        convert_to_single_line: function(t) {
            t = h.replace_all(t, '<br>', ', ');
            t = h.replace_all(t, '<br/>', ', ');
            t = h.replace_all(t, '<br />', ', ');
            t = h.clean_whitespace(t);
            t = h.trim(t);
            var tags_to_keep = ['b', 'i', 'u', 'em', 'strong']
            for (var i = 0; i < tags_to_keep.length; i ++) {
                t = h.replace_all(t, '<' + tags_to_keep[i] + '>', '___' + tags_to_keep[i] + '___');
                t = h.replace_all(t, '</' + tags_to_keep[i] + '>', '___/' + tags_to_keep[i] + '___');
            };
            t = t.replace(/<.+?>/g, '');
            for (var i = 0; i < tags_to_keep.length; i ++) {
                t = h.replace_all(t, '___' + tags_to_keep[i] + '___', '<' + tags_to_keep[i] + '>');
                t = h.replace_all(t, '___/' + tags_to_keep[i] + '___', '</' + tags_to_keep[i] + '>');
            };
            t = t.replace(/(, )+/g, ', ');
            return t;
        },

        trim: function(t) {
            // trim a string
            if (!t) {
                t = '';
            }
            t = t.toString();
            return t.replace(/^\s+|\s+$/g, '');
        },

        clean_whitespace: function(t) {
            // clean whitespace from a string, replacing with a single space
            if (!t) {
                t = '';
            }
            t = t.toString();
            return t.replace(/\s+/g, ' ');
        },

        list_items_to_array: function(txt, return_integers) {
            // converts a line-separated list of items into an array,
            // removing empty values
            items = this.convert_line_returns(txt).split("\n"); // convert line returns
            var out = [];
            var item;
            for (var i = 0; i < items.length; i ++) {
                item = this.trim(items[i]);
                if (item) {
                    if (return_integers) {
                        item = parseInt(item);
                    }
                    out[out.length] = item;
                }
            };
            return out;
        },

        encode_breaks: function(t, c) { // text, break character
            if (!t) {
                t = '';
            }
            if (!c) c = '<br />';
            t = this.replace_all(t, "\r\n", c);
            t = this.replace_all(t, "\r", c);
            t = this.replace_all(t, "\n", c);
            return t;
        },

        encode_breaks_to_commas: function(t) {
            return this.encode_breaks(t, ", ");
        },

        escape_quotes: function(t) {
            // converts double-quotes, returning a string suitable
            // for putting in the 'value' attribute of an html
            // input field
            return this.replace_all(t, '"', '&#34;');
        },

        convert_line_returns: function(txt, c) {
            if (!c) c = "\n";
            return this.encode_breaks(txt, c);
        },

        replace_all: function(t, r, w) { // text, replace, with
            if (!t) {
                t = '';
            }
            return t.toString().split(r).join(w);
        },

        parse_int: function(v) {
            v = parseInt(v, 10); // see note above relating to parseInt
            if (isNaN(v)) {
                v = 0;
            }
            return v;
        },

        parse_float: function(v) {
            v = parseFloat(v, 10); // see note above relating to parseInt
            if (isNaN(v)) {
                v = 0.0;
            }
            return v;
        },

        copy_obj: function(obj) {
            var out = {};
            for (var k in obj) {
                out[k] = obj[k];
            }
            return out;
        },

        decode_json: function(t) {
            return eval('(' + t + ')');
        },

        alert: function(msg, options) {
            if (msg.indexOf('<') == -1) {
                msg = '<div class="aol-default-prompt-text">' + msg + '</div>';
            }
            if (!options) {
                options = {
                    buttons: {Ok: true}
                };
            }
            if (!options.zIndex) options.zIndex = 100000; // Maximum value
            $.prompt(msg.toString(), options);
            this.set_promp_style();
        },

        notify: function(msg, milliseconds) {
            // like alert, but dismisses automatically after the
            // specified number of milliseconds
            if (msg.indexOf('<') == -1) {
                msg = '<div class="aol-default-prompt-text">' + msg + '</div>';
            }
            if (!milliseconds) {
                milliseconds = 2500;
            }
            var dialog = $.prompt(msg.toString(),{
                buttons: {Ok: true},
                timeout: milliseconds
            });
            this.set_promp_style();
        },

        prompt: function(msg, params) {
            if (msg.indexOf('<') == -1) {
                msg = '<div class="aol-default-prompt-text">' + msg + '</div>';
            }
            $.prompt(msg, params);
            this.set_promp_style();
        },

        set_promp_style: function() {
            $('.aolpromptbuttons button')
                .wrapInner('<span></span>');
            $('.aolpromptbuttons')
                .append('<div class="clear"></div>');
        },

        proxy_url: function(url) {
            // rewrites a url so that it includes the 'proxy dir' if it is being
            // used. A proxy dir is a top level directory used for a specific
            // purpose, e.g. '/m/' = mobile, '/a/' = accessible, etc...
            if (!window.archimedes.proxy_dir) {
                return url;
            } else {
                var prefix = window.archimedes.proxy_dir;
                if (url.indexOf(prefix + '/') != 0 &&
                    url.indexOf('http') != 0 &&
                    url.indexOf('/') == 0) {
                    return prefix + url;
                } else {
                    return url;
                }
            }
        },

        // Cookie functions <ricky.hewitt@artlogic.net>
        setCookie: function(c_name, value, expiredays) {
            var exdate=new Date();
            exdate.setDate(exdate.getDate()+expiredays);
            document.cookie=c_name+ "=" +escape(value)+
            ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())+";path=/";
        },

        getCookie: function(c_name) {
            if (document.cookie.length>0){
              c_start=document.cookie.indexOf(c_name + "=");
              if (c_start!=-1){
                c_start=c_start + c_name.length+1;
                c_end=document.cookie.indexOf(";",c_start);
                if (c_end==-1) c_end=document.cookie.length;
                return unescape(document.cookie.substring(c_start,c_end));
                }
              }
            return "";
        },

        // Javascript redirection (with optional delay)
        // <ricky.hewitt@artlogic.net>
        redirect: function(url, options) {
            var options = $.extend({
                delay: 0
            }, options || {});

            setTimeout(function() {
                window.location = url;
            }, options.delay);
        },

        ajax_login: function(path, username, password) {
            $.post(path, {
                username: username,
                password: password
            }, function(data) {
                if (data && data.logged_in) {
                    try {
                        window.location.reload(true);
                    } catch (e) {
                        // Backward compatability
                        window.location.href = window.location.pathname;
                    }
                } else if (data.error) {
                    h.alert(data.error);
                } else {
                    h.alert('There was a problem trying to log you in. Please refresh the page and try again.');
                }
            }, 'json');
        }

    };

    window.g = {

        reload: function() {
            window.document.location.href = window.document.location.href.split('#')[0];
        },

        has_local_storage: function() {

            var hasLocalStorage = false;
            try {
                if (localStorage) {
                    hasLocalStorage = true;
                }
            } catch(e) {
                // no localStorage!
            }
            return hasLocalStorage;
        }

    };


    // Define some core jquery plugins (please ask Peter if you want to add more)
    // Note that these plugins are defined separately in back-end js helper files

    $.fn.extend({

        floatCenter: function() {
            /*
             * $.floatCenter()
             *
             * Center an object in the window and bring it to the top. See
             * also $.toWin()
             *
             * Author: Peter Chater
             * Date: May 21, 2010
             */
            $(this).show();
            var scrollTop = $('html,body').scrollTop(); // see comments on http://api.jquery.com/scrollTop/
            var l = ($(window).width() - $(this).width()) / 2;
            var t = (($(window).height() - $(this).height()) / 2.5) + scrollTop;
            $(this).css({'left': l + 'px', 'top': t + 'px'}).toTop();
            return this;
        },

        centered: function() {
            /*
             * $('#my_element').centered()
             *
             * Center an object within its parent element
             *
             * Author: Peter Chater
             * Date: Aug 2, 2010
             */
            $(this).show().css({'margin-left': '0px', 'float': 'left'});
            var w = $(this).width() + 1; // allow 1 extra pixel to allow for rounding
            $(this).css({
                'width': w + 'px',
                'margin-left': 'auto',
                'margin-right': 'auto',
                'float': 'none'
            });
            return this;
        },

        toWin: function() {
            /*
             * $.toWin()
             * 
             * Turns an element into a faux 'window' in the page,
             * with a simple close box. Any element may be used - it will
             * be detached from its current position on the DOM and displayed
             * absolutely positioned.
             *
             * Note that the css for this is currently not fully backwards-
             * compatible it uses custom drop-shadow and rounded-corners
             * available in contemporary browsers. It should default to a
             * rectangle in older browsers.
             *
             * Usage:
             *
             * $('#my_element').toWin();
             *
             * Note that the element should initially be set to display none.
             *
             * To cancel the window, a button or link should be placed inside
             * the element whose click action will be:
             *
             * $('#my_element').cancelWin();
             *
             * Author: Peter Chater
             * Date: May 24, 2010
             * Requires: TopZIndex (see below)
             */
            window.archimedes.current_towin_el = this;
            $(this)
                .setMask()
                .addClass('archimedes_towin')
                .css({'position': 'absolute'})
                .floatCenter()
                .fadeTo('fast', 1.0)
                .setCloseBox();
            return this;
        },

        cancelWin: function() {
            /*
             * $.cancelWin()
             *
             * Remove a 'window' created with the $.toWin() method.
             *
             * Note that this method should be called on the element
             * that was turned into a 'win', e.g.:
             *
             * $('#my_element').cancelWin();
             *
             * ...or simply on the 'body' element:
             *
             * $('body').cancelWin();
             *
             * Author: Peter Chater
             * Date: May 24, 2010
             */
            $('#archimedes_mask_el').fadeOut();
            $('#archimedes_closebox_el').fadeOut();
            $(window.archimedes.current_towin_el).fadeOut();
            return this;
        },

        closeWin: function() {
            // synonymous with $.cancelWin() above...
            $(this).cancelWin();
            return this;
        },

        setCloseBox: function() {
            /*
             * $.setCloseBox()
             *
             * Give an object a closebox, and a handler function so that it
             * knows what to do...
             *
             * You can remove it again with:
             * $('#archimedes_closebox_el').hide();
             *
             * Author: Peter Chater
             * Date: May 24, 2010
             * Requires: TopZIndex (see below)
             */
            var l = $(this).offset().left + $(this).width() + 40;
            var t = $(this).offset().top - 10;
            if (!h.element_exists('#archimedes_closebox_el')) {
                $('body').append('<div id="archimedes_closebox_el"></div>');
            }
            $('#archimedes_closebox_el')
                .css({
                    'position': 'absolute',
                    'left': l + 'px',
                    'top': t + 'px',
                    'width': '30px',
                    'height': '30px',
                    'background': 'transparent url(/lib/archimedes/images/archimedes_closebox.png) top left no-repeat'
                    })
                .toTop()
                .show('fast')
                .click(function() {
                    $('body').cancelWin();
                });
            return this;
        },

        setMask: function() {
            /*
             * $.setMask()
             *
             * Sets a mask element behind the current element. Used in
             * conjunction with toWin() above...
             *
             * Author: Peter Chater
             * Date: May 24, 2010
             * Requires: TopZIndex (see below)
             */
            var scrollTop = $('html,body').scrollTop(); // see comments on http://api.jquery.com/scrollTop/
            var exists = h.element_exists('archimedes_mask_el');
            if (!h.element_exists('archimedes_mask_el')) {
                $('body').append('<div id="archimedes_mask_el" style="display: none;"></div>');
            }
            $('#archimedes_mask_el')
                .fadeTo(1, 0.001)
                .css({
                    'position': 'absolute',
                    'top': '0',
                    'left': '0',
                    'width': $(window).width() + 'px',
                    'height': (scrollTop + $(window).height()) + 'px',
                    'background': '#333'
                    })
                .toTop()
                .fadeTo('fast', 0.3)
                .click(function() {
                    $('body').cancelWin();
                });
            return this;
        },

        toTop: function() {
            /*
             * $.toTop() - bring an object to the top. This assumes the object
             * is already absolutely positioned.
             *
             * Author: Peter Chater
             * Date: May 21, 2010
             * Requires: TopZIndex (see below)
             */
            $(this).show().css({'z-index': $.topZIndex() + 1});
            return this;
        }

    });

    $.fn.makeAbsolute = function(rebase) {
        // Thanks, Rick Strahl!
        // http://www.west-wind.com/Weblog/posts/517320.aspx
        return this.each(function() {
            var el = $(this);
            var pos = el.position();
            el.css({ position: "absolute",
                marginLeft: 0, marginTop: 0,
                top: pos.top, left: pos.left });
            if (rebase)
                el.remove().appendTo("body");
        });
    };


    $(document).ready(function() {

        window.archimedes.archimedes_toolbar.init();
        window.archimedes.archimedes_core.init();

        $('blockquote').wrapInner('<span></span>');

        // make heading images work in ie6
        // swap png for jpeg and add a unique class
        if ($.browser.msie && $.browser.version < 7.0) {
            $('.heading-image').addClass('heading-image-ie6');
            $('.heading-image img').attr('src', function() {
                var newFilename = $(this).attr('src').replace('.png','.jpg');
                $(this).attr('src', newFilename);
            });
        }

        // center all elements with a class of .centered
        $('.centered').each(function() {
            $(this).centered();
        });

        // clear after all elements with a class of .clearafter.
        // Don't be tempted to remove this - there is a 'clearwithin'
        // class which appends a div of class 'clear' *within* the given
        // element. This class appends a div of class="clear" *afterwards*
        $('.clearafter').after('<div class="clear"></div>');


        // Login form
        $('#login_form .large_button a', this).click(function() {
            $('#login_form').submit();
            return false;
        });

        // Fancybox images
        if (h.element_exists('a.fancybox')) {
            // first we need to find any captions in div.embedded_img elements
            // and move them to the alt attributes...
            if (h.element_exists('div.embedded_img')) {
                $('div.embedded_img').each(function() {
                    var obj = $(this);
                    var caption = h.escape_quotes($('div.embedded_img_caption', obj).html());
                    var caption2 = h.escape_quotes($('div.embedded_img_caption2', obj).html());
                    $('div.embedded_img_caption2', obj).html('');
                    $('a.fancybox', obj).attr('alt', caption2 || caption);
                    $('div.embedded_img_img img', obj).attr('alt', caption);
                });
            }
            // now prepare fancybox elements
            $("a.fancybox").fancybox({
                'overlayShow': true,
                'overlayOpacity': 0.7,
                'overlayColor': '#d9d9d9',
                'imageScale': 'true',
                'zoomOpacity': 'true'
            });
        }


    });


})(jQuery);






// FL Win
// Must be a better way of doing this...

        var fl_win = function(params) {
            return fl_popUpWin(params);
        }

        var fl_popUpWins = [];

        function fl_popUpWin(url, name, w, h, scrollbars, resizable, menubar, status) {
            if (typeof url == 'object') {
                /*
                    As of Nov 2007, you may use the shorter alias to this function, 'fl_win',
                    and may specify parameters as an object, using only the first argument, e.g.:

                        fl_win({
                            url: '/my_popup.html'
                        });

                        fl_win({
                            url: '/my_popup.html',
                            name: 'PopUp',
                            width: 500,
                            height: 400,
                            scrollbars: true,
                            resizable: true,
                            menubar: true,
                            status: true
                        });

                    No parameters are required, however 'url' is highly recommended!
                    When using the 'params' method, 'fl_win' is an alias for 'fl_popUpWin', e.g.:
                    fl_popUpWin({...params...}) will work in the same manner
                */
                // set up defaults
                var params = url;
                var url = (params.url) ? params.url : "http://www.artlogic.net/flgui/images/shim.gif";
                var name = (params.name) ? params.name : "Window_" + fl_popUpWins.length;
                var w = (params.width) ? params.width : 550;
                var h = (params.height) ? params.height : 550;
                // as of JAN 2009, the height is then adjusted to in accordance with the browser...
                h = win_adjust_h(h);
                var scrollbars = (params.scrollbars) ? "yes" : "no"
                var resizable = (params.resizable) ? "yes" : "no"
                var resizable = (params.resizable) ? "yes" : "no"
                var menubar = (params.menubar) ? "yes" : "no"
                var status = (params.status) ? "yes" : "no"
            } else {
                var w = (w) ? w : 550;
                var h = (h) ? h : 550;
                var scrollbars = (scrollbars) ? "yes" : "no";
                var resizable = (resizable) ? "yes" : "no";
                var menubar = (menubar) ? "yes" : "no";
                var status = (status) ? "yes" : "no";
            }
            var l=(screen.availWidth-w)/2;
            var t=((screen.availHeight-h)/3)-40;
            if (!fl_popUpWins[name] || fl_popUpWins[name].closed) {
                fl_popUpWins[name] = window.open(url,name,'width=' + w + ',height=' + h + ',top=' + t + ',left=' + l + ',scrollbars=' + scrollbars + ',resizable=' + resizable + ',menubar=' + menubar + ',status=' + status);
                if (fl_popUpWins[name]) { // the window may have been blocked by a pop-up blocker
                    fl_popUpWins[name].focus();
                } else {
                    alert("Please ensure that you allow pop-up windows for this application as they may contain important messages or functionality. Please update your browser preferences and reload this page.");
                }
            } else if (fl_popUpWins[name]) { // the window may have been blocked by a pop-up blocker
                fl_popUpWins[name].focus();
            }
        }

        var browser = {

            init: function() {
                this.bname = navigator.appName;
                this.ver = parseInt(navigator.appVersion);
                this.agt = navigator.userAgent.toLowerCase();
                this.mac = (this.agt.indexOf("mac") > -1);
                this.win = (this.agt.indexOf("win") > -1);
                this.x11 = (this.agt.indexOf("x11") > -1);
                this.opera = (this.agt.indexOf("opera") > -1); // must be above IE4 as Opera users can set Opera to 'identify' as IE in preferences,
                this.safari = (this.agt.indexOf("safari") > -1);
                this.firefox = (this.agt.indexOf("firefox") > -1);
                this.camino = (this.agt.indexOf("camino") > -1);
                this.ns = this.netscape = (this.bname == "Netscape");
                this.ie = (this.bname == "Microsoft Internet Explorer" && !this.opera);
                this.iemac = (this.ie && this.mac);
                this.get_version(); // must be run before browser-version-specific options, below
                this.tweaks();
                this.ns3 = (this.ns && this.ver < 4);
                this.ns4 = (this.ns && this.ver >= 4 && this.ver < 5);
                this.ns6 = (this.ns && this.ver >= 5);
                this.ie3 = (this.ie && this.ver < 4);
                this.ie4 = (this.ie && this.ver >= 4);
                this.ie4win=(this.ie4 && this.win);
                this.iewin = (this.ie && this.win);
                this.ie4mac=(this.ie4 && this.mac);
            },

            get_version: function() {
                if (this.agt.indexOf('firefox/') > -1) {
                    this.ver = parseInt(this.agt.split('firefox/')[1].split(' ')[0]);
                } else if (this.safari && this.agt.indexOf('version/') > -1) {
                    this.ver = parseInt(this.agt.split('version/')[1].split(' ')[0]);
                } else if (this.ie) {
                    this.ver = parseInt(this.agt.split(' msie ')[1].split(';')[0]);
                }
            },

            tweaks: function() {
                if (this.camino) {
                    this.firefox = false;
                }
            }

        };

        browser.init();

        var win_adjust_h = function(h) {
            if (browser.firefox && browser.ver >= 3) {
                h += 30;
            } else if (browser.firefox && browser.ver >= 2) {
                h += 10;
            };
            return h
        };



// Email address obfuscator

function mangle() {
    if (!document.getElementsByTagName && !document.createElement &&
        !document.createTextNode) return;
    var nodes = document.getElementsByTagName("span");
    for(var i=nodes.length-1;i>=0;i--) {
        if (nodes[i].className=="fixEmail") {
            var at = / at /;
            var dot = / dot /g;
            var node = document.createElement("a");
            var address = nodes[i].firstChild.nodeValue;

            address = address.replace(at, "@");
            address = address.replace(dot, ".");

            node.setAttribute("href", "mailto:"+address);
            node.appendChild(document.createTextNode(address));

            var prnt = nodes[i].parentNode;
            for(var j=0;j<prnt.childNodes.length;j++)
                if (prnt.childNodes[j] == nodes[i]) {
                    if (!prnt.replaceChild) return;
                    prnt.replaceChild(node, prnt.childNodes[j]);
                    break;
                }
        }
    }
}


// Build form elements

    // For accessibile forms.

    function showForms() {
    	
        $('.jsSubmit').css('display','block');
        $('.nojsSubmit').css('display','none');
    }


// Stop image flickering in IE

    try {
        document.execCommand("BackgroundImageCache", false, true);
    } catch(err) {}


// Run everything

    $(document).ready(function() {
        showForms();
        mangle();
    });



// Third party plugins required in the above

/*
    TopZIndex 1.1 (September 23, 2009) plugin for jQuery
    http://topzindex.googlecode.com/
    Copyright (c) 2009 Todd Northrop
    http://www.speednet.biz/
    Licensed under GPL 3, see  <http://www.gnu.org/licenses/>
*/
(function(a){a.topZIndex=function(b){return Math.max(0,Math.max.apply(null,a.map(a(b||"body *:visible"),function(d){return parseInt(a(d).css("z-index"))||null})))};a.fn.topZIndex=function(b){if(this.length===0){return this}b=a.extend({increment:1,selector:"body *:visible"},b);var d=a.topZIndex(b.selector),c=b.increment;return this.each(function(){a(this).css("z-index",d+=c)})}})(jQuery);


/* jquery.centerInWindow
 * A plug-in to center an element in the window. Based on:
 * http://stackoverflow.com/questions/210717/using-jquery-to-center-a-div-on-the-screen
 */
jQuery.fn.centerInWindow = function (options) {
    var options = $.extend({
        'close_box': true
    }, options || {});
    $(this).css("position","absolute");
    var t = (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop();
    var l = (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft();
    $(this).css("top", t + "px");
    $(this).css("left", l + "px");
    var el_id = $(this).attr('id');
    if (options.close_box) {
        var close_el_id = 'center_in_window_closebox';
        if (!h.element_exists(close_el_id)) {
            $('body').append('<div id="' + close_el_id + '" class="_closebox">&nbsp;</div>')
            $('#center_in_window_closebox').css({
                'position': 'absolute',
                'left': (l + $(this).outerWidth() - 15) + 'px',
                'top': (t - 10) + "px",
                'width': '30px',
                'height': '30px',
                'background': 'transparent url(/lib/archimedes/images/close.png) top left no-repeat'
            }).click(function() {
                $('#center_in_window_closebox').hide();
                $('#' + el_id).hide(200);
            });
            $('.close-btn', '#' + el_id).click(function() {
                $('#center_in_window_closebox').hide();
                $('#' + el_id).hide(200);
            });
        }
    }
    return this;
}
