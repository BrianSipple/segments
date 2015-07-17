'use strict';

var CardCircle = (function (window, undefined) {

    var CardCircle = Card();

    /**
     * Slide content down
     * @private
     */
    CardCircle._slideContentDown = function () {
        var tween = TweenMax.to(
            this._content,
            this.ANIMATION_DURATION_MULTIPLIER * 0.8,
            {
                y: window.innerHeight,
                ease: Expo.easeInOut
            }
        );
        return tween;
    };

    /**
     * Clip image in
     * @private
     */
    CardCircle._clipImageIn = function () {

        var tween = TweenMax.to(
            this._clip,
            this.ANIMATION_DURATION_MULTIPLIER * 0.8,
            {
                attr: {
                    r: 60
                },
                ease: Expo.easeInOut
            }
        );

        return tween;
    };

    /**
     * Float card to final position
     * @param {Function} callback  -- the callback `onCardMove`
     * @private
     */
    CardCircle._floatContainer = function (callback) {

        document.body.classList.add(this.CLASSES.bodyHidden);

        debugger;
        var TL = new TimelineMax(),
            rect = this._container.getBoundingClientRect(),
            windowWidth = window.innerWidth,

            track = {
                width: 0,
                x: rect.left + (rect.width / 2),
                y: rect.top + (rect.height / 2)
            };

        TL.set(
            this._container,
            {
                width: rect.width,
                height: rect.height,
                x: rect.left,
                y: rect.top,
                position: 'fixed',
                overflow: 'hidden'
            }
        );

        TL.to(
            [this._container, track],
            this.ANIMATION_DURATION_MULTIPLIER * 2.0,
            {
                width: windowWidth,
                height: '100%',
                x: windowWidth / 2,
                y: 0,
                xPercent: -50,
                ease: Expo.easeInOut,
                clearProps: 'all',
                className: '-=' + this.CLASSES.cardContainerClosed,
                onUpdate: callback.bind(this, track)
            }
        );
        return TL;
    };

    /**
     * Clip the image out
     * @private
     */
    CardCircle._clipImageOut = function () {

        // Circle
        var radius = this._clip.getAttribute('r');

        var tween = this._clipImageIn();
        tween.vars.attr.r = radius;

        return tween;
    };

    /**
     * Slide content up
     * @private
     */
    CardCircle._slideContentUp = function () {
        var tween = TweenMax.to(
            this._content,
            this.ANIMATION_DURATION_MULTIPLIER,
            {
                y: 0,
                clearProps: 'all',
                ease: Expo.easeInOut
            }
        );

        return tween;
    };


    /**
     * Close the card
     */
    CardCircle.closeCard = function () {

        TweenMax.to(
            this._container,
            this.ANIMATION_DURATION_MULTIPLIER * 0.4,
            {
                scrollTo: {
                    y: 0
                },
                ease: Power2.easeOut,
                onComplete: function () {
                    this._container.style.overflow = 'hidden';
                }.bind(this)
            }
        );

        this._TL.eventCallback('onReverseComplete', function () {
            TweenMax.set(
                [this._container, this._content],
                {clearProps: 'all'}
            );
            document.body.classList.remove(this.CLASSES.bodyHidden);

            this.isOpen = false;

        }.bind(this));

        return this._TL.reverse();
    };

    /**
     * Hide the card -- called for all cards except the selected one.
     */
    CardCircle.hideCard = function () {

        var tween = TweenMax.to(
            this._el,
            this.ANIMATION_DURATION_MULTIPLIER * 0.4,
            {
                scale: 0.8,
                autoAlpha: 0,
                transformOrigin: 'center bottom',
                ease: Expo.easeInOut
            }
        );

        return tween;
    };

    /**
     * Show the card, called for all cards except the selected one.
     */
    CardCircle.showCard = function () {

        var tween = TweenMax.to(
            this._el,
            this.ANIMATION_DURATION_MULTIPLIER * 0.4,
            {
                scale: 1,
                autoAlpha: 1,
                clearProps: 'all',
                ease: Expo.easeInOut
            }
        );
        return tween;
    };

    return CardCircle;

})(window);
