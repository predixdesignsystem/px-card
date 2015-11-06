window.px = window.px || {};

window.px = {
    isHidden: function (el) {
        var style = window.getComputedStyle(el);
        return (style.display === 'none')
    }
};


