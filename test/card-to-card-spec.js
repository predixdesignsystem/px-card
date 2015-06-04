'use strict';
describe('Card to card communication', function () {

    var $testContainer, $pxDeck;

    beforeEach(function(){
        setFixtures(sandbox({
            id: 'test-container'
        }));

        //fake widget container
        $testContainer = $('#test-container');
        $testContainer.append('<px-deck></px-deck>');
        $pxDeck = $('px-deck');

    });

    afterEach(function () {
        $('#test-container').remove();
    });

    describe('with 2 cards', function(){

        var card1, card2;

        beforeEach(function () {
            $pxDeck.append('<sample-card id="card1"></sample-card>');
            $pxDeck.append('<sample-card id="card2"></sample-card>');

            px.test.webComponentWait(function() {
                card1 = $testContainer.get(0).querySelector('#card1');
                card2 = $testContainer.get(0).querySelector('#card2');
            });
        });

        it('initializes the chart states to 0 and 100', function(){
            expect(card1.chartState.min).toBe(0);
            expect(card2.chartState.min).toBe(0);
            expect(card1.chartState.max).toBe(100);
            expect(card2.chartState.max).toBe(100);
        });

        it('zoom in one card should change zoom on another card', function(){
            card1.chartState = {min: 1, max: 99};
            expect(card1.chartState.min).toBe(1);
            expect(card1.chartState.max).toBe(99);
            expect(card2.chartState.min).toBe(1);
            expect(card2.chartState.max).toBe(99);
        });

    });


    describe('with 4 cards', function(){

        var card1, card2, card3, card4;

        beforeEach(function () {
            $pxDeck.append('<sample-card id="card1"></sample-card>');
            $pxDeck.append('<sample-card id="card2"></sample-card>');
            $pxDeck.append('<sample-card id="card3"></sample-card>');
            $pxDeck.append('<sample-card id="card4"></sample-card>');


            px.test.webComponentWait(function() {
                card1 = $testContainer.get(0).querySelector('#card1');
                card2 = $testContainer.get(0).querySelector('#card2');
                card3 = $testContainer.get(0).querySelector('#card3');
                card4 = $testContainer.get(0).querySelector('#card4');
            });
        });

        it('zoom in one card should change zoom on another card', function(){
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

});
