/**
 * Created with JetBrains WebStorm.
 * User: MercurieVV
 * Date: 12.23.8
 * Time: 14:47
 * To change this template use File | Settings | File Templates.
 */
function modalBackground() {
    //transition effect
    $('#mask').fadeIn(1000);
    $('#mask').fadeTo("slow", 0.8);
}
function unmodalBackground() {
    $('#mask').hide();
}

function showHelp(text) {
    var $tooltip = $("#tooltip");
    if (!$tooltip.is(':hidden')) {
        return;
    }
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
    if ($tooltip.is(':hidden')) {
        return;
    }
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
