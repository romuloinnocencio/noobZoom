$(function(){

    //load and show a modal with the picture clicked
    var loadImg = {

        //wrapper
        wrapper: $('#nbzoom'),
        

        //insert the img in the modal
        init: function (target) {

            //
            var img = new Image();

            //
            img.src = target;
            img.className = 'img-current';

            //
            img.onload = function () {

                loadImg.wrapper.append('<img class="img-current" src="' + target + '">').addClass('is-active').fadeIn();
                loadImg.imgSet = $('.img-current');

                //obtain the height of a img
                loadImg.altura = loadImg.imgSet.height();

                //calls the func. to hover
                loadImg.imgSet.on('mousemove', function (e) {
                    loadImg.hover(loadImg.altura,e);
                });

            } ;
            return this;
        },

        //calculate the percent of yAxis to down/top
        hover: function(imgHeight, e) {

            var wh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

            //find the % to yAxis
            var YPorcent = imgHeight / wh;

            //mouse coordinate Y of a image
            var YAxis = e.pageY;

            //transform % to hover
            var amount = (YAxis * (-1) * YPorcent);

            console.info('WH: ' + wh + '  |  IH: ' + parseInt(imgHeight) + ' |  Y%: ' + YPorcent + ' |  Y: ' + YAxis + '  |  A: ' + parseInt(amount) + '  |  IP: ' + parseInt(loadImg.imgSet.css('top')));

            //
            if (amount <= imgHeight) loadImg.imgSet.css('top', amount/2 + 'px');

            return this;
        },

        //sets the imagem in 'fullscreen'
        fullscreen: function(target){
            (!loadImg.imgSet.hasClass('fullscreen')) ? loadImg.imgSet.addClass('fullscreen') : loadImg.imgSet.removeClass('fullscreen') ;
        },

        //closes the modal box
        close: function () {
            loadImg.wrapper.fadeOut(200).removeClass('is-active');
            loadImg.imgSet.remove();
            return this;
        }

    }

    //choose the image to view, and load a modal
    $('.nbzoom-item').on('click', function (e) {
        e.preventDefault();
        //image to zoom
        var target = $(this).parent().attr('href');
        loadImg.init(target);

    });

    //action to closes the modal box
    $('#js-nbzoom-close').on('click', function (e) {
        e.preventDefault();
        loadImg.close();
    });

});