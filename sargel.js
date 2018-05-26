//יצירת הסרגל
var sargel=$("<div>");

//sargel.css ("display", "none")

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.greeting == "toolbar"){
//		sargel.toggle(request.stateToolbar);
	
	};
});




//sargel.css ("background-Color", "red")
sargel.css ("border-Color", "#cceeee")
sargel.css ("border-style", "solid")
sargel.css ("border-width", "1px")
sargel.css ("margin-top", "35px")
sargel.css ("padding", "3px")
sargel.css ("width", "85%")
sargel.css ("float", "left")

sargel.attr('id', 'p-michlol');
$("#mw-head-base").after(sargel);
//סמל לסרגל
$('<a id="iconMichlol" title="למכלול - עמוד ראשי" href="http://www.hamichlol.org.il"> <img src="http://www.hamichlol.org.il/w/upload/michlol/8/80/%D7%A1%D7%9E%D7%9C_%D7%94%D7%9E%D7%9B%D7%9C%D7%95%D7%9C_%D7%92%D7%9E%D7%A8%D7%90_2.PNG" width="25" height="25"></a>').appendTo($("#p-michlol"));

//כפתורים לסרגל

//יבוא הערך הנוכחי
$('<span id="importThisPageBtn">').attr("class", "buttons").text("ייבא ערך זה למכלול").appendTo($("#p-michlol")).on('click',function (){
	importThisPage ()
});

//בדיקת מילים חשודות
$("#p-michlol").append('<span class="buttons" id="p-checkwords">בדוק מילים חשודות</button>');
$("#p-checkwords").click(function(){
	checkWords ();
});

//בדיקת קישורים במכלול
$("<span>").attr("class", "buttons").text("בדיקת קישורים במכלול").appendTo($("#p-michlol")).on('click',function (){
	CheckIfLinksInMichlol()
});

//יבוא למכלול
$("<span>").text("ייבוא למכלול").attr("class", "buttons").appendTo($("#p-michlol")).on('click',function (){
	ImportByInputBox ("wikipedia")
});

//דיווח על ערך הדורש בקרה
$("<span>").attr("class", "buttons").text("דווח על ערך הדורש בקרה").appendTo($("#p-michlol")).on('click',function (){
	alert ("אפשרות זו עדיין אינה פעילה")
});