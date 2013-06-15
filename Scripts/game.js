﻿jewel.game = (function () {
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
    // expose public methods
    return {
        showScreen: showScreen
    };
})();