$(function() {
	//בדיקה אם הערך הנוכחי קיים במכלול
    var pageTitle = $("#firstHeading").text().trim();
	pageTitle=pageTitle.replace ("[","").replace ("]","").replace ("עריכה","").replace ("עריכת קוד מקור","").replace (" | ","");
	
    chrome.extension.sendRequest({func:"ifHaveHamichlol",title: pageTitle }, function(response) {
        if(response.have){
            $("#iconMichlol").attr("href","http://www.hamichlol.org.il/"+encodeURIComponent(pageTitle))
            $("#iconMichlol").attr("title", "צפה בערך זה במכלול")
        }else{
            
            function editInHamichlol(){
                chrome.extension.sendRequest({func:"editInHamichlol",title: pageTitle }, function(response) {});
            }
            
            $("#firstHeading").css('color','red');
            $("#importThisPageBtn").css('color','#ff5555');
            $("<span>").text("צור/ערוך ערך זה במכלול").attr("class", "buttons").appendTo($("#p-michlol")).on('click',editInHamichlol);
            
        }
    });
    

    
}); 


//החזרת כותרת הדף
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.greeting == "pageTitleOfWikipedia"){
	var pageTitle = $("#firstHeading").text().trim();
	pageTitle=pageTitle.replace ("[","").replace ("]","").replace ("עריכה","").replace ("עריכת קוד מקור","").replace (" | ","");
	sendResponse({farewell: pageTitle});
	};
});