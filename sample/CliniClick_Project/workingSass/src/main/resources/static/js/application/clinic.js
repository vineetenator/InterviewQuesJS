/**
 * Created by niranjan on 8/11/16.
 */

/*<![CDATA[*/

var days = {
    "1": "Monday", "2": "Tuesday", "3": "Wednesday", "4": "Thursday", "5": "Friday",
    "6": "Saturday", "0": "Sunday"
};
function fillData(data) {
    var numVisitors = data.length;
    console.log("data = " + data);
    console.log("Num Visitors = " + numVisitors);
//        var visitors = JSON.parse(data);
    var getHtmlStr = function (data) {
        var str1 = "<div class='table-responsive'><table class='table'>";
        var str2 = "</table></div>";
        var str3 = "";
        for (var i = 0; i < numVisitors; i++) {
            str3 = str3.concat("<tr class='info'>" +
                "<td>" + (i + 1) + ".</td>" +
                "<td>" + data[i].name + "</td>" +
                "<td>" + ((data[i].hasAttended == true)
                    ? "<button type='button' class='btn btn-success btn-sm'><span class='glyphicon glyphicon-ok'></span></button>"
                    : ( i > 0 && data[i - 1].hasAttended == true && data[i].hasAttended == false)
                    ? "<button type='button' class='btn btn-warning btn-sm'><span class='glyphicon glyphicon-adjust'></span></button>"
                    : "<button type='button' class='btn btn-danger btn-sm'><span class='glyphicon glyphicon-stop'></span></button>") + "</td>" +
                "</tr>");
        }
        var finalStr = str1.concat(str3).concat(str2);
//            console.log("finalStr = " + finalStr);
        return finalStr;
    };
    htmlStr = getHtmlStr(data);
    $("#visitorListId").empty();
    $("#visitorListId").append(htmlStr);
};

function changeFocusOnDoctor() {

};
function getTimeFromSecondNumbers(timeInSeconds) {
    var hours = parseInt(timeInSeconds / 3600);
    var minutes = parseInt((timeInSeconds % 3600) / 60);
    if (hours.length == 1) {
        hours = "0" + hours
    }
    if (minutes.length == 1) {
        minutes = "0" + minutes
    }
    var slotTime = hours + ":" + minutes
    if (slotTime.charAt(1) == ":") {
        slotTime = "0" + slotTime;
    }
    if (slotTime.length == 4) {
        var splitStr = slotTime.split(":");
        splitStr[1] = "0" + splitStr[1];
        slotTime = splitStr[0] + ":" + splitStr[1];
    }
    return slotTime;
};


/*]]>*/