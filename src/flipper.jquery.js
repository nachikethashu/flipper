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

    $.fn.flipper = function(elements, options) {
        var stage = this, self = this,
        height = this.height(), width = this.width(),
        zIndex = elements.length,
        axis = options.axis.toUpperCase();

        this.globalZindex = zIndex;

        var firstElemFront = $(elements[0]).clone().css('position', 'absolute');
        firstElemFront.appendTo(this);

        $(elements).each(function(index, el) {

            var bel = $('<div/>');
            if(index !== $(elements).length - 1) {
                bel = $(elements).eq(index+1)[0];
            }

            var frontContainerCSS = {
                height: height + 'px',
                width: width + 'px',
            };
            if (axis === "X") {
                frontContainerCSS.top = -height/2 + 'px';
            } else {
                frontContainerCSS.left = -width/2 + 'px';
            }
            var frontContainer = $('<div/>', {class: "flipper-front-child-wrapper"}).css(frontContainerCSS).append(el.clone());

            var frontChildCSS = {};
            if (axis === "X") {
                frontChildCSS.height = height/2 + 'px';
                frontChildCSS.width = width + 'px';
            } else {
                frontChildCSS.width = width/2 + 'px';
                frontChildCSS.height = height + 'px';
            }
            var frontChild = $('<div/>', {class: "flipper-front-child"}).css(frontChildCSS).append(frontContainer);

            var backContainer = $('<div/>', {class: "flipper-back-child-wrapper"}).css({
                height: height + 'px',
                width: width + 'px',
            }).append(bel.clone());

            var backChildAxisClass = (axis === 'X')? "flipper-back-child-vertical" : "flipper-back-child-horizontal";
            var backChildCSS = {};
            if (axis === 'X') {
                backChildCSS.height = height/2 + 'px';
                backChildCSS.width = width + 'px';
            } else {
                backChildCSS.width = width/2 + 'px';
                backChildCSS.height = height + 'px';
            }
            var backChild = $('<div/>', {class: "flipper-back-child " + backChildAxisClass}).css(backChildCSS).append(backContainer);

            var childAxisClass = (axis === 'X')? "flipper-child-vertical" : "flipper-child-horizontal";
            var childCSS = {};
            if (axis === 'X') {
                childCSS.top = height/2 + 'px';
                childCSS.height = height/2 + 'px';
                childCSS.width = width + 'px';
            } else {
                childCSS.left = width/2 + 'px';
                childCSS.height = height + 'px';
                childCSS.width = width/2 + 'px';
            }
            var child = $('<div/>', {class: "flipper-child " + childAxisClass}).css(childCSS);

            child.append(backChild).append(frontChild);
            var flipperElem = $('<div/>', { class: "flipper-stage" }).css('z-index', zIndex--).append(child);

            flipperElem.appendTo(stage);

        });

        self.find(".flipper-front-child").click(function(event) {
            if (self.find('.flipper-front-child').last()[0] !== $(this)[0]) {
                $(this).parent('.flipper-child').css('transform', 'rotate' + axis + '('+ ((axis==='Y')?'-':'') +'180deg)');
                $(this).closest('.flipper-stage').css('z-index', self.globalZindex++);
            }
        });
        self.find(".flipper-back-child").click(function(event) {
            $(this).parent('.flipper-child').css('transform', 'rotate'+ axis +'(0)');
            $(this).closest('.flipper-stage').css('z-index', self.globalZindex++);
        });

        return this;
    };

}( jQuery ));
