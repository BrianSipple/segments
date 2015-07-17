var cardExpansion = (function (window, undefined) {

    var
        /**
         * Selectors for querying elements
         */
        SELECTORS = {
            pattern: '.pattern',
            card: '.card',
            cardHeaderImage: '.card__header-image',
            cardCloseButton: '.card__button-close'
        },

        /**
         * Dynamically added classes
         */
        CLASSES = {
            patternHidden: 'pattern--hidden',
            polygon: 'polygon',
            polygonHidden: 'polygon--hidden'
        },

        /**
         * Map of svg paths and points
         */
        polygonMap = {
            paths: null,
            points: null
        },


        patternElem = document.querySelector(SELECTORS.pattern),
        cardElems = document.querySelectorAll(SELECTORS.card),
        cardSet = {},  // In memory hash for the cards that we'll be tracking
        cardCloseButtons = document.querySelectorAll(SELECTORS.cardClose);


    function init() {
        var pattern = Trianglify({
            width: window.innerWidth,
            height: window.innerHeight,
            cell_size: 90,
            variance: 1,
            stroke_width: 0.6,
            color_function: function (x, y) {
                return '#de6551';
            }
        }).svg(); // Render as SVG!

        mapPolygons(pattern);
        bindCards();
    }

    function mapPolygons (pattern) {

        // Append the SVG pattern to each card container
        patternElem.appendChild(pattern);

        // Convert nodelist to array,
        // Used `.childNodes` beacuse IE doesn't support `.children on SVG.
        polygonMap.paths = [].slice.call(pattern.childNodes);
        polygonMap.points = [];

        var polygonRect,
            polygonPoint;
        polygonMap.paths.forEach(function(polygon) {

            // Hide polygons by adding CSS classes to
            // each svg path (used attrs because of IE).
            polygon.setAttribute('class', CLASSES.polygon + ' ' + CLASSES.polygonHidden);

            polygonRect = polygon.getBoundingClientRect();
            polygonPoint = {
                x: polygonRect.left + polygonRect.width / 2,
                y: polygonRect.top + polygonRect.height / 2
            };

            polygonMap.points.push(polygonPoint);
        });

        // All polygons are hidden now, display the pattern container.
        patternElem.classList.remove(CLASSES.patternHidden);
    }


    function bindCards () {

        var cardImage,
            cardCloseButton;
        for (var id = 0, l = cardElems.length; id < l; id++) {
            (function (i) {
                var cardElem = cardElems[id],
                    cardObj = Object.create(CardCircle);

                cardObj.init(id, cardElem);
                cardSet[id] = cardObj;

                cardImage = cardElem.querySelector(SELECTORS.cardHeaderImage);
                cardCloseButton = cardElem.querySelector(SELECTORS.cardCloseButton);

                cardImage.addEventListener('click', playSequence.bind(this, true, id));
                cardCloseButton.addEventListener('click', playSequence.bind(this, false, id));
                //
                //cardElem.addEventListener('click', function () {
                //    expandCard(cardObj);
                //}, false);

            })(id);
        }
    }


    /**
     * Create a sequence for the open or close animation and play.
     * @param {boolean} isOpenClick Flag to detect when it's a click to open.
     * @param {number} id The id of the clicked card.
     * @param {Event} e The event object.
     * @private
     *
     */
    function playSequence (isOpenClick, id, e) {

        var card = cardSet[id];

        // Prevent when card already open and user click on image.
        if (card.isOpen && isOpenClick) {
            return;
        }

        // Create timeline for the whole sequence.
        var
            sequence = new TimelineMax({paused: true}),
            tweensFromOtherCards = animateOtherCards(id);

        if (!card.isOpen) {
            // Perform open sequence if closed
            sequence.add(tweensFromOtherCards);
            sequence.add(card.openCard(onCardMove), 0);

        } else {
            // Perform closing sequence if open
            var
                closeCard = card.closeCard(),
                position = closeCard.duration() * 0.8;  // 80% of close card tween

            sequence.add(closeCard);
            sequence.add(tweensFromOtherCards, position);
        }
        sequence.play();
    }

    /**
     * Show/Hide all other cards.
     * @param {number} id The id of the clcked card to be avoided.
     * @private
     */
    function animateOtherCards(id) {

        var
            tl = new TimelineMax(),
            selectedCard = cardSet[id],
            otherCard;

        for (var cardId in cardSet) {
            if (cardSet.hasOwnProperty(cardId) && cardId !== id.toString()) {

                otherCard = cardSet[cardId];

                if (selectedCard.isOpen) {
                    tl.add(otherCard.showCard(), 0);
                } else {
                    tl.add(otherCard.hideCard(), 0);
                }
            }
        }

        return tl;
    }


    /**
     * Callback to be executed on Tween update, whatever a polygon
     * falls into a circular area defined by the card width the path's
     * CSS class will change accordingly.
     * @param {Object} cardTrack The card sizes and position during the floating.
     * @private
     */
    function onCardMove(cardTrack) {

        debugger;

        var radius = cardTrack.width / 2;

        var center = {
            x: cardTrack.x,
            y: cardTrack.y
        };


        polygonMap.points.forEach(function (point, i) {

            if (determineIfPointInCircle(point, radius, center)) {
                polygonMap.paths[i].setAttribute('class', CLASSES.polygon);
            } else {
                polygonMap.paths[i].setAttribute('class', CLASSES.polygon + ' ' + CLASSES.polygonHidden);
            }
        });
    }

    /**
     * Detect if a point is inside a circle area.
     * @private
     */
    function determineIfPointInCircle (point, radius, center) {
        var
            xp = point.x,
            yp = point.y,

            xc = center.x,
            yc = center.y,

            d = radius * radius;

        return Math.pow(xp - xc, 2) + Math.pow(yp - yc, 2) <= d;
    }


    function expandCard(card) {
        card.openCard(onCardMove);
    }


    // Expose init
    return {
        init: init
    };

})(window);

window.addEventListener('load', function () {
    cardExpansion.init();
}, false);
