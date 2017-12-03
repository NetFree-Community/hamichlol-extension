$(function() {
    
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
                
                
                var $a = $("<a>")
                .attr("href","https://he.wikipedia.org/wiki/" + encodeURIComponent(title) )
                .attr("target","_blank")
                .text(" [W] ")
                .css('color','red');
                
                $this.after($a);
            }
        });
        
    });
    
}); 