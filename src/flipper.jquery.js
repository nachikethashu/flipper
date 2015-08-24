/**
 * flipper.jquery.js
 *
 * By Nachiketha S H Upadhya
 * https://github.com/nachikethashu/flipper
 *
 * Free to use under the MIT license.
 *
 * Tue 25th Aug 2015
 */

(function( $ ) {

    $.fn.flipper = function(elements) {
        var stage = this,
        height = 400, width = 300,
        zIndex = elements.length;

        this.globalZindex = zIndex;
        self = this;

        var firstElemFront = $(elements[0]).clone().css('position', 'absolute');
        firstElemFront.appendTo('body');

        $(elements).each(function(index, el) {

            var bel = $('<div/>');
            if(index !== $(elements).length - 1) {
                bel = $(elements).eq(index+1)[0];
            }

            var frontContainer = $('<div/>', {class: "flipper-front-child-wrapper"}).css({
                top: -height/2 + 'px',
                height: height + 'px',
                width: width + 'px',
            }).append(el.clone());

            var frontChild = $('<div/>', {class: "flipper-front-child"}).css({
                height: height/2 + 'px',
                width: width + 'px'
            }).append(frontContainer);

            var backContainer = $('<div/>', {class: "flipper-back-child-wrapper"}).css({
                height: height + 'px',
                width: width + 'px',
            }).append(bel.clone());

            var backChild = $('<div/>', {class: "flipper-back-child"}).css({
                height: height/2 + 'px',
                width: width + 'px',
            }).append(backContainer);

            var child = $('<div/>', {class: "flipper-child"}).css({
                top: height/2 + 'px',
                height: height/2 + 'px',
                width: width + 'px',
            });

            child.append(backChild).append(frontChild);

            var flipperElem = $('<div/>', { class: "flipper-stage" }).css('z-index', zIndex--).append(child);
            flipperElem.appendTo(stage);

        });


        $(".flipper-child .flipper-front-child").click(function(event) {
            if ($('.flipper-front-child').last()[0] !== $(this)[0]) {
                $(this).parent('.flipper-child').css('transform', 'rotateX(180deg)');
                $(this).closest('.flipper-stage').css('z-index', self.globalZindex++);
            }
        });
        $(".flipper-child .flipper-back-child").click(function(event) {
            $(this).parent('.flipper-child').css('transform', 'rotateX(0)');
            $(this).closest('.flipper-stage').css('z-index', self.globalZindex++);
        });

        return this;
    };

}( jQuery ));
