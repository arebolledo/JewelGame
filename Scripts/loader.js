var jewel = {};
// wait until main doc is loaded
window.addEventListener("load", function () {
    // start dynamic loading
    Modernizr.load([
        {
            // always loaded
            load: [
                "scripts/sizzle.js",
                "scripts/dom.js",
                "scripts/game.js"
            ],
            // waiting until main document is loaded
            complete: function () {
                
                jewel.game.showScreen("splash-screen");
            }
        }
    ]);
}, false);