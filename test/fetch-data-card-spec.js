'use strict';
describe('Fetch Data Card', function () {

    var sampleCard;

    px.beforeEachWithFixture(function () {
        // append the web component to test
        $fixture.append('<fetch-data-card id="my-fetch-data-card"></fetch-data-card>');
        sampleCard = $fixture.get(0).querySelector('fetch-data-card');
    });

    px.beforeEachAsync(function () {
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
    });

    it('should initialize from px.dealer', function () {
        var currentTemp = sampleCard.querySelector('#temp');
        expect($(currentTemp).text()).toContain('Current Temperature:50F');
    });

    describe('getMoreTemperatureData sets the current temperature', function () {

        var currentTemp;

        px.beforeEachAsync(function(){
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
        });

        it('should return temperature from dealer', function () {
            expect($(currentTemp).text()).toContain('Current Temperature:100F');
        });

    });

    describe('handles the error', function () {
        var currentTemp;

        px.beforeEachAsync(function(){
            window.px.dealer = {
                getData: function () {
                    return new Promise(function (resolve, reject) {
                        reject('error');
                    });
                }
            };

            currentTemp = sampleCard.querySelector('#temp');
            sampleCard.getMoreTemperatureData();
        });

        it('should show error on card', function () {
            expect($(currentTemp).text()).toContain('Current Temperature:errorF');
        });
    });
});
