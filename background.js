

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

functions['createNewTab'] = function(request, sender, sendResponse){
		chrome.tabs.create({ url: request.newUrl});
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
            
            $("<input>").attr("type","hidden").attr("name","wpTextbox1").val(responseText + "\n\n{{וח}}").appendTo($form);
            $("<input>").attr("type","hidden").attr("name","wpSummary").val("ייבוא מוויקיפדיה העברית, ראה רשימת התורמים").appendTo($form);
                    
					
            $form.appendTo($('body'));
            $form.submit();
            
            $form.remove();
            sendResponse({});
        });
    });
};

function downloadPageString(thislink, callback){
	var URL = 'http://he.wikipedia.org/w/index.php?title='+ encodeURIComponent(thislink) +'&action=raw'
	$.get(URL ,function(data, status){
		Adata=data
		Astatus=status
        callback({data: data,status: status, titleLink: thislink});
	})
}

//ייבוא עם סינון מילים חשודות
function MultiImportWithFilter (data,sender, sendResponse){
	for (var num in data.titles) {
		var thislink = data.titles[num];
		downloadPageString(thislink , function(response){
			var pageString = response.data
			if (!checkIfHaveWords(pageString)){
				importPageToMichlol	({title: response.titleLink, summary: data.summary}, null, function(KKK){
					console.log(response.titleLink + "  יובא עם סטטוס: " + KKK.succeed	)
				});
				console.log("לא נמצאו מילים חשודות ב: " + response.titleLink)
			}else{
				console.log("נמצאו מילים חשודות ב: " + response.titleLink)
			}
		});
	};	
}

//בדיקה אם יש מילים חשודות או תמונות בדף מבוקש בוויקיפדיה
functions['checkAspeklaryaInPage'] = function(request, sender, sendResponse){
	var hasWords, hasPictures
	downloadPageString(request.title , function(response){
			var pageString = response.data
			if (!checkIfHaveWords(pageString)){
				console.log("לא נמצאו מילים חשודות ב: " + response.titleLink)
				hasWords = false
			}else{
				console.log("נמצאו מילים חשודות ב: " + response.titleLink)
				hasWords = true
			}
			
			if (pageString.indexOf("קובץ:")>-1 || pageString.indexOf("file:")>-1 || pageString.indexOf("תמונה:")>-1 || pageString.indexOf("גלריה")>-1 || pageString.indexOf("galery")>-1 || pageString.indexOf("מדיה")>-1){
				console.log("נמצאו תמונות  ב: " + response.titleLink)
				hasPictures = true
			}else{
				console.log("לא נמצאו תמונות ב: " + response.titleLink)
				hasPictures = false
			}
			
			sendResponse ({hasWords: hasWords, hasPictures: hasPictures});
		});	
};


//בדיקת הרשאות משתמש
functions['checkUserRights'] = function(request, sender, sendResponse){
	$.get("http://www.hamichlol.org.il/w/api.php?action=query&meta=userinfo&uiprop=rights|hasmsg&format=json").then(function(data) {
		var imported, multiImported
		console.log(data.query.userinfo.rights)
		if (data.query.userinfo.rights.indexOf("import")>-1){
			imported=true
			}
		if (data.query.userinfo.rights.indexOf("importupload")>-1){
		multiImported=true
		}
		sendResponse({imported: imported, multiImported: multiImported})
	})
};


function checkIfHaveWords (text){


	chrome.tabs.query({	active: true, lastFocusedWindow: true}, function(array_of_Tabs) {
		var tab = array_of_Tabs[0];
		var url = tab.url;
		if (url.indexOf("action")>-1){
			alert("לא ניתן להפעיל את בדיקת המילים החשודות בעריכת קוד מקור")
		} else if (url.indexOf("wikipedia")>-1){
			var words = [];

			for(var i = 0; i < words.length; i++){
				if(text.indexOf(words[i]) > -1){
					return true;
				}
			}
		}
	});



}

functions['downloadPageString'] = downloadPageString;
functions['MultiImportWithFilter'] = MultiImportWithFilter;
functions['importPageToMichlol'] = importPageToMichlol;



function importPageToMichlol (request, sender, sendResponse){
	var pageForImport = request.title
	if (pageForImport == "" || pageForImport == null) {
	}
	else{
		 var apiUrl = "http://www.hamichlol.org.il/w/api.php";
		 var onreadystatechange = function() {
			if ( 4 !== this.readyState ) return;
			if ( 200 === this.status ) {
			  console.log( this.response );
			}
		 };
		 function continueWithToken ( token ) {
			  var fd = new FormData();
			  var xhr = new XMLHttpRequest();
			  // First argument is an array!
			  var bXml = new Blob( [$( 'textarea' ).val()], {
						 type: 'text/xml'
					} );
			  fd.append( 'format', 'json' );
			  fd.append( 'action', 'import' );
			  // Third parameter is not required but
			  // You're likely on the safe side using it
			  fd.append( 'interwikisource', "wikipedia:he" );
			  fd.append( 'interwikipage', pageForImport);
			  // fd.append( 'fullhistory', "" );
			  fd.append( 'templates', 1 );
			  if (request.summary){
				  fd.append( 'summary', request.summary );
			  } else{
				  fd.append( 'summary', "ייבוא מוויקיפדיה העברית: ראה רשימת התורמים" );
			  }			  
			  fd.append( 'token', token );
		 
			  xhr.onreadystatechange = onreadystatechange;
			  xhr.open( 'POST', apiUrl );
			  xhr.send( fd );
		 }
		 
		 $.get( apiUrl, {
			  format: 'json',
			  type: 'import',
			  action: 'tokens'
		 } ).done( function(r) {
			  var token = r.tokens.importtoken;
			  continueWithToken( token );
		 } );
		 
	};	
sendResponse({succeed: "succeed"});
};


chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    if(functions[request.func]){
        functions[request.func](request, sender, sendResponse);
    }
});

