var cardExpansion = (function (window, undefined) {

    var storyCardElems = document.querySelectorAll('.card'),
        storyCardObjs = [];  // In memory objects that we'll be creating

    var init = function init () {

        for (var i = 0, l = storyCardElems.length; i < l; i++) {
            (function (i) {
                var cardElem = storyCardElems[i],
                    cardObj = Object.create(CardCircle);
                    cardObj.init(i, cardElem);

                storyCardObjs.push(cardObj);
                cardElem.addEventListener('click', function () {
                    expandCard(cardObj);
                }, false);
            })(i);
        }
    };


    function onCardMove() {

    }


    function expandCard (card) {
        debugger;
        card.openCard(onCardMove);
    }




    // Expose init
    return  {
        init: init
    };

})(window);

window.addEventListener('load', function () {
    cardExpansion.init();
}, false);
