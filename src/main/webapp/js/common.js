/**
 * Created with JetBrains WebStorm.
 * User: MercurieVV
 * Date: 12.23.8
 * Time: 14:47
 * To change this template use File | Settings | File Templates.
 */
function initScrollingModal(query) {
    var $element = $(query);
    $element.css({top: "-100%", left: 0});
    $element.jqm({
        onShow: function (h) {
            h.w.show();
            h.w.transition({ y: '100%' });
        },
        onHide: function (h) {
            //$element.fadeTo("slow", 0);
            //if(h.o) h.o.remove();
            h.w.show();
            h.w.transition({ y: '0%' }, function () {
                if (h.o) h.o.remove();
            });
            //h.w.fadeOut("slow");
        },
        modal: true
    });
}
function initFadingModal(query) {
    var $element = $(query);
    return $element.jqm({modal:true});
}
function showModal(query) {
    $(query).jqmShow()
}
function hideModal(query) {
    $(query).jqmHide()
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
        opacity: 1,
        scale: 1
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
        opacity: 0,
        scale: 2
    }, function () {
        $tooltip.hide();
        $tooltip.text("");
    });
}

function populate(frm, data) {
    $.each(data, function (key, value) {
        $('#' + key, frm).val(value);
    });
}

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
