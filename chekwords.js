//קבלת אירוע מהפופאפ
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.greeting == "chekWords"){
			if (document.location.href.indexOf("action")>-1){
				alert("לא ניתן להפעיל את בדיקת המילים החשודות בעריכת קוד מקור")
			}else{
				alert("מבוטל לבנתיים")	
			}
	};
});

function checkWords (){
	//אדום כהה
	var A = [];
	lula(A, "#ff5555");	
	//אדום בהיר
	var B = [];
	lula(B, "#ffcccc");	
	//ירוק
	var C = [];
	lula(C, "#99ff99");	
	//כחול
	var D = [];
	lula(D, "#ccccff");	
	//צהוב
	var E = [];
	lula(E, "#eeee99");		
};

function lula (A, Scolor){
    wrapText('#bodyContent', 'background-Color:' + Scolor, A);
};

function wrapText(selector, style, wordsArr) {
    var regex = new RegExp(wordsArr.join('|'), 'g');
    var allTextNodes = $(selector).find('*').contents().filter(function () {
        return this.nodeType === 3;
    });
    allTextNodes.each(function () {
        var ele = $(this);

        var oldText = ele.text();
        var newText = oldText.replace(regex, function (m) {
            return '<span style="' + style + '">' + m + '</span>';
        });
        ele.replaceWith(newText);
    });
}
