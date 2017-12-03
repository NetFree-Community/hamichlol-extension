$(function() {

    var pageTitle = $("#firstHeading").text().trim();

    chrome.extension.sendRequest({func:"ifHaveHamichlol",title: pageTitle }, function(response) {
        if(response.have){
            
        }else{
            
            function editInHamichlol(){
                chrome.extension.sendRequest({func:"editInHamichlol",title: pageTitle }, function(response) {});
            }
            
            $("#firstHeading").css('color','red');
            
            $("<button>").text("ערוך בהמכלול").appendTo($("#bodyContent")).on('click',editInHamichlol);
            
        }
    });
    
    
    $("#mw-content-text a").each(function(){
        var $this = $(this);
        var href = $this.attr('href');
        
        if(!href || !href.startsWith("/wiki/")) return;
        
        var title = $this.attr('title');
        if(!title) return;
        
        chrome.extension.sendRequest({func:"ifHaveHamichlol",title: title }, function(response) {
            if(!response.have){
                $this.after($("<span>").text(" [M] ").css('color','red'))
            }
        });
        
    });
    
}); 