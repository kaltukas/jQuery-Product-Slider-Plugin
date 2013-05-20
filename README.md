jQuery-Product-Slider-Plugin
============================

Creates Product Slider from Data stored in JSON File

![](http://ladensia.com/product_slider/images/product_slider.png)


Getting Started
---------------

Include the .css and .js files into your page.

```html
<link rel="stylesheet" type="text/css" href="css/productslider.css" />

<script src="js/jquery.min.js"></script>
<script src="js/modernizr.custom.63321.js"></script>
<script src="js/cufon.js" type="text/javascript"></script>
<script src="js/Aller_400-Aller_700-Aller_italic_400-Aller_italic_700.font.js" type="text/javascript"></script>
<script src="js/jquery.productslider.js"></script>
```

Initialize the product slider.

```html
<script>
	$(function() {
		$( '#yourid' ).productslider();
	});
</script>
```

there are four optional Parameters:

- width (change the px width of the slider)
- height (change the px height of the slider)
- style (change the styling of the slider)
    - 'modern'
    - 'simple-grey'
    - 'simple-grey-gradient'
    - 'simple'
- catchooser (change the styling of the arrow)
    - 'black-arrow'
    - 'black-round-arrow'

```html
<script>
	$(function() {
		$( '#yourid' ).productslider({
             width: '750',
             height: '280',
             style: 'modern',
             catchooser: 'black-arrow'
        });
	});
</script>
```


Demo
----

http://ladensia.com/product_slider

