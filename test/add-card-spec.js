'use strict';
describe('Add card to deck', function () {

    var $pxDeck, pxDeck;

    px.beforeEachWithFixture(function () {
        $fixture.append('<px-deck></px-deck>');
    });

    describe('1 card', function () {

        px.beforeEachAsync(function(){
            $pxDeck = $('px-deck');
            pxDeck = document.querySelector('px-deck');
            pxDeck.addCard('sample-card', '123');
        });

        it('can be initialized', function() {
            var card1 = document.querySelector('sample-card');
            expect(card1.chartState.min).toBe(0);
            expect(card1.chartState.max).toBe(100);
        })
    });

    it('throws an error if no card name', function () {
        try {
            pxDeck.addCard();
            expect('this should').toBe('throw an error');
        } catch(e) {
            expect(e).toBe('Add card must be called with a card name and card id');
        }
    });

    it('throws an error if no card id', function () {
        try {
            pxDeck.addCard('sample-card');
            expect('this should').toBe('throw an error');
        } catch(e) {
            expect(e).toBe('Add card must be called with a card name and card id');
        }
    });

    describe('able to add more cards', function () {

        px.beforeEachAsync(function() {
            $pxDeck = $('px-deck');
            pxDeck = document.querySelector('px-deck');
            spyOn(pxDeck, 'init').and.callThrough();
            pxDeck.addCard('sample-card', 'card1');
            pxDeck.addCard('sample-card', 'card2');
            pxDeck.addCard('sample-card', 'card3');
            pxDeck.addCard('sample-card2', 'card4');
        },350);

        it('adds all the cards', function() {
            var cards = document.querySelectorAll('sample-card');
            expect(cards.length).toBe(3);
        });

        it('calls init on each new card', function() {
            var cards = document.querySelectorAll('sample-card');
            var sampleCard2 = document.querySelector('sample-card2');
            expect(cards[0].chartState.min).toBe(0);
            expect(cards[0].chartState.max).toBe(100);
            expect(cards[1].chartState.min).toBe(0);
            expect(cards[1].chartState.max).toBe(100);
            expect(cards[2].chartState.min).toBe(0);
            expect(cards[2].chartState.max).toBe(100);
            expect(sampleCard2.count).toBe(5);
        });

        it('allows card to card communication to work', function() {
            var cards = document.querySelectorAll('sample-card');
            cards[2].chartState = {min: 3, max: 33};
            expect(cards[0].chartState.min).toBe(3);
            expect(cards[0].chartState.max).toBe(33);
            expect(cards[1].chartState.min).toBe(3);
            expect(cards[1].chartState.max).toBe(33);
            expect(cards[2].chartState.min).toBe(3);
            expect(cards[2].chartState.max).toBe(33);
        });

        it('deck to be initialized only once', function(){
            expect(pxDeck.init.calls.count()).toBe(1);
        });

        describe('add more card after deck initialized', function(){
            var card5;
            px.beforeEachAsync(function() {
                var card4 = document.querySelector('#card4');
                card4.count = 10;
                pxDeck.addCard('sample-card2', 'card5');
            }, 500);

            it('deck will not be initialized again', function(){
               expect(pxDeck.init.calls.count()).toBe(1);
               expect(card4.count).toBe(10);
            });

            it('card 5 will be initialized', function(){
                var card5 = document.querySelector('#card5');
                expect(card5.count).toBe(5);
            });

        });


    });
});
