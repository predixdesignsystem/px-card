window.px = window.px || {};
window.px.test = window.px.test || {};

window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

window.px.test = {
    webComponentWait: function (done) {
        setTimeout(function(){
            done();
        }, 0);
    },
    isHidden: function (el) {
        var style = window.getComputedStyle(el);
        return (style.display === 'none')
    }
};