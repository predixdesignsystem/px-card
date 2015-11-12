window.px = window.px || {};

window.px.test = {
    isHidden: function (el) {
        var style = window.getComputedStyle(el);
        return (style.display === 'none')
    },
    getText: function (element) {
        return element.innerText || element.textContent;
    }
};

