jewel.board = (function () {
    var settings,
        jewels,
        cols,
        rows,
        baseScore,
        numJewelTypes;
    function initialize(callback) {
        settings = jewel.settings;
        numJewelTypes = settings.numJewelTypes,
        baseScore = settings.baseScore,
        cols = settings.cols,
        rows = settings.rows;
        fillBoard();
        callback();
    }
    function print() {
        var str = "";
        for (var y = 0; y < rows; y++) {
            for (var x = 0; x < cols; x++) {
                str += getJewel(x, y) + " ";
            }
            str += "\r\n";
        }
        console.log(str);
    }
    function fillBoard() {
        var x, y;
        jewels = [];
        for (x = 0; x < cols; x++) {
            jewels[x] = [];
            for (y = 0; y < rows; y++) {
                possibleJewel = randomJewel();
                while ((possibleJewel == getJewel(x - 1, y) &&
                    possibleJewel == getJewel(x - 2, y)) || (
                    possibleJewel == getJewel(x, y - 1) &&
                    possibleJewel == getJewel(x, y - 2))) {
                    possibleJewel = randomJewel();
                }
                jewels[x][y] = possibleJewel;
            }
        }
    }
    function getJewel(x, y) {
        if (x < 0 || x > cols - 1 || y < 0 || y > rows - 1) {
            return -1;
        } else {
            return jewels[x][y];
        }
    }
    function checkChain(x, y) {
        var selectedJewel = getJewel(x, y),
            left = 0, right = 0, down = 0, up = 0;
        // look right
        while (selectedJewel === getJewel(x + right + 1, y)) {
            right++;
        }
        // look left
        while (selectedJewel === getJewel(x - left - 1, y)) {
            left++;
        }
        // lookup
        while (selectedJewel === getJewel(x, y + up + 1)) {
            up++;
        }
        while (selectedJewel === getJewel(x, y - down - 1)) {
            down++;
        }
        return Math.max(left + 1 + right, up + 1 + down);
    }
    function canSwap(x1, y1, x2, y2) {
        var jewel1 = getJewel(x1, y1),
            jewel2 = getJewel(x2, y2),
            chain;
        if (!isAdjacent(x1, y1, x2, y2)) {
            return false;
        }
        // temp swap
        jewels[x1][y1] = jewel2;
        jewels[x2][y2] = jewel1;
        chain = (checkChain(x2, y2) > 2 || checkChain(x1, y1) > 2);
        // swap back
        jewels[x1][y1] = jewel1;
        jewels[x2][y2] = jewel2;
        return chain;
    }
        
    function randomJewel() {
        return Math.floor(Math.random() * numJewelTypes);
    }

    function isAdjacent(x1, y1, x2, y2) {
        var dx = Math.abs(x1 - x2),
            dy = Math.abs(y1 - y2);
        return (dx + dy === 1);
    }
    function getChains() {
        var x, y,
            chain = [];
        for (x = 0; x < cols; x++) {
            chains[x] = [];
            for (y = 0; y < rows; y++) {
                chains[x][y] = checkChain(x, y);
            }
        }
        return chains;
    }

    function check() {
        var chains = getChains(),
            hadChains = false, score = 0,
            removed = [], moved = [], gaps = [];
        for (var x = 0; x < cols; x++) {
            gaps[x] = 0;
            for (var y = rows - 1; y >= 0; y--) {
                if (chains[x][y] > 2) {
                    hadChains = true;
                    gaps[x]++;
                    removed.push({
                        x: x, y: y,
                        type: getJewel(x, y)
                    });
                }
                else if (gaps[x] > 0) {
                    moved.push({
                        toX: x, toY: y + gaps[x],
                        fromX: x, fromY: y,
                        type: getJewel(x, y)
                    });
                }
                jewels[x][y + gaps[x]] = getJewel(x, y);
            }
        }
    }
    return {
        initialize: initialize,
        print: print,
        canSwap: canSwap
    };
})();