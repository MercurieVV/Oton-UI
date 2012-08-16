/**
 * Created with JetBrains WebStorm.
 * User: MercurieVV
 * Date: 12.9.8
 * Time: 18:00
 * To change this template use File | Settings | File Templates.
 */

function GameIcons() {
    gamesArray = [];
    GAMES_COLS = 7;
    GAMES_ROWS = 4;

    this.addIcon = function () {
        var iconsCount = gamesArray.length;
        gamesArray.push(iconsCount);
        page = this.createPageIfNeeded(iconsCount);
        row = Math.floor(iconsCount / GAMES_COLS) % GAMES_ROWS + 1;
        col = (iconsCount % GAMES_COLS) + 1;
        var cellId = "#" + page + "_" + row + "_" + col;
        var imgId = page + "_" + row + "_" + col + "_img";
        $('<img src="images/game-icon.png" class="shadow" alt="gme" id="' + imgId + '" />').appendTo(cellId);
        var manager = new jsAnimManager();
        var anim = manager.createAnimObject(imgId);
        anim.add({property:Prop.opacity, from:0.1, to:1, duration:2000});

        //$("#" + imgId).effect("scale", { percent: 1000 }, 300);
        //    $("#" + imgId).transition({ scale: 100 });
    };

    this.createPageIfNeeded = function (iconsCount) {
        page = Math.floor(iconsCount / (GAMES_ROWS * GAMES_COLS)) + 1;
        if ((iconsCount % (GAMES_ROWS * GAMES_COLS)) == 0) {
            jQuery.fn.exists = function () {
                return this.length > 0;
            };
            if (!$("#" + page).exists())
                addNewPage(page);
        }
        return page;
    };


    function createPage(pageNr, html) {
        html = "<li id='gamesPage_" + pageNr + "'>" + html + "</li>";
        return html;
    }

    function createTable(id, cols, rows, classes) {
        var html = '<table id="' + id + '" class="' + classes + '">';

        //loop for rows
        for (row = 1; row <= rows; row++) {
            html += '<tr id="' + id + '_' + row + '">';
            //loop for columns
            for (col = 1; col <= cols; col++) {
                html += '<td id="' + id + '_' + row + '_' + col + '"></td>';
            }
            html += '</tr>';
        }

        html += '</table>';
        return html;
    }

    function addNewPage (pageNr) {
        html = createTable(pageNr, GAMES_COLS, GAMES_ROWS, "gameIcons");

        html = createPage(pageNr, html);
        $(html).appendTo("#gamesSliderPaged");
        $('#gamesSliderPaged').data('AnythingSlider').updateSlider();
    }
}



