function showEmailConfirmationIfNeeded() {
    var $confirmEmailModal = $("#confirmEmailModal");
    initFadingModal($confirmEmailModal);
    showModal($confirmEmailModal);
}

function sendEmailConfirmation() {
    var email = $("#emailField", "#confirmEmailModal").val();
    post($, "/rest/unchecked/emailConfirmation?email=" + email, "", function (data, textStatus) {
        $.cookie("confirmationEmail", email);
        $(".info", "#confirmEmailModal").show();
    });
}

function tryToLogin() {
    var login = $('#loginField').val();
    var password = $('#passwordField').val();
    loginUser($, login, password, function (jqXHR, exception) {
        var $errorField = $("#loginModal").find(".error");
        if (jqXHR.status == 503)
            $errorField.text("Cannot reach online service. Please check your internet connection or try to login later.");
        else if (jqXHR.status == 401 || jqXHR.status == 403)
            $errorField.text("No user exist with this login and password");
        else
            $errorField.text("Unknown server error.");
    });
    applyUserSettings();
}
/**
 * Created with JetBrains WebStorm.
 * User: MercurieVV
 * Date: 12.25.9
 * Time: 05:30
 * To change this template use File | Settings | File Templates.
 */


function showAvatar(src) {
    if (src == null)
        src = 'images/empty.gif';
    $('#avatarUrl').val(src);
    $('.avatarHolder').html('<img src="' + src + '" />');
}

function hideAvatar() {
    $('#avatarUrl').val("");
    $('.avatarHolder').html('');
}

function showSigninOrSettingsForm() {
    $.cookie.json = true;
    var user = $.cookie('user');
    var $signinButton = $('#signinButton');
    if (user != null) {
        populate("#signInForm", user);
        $('#password').val('');
        $('#userName').prop('readonly', 'readonly');
        $signinButton.text("Save");
    }
}

function setBackground(url) {
    if (url == null)
        url = 'images/Plain_Blak_Gray1.jpg';
    $('#backgroundUrl').val(url);
    $(".fillDefaultBackground").css('background-image', 'url(' + url + ')');
}
function applyUserSettings() {
    showSigninOrSettingsForm();
    $.cookie.json = true;
    var user = $.cookie('user');
    var isUserLoggedIn = user != null;
    var $loginButton = $("#loginFormButton");
    var $signInButton = $("#showSignInFormButton");
    if (isUserLoggedIn) {
        showAvatar(user.avatarUrl);
        $loginButton.text("Log out ");
        $signInButton.text("Settings ");
        setBackground(user.backgroundUrl);
    } else {
        hideAvatar();
        $loginButton.text("Log in ");
        $signInButton.text("Register");
        setBackground('../images/Plain_Blak_Gray1.jpg');
    }
}

function initImageSelectionInUserSettings($modal, $showButton, onImageSelect) {
    initFadingModal($modal);
    $showButton.click(function () {
        showModal($modal);
    });
    $('img', $modal).click(function () {
        if (onImageSelect != undefined) {
            var src = $(this).attr("src");
            onImageSelect(src);
        }
        hideModal($modal);
    });
}

function saveUser() {
    var $errorField = $("#signinModal").find(".error");
    //$errorField.text("");
    if ($("#password").val() != $("#passwordRepeatField").val()) {
        $errorField.text("Passwords are not identical");
        //return
    }
    var user = $('#signInForm').serializeObject();
    if ($.cookie('user') != null)
        saveUserSettings(user);
    else
        signIn($, user,
                function (jqXHR, exception) {
                    if (jqXHR.status == 409)
                        $errorField.text("User already exist")
                }
        );
}

function signIn($, user, error) {
    post($, '/rest/unchecked/user', user,
            function (data, text) {
                loginUser($, user.userName, user.password);
            },
            error
    );
}

function saveUserSettings(user) {
    authPost($, 'rest/user', user,
            function (data, text) {
                $.cookie('user', data);
                applyUserSettings();
                if (user.password != "") {
                    loginUser($, user.userName, user.password);
                }
                hideModal($("#signinModal"));
            }
    );
}

function loginUser($, login, password, errorCallback) {
    saveAuthToCookies($, login, password);
    authGet($, '/rest/unchecked/user?userName=' + login + '&password=' + password,
            function (data, textStatus) {
                $.cookie('user', data);
                hideModal($("#loginModal"));
                applyUserSettings();
            }
            , errorCallback);
}


function post($, url, data, successFunc, errorFunc) {
    $.ajax({
        data: JSON.stringify(data),
        type: 'POST',
        url: url,
        contentType: "application/json",
        dataType: "json",
        success: successFunc,
        error: errorFunc
    });
}

function authPost($, url, data, successFunc, errorFunc) {
    var auth = $.cookie('auth');
    $.ajax({
        data: JSON.stringify(data),
        type: 'POST',
        url: url,
        contentType: "application/json",
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + auth);
        },
        success: successFunc,
        error: errorFunc
    });
}

function authGet($, url, successCallback, errorCallback) {
    $.cookie.json = true;
    var auth = $.cookie('auth');
    $.ajax({
        type: 'GET',
        url: url,
        contentType: "application/json",
        xhrFields: {
            withCredentials: true
        },
        accept: "application/json",
        cache: false,
        cookie: false,
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + auth);
        },
        success: successCallback,
        error: function (data, textStatus) {
            $.cookie('user', null);
            if (errorCallback != 'undefined')
                errorCallback(data, textStatus);
            //on permission denied window.location.replace("/login.html");
        }
    });
}

function saveAuthToCookies($, login, password) {
    $.cookie.json = true;
    var auth = window.btoa(login + ":" + password);
    $.cookie('auth', auth);
}
