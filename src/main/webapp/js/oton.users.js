/**
 * Created with JetBrains WebStorm.
 * User: MercurieVV
 * Date: 12.25.9
 * Time: 05:30
 * To change this template use File | Settings | File Templates.
 */
function loginUser($, login, password, errorCallback) {
    $.cookie('login', login);
    $.cookie('password', password);
    //auth = "Basic " + window.btoa(login + ":" + password);
    url = 'http://localhost:8484/Service-1.0/rest/user';
/*
    xauth.init({
        node:document.getElementById("wrapper"),
        url:'http://localhost:8484/Service-1.0/rest/user'
    }).addCallback(function (status, token, node) {
            alert([status, token, node]);
            node.style.display = "none";
        });
*/

    xml = new XMLHttpRequest();
    xml.open('GET',url);
    //xml.setRequestHeader('Authorization', auth);
    xml.send( null );
    return xml.responseText;


/*
this.http.open("get", 'http://localhost:8484/Service-1.0/rest/user', false, login, password);
this.http.send("");
if (http.status == 200) {
document.location = this.action;
} else {
alert("Incorrect username and/or password.");
}
return false;
*/
    /*
     $.ajax({
     type:'GET',
     url:'http://localhost:8484/Service-1.0/rest/user',
     contentType:"application/x-www-form-urlencoded",
     xhrFields : {
     withCredentials : true
     },
     accept : "application/json",
     //contentType : "application/json",
     cache : false,
     cookie : false,
     beforeSend:function (xhr) {
     xhr.setRequestHeader("Authorization", "Basic " + window.btoa(login + ":" + password)) ;
     },
     success:function (data, text) {
     alert("Logged in");
     window.location.replace("/index.html");
     },
     error: errorCallback
     });
     */
}

