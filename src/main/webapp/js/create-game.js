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
    $(".goForward").click(function(event){
        $("#createGamePaged").data('AnythingSlider').goForward();
    });
    $(".goBack").click(function(event){
        $("#createGamePaged").data('AnythingSlider').goBack();
    })
}

function showCreateGamePanel() {
    var $createFormsPanel = $("#createFormsPanel");
    var $createPanel = $("#createPanel");
    $createFormsPanel.show();
    $createPanel.transition({ x: '120%' });
    var $outerModal = $('#createGameModalBackground');
    $outerModal.fadeIn(1000);
    $outerModal.fadeTo("slow", 0.8);
}
function hideCreateGamePanel() {
    var $createPanel = $("#createPanel");
    $createPanel.transition({ x: '0%' }, function () {
        $("#createFormsPanel").hide();
        $('#createGameModalBackground').hide();
    });
}
