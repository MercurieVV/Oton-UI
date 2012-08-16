/**
 * Created with JetBrains WebStorm.
 * User: MercurieVV
 * Date: 12.14.8
 * Time: 14:37
 * To change this template use File | Settings | File Templates.
 */
CreateGameTest = TestCase("CreateGameTest");

CreateGameTest.prototype.testFormsCreation = function () {
    testFormsData = {
        "forms":[
            {
                "title":"ttt",
                "options":[
                    {"option":"Heh?"}
                    ,{"option":"Orrr?"}
                    ,{"option":"Mmmm?"}
                ]
            }
            ,{
                "title":"ttttTTttiitle",
                "options":[
                    {"option1":"Oh?"}
                    ,{"opt2":"ili?"}
                    ,{"o3":"aaaa!"}
                ]
            }

        ]
    };

 /*   var template ='    <div class="createForm">' +
        '<div class="formTitle">{{title}}</div><div>' +
        <form action="">
                {{#options}}
            <input type="radio" name="radSize" id="sizeSmall" value="small" checked="checked"/>
            <label for="sizeSmall">{{option}}</label>
                {{/options}}
        </form>
    </div>
</div>';
*/
    var html;
    $.get('create-form-template.html', function(template) {
        html = Mustache.to_html(template, testFormsData);
        // and now append the html anywhere you like
        assertEquals("<table id=\"1\" class=\"\"><tr id=\"1_1\"><td id=\"1_1_1\"></td></tr></table>", html);
    });

};
