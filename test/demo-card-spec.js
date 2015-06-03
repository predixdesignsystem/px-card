'use strict';
describe('Demo Card', function () {

    var $testContainer;
    var demoCard;

    beforeEach(function () {

        setFixtures(sandbox({
            id: 'test-container'
        }));

        //fake widget container
        $testContainer = $('#test-container');
        $testContainer.append('<demo-card></demo-card>');

        px.test.webComponentWait(function() {
            demoCard = $testContainer.get(0).querySelector('demo-card');
        });
    });

    it('should display context', function () {
        var stubContext = {
            name: 'Stub Context Name'
        };
        demoCard.context = stubContext;

        expect($(demoCard).text()).toContain(stubContext.name);
    });

    function isHidden(el) {
        var style = window.getComputedStyle(el);
        return (style.display === 'none')
    }

    it('is initially shown', function(){
        expect(isHidden(demoCard)).toBe(false);
    });

    it('should be able to hide', function(){
        demoCard.hideCard();
        expect(isHidden(demoCard)).toBe(true);
    });

    it('should be able to be shown if it is hidden', function(){
        demoCard.hideCard();
        demoCard.showCard();
        expect(isHidden(demoCard)).toBe(false);
    });

    afterEach(function () {
        $('#test-container').remove();
    });
});
