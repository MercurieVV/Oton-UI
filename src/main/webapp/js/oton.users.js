/**
 * Created with JetBrains WebStorm.
 * User: MercurieVV
 * Date: 12.25.9
 * Time: 05:30
 * To change this template use File | Settings | File Templates.
 */
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
                if (user.password != "") {
                    loginUser($, user.userName, user.password);
                }
                window.location.replace("/index.html");
            }
    );
}

function loginUser($, login, password, errorCallback) {
    saveAuthToCookies($, login, password);
    authGet($, '/rest/unchecked/user?userName=' + login + '&password=' + password,
            function (data, textStatus) {
                        $.cookie('user', data);
                        window.location.replace("/index.html");
                    }
            ,errorCallback);
}


function post($, url, data, successFunc, errorFunc) {
    $.ajax({
        data:JSON.stringify(data),
        type:'POST',
        url:url,
        contentType:"application/json",
        dataType:"json",
        success:successFunc,
        error:errorFunc
    });
}

function authPost($, url, data, successFunc, errorFunc) {
    var auth = $.cookie('auth');
    $.ajax({
        data:JSON.stringify(data),
        type:'POST',
        url:url,
        contentType:"application/json",
        dataType:"json",
        beforeSend:function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + auth);
        },
        success:successFunc,
        error:errorFunc
    });
}

function authGet($, url, successCallback, errorCallback) {
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
        success:successCallback,
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
