chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.greeting == "chechLinks"){
		CheckIfLinksInMichlol ();	
	};
});

function CheckIfLinksInMichlol(){
	 //סימון כל הקישורים שאדומים עדיין במכלול
    $("#mw-content-text a").each(function(){
        var $this = $(this);
        var href = $this.attr('href');
        
        if(!href || !href.startsWith("/wiki/")) return;
        
        var title = $this.attr('title');
        if(!title) return;

        chrome.extension.sendRequest({func:"ifHaveHamichlol",title: title }, function(response) {
            if(!response.have){
				if(href.indexOf(encodeURIComponent("פורטל"))<0 && href.indexOf(encodeURIComponent("ויקיפדיה"))<0 && href.indexOf(encodeURIComponent("קובץ"))<0){
					var $sup = $("<sup>")
					.text("מ ")
					.css('color','red')
					.css("font-size", "90%")
					.css("border-bottom", "1px dotted black");
					
					var tooltip = $("<div>")
					.attr ("class", 'tooltip')
					.attr("display", "inline-block")
					
					tooltip.append()
					
					$sup.appendTo (tooltip)				
					var tooltiptext = $("<div>").attr ("class",'tooltiptext')
					tooltiptext.appendTo(tooltip)
					
					$("<div>").text("ייבא וערוך במכלול").attr ("class", 'tooltipButtons').attr ("id", 'importThisLink'+encodeURIComponent(title)).appendTo (tooltiptext).on('click', function() {
						dialogBox (title,"","importAndEdit","")
					});
					$("<div>").text("צור במכלול").attr ("class", 'tooltipButtons').attr ("id", 'editThisLinkInichlol'+encodeURIComponent(title)).appendTo (tooltiptext).on('click', function() {
						dialogBox (title,"","","editOnly")
					});
					$("<div>").text("דווח").attr ("class", 'tooltipButtons').attr ("id", 'Duach'+encodeURIComponent(title)).appendTo (tooltiptext).on('click', function() {
						alert ("אפשרות זו עדיין אינה פעילה")
					});
					$this.after(tooltip);
					
					

				}
            }
        });
        
    });	
};

$(".tooltipButtons").click(function(){
	var id = this.id
	if (id.indexOf("importThisLink")>-1){
		var pageTitle = id.replace("importThisLink")
		//chrome.extension.sendRequest({func:"importPageToMichlol",title: pageTitle }, function(response) {});

	} else if (id.indexOf("editThisLinkInichlol")>-1){
		var pageTitle = id.replace("editThisLinkInichlol")
		chrome.extension.sendRequest({func:"editInHamichlol",title: pageTitle }, function(response) {});

	} else if (id.indexOf("Duach")>-1){
		var title = id.replace("Duach")
	}
	
});
