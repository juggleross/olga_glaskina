(function($) {

    window.cart = {

        init: function() {
            window.cart.edit_price($('.store_item .edit_price'));
            window.cart.add_to_cart($('.store_item .store_item_add_to_cart'));
            window.cart.remove_from_cart($('.store_item .store_item_remove_from_cart'));
            window.cart.remove_from_cart_summary_page();
            window.cart.change_qty();
            window.cart.set_coupon();
            window.cart.set_shipping_zone_in_session();
            window.cart.set_shipping_option_in_session();
            window.cart.proceed_to_payment();
            window.cart.cart_summary.init();
            window.cart.cart_page_init();
            window.cart.cart_terms_checkbox();
            window.cart.errors();
        },

        cart_page_init: function() {
            if ($('#sc_checkout_container').length) {
                if ($('#sc_checkout_content .proceed_to_payment').hasClass('active') || $('#sc_checkout_button').hasClass('active')) {
                    window.cart.enable_checkout_button();
                }
            }

        },
        
        cart_terms_checkbox: function() {
            if ($('#sc_terms_box').length) {
                $('#sc_terms_box #sc_terms_agree')
                    .each(function() {
                        if ($(this).is(':checked')) {
                            $('#sc_checkout_button').removeClass('sc_terms_unconfirmed');
                        } else {
                            $('#sc_checkout_button').addClass('sc_terms_unconfirmed');
                        }
                    })
                    .change(function() {
                        if ($(this).is(':checked')) {
                            $('#sc_checkout_button').removeClass('sc_terms_unconfirmed');
                        } else {
                            $('#sc_checkout_button').addClass('sc_terms_unconfirmed');
                        }
                    })
                ;
                $('#sc_terms_box label a[href="#sc_terms_content"]').click(function() {
                    var terms_and_conditions_content = $('#sc_terms_box #sc_terms_content').html();
                    h.alert(terms_and_conditions_content);
                    return false;
                });
            }

        },
        
        errors: function() {
            $('#sc_checkout_error').each(function() {
                h.alert($('#sc_checkout_error').html());
            });
        },

        edit_price: function(price_field){
            price_field.each(function(){
                $(this)
                    .bind('input paste', function(){
                        // allow only numbers
                        var validChars = /^[0-9]*$|^[0-9][0-9]*\.[0-9]?[0-9]?$/;
                        var strIn = $(this).val();
                        var i = strIn.length;
                        var strOut = (validChars.test(strIn)) ? strIn : strIn.substring(0, i - 1);
                        $(this).val(strOut);
                    })
                    .blur(function() {
                        var strOut = $(this).val();
                        var strOut = parseFloat(strOut).toFixed(2);
                        $(this).val(strOut);
                        
                        var added_item_details = {};
                        var item_uid = price_field.closest('.store_item').attr('data-uid');

                        $('.store_item[data-uid="'+item_uid+'"]').find('input').each(function(data){
                            added_item_details[$(this).attr('name')] = $(this).val();
                        });

                        $.post('/cart/set_price/', {'item':JSON.stringify(added_item_details)}, function(obj) {
                            if (obj.error) {                            
                                h.alert(obj.error);                            
                            } else {
                                if (obj.new_key) {
                                    price_field.closest('.store_item').attr('data-uid', obj.new_key);
                                    price_field.closest('.store_item').find("input[name='key']").val(obj.new_key);
                                    price_field.closest('.store_item').find("input[name='price']").val(price_field.val());
                                    price_field.closest('.store_item').find("input[name='price_without_vat']").val(price_field.val());
                                }
                            }
                        }, 'json');
                    })
                ;
            });

        },

        add_to_cart: function(add_button) {
            add_button.click(function(){

                if ( $(this).closest('.store_item').hasClass('edit_price_row') )  {

                    var edited_price = $(this).closest('.store_item').find('.price input').val();

                    if ( edited_price == '' || parseInt(edited_price) == 0 ) {
                        h.alert('Please enter the correct amount');
                    } else {
                        var added_item_details = {},
                        $this = $(this),
                            item_uid = $this.closest('.store_item').attr('data-uid');

                        $('.store_item[data-uid="'+item_uid+'"]').find('input').each(function(data){
                            added_item_details[$(this).attr('name')] = $(this).val();
                        });


                        $.post('/cart/add/', {'item':JSON.stringify(added_item_details)}, function(obj) {
                            if (obj.error) {
                                h.alert(obj.error);
                            } else {
                                window.cart.cart_summary.update(obj.total_count, obj.sub_total);
                                window.cart.update_store_row(obj.uid, obj.item_count);
                                if (window.ga) {
                                    ga('send', {
                                      'hitType': 'event',
                                      'eventCategory': 'Store Add To Cart',
                                      'eventAction': window.location.pathname,
                                      'eventLabel': $(document).attr('title')
                                    });
                                }
                                if (obj.total_count == 1 && $('#scw_popup').length) {
                                    h.alert($('#scw_popup').html(), {buttons: false});
                                    $('.arpromptmessage #scw_popup_close a').click(function() {
                                        $.prompt.close();
                                        return false;
                                    });
                                }
                            }
                        }, 'json');
                    }
                } else {
                    var added_item_details = {},
                        $this = $(this),
                        item_uid = $this.closest('.store_item').attr('data-uid');

                    $('.store_item[data-uid="'+item_uid+'"]').find('input').each(function(data){
                        added_item_details[$(this).attr('name')] = $(this).val();
                    });

                    $.post('/cart/add/', {'item':JSON.stringify(added_item_details)}, function(obj) {
                        if (obj.error) {
                            h.alert(obj.error);
                        } else {
                            window.cart.cart_summary.update(obj.total_count, obj.sub_total);
                            window.cart.update_store_row(obj.uid, obj.item_count);
                            if (window.ga) {
                                ga('send', {
                                  'hitType': 'event',
                                  'eventCategory': 'Store Add To Cart',
                                  'eventAction': window.location.pathname,
                                  'eventLabel': $(document).attr('title')
                                });
                            }
                            if (obj.total_count == 1 && $('#scw_popup').length) {
                                h.alert($('#scw_popup').html(), {buttons: false});
                                $('.arpromptmessage #scw_popup_close a').click(function() {
                                    $.prompt.close();
                                    return false;
                                });
                            }
                        }
                    }, 'json');
                }
                return false;
            });
        },

        remove_from_cart: function(remove_button, reload) {
            var item_uid;
            remove_button.click(function(){
                if ($(this).closest('.store_item').size() > 0) {
                    item_uid = $(this).closest('.store_item').attr('data-uid');
                } else {
                    item_uid = $(this).attr('data-uid');
                }

                $.post('/cart/remove_item/', {'unique_id':item_uid}, function(obj) {
                    if (reload == 'reload') {
                        location.reload();
                    } else {
                        window.cart.cart_summary.update(obj.total_count, obj.sub_total);
                        window.cart.update_store_row(obj.uid, obj.item_count);
                    }
                }, 'json');

                return false;
            });
        },

        remove_from_cart_summary_page: function() {
            window.cart.remove_from_cart($('table#shopping_cart_information .remove'), 'reload');
        },

        update_store_row: function(uid, total_count) {
            $('.store_item[data-uid="'+ uid +'"]').each(function() {
                if (total_count > 0) {
                    $(this).addClass('active');
                } else {
                    $(this).removeClass('active');
                }
                $('.store_item_remove_container', this).each(function() {
                    if (total_count > 0) {
                        $(this).fadeIn();
                    } else {
                        $(this).fadeOut();
                    }
                });
                $('.store_item_total', this).each(function() {
                    $('.store_item_total_number', this).html(total_count);
                });
            });
        },

        cart_summary: {

            init: function() {
                if ($('#store_cart_widget').size() > 0) {
                    
                    if ($('#store_cart_widget').hasClass('hide_when_empty')){
                        $('#store_cart_widget').hide();
                    }

                    $.post('/cart/count/', function(total_count){
                        $.post('/cart/get_sub_total/', function(sub_total){
                            window.cart.cart_summary.update(total_count, sub_total);
                        }, 'json');
                    }, 'json');

                }
            },

            update: function(total_count, sub_total) {
                if ($('#store_cart_widget').size() > 0) {

                    if ($('#store_cart_widget').hasClass('hide_when_empty') && total_count == 0) {
                        $('#store_cart_widget').hide();
                    } else {
                        
                        $('#store_cart_widget').fadeOut('fast', function(){
                            $('.scw_total_count').html(total_count);
                            $('.scw_total_price_amount').html(sub_total);
                            $('#store_cart_widget').fadeIn('fast');
                        });
                    }
                    
                    if ($('#store_cart_widget').hasClass('hide_when_empty')){
                        
                        if (total_count < 1) {
                            $('#scw_checkout').hide();
                            $('#store_cart_widget').fadeOut('fast');
                        } else {
                            $('#scw_checkout').show();
                            $('#store_cart_widget').fadeIn('fast');
                        }
                    }
                }
            }

        },

        set_coupon: function() {
            $('#cart_set_coupon_button a').click(function(){

                var coupon_field = $('#cart_coupon_id').val();
                $.post('/cart/set_coupon/', {
                    'coupon_id': coupon_field
                }, function(response) {
                    var response = $.parseJSON(response);
                    window.cart.update_order_total($('.order_total'));
                    if (response.discount > 0) {
                       $('#sc_discount').show();
                       $('#sc_coupon_container').addClass('active');
                    } else {
                       $('#sc_discount').hide();
                       $('#sc_coupon_container').removeClass('active');
                    }
                    $('.discount_amount').html('-' + response.discount.toFixed(2));
                    if (response.success) {
                        h.alert('<h2>Thanks</h2> Your coupon has been added.');
                    } else {
                        h.alert('<h2>Sorry</h2> That coupon is not valid.');
                    }
                });
                return false;
            });
        },

        update_discount: function() {

            var coupon_field = $('#cart_coupon_id').val();
            $.post('/cart/get_total_discount/', {
                'coupon_id': coupon_field
            }, function(response) {
                if (response > 0) {
                   $('#sc_discount').show();
                   $('#sc_coupon_container').addClass('active');
                } else {
                   $('#sc_discount').hide();
                   $('#sc_coupon_container').removeClass('active');
                }
                $('.discount_amount').html('-' + parseInt(response).toFixed(2));
            });

        },

        set_shipping_zone_in_session: function() {
            $('select#shipping_zones').change(function(){

                $('#sc_total_price_container').removeClass('active');
                $('.proceed_to_payment').removeClass('active');
                
                $.post('/cart/set_shipping_zone/', {
                    'shipping_zone_id':$(this).val(),
                    'shipping_country_id':$(this).val(),
                    'use_countries':$('#use_countries').val()
                }, function() {
                    window.cart.update_shipping_cost($('.shipping_cost'));
                    window.cart.get_shipping_methods();
                    window.cart.update_total_vat_amount();
                    window.cart.update_order_total($('.order_total'));
                });
            });
            
            //$('select#shipping_zones option[value!=""]:eq(0)').each(function() {
            //    $(this).attr('selected', 'selected');
            //});
            //$('select#shipping_zones').triggerHandler('change')
        },

        get_shipping_methods: function() {
            $.post('/cart/get_shipping_methods/', {
                'shipping_zone_id':$('select#shipping_zones').val(),
                'use_countries':$('#use_countries').val()
                }, function(data) {
                $('#shipping_options_container #shipping_options').html(data);
                $('#shipping_options_container').addClass('active');
                window.cart.set_shipping_option_in_session();
            }, 'html');

        },

        set_shipping_option_in_session: function() {
            $('select#shipping_options').change(function(){
                if ($(this).val()) {
                    $.post('/cart/set_shipping_option/', {'shipping_option_id':$(this).val()}, function() {
                       window.cart.update_shipping_cost($('.shipping_cost'));
                       window.cart.update_order_total($('.order_total'));
                        window.cart.update_total_vat_amount();
                       $('#sc_total_price_container').addClass('active');
                       window.cart.enable_checkout_button();
                    });
                } else {
                    window.cart.disable_checkout_button();
                }
            });
        },

        set_qty: function (uid,obj,option) {
            var current_value = '';
            var new_value = 1;
            current_value = obj.text();
            if (option == '-') {
                if (parseInt(current_value) > 1){
                    new_value = parseInt(current_value)-1;
                } else {
                    new_value = 1
                }
            } else if (option == '+') {
                new_value = parseInt(current_value)+1;
                if (parseInt(new_value) > parseInt(obj.closest('td.sc_cell_quantity').attr('data-max-qty'))) {
                    new_value = parseInt(current_value);
                    h.alert('Sorry - you have added the maximum quantity of this item.');
                }
            }
            console.log(new_value);
            if (new_value == 1) {
                obj.closest('tr').find('.decrease_qty').addClass('disabled');
            } else {
                obj.closest('tr').find('.decrease_qty').removeClass('disabled');
            }
            obj.text(new_value);
        },

        change_qty: function () {

            /* Increase or decrease the quantity input field value */
            var uid, $tr;
            $('.increase_qty').click(function(){
                if ( ! $(this).hasClass('disabled')  ) {
                    uid = $(this).closest('tr').attr('data-uid');
                    $tr = $('tr[data-uid="'+uid+'"]').find('.qty');
                    var new_qty = parseInt($tr.text()) + 1;
                    window.cart.update_qty_in_session(uid, new_qty, $tr, '+');
                    //$('tr[data-uid="'+uid+'"]').find('.decrease_qty').removeClass('disabled');
                }
                return false;
            });
            
            $('.decrease_qty').click(function(){
                if ( ! $(this).hasClass('disabled')  ) {
                    uid = $(this).closest('tr').attr('data-uid');
                    $tr = $('tr[data-uid="'+uid+'"]').find('.qty');
                    var new_qty = parseInt($tr.text()) - 1;
                    window.cart.update_qty_in_session(uid, new_qty, $tr, '-');
                    if ( $tr.html() == '1' ) {
                        $('tr[data-uid="'+uid+'"]').find('.decrease_qty').addClass('disabled');
                    }
                }
                return false;
            });
        },

        update_qty_in_session: function(uid,qty_value, tr, direction) {
            $.post('/cart/qty/', {'unique_id':uid,'qty_value':qty_value}, function(obj) {
                if (obj.error) {
                    h.alert(obj.error);
                } else {
                    window.cart.set_qty(uid, tr, direction);
                    window.cart.update_sub_total($('.sub_total'));
                    window.cart.update_order_total($('.order_total'));
                    window.cart.update_shipping_cost($('.shipping_cost'));
                    window.cart.update_item_total_price(uid);
                    window.cart.update_total_weight($('.total_weight'));
                    window.cart.update_total_vat_amount();
                    window.cart.cart_summary.init();
                    window.cart.update_discount();
                    return true;
                }
            }, 'json');
        },


        update_sub_total: function(sub_total_el) {
            $.post('/cart/get_sub_total/', function(data){
                sub_total_el.html(data);
            }, 'html');
        },

        update_total_vat_amount: function() {
            $.post('/cart/get_total_vat_amount/', function(data){
                $('.total_vat_amount').html(data);
            }, 'html');
        },

        update_order_total: function(order_total_el) {            
            $.post('/cart/get_order_total/', function(data){
                order_total_el.each(function() {
                    $(this).html(data);
                    if ($('#sc_checkout_content .proceed_to_payment').hasClass('active')) {
                        window.cart.enable_checkout_button();
                    }
                });
            });

        },

        update_total_weight: function(el) {
            $.post('/cart/get_total_weight/', function(data){
                el.html(data);
            }, 'html');
        },

        update_item_total_price: function(uid) {
            $.post('/cart/get_item_total_price/',{'unique_id': uid}, function(obj){
                var $price = $('tr[data-uid="'+uid+'"]').find('.totalprice'),
                    $price_without_vat = $('tr[data-uid="'+uid+'"]').find('.totalprice_without_vat');
                $price.html(obj.total_price);
                $price_without_vat.html(obj.total_price_without_vat);
            }, 'json');
        },

        update_shipping_cost: function(shipping_cost_el) {
            $.post('/cart/get_shipping_cost/', function(data){                
                shipping_cost_el.html(data);
            }, 'html');
        },

        enable_checkout_button: function() {
            $('.proceed_to_payment').addClass('active');
            if ($('.proceed_to_payment').attr('data-payment-type') == 'stripe') {
               window.cart.stripe_init_button();
            }
        },

        disable_checkout_button: function() {
            $('.proceed_to_payment').removeClass('active');
            if ($('.proceed_to_payment').attr('data-payment-type') == 'stripe') {
               $('#stripe_button_container').html('');
            }
        },

        proceed_to_payment: function() {            
            var proceed_button = $('.proceed_to_payment a');
            var payment_type = proceed_button.closest('.proceed_to_payment').attr('data-payment-type');
            if (payment_type == 'worldpay') {
                proceed_button.click(function(){
                    if ($('#shipping_zones').val() !== '' && $('#shipping_options').val() !== '') {
                        $.post('/cart/worldpay/', function(data){
                            $('#worldpay').html(data);
                            $('#worldpay form').submit();
                        }, 'html');
                        return false;
                    } else {
                        return false;
                    }
                });
            } else if (payment_type == 'stripe') {

            }
        },

        stripe_init_button: function() {
            $('#stripe_form').each(function() {
                $('#stripe_loader').show();
                $('#stripe_button_container').html('');
                $.post('/cart/get_order_total/', function(order_total){
                    var stripe_form = $("#stripe_form");
                    var stripe_key = $(stripe_form).attr('data-key');
                    var stripe_description = $(stripe_form).attr('data-description');
                    var stripe_name = $(stripe_form).attr('data-name');
                    var stripe_currency = $(stripe_form).attr('data-currency');
                    var stripe_bitcoin = $(stripe_form).attr('data-bitcoin');
                    var stripe_enable_shipping_address = $(stripe_form).attr('data-shipping-address');
                    var stripe_total = order_total.replace('.', '');
                    
                    $('#stripe_button_container').html('');

                    var script_tag = document.createElement('script');
                    script_tag.setAttribute('src','https://checkout.stripe.com/checkout.js');
                    script_tag.setAttribute('class','stripe-button');
                    script_tag.setAttribute('data-key', stripe_key);
                    script_tag.setAttribute('data-amount', stripe_total);
                    script_tag.setAttribute('data-name', stripe_name);
                    script_tag.setAttribute('data-currency', stripe_currency);
                    script_tag.setAttribute('data-description', stripe_description);
                    script_tag.setAttribute('data-bitcoin', stripe_bitcoin);
                    script_tag.setAttribute('data-billing-address', 'true');
                    script_tag.setAttribute('data-shipping-address', stripe_enable_shipping_address);
                    script_tag.setAttribute('data-allow-remember-me', 'true');
                    script_tag.setAttribute('data-label', 'Pay now');
                    document.getElementById('stripe_button_container').appendChild(script_tag);

                    $('#stripe_loader').hide();
                    //$('#stripe_form #stripe_button_container').html('<div><script src="https://checkout.stripe.com/checkout.js" class="stripe-button" data-key="' + stripe_key + '"data-amount="' + stripe_total + '"data-name="' + stripe_name + '"data-currency="' + stripe_currency + '"data-description="' + stripe_description + '"data-billing-address="true" data-shipping-address="true" data-label="Pay now" data-allow-remember-me="true"></script></div>');
                });
            });
        }

    }

})(jQuery);


$(document).ready(function(){
    
    window.cart.init();

   // set TR with ID values based on index
   $('table tr.product_detail').each(function(){
        $(this).attr('id',$(this).index()-1);
   });

    // Change Quantity

    $('.qty').keyup(function(){
        var row_id = $(this).parent().parent().attr('id');
        var qty = $(this).val();
        $.post('/cart/qty/',{'row_id':row_id,'qty_value':qty}, function(data){
            update_cart_qty();
            if (parseInt(data) == 0) {
                $('#shopping_cart_container').html('<p>Your shopping basket empty.</p>');
            }
        });
        if (qty == 0) {
            $('tr#'+row_id).hide();
        }
    });

});

function update_cart_qty() {
    var count = 0
    $.post('/cart/count/', function(data) {
        $('.shopping_cart .items_count').html(data);
        count = data
    }, 'html');
    return parseInt(count)
}