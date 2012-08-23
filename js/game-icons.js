/**
 * Created with JetBrains WebStorm.
 * User: MercurieVV
 * Date: 12.9.8
 * Time: 18:00
 * To change this template use File | Settings | File Templates.
 */

function GameIcons() {
    gamesArray = [];
    GAMES_COLS = 3;
    GAMES_ROWS = 2;
    filterString = "";

    this.search = function (searchString) {
        filterString = searchString;
        $("#gamesSliderPaged li").remove();
        for (var i in gamesArray) {
            var gameData = gamesArray[i];
            addGameIcon(gameData);
        }
    };

    this.addGame = function () {
        var iconsCount = gamesArray.length;
        var iconId = iconsCount % 13;
        var iconUrl = "images/game-" + iconId + ".png";
        var gameData = {gameId:iconsCount, iconUrl:iconUrl};

        gamesArray.push(gameData);
        addGameIcon(gameData);

/*
        var manager = new jsAnimManager();
        var anim = manager.createAnimObject(iconsCount);
        anim.add({property:Prop.opacity, from:0.1, to:1, duration:2000});
*/
    };

    this.updateSliderCurrentPageNr = function(slider) {
        updatePageNumber(slider);
    };

    function updatePageNumber(slider) {
        text = slider.currentPage + " of " + slider.pages;
        $("#currentGamesPageNumber").text(text);
    }

    function showIcon(gameData) {
        var text = gameData["gameId"].toString().replace(/\s+/g, ' ').toLowerCase();
        return (filterString == "" || ~text.indexOf(filterString));
    }

    function addGameIcon(gameData) {
        if (!showIcon(gameData)) {
            return;
        }
        var page = createPageIfNeeded();
        var cellId = "#gamesPage_" + page;
        addNewGameIcon(cellId, gameData);
    }

    function createPageIfNeeded() {
        var iconsCount = $("#gamesSliderPaged li img").length;
        page = Math.floor(iconsCount / (GAMES_ROWS * GAMES_COLS));
        if ((iconsCount % (GAMES_ROWS * GAMES_COLS)) == 0) {
            jQuery.fn.exists = function () {
                return this.length > 0;
            };
            if (!$("#gamesPage_" + page).exists())
                addNewPage(page);
        }
        return page;
    }

    function addNewGameIcon(destinationElement, data) {
        var template = '<img src="{{iconUrl}}" class="shadow gameIcon" title="{{gameId}}" alt="{{gameId}}" id="{{gameId}}" />';
        template = Handlebars.compile(template);
        var html = template(data);
        $(html).appendTo(destinationElement);
    }

    function addNewPage(pageNr) {
        var html = "<li id='gamesPage_" + pageNr + "'></li>";
        $(html).appendTo("#gamesSliderPaged");
        var slider = $('#gamesSliderPaged').data('AnythingSlider');
        slider.updateSlider();
        updatePageNumber(slider);
    }
}



