function tryToLogin() {
    var login = $('#loginField').val();
    var password = $('#passwordField').val();
    loginUser($, login, password, function (jqXHR, exception) {
        var $loginError = $("#loginModal").find(".error");
        if (jqXHR.status == 503)
            $loginError.text("Cannot reach online service. Please check your internet connection or try to login later.");
        else if (jqXHR.status == 401 || jqXHR.status == 403)
            $loginError.text("No user exist with this login and password");
        else
            $loginError.text("Unknown server error.");
    });
    setLoginButtonsText();
}
/**
 * Created with JetBrains WebStorm.
 * User: MercurieVV
 * Date: 12.25.9
 * Time: 05:30
 * To change this template use File | Settings | File Templates.
 */


function showAvatar(src) {
    $('#avatarUrl').val(src);
    $('#avatar').html('<img src="' + src + '" />');
}

function showSigninOrSettingsForm() {
    $.cookie.json = true;
    var user = $.cookie('user');
    var $signinButton = $('#signinButton');
    if (user != null) {
        populate("#signInForm", user);
        $('#password').val('');
        $('#userName').prop('readonly', 'readonly');
        showAvatar(user.avatarUrl);
        $signinButton.text("Save");
    }
}

function setLoginButtonsText() {
    showSigninOrSettingsForm();
    $.cookie.json = true;
    var $loginButton = $("#loginFormButton");
    var $signInButton = $("#showSignInFormButton");
    if ($.cookie('user') != null) {
        $loginButton.text("Log out ");
        $signInButton.text("Settings ");
    } else {
        $loginButton.text("Log in ");
        $signInButton.text("Sign In");
    }
}

function hideAvatarsOnClickOutside(element, button) {
    $('html').click(function () {
        if (element.is(':hidden')) {
            return;
        }
        element.hide();
    });
    element.click(function (event) {
        event.stopPropagation();
    });
    button.click(function (event) {
        if (element.is(':visible'))
            element.hide();
        else
            element.show();
        event.stopPropagation();
    });
}

function showHideAvatars() {
    var $avatarsSelectionDiv = $('#avatarsSelection');
    hideAvatarsOnClickOutside($avatarsSelectionDiv, $('#showAvatarsButton'));
    $('img', '#avatarsSelection').click(function () {
        var src = $(this).attr("src");
        showAvatar(src);
        $avatarsSelectionDiv.hide();
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
                setLoginButtonsText();
                if (user.password != "") {
                    loginUser($, user.userName, user.password);
                }
                hideModal("#signinModal");
            }
    );
}

function loginUser($, login, password, errorCallback) {
    saveAuthToCookies($, login, password);
    authGet($, '/rest/unchecked/user?userName=' + login + '&password=' + password,
            function (data, textStatus) {
                $.cookie('user', data);
                hideModal("#loginModal");
                setLoginButtonsText();
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
