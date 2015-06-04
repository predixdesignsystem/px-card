'use strict';
describe('Add card to deck', function () {

    var $testContainer, $pxDeck, pxDeck;

    beforeEach(function () {
        setFixtures(sandbox({
            id: 'test-container'
        }));

        //fake widget container
        $testContainer = $('#test-container');
        $testContainer.append('<px-deck></px-deck>');
        $pxDeck = $('px-deck');
        pxDeck = document.querySelector('px-deck');
    });

    afterEach(function () {
        $('#test-container').remove();
    });

    it('able to add 1 card', function () {
        pxDeck.add('sample-card', '123');

        px.test.webComponentWait(function () {
            var card1 = document.querySelector('sample-card');
            expect(card1.chartState.min).toBe(0);
            expect(card1.chartState.max).toBe(100);
        });
    });

    it('throws an error if no card name', function () {
        try {
            pxDeck.add();
            expect('this should').toBe('throw an error');
        } catch(e) {
            // expected
        }
    });

    it('throws an error if no card id', function () {
        try {
            pxDeck.add('sample-card');
            expect('this should').toBe('throw an error');
        } catch(e) {
            // expected
        }
    });

    describe('able to add more cards', function () {

        beforeEach(function() {
            pxDeck.add('sample-card', 'card1');
            pxDeck.add('sample-card', 'card2');
            pxDeck.add('sample-card', 'card3');
        });

        it('adds all the cards', function() {
            px.test.webComponentWait(function () {
                var cards = document.querySelectorAll('sample-card');
                expect(cards.length).toBe(3);
            });
        });

        it('calls init on each new card', function() {
            px.test.webComponentWait(function () {
                var cards = document.querySelectorAll('sample-card');
                expect(cards[0].chartState.min).toBe(0);
                expect(cards[0].chartState.max).toBe(100);
                expect(cards[1].chartState.min).toBe(0);
                expect(cards[1].chartState.max).toBe(100);
                expect(cards[2].chartState.min).toBe(0);
                expect(cards[2].chartState.max).toBe(100);
            });
        });

        it('allows card to card communication to work', function() {
            px.test.webComponentWait(function () {
                var cards = document.querySelectorAll('sample-card');
                cards[2].chartState = {min: 3, max: 33};
                expect(cards[0].chartState.min).toBe(3);
                expect(cards[0].chartState.max).toBe(33);
                expect(cards[1].chartState.min).toBe(3);
                expect(cards[1].chartState.max).toBe(33);
                expect(cards[2].chartState.min).toBe(3);
                expect(cards[2].chartState.max).toBe(33);
            });
        });

    });

});
