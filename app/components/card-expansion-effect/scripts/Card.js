'use strict';

var Card = (function (window, undefined) {

    var Card = {

        isOpen: false,
        _TL: null,
        ANIMATION_DURATION_MULTIPLIER: 1,

        // Enum of CSS selectors used for element queries.
        SELECTORS: {
            container: '.card__container',
            content: '.card__section__content',
            clip: '.clip'
        },

        //Classes that we'll be dynamically toggling
        CLASSES: {
            cardContainerClosed: 'card__container--closed',
            cardBodyHidden: 'card__body--hidden'
        },

        init: function (id, el) {

            this.id = id;
            this._el = el;
            this._container = this._el.querySelector(this.SELECTORS.container);
            this._clip = this._el.querySelector(this.SELECTORS.clip);
            this._content = this._el.querySelector(this.SELECTORS.content);
        },

        openCard: function (callback) {

            this._TL = new TimelineMax();

            var
                slideContentDown = this._slideContentDown(),
                clipImageIn = this._clipImageIn(),
                floatContainer = this._floatContainer(callback),
                clipImageOut = this._clipImageOut(),
                slideContentUp = this._slideContentUp();

            this._TL.add(slideContentDown);
            this._TL.add(clipImageIn, 0);
            this._TL.add(floatContainer, '-=' + clipImageIn.duration() * 0.6);
            this._TL.add(clipImageOut, '-=' + floatContainer.duration() * 0.3);
            this._TL.add(slideContentUp, '-=' + clipImageOut.duration() * 0.6);

            this.isOpen = true;
            return this._TL;
        },

        _slideContentDown: function () {
            throw new Error('Must be implemented by the specific type of card that you\'re using' );
        },
        _clipImageIn: function () {
            throw new Error('Must be implemented by the specific type of card that you\'re using' );
        },
        _floatContainer: function () {
            throw new Error('Must be implemented by the specific type of card that you\'re using' );
        },
        _clipImageOut: function () {
            throw new Error('Must be implemented by the specific type of card that you\'re using' );
        },
        _slideContentUp: function () {
            throw new Error('Must be implemented by the specific type of card that you\'re using' );
        }
    };

    return Card;

})(window);




