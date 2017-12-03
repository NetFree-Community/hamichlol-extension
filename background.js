

function ifHaveHamichlol(title,callback){
    fetch('http://www.hamichlol.org.il/w/index.php?title='+ encodeURIComponent(title) +'&action=raw').then(function(response) {
        callback(null,response.status == 200);
    });
}

function ifHaveWikipedia(title,callback){
    fetch('http://he.wikipedia.org/w/index.php?title='+ encodeURIComponent(title) +'&action=raw').then(function(response) {
        callback(null,response.status == 200);
    });
}

var functions = {};

functions['ifHaveHamichlol'] = function(request, sender, sendResponse){
    ifHaveHamichlol(request.title,function(err,have){
        sendResponse({err: err, have: have});
    });
};

functions['ifHaveWikipedia'] = function(request, sender, sendResponse){
    ifHaveWikipedia(request.title,function(err,have){
        sendResponse({err: err, have: have});
    });
};

functions['editInHamichlol'] = function(request, sender, sendResponse){
    fetch('http://he.wikipedia.org/w/index.php?title='+ encodeURIComponent(request.title) +'&action=raw').then(function(response) {
        if(response.status !== 200)
            return alert("error in wikipedia page status == " + response.status);
        
        response.text().then(function (responseText) {
            var $form = $("<form>");
                        
            $form.attr("target","_blank")
            .attr("action","http://www.hamichlol.org.il/w/index.php?title="+ encodeURIComponent(request.title) + "&action=submit")
            .attr("method","post");
            
            $("<input>").attr("type","hidden").attr("name","wpTextbox1").val(responseText + "\n\n{{ו}}").appendTo($form);
                        
            $form.appendTo($('body'));
            $form.submit();
            
            $form.remove();
            sendResponse({});
        });
    });
};


chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    if(functions[request.func]){
        functions[request.func](request, sender, sendResponse);
    }
});

