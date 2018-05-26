chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.greeting == "chechLinks"){
		CheckIfLinksfromWikipedia ();	
	};
});

function CheckIfLinksfromWikipedia(){   
   $("#mw-content-text a.new").each(function(){
        var $this = $(this);
        var href = $this.attr('href');
        if(!href)  return;
                                     
                                     
        var title = false;
        try{
         title = (new URL(href,window.location.origin)).searchParams.get('title');
        }catch(e){};
        if(!title) return;
        
        chrome.extension.sendRequest({func:"ifHaveWikipedia",title: title }, function(response) {
            if(response.have){
                if(title.indexOf(":")<0){
					var $a = $("<a>")
					.attr("href","https://he.wikipedia.org/wiki/" + encodeURIComponent(title) )
					.attr("target","_blank")
					.text("w ")
					.css('color','red')
					.css("font-size", "90%");		
					
					var $sup = $("<sup>")
					.css("border-bottom", "1px dotted black");
					$a.appendTo ($sup)
					
					var tooltip = $("<div>")
					.attr ("class", 'tooltip')
					.attr("display", "inline-block")
					
					tooltip.append()
					
					$sup.appendTo (tooltip)				
					var tooltiptext = $("<div>").attr ("class",'tooltiptext')
					tooltiptext.appendTo(tooltip)
					
					$("<div>").text("ייבא וערוך במכלול").attr ("class", 'tooltipButtons').attr ("id", 'importThisLink'+encodeURIComponent(title)).appendTo (tooltiptext).on('click', function() {
						dialogBox (title,"","importAndEdit","");
					});
					$("<div>").text("צור במכלול").attr ("class", 'tooltipButtons').attr ("id", 'editThisLinkInichlol'+encodeURIComponent(title)).appendTo (tooltiptext).on('click', function() {
						dialogBox (title,"","","editOnly")
					});
	
					$this.after(tooltip);
					
					
				}
            }
        });
        
    });
    
}; 

