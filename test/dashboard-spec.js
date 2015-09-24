'use strict';
describe('Dashboard', function() {

    var dashboard;


    px.beforeEachWithFixture(function() {
        $fixture.append('<px-dashboard selected-deck="{{selectedDeck}}" context="{{context}}"></px-dashboard>');
        dashboard = $fixture.get(0).querySelector('px-dashboard');
    });


    describe('when passed a selected-deck url', function() {
        var deckWithSampleCardMarkup = '<px-deck><sample-card class="px-card" id="card1"></sample-card></px-deck>';
        var deckWithDemoCardMarkup = '<px-deck><demo-card class="px-card" id="card1"></demo-card></px-deck>';

        describe('if deck return successfully', function() {
            px.beforeEachAsync(function() {
                px.dealer = {
                    getDeck: function(url) {

                        return new Promise(function(resolve, reject) {
                            if (url === 'url1') {
                                resolve(deckWithSampleCardMarkup);
                            } else {
                                resolve(deckWithDemoCardMarkup);
                            }
                        });
                    }
                };

                dashboard.selectedDeck = "url1";
            });

            it('should render the deck (fetched from dealer)', function() {
                var card = dashboard.querySelector('sample-card');
                expect(card.chartState.min).toBe(0);
                expect(card.chartState.max).toBe(100);
            });

            it('should pass context to deck', function() {
                dashboard.context = 'ABC 123';
                var card = dashboard.querySelector('sample-card');
                expect(card.context).toBe('ABC 123');

            });

            it('does not render the demo-card deck', function() {
                var card = dashboard.querySelector('demo-card');
                expect(card).toBe(null);
            });

            it('when context changes, passes to deck', function() {
                dashboard.context = 'ABC 123';
                var card = dashboard.querySelector('sample-card');
                expect(card.context).toBe('ABC 123');

                dashboard.context = 'another context';
                expect(card.context).toBe('another context');

            });

            describe('when selected-deck changes', function() {

                px.beforeEachAsync(function() {
                    dashboard.selectedDeck = "url2";
                });

                it('does not render the sample-card deck', function() {
                    var card = dashboard.querySelector('sample-card');
                    expect(card).toBe(null);
                });

                it('should render the demo-card deck', function() {
                    var card = dashboard.querySelector('demo-card');
                    expect($(card).text()).toContain('Hello World');
                });

                it('it should pass context', function() {
                    dashboard.context = 'ABC 123';
                    var card = dashboard.querySelector('demo-card');
                    expect(card.context).toBe('ABC 123');
                });
            });

        });

        describe('if deck failed to return', function() {
            px.beforeEachAsync(function() {
                px.dealer = {
                    getDeck: function(url) {
                        return new Promise(function(resolve, reject) {
                            reject();
                        });
                    }
                };

                dashboard.selectedDeck = "url";
            });

            it('does not return the deck', function() { // TODO - need better error handling here
                var card = dashboard.querySelector('sample-card');
                expect(card).toBe(null);
            });

        });

    });

    describe('when passed a {{selectedDeck}}', function() {
        px.beforeEachAsync(function() {
            px.dealer = {
                getDeck: function(url) {
                    expect('this should').toBe('not be called');
                }
            };

            dashboard.selectedDeck = "{{selectedDeck}}";
        });

        it('it should not bother calling px.dealer.getDeck', function() {
            // it should not try to fetch the deck with the uncompiled string
        });

        it('dashboard container should be empty', function() {
            expect($(dashboard.querySelector('#container')).text()).toBe("");
        });
    });

});
