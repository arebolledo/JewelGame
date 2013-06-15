var jewel = {
    screens: {}
};
// wait until main doc is loaded
window.addEventListener("load", function () {
    // start dynamic loading
    Modernizr.load([
        {
            // always loaded
            load: [
                "scripts/sizzle.js",
                "scripts/dom.js",
                "scripts/game.js",
                "scripts/screen.splash.js",
                "scripts/screen.main-menu.js"
            ],
            // waiting until main document is loaded
            complete: function () {

                jewel.game.showScreen("splash-screen");
            }
        }
    ]);
}, false);