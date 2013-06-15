jewel.game = (function () {
    var dom = jewel.dom,
        $ = dom.$;
    // hide the active screen (if any and show the screen
    // with specified id
    function showScreen(screenId) {
        var activeScreen = $("#game .screen.active")[0],
            screen = $("#" + screenId)[0];
        if (activeScreen) {
            dom.removeClass(activeScreen, "active");
        }
        jewel.screens[screenId].run();
        dom.addClass(screen, "active");
    }
    function setup() {
        // disable native touchmove behavior to prevent overscroll
        dom.bind(document, "touchmove", function (event) {
            alert("Touch move event fired!");
            event.preventDefault();
        });
    }
    // expose public methods
    return {
        showScreen: showScreen,
        setup: setup
    };
})();