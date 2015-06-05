'use strict';
describe('remove card from deck', function () {

    var $pxDeck, pxDeck;

    px.beforeEachWithFixture(function () {
        $fixture.append('<px-deck><sample-card id="card1"></sample-card></px-deck>');
    });

    describe('remove a card', function () {

        px.beforeEachAsync(function () {
            $pxDeck = $('px-deck');
            pxDeck = document.querySelector('px-deck');
            pxDeck.removeCardById('card1');
        });

        it('can be removed', function () {
            var card1 = document.querySelector('sample-card');
            expect(card1).toBe(null);
        });

    });

    it('throws an error if no card id', function () {
        try {
            pxDeck.removeCardById();
            expect('this should').toBe('throw an error');
        } catch(e) {
            expect(e).toBe('Remove card by id must be called with a card id');
        }
    });

    describe('should not die when the id does not exist', function () {

        px.beforeEachAsync(function () {
            $pxDeck = $('px-deck');
            pxDeck = document.querySelector('px-deck');
            pxDeck.removeCardById('abc');
        });

        it('can be removed', function () {
            // nothing breaks
            var card1 = document.querySelector('sample-card');
            expect(card1).not.toBe(null);
        });

    });

});
