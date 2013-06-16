// TODO: http://channel9.msdn.com/events/BUILD/BUILD2011/SAC-807T

var jewel = {
    screens: {},
    settings: {
        rows: 8,
        cols: 8,
        baseScore: 100,
        numJewelTypes: 7
    }
};
// wait until main doc is loaded
window.addEventListener("load", function () {
    Modernizr.addTest("standalone", function () {
        return (window.navigator.standalone != false);
    });
    // start dynamic loading
    Modernizr.load([
        {
            // always loaded
            load: [
                "scripts/sizzle.js",
                "scripts/dom.js",
                "scripts/game.js",
                "scripts/board.js"
            ]
        }, {
            test: Modernizr.standalone,
            yep: "scripts/screen.splash.js",
            nope: "scripts/screen.install.js",

            // waiting until main document is loaded
            complete: function () {
                jewel.game.setup();
                if (Modernizr.standalone) {
                    jewel.game.showScreen("splash-screen");
                } else {
                    jewel.game.showScreen("install-screen");
                }
            }
        }
    ]);
    if (Modernizr.standalone) {
        Modernizr.load([
       {
           load: [
               "scripts/screen.main-menu.js"
           ]
       }]);
    }
}, false);