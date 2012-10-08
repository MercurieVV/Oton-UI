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