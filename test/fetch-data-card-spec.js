'use strict';
describe('Fetch Data Card', function () {

    var sampleCard, $testContainer;

    beforeEach(function (done) {
        // create a new sandbox
        setFixtures(sandbox({
            id: 'test-container'
        }));
        $testContainer = $('#test-container');

        // append the web component to test
        $testContainer.append('<fetch-data-card id="my-fetch-data-card"></fetch-data-card>');

        // once the web component is rendered, initialize it
        px.test.webComponentWait(done);
    });

    describe('should initialize from px.dealer', function () {
        beforeEach(function (done) {

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
            px.test.webComponentWait(done);
        });

        it('!', function () {
            var currentTemp = sampleCard.querySelector('#temp');
            expect($(currentTemp).text()).toContain('Current Temperature:50F');
        });

    });


    describe('getMoreTemperatureData sets the current temperature', function () {

        var currentTemp;

        describe('from px.dealer', function () {

            beforeEach(function (done) {
                window.px.dealer = {
                    getData: function () {
                        return new Promise(function (resolve, reject) {
                            resolve({
                                value: 100
                            });
                        });
                    }
                };

                currentTemp = sampleCard.querySelector('#temp');
                sampleCard.getMoreTemperatureData();

                px.test.webComponentWait(done);
            });

            it('!', function () {
                expect($(currentTemp).text()).toContain('Current Temperature:100F');
            });
        });

        describe('handles the error', function () {

            beforeEach(function (done) {
                window.px.dealer = {
                    getData: function () {
                        return new Promise(function (resolve, reject) {
                            reject('error');
                        });
                    }
                };

                currentTemp = sampleCard.querySelector('#temp');
                sampleCard.getMoreTemperatureData();

                px.test.webComponentWait(done);
            });

            it('!', function () {
                expect($(currentTemp).text()).toContain('Current Temperature:errorF');
            });
        });
    });
});
