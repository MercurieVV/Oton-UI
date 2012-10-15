/**
 * Created with JetBrains WebStorm.
 * User: MercurieVV
 * Date: 12.25.9
 * Time: 05:30
 * To change this template use File | Settings | File Templates.
 */
function loginUser($, login, password, errorCallback) {
    saveAuthToCookies($, login, password);
    loginCookiesUser($, errorCallback);
}

function loginCookiesUser($, errorCallback) {
    authGet($, '/rest/user', errorCallback);
}

function signIn($, user) {
    post($, '/rest/unchecked/user', user,
            function (data, text) {
                loginUser($, data.userName, data.password);
            },
            function (jqXHR, exception) {
                if (jqXHR.status == 409)
                    alert("User already exist")
            }
    );
}

function saveUserSettings(user) {
    authPost($, 'rest/user', user,
                function (data, text) {
                    $.cookie('user', data);
                    //saveAuthToCookies($, data.userName, data.password); password is modified on server
                    loginCookiesUser($);
                },
                function (jqXHR, exception) {
                    if (jqXHR.status == 409)
                        alert("User already exist")
                }
    );
}

function post($, url, data, successFunc, errorFunc) {
    $.ajax({
        data: "data = " + JSON.stringify(data),
        type:'POST',
        url:url,
        contentType:"application/json",
        dataType:"json"
    });
}

function authPost($, url, data, successFunc, errorFunc) {
    var auth = $.cookie('auth');
    $.ajax({
        data: JSON.stringify(data),
        type:'POST',
        url:url,
        contentType:"application/json",
        dataType:"json",
        beforeSend:function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + auth);
        },
        success: successFunc,
        error: errorFunc
    });
}

function authGet($, url, errorCallback) {
    $.cookie.json = true;
    var auth = $.cookie('auth');
    $.ajax({
        type:'GET',
        url:url,
        contentType:"application/json",
        xhrFields:{
            withCredentials:true
        },
        accept:"application/json",
        cache:false,
        cookie:false,
        dataType:"json",
        beforeSend:function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + auth);
        },
        success:function (data, textStatus) {
            $.cookie('user', data);
            window.location.replace("/index.html");
        },
        error:function (data, textStatus) {
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
