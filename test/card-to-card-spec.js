'use strict';
describe('Card to card communication', function () {

    var $pxDeck;

    px.beforeEachWithFixture(function(){
        $fixture.append('<px-deck></px-deck>');
    });

    describe('with 2 cards', function(){

        var card1, card2;

        px.beforeEachAsync(function () {
            $pxDeck = $('px-deck');
            $pxDeck.append('<sample-card id="card1"></sample-card>');
            $pxDeck.append('<sample-card id="card2"></sample-card>');
        });

        it('initializes the chart states to 0 and 100', function(){
            card1 = $fixture.get(0).querySelector('#card1');
            card2 = $fixture.get(0).querySelector('#card2');

            expect(card1.chartState.min).toBe(0);
            expect(card2.chartState.min).toBe(0);
            expect(card1.chartState.max).toBe(100);
            expect(card2.chartState.max).toBe(100);
        });

        it('zoom in one card should change zoom on another card', function(){
            card1 = $fixture.get(0).querySelector('#card1');
            card2 = $fixture.get(0).querySelector('#card2');

            card1.chartState = {min: 1, max: 99};
            expect(card1.chartState.min).toBe(1);
            expect(card1.chartState.max).toBe(99);
            expect(card2.chartState.min).toBe(1);
            expect(card2.chartState.max).toBe(99);
        });

    });


    describe('with 4 cards', function(){

        var card1, card2, card3, card4;

        px.beforeEachAsync(function () {
            $pxDeck = $('px-deck');
            $pxDeck.append('<sample-card id="card1"></sample-card>');
            $pxDeck.append('<sample-card id="card2"></sample-card>');
            $pxDeck.append('<sample-card id="card3"></sample-card>');
            $pxDeck.append('<sample-card id="card4"></sample-card>');
        });

        it('zoom in one card should change zoom on another card', function(){
            card1 = $fixture.get(0).querySelector('#card1');
            card2 = $fixture.get(0).querySelector('#card2');
            card3 = $fixture.get(0).querySelector('#card3');
            card4 = $fixture.get(0).querySelector('#card4');

            card1.chartState = {min: 12, max: 76};
            expect(card1.chartState.min).toBe(12);
            expect(card1.chartState.max).toBe(76);
            expect(card2.chartState.min).toBe(12);
            expect(card2.chartState.max).toBe(76);
            expect(card3.chartState.min).toBe(12);
            expect(card3.chartState.max).toBe(76);
            expect(card4.chartState.min).toBe(12);
            expect(card4.chartState.max).toBe(76);
        });

    });

    describe('with 4 cards with different shared state', function(){

        var card1, card2, card3, card4;

        px.beforeEachAsync(function () {
            $pxDeck = $('px-deck');
            $pxDeck.append('<sample-card id="card1"></sample-card>');
            $pxDeck.append('<sample-card id="card2"></sample-card>');
            $pxDeck.append('<sample-card2 id="card3"></sample-card2>');
            $pxDeck.append('<sample-card2 id="card4"></sample-card2>');
        });

        it('initializes the cards', function(){
            card1 = $fixture.get(0).querySelector('#card1');
            card2 = $fixture.get(0).querySelector('#card2');
            card3 = $fixture.get(0).querySelector('#card3');
            card4 = $fixture.get(0).querySelector('#card4');

            expect(card1.chartState.min).toBe(0);
            expect(card2.chartState.min).toBe(0);
            expect(card1.chartState.max).toBe(100);
            expect(card2.chartState.max).toBe(100);
            expect(card3.count).toBe(5);
            expect(card4.count).toBe(5);
        });

        it('zoom in one card should change zoom on another card, but not affect ones without zoom', function(){
            card1 = $fixture.get(0).querySelector('#card1');
            card2 = $fixture.get(0).querySelector('#card2');
            card3 = $fixture.get(0).querySelector('#card3');
            card4 = $fixture.get(0).querySelector('#card4');

            card1.chartState = {min: 12, max: 76};
            expect(card1.chartState.min).toBe(12);
            expect(card1.chartState.max).toBe(76);
            expect(card2.chartState.min).toBe(12);
            expect(card2.chartState.max).toBe(76);
            expect(card3.count).toBe(5);
            expect(card4.count).toBe(5);
        });

        it('changing count should only affect cards with count', function(){
            card1 = $fixture.get(0).querySelector('#card1');
            card2 = $fixture.get(0).querySelector('#card2');
            card3 = $fixture.get(0).querySelector('#card3');
            card4 = $fixture.get(0).querySelector('#card4');

            card3.broadcastCount();
            expect(card1.chartState.min).toBe(0);
            expect(card2.chartState.min).toBe(0);
            expect(card1.chartState.max).toBe(100);
            expect(card2.chartState.max).toBe(100);
            expect(card3.count).toBe(6);
            expect(card4.count).toBe(6);
        });

    });

    describe('with a hidden card', function(){

        var card1, card2;

        px.beforeEachAsync(function () {
            $pxDeck = $('px-deck');
            $pxDeck.append('<sample-card id="card1"></sample-card>');
            $pxDeck.append('<sample-card id="card2"></sample-card>');
        });

        it('changes in one card should still affect the hidden card', function(){
            card1 = $fixture.get(0).querySelector('#card1');
            card2 = $fixture.get(0).querySelector('#card2');

            card2.hideCard();

            card1.chartState = {min: 5, max: 55};
            expect(card1.chartState.min).toBe(5);
            expect(card1.chartState.max).toBe(55);
            expect(card2.chartState.min).toBe(5);
            expect(card2.chartState.max).toBe(55);

            card2.showCard();

            card1.chartState = {min: 6, max: 54};
            expect(card1.chartState.min).toBe(6);
            expect(card1.chartState.max).toBe(54);
            expect(card2.chartState.min).toBe(6);
            expect(card2.chartState.max).toBe(54);
        });

    });

});
