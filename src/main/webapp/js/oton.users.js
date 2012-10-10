/**
 * Created with JetBrains WebStorm.
 * User: MercurieVV
 * Date: 12.25.9
 * Time: 05:30
 * To change this template use File | Settings | File Templates.
 */
function loginUser($, login, password, errorCallback) {
    $.cookie.json = true;
    $.cookie('login', login);
    $.cookie('password', password);
    auth = "Basic " + window.btoa(login + ":" + password);
    url = '/rest/user';
    $.ajax({
        type:'GET',
        url: url,
        contentType:"application/x-www-form-urlencoded",
        xhrFields:{
            withCredentials:true
        },
        accept:"application/json",
        //contentType : "application/json",
        cache:false,
        cookie:false,
        dataType : "json",
        beforeSend:function (xhr) {
            xhr.setRequestHeader("Authorization", auth);
        },
        success:function (data, textStatus) {
            $.cookie('user', data);
            window.location.replace("/index.html");
        },
        error:errorCallback
    });


    function signIn($, user) {
        $.ajax({
            data:user,
            type:'POST',
            url:'/rest/unchecked/user',
            contentType:"application/json",
            dataType:"json",
            success:function (data, text) {
                alert("all saved");
                loginUser($, login, password, function (jqXHR, exception) {
                    alert(jqXHR.status + " something wrong");
                })
            },
            error:function (jqXHR, exception) {
                if (jqXHR.status == 409)
                    alert("User already exist")
            }
        });
    }
}

