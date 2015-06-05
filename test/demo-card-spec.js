'use strict';
describe('Demo Card', function () {

    var $testContainer;
    var demoCard;

    beforeEach(function (done) {
        setFixtures(sandbox({
            id: 'test-container'
        }));

        //fake widget container
        $testContainer = $('#test-container');
        $testContainer.append('<demo-card id="my-demo-card"></demo-card>');

        px.test.webComponentWait(done);
    });

    it('should display context', function () {
        demoCard = $testContainer.get(0).querySelector('demo-card');

        var stubContext = {
            name: 'Stub Context Name'
        };
        demoCard.context = stubContext;

        expect($(demoCard).text()).toContain(stubContext.name);
    });

    it('is initially shown', function(){
        demoCard = $testContainer.get(0).querySelector('demo-card');
        expect(px.test.isHidden(demoCard)).toBe(false);
    });

    it('should be able to hide', function(){
        demoCard = $testContainer.get(0).querySelector('demo-card');
        demoCard.hideCard();
        expect(px.test.isHidden(demoCard)).toBe(true);
    });

    it('should be able to be shown if it is hidden', function(){
        demoCard = $testContainer.get(0).querySelector('demo-card');
        demoCard.hideCard();
        demoCard.showCard();
        expect(px.test.isHidden(demoCard)).toBe(false);
    });
});
