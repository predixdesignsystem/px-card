'use strict';
describe('Demo Card', function () {

    var demoCard;

    px.beforeEachWithFixture(function () {
        $fixture.append('<demo-card id="my-demo-card"></demo-card>');
        demoCard = $fixture.get(0).querySelector('demo-card');
    });

    it('should display context', function () {

        var stubContext = {
            name: 'Stub Context Name'
        };
        demoCard.context = stubContext;

        expect($(demoCard).text()).toContain(stubContext.name);
    });

    it('is initially shown', function () {
        expect(px.isHidden(demoCard)).toBe(false);
    });

    it('should be able to hide', function () {
        demoCard.hideCard();
        expect(px.isHidden(demoCard)).toBe(true);
    });

    it('should be able to be shown if it is hidden', function () {
        demoCard.hideCard();
        demoCard.showCard();
        expect(px.isHidden(demoCard)).toBe(false);
    });
});
