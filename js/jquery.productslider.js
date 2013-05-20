var animation = {
    'WebkitAnimation': 'webkitAnimationEnd',
    'OAnimation': 'oAnimationEnd',
    'msAnimation': 'MSAnimationEnd',
    'animation': 'animationend'
};
var animationName = animation[ Modernizr.prefixed('animation') ];
var support = Modernizr.csstransforms && Modernizr.cssanimations;

(function ($) {

    $.fn.productslider = function (options) {

        var settings = $.extend({
            width: '750',
            height: '280',
            style: 'modern',
            catchooser: 'black-arrow'
        }, options);

        return this.each(function () {
            var obj = $(this);
            buildSlider(obj);
            customStyle(obj, settings);
        });

    };

    function buildSlider(obj) {
        obj.addClass('product_slider');
        obj.append('<div id="products"></div>');

        var product_container = obj.find('#products');

        $.getJSON('js/products.json', function (data) {
            var i = 0;
            var products = data;


            $.each(products, function (key, value) {
                var count = 0;
                key = key.toLowerCase();
                product_container.append('<ul id="' + key + '"></ul>');

                var container = product_container.find('#' + key);
                $.each(value, function (keyp, val) {
                    container.append('<li><a href="' + val.link + '"><img src="' + val.image + '" alt="' + val.name + '"><h4>' + val.name + '</h4><p>' + val.price + '</p></a></li>');
                });
            });

            $(".product_slider ul:eq(0)").addClass('category-current');
        });

        $.getJSON('js/categories.json', function (data) {
            var categories = data.categories;

            obj.append('<nav></nav>');

            var navBox = obj.find('nav');

            $.each(categories, function (key, value) {
                navBox.append('<a href="#">' + value.name + '</a>');
            });

            navBox.find('a');
            navBox.find('a:first').addClass('category-selected');
        });

    }

    function customStyle(obj, settings) {

        if (settings.width != '750') {
            obj.css('width', settings.width);
        }

        if (settings.height != '280') {
            obj.css('height', settings.height);
        }

        if (settings.style == 'modern') {
            obj.addClass('modern');
        } else if (settings.style == 'simple-grey') {
            obj.css('background', '#eee');
        } else if (settings.style == 'simple-grey-gradient') {
            obj.addClass('grey-gradient');
        } else if (settings.style == 'simple') {
            obj.css('background', '#fff');
        }

        if (settings.catchooser == 'black-arrow') {
            obj.addClass('black-arrow');
        } else if (settings.catchooser == 'black-round-arrow') {
            obj.addClass('black-round-arrow');
        }

    }

})(jQuery);

$(document).ready(function () {
    var id = '';
    var oldId = '';
    var elem = '';
    var isAnimating = false;
    current = '';
    $categories = $('.product_slider #products ul');

    if (!jQuery.isEmptyObject($categories)) {

        $('body').on('click', '.product_slider nav a', function () {
            animateProducts($(this));
        });

        function animateProducts(elem) {
            id = elem.index();
            oldId = $('.product_slider .category-selected').index();

            if (oldId == elem.index() || isAnimating) {
                return false;
            }

            isAnimating = true;

            $('.product_slider nav a').removeClass('category-selected');
            elem.addClass('category-selected');

            var dir = id > current ? 'right' : 'left',
                toClass = dir === 'right' ? 'product-moveToLeft' : 'product-moveToRight',
                fromClass = dir === 'right' ? 'product-moveFromRight' : 'product-moveFromLeft',
                $currcat = $(".product_slider ul:eq(" + oldId + ")"),
                $newcat = $(".product_slider ul:eq(" + id + ")");

            $newcatchild = $newcat.children(),
                lastEnter = dir === 'right' ? $newcatchild.length - 1 : 0,
                self = this;

            if (!support) {
                $categories.hide();
                $newcat.show();
            } else {
                $newcat.addClass('category-current');
            }

            if (support) {

                $currcat.removeClass().addClass(toClass);

                setTimeout(function () {

                    $newcat.removeClass().addClass(fromClass);
                    $newcatchild.eq(lastEnter).on(animationName, function () {

                        $(this).off(animationName);
                        $newcat.addClass('category-current');
                        self.current = id;
                        var $this = $(this);
                        isAnimating = false;

                    });

                }, $newcatchild.length * 90);

            } else {

                $currcat.hide();
                $newcat.show();
                this.current = id;
                isAnimating = false;

            }
        }

    }
});