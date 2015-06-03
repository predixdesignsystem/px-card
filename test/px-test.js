window.px = window.px || {};
window.px.test = window.px.test || {};

window.px.test.webComponentWait = function(fn) {
    waits(0);
    runs(fn);
};