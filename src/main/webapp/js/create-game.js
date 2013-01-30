/**
 * Created with JetBrains WebStorm.
 * User: MercurieVV
 * Date: 12.14.8
 * Time: 14:36
 * To change this template use File | Settings | File Templates.
 */
function CreateGame() {


}

function applyCreateNavigationRules() {
    $(".goForward").click(function (event) {
        $("#createGamePaged").data('AnythingSlider').goForward();
        informUserOnInactivityRestart();
    });
    $(".goBack").click(function (event) {
        $("#createGamePaged").data('AnythingSlider').goBack();
        informUserOnInactivityRestart();
    });
    $("button[type=reset]", ".createGameForm").click(function () {
        $("#createGamePaged").data('AnythingSlider').gotoPage(1);
    });
}

function showCreateGamePanel() {
    var $createFormsPanel = $("#createFormsPanel");
    var $createPanel = $("#createPanel");
    $createFormsPanel.show();
    var $outerModal = $('#createGameModalBackground');
    $createPanel.transition({ x: '120%' }, 500, 'linear', function () {
        $outerModal.css("opacity", "0");
        $outerModal.show();
        $outerModal.transition({opacity: 0.9}).transition({opacity: 0.8});
    });
    informUserOnInactivityStart();
}
function hideCreateGamePanel() {
    var $createPanel = $("#createPanel");
    $createPanel.transition({ x: '0%' }, function () {
        $("#createFormsPanel").hide();
        $('#createGameModalBackground').hide();
    });
}

function informUserOnInactivity() {
    if ($('#createGamePaged').data('AnythingSlider').currentPage > data.forms.length)
        return;
    var $informOnInactivity = $("#informOnInactivity");
    $informOnInactivity.fadeIn(1000).delay(15000).fadeOut(1000);
}
function informUserOnInactivityStart() {
    $("#createPanel").oneTime(30000, "userInactivityAlert", function () {
        informUserOnInactivity();
    });
}
function informUserOnInactivityStop() {
    $("#createPanel").stopTime("userInactivityAlert");
    $("#informOnInactivity").hide();
}
function informUserOnInactivityRestart() {
    informUserOnInactivityStop();
    informUserOnInactivityStart();
}
