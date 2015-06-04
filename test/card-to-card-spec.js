'use strict';
describe('Demo Card', function () {

    var $testContainer, $pxDeck;
    var card1, card2;

    beforeEach(function () {

        setFixtures(sandbox({
            id: 'test-container'
        }));

        //fake widget container
        $testContainer = $('#test-container');
        $testContainer.append('<px-deck></px-deck>');
        $pxDeck = $('px-deck');
        $pxDeck.append('<sample-card id="card1" class="px-card"></sample-card>');
        $pxDeck.append('<sample-card id="card2" class="px-card"></sample-card>');

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

    afterEach(function () {
       // $('#test-container').remove();
    });
});
