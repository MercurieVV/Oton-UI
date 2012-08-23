/**
 * Created with JetBrains WebStorm.
 * User: MercurieVV
 * Date: 12.23.8
 * Time: 14:47
 * To change this template use File | Settings | File Templates.
 */
function modalBackground() {
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    //Set height and width to mask to fill up the whole screen
    $('#mask').css({'width':maskWidth, 'height':maskHeight});

    //transition effect
    $('#mask').fadeIn(1000);
    $('#mask').fadeTo("slow", 0.8);
}
function unmodalBackground() {
    $('#mask').hide();
}

function showHelp(text) {
    var $tooltip = $("#tooltip");
    $tooltip.text(text);
    $tooltip.show();
    $tooltip.css("opacity", "0");
    $tooltip.css("scale", "2");
    $tooltip.transition({
        opacity:1,
        scale:1
    });
}

function hideHelp() {
    var $tooltip = $("#tooltip");
    if (!$tooltip.is(':hidden')) {
        $tooltip.css("opacity", "1");
        $tooltip.css("scale", "1");
        $tooltip.transition({
            opacity:0,
            scale:2
        }, function () {
            $tooltip.hide();
            $tooltip.text("");
        });
    }
}
