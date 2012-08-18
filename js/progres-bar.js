/**
 * Created with JetBrains WebStorm.
 * User: MercurieVV
 * Date: 12.17.8
 * Time: 16:25
 * To change this template use File | Settings | File Templates.
 */
( window.jQuery || window.ender );
(function ($) {
    // Simple wrapper around jQuery animate to simplify animating progress from your app
    // Inputs: Progress as a percent, Callback
    // TODO: Add options and jQuery UI support.
    $.fn.animateProgress = function (progress, callback) {
        return this.each(function () {
            $(this).animate({
                width:progress + '%'
            }, {
                duration:2000,

                // swing or linear
                easing:'swing',

                // this gets called every step of the animation, and updates the label
                step:function (progress) {
                    var labelEl = $('.ui-label', this),
                        valueEl = $('.value', labelEl);

                    if (Math.ceil(progress) < 20 && $('.ui-label', this).is(":visible")) {
                        labelEl.hide();
                    } else {
                        if (labelEl.is(":hidden")) {
                            labelEl.fadeIn();
                        }
                        ;
                    }

                    if (Math.ceil(progress) == 100) {
                        labelEl.text('Completed');
                        setTimeout(function () {
                            labelEl.fadeOut();
                        }, 1000);
                    } else {
                        valueEl.text(Math.ceil(progress) + '%');
                    }
                },
                complete:function (scope, i, elem) {
                    if (callback) {
                        callback.call(this, i, elem);
                    }
                    ;
                }
            });
        });
    };
})(jQuery);

function emulateLoading() {
    $(".ui-progress", this.progressBar).animateProgress(35, function () {
        return setTimeout((function () {
            $("#progress_bar").removeClass("error").addClass("warning");
            return $("#progress_bar .ui-progress").animateProgress(60, function () {
                $("#progress_bar").removeClass("warning");
                return setTimeout((function () {
                    return $("#progress_bar .ui-progress").animateProgress(100, function () {
                        return $('#createGamePaged').data("AnythingSlider").goForward();
                    });
                }), 2000);
            });
        }), 1000);
    });
}

