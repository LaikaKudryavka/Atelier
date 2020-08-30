// fake DB
var UserID = [aa, bb, cc];

var TimelineText1 = "hi 1";
var TimelineText2 = "hi 2";
var TimelineText3 = "hi 3";
var TimelineText4 = "hi 4";
var TimelineText5 = "hi 5";
var TimelineText6 = "hi 6";

var TimelineDate1 = "2020.01.01";
var TimelineDate2 = "2020.01.02";
var TimelineDate3 = "2020.01.03";
var TimelineDate4 = "2020.01.04";
var TimelineDate5 = "2020.01.05";
var TimelineDate6 = "2020.01.06";

var UserID1_TimelineContent1 = [TimelineDate1, TimelineText1];
var UserID1_TimelineContent2 = [TimelineDate2, TimelineText2];
var UserID1_TimelineContent3 = [TimelineDate3, TimelineText3];

var UserID2_TimelineContent4 = [TimelineDate4, TimelineText4];
var UserID2_TimelineContent5 = [TimelineDate5, TimelineText5];
var UserID2_TimelineContent6 = [TimelineDate6, TimelineText6];

var UserID1_TimelineContents = [UserID1_TimelineContent1, UserID1_TimelineContent2, UserID1_TimelineContent3];


// fake DB

(function(global){
    function callbackFunc() {
        for (var i = 0; i < UserID1_TimelineContents.length ; i++) {
            UserID1_TimelineContents(i)(1).classList.add("timelinedate"); 
            UserID1_TimelineContents(i)(2).classList.add("timelinetext"); 
            
            // <li>
            //     <div>
            //         <time>timelinedate(i)<td><input type=button value="X" OnClick="deleteFunction"></td><br></time>
            //         <content>timelinetext(i)</content> 
            //     </div>
            // </li>
        }
    }
    global.addTimeline = callbackFunc;
})

document.addEventListener("DOMContentLoaded", function(){
    addTimeline();
});

function deleteTimeline(){
    UserID1_TimelineContents.pop();
}

function inputTumeline() {
    for (var i = 0; i < UserID1_TimelineContents.length ; i++) {
        UserID1_TimelineContents(i)(1).classList.add("timelinedate"); 
        UserID1_TimelineContents(i)(2).classList.add("timelinetext"); 
        
        // <li>
        //     <div>
        //         <time>timelinedate(i)<td><input type=button value="X" OnClick="deleteFunction"></td><br></time>
        //         <content>timelinetext(i)</content> 
        //     </div>
        // </li>
    }
}