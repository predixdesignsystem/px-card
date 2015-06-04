'use strict';
describe('Fetch Data Card', function () {

    var sampleCard;

    beforeEach(function () {
        // create a new sandbox
        setFixtures(sandbox({
            id: 'test-container'
        }));
        var $testContainer = $('#test-container');

        // append the web component to test
        $testContainer.append('<fetch-data-card id="my-fetch-data-card"></fetch-data-card>');

        // once the web component is rendered, initialize it
        px.test.webComponentWait(function () {
            sampleCard = $testContainer.get(0).querySelector('fetch-data-card');
            window.px.dealer = {
                getData: function () {
                    return new Promise(function (resolve, reject) {
                        resolve({
                            value: 50
                        });
                    });
                }
            };

            var currentTemp = sampleCard.querySelector('#temp');
            var tempB4 = $(currentTemp).text();
            sampleCard.init();
            waitsFor(function () {
                var newCurrentTemp = $(currentTemp).text();
                return newCurrentTemp !== tempB4;
            }, 50);
        });
    });

    afterEach(function () {
        $('#test-container').remove();
    });

    it('should initialize from px.dealer', function () {
        var currentTemp = sampleCard.querySelector('#temp');
        expect($(currentTemp).text()).toContain('Current Temperature:50F');
    });

    describe('getMoreTemperatureData sets the current temperature', function () {

        it('from px.dealer', function () {
            var currentTemp = sampleCard.querySelector('#temp');
            var tempB4 = $(currentTemp).text();
            window.px.dealer = {
                getData: function () {
                    return new Promise(function (resolve, reject) {
                        resolve({
                            value: 100
                        });
                    });
                }
            };
            sampleCard.getMoreTemperatureData();
            waitsFor(function () {
                var newCurrentTemp = $(currentTemp).text();
                return newCurrentTemp !== tempB4;
            }, 50);
            runs(function () {
                expect($(currentTemp).text()).toContain('Current Temperature:100F');
            });
        });

        it('handles the error', function () {
            window.px.dealer = {
                getData: function () {
                    return new Promise(function (resolve, reject) {
                        reject('error');
                    });
                }
            };
            var currentTemp = sampleCard.querySelector('#temp');
            var tempB4 = $(currentTemp).text();
            sampleCard.getMoreTemperatureData();
            waitsFor(function () {
                var newCurrentTemp = $(currentTemp).text();
                return newCurrentTemp !== tempB4;
            }, 50);
            runs(function () {
                expect($(currentTemp).text()).toContain('Current Temperature:errorF');
            });
        });
    });
});
