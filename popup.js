document.addEventListener("DOMContentLoaded", function(event) { 
	//בדיקת הרשאות משתמש
	var imported, multiImported
	$.get("http://www.hamichlol.org.il/w/api.php?action=query&meta=userinfo&uiprop=rights|hasmsg&format=json").then(function(data) {
		console.log(data.query.userinfo.rights)
		if (data.query.userinfo.rights.indexOf("import")>-1){
			imported=true
		}
		if (data.query.userinfo.rights.indexOf("importupload")>-1){
			multiImported=true
		}
	
		//הצגת הכפתורים הלוונטיים לויקיפדיה/המכלול
		var MichlolOrWiki
		chrome.tabs.query({	active: true, lastFocusedWindow: true}, function(array_of_Tabs) {
			var tab = array_of_Tabs[0];
			var url = tab.url;
			var MB = document.getElementsByClassName("michlol");
			if (url.indexOf("hamichlol")>-1){
				MichlolOrWiki="michlol"
				var MB = document.getElementsByClassName("michlol");
				var ALL = document.getElementsByClassName("mAndW");
				$(MB).css("display", "block");
				$(ALL).css("display", "block");
			} else if (url.indexOf("wikipedia")>-1){
				MichlolOrWiki="wikipedia"
				var MB = document.getElementsByClassName("wikipedia");
				var ALL = document.getElementsByClassName("mAndW");
				$(MB).css("display", "block");
				$(ALL).css("display", "block");
			} else{
					
			}
		});



		
		//בדיקת מילים חשודות
		$("#chekWords").click(function(){
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				if(tabs.length == 0){ 
					console.log("could not send mesage to current tab");
				}else{
					chrome.tabs.sendMessage(tabs[0].id, {greeting: "chekWords"}, function(response) {
					});
				}
			});
		});

		//בדיקה בקישורי ויקיפדיה אילו מהם אדומים במכלול
		$("#chechLinksInWikipedia").click(function(){
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs1) {
				if(tabs1.length == 0){ 
					console.log("could not send mesage to current tab");
				}else{
					chrome.tabs.sendMessage(tabs1[0].id, {greeting: "chechLinks"}, function(response) {
					});
				}
			});
		});
			
		//בדיקה אלו מהקישורים האדומים במכלול קיימים בוויקיפדיה
		$("#chechLinksInMichlol").click(function(){
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs3) {
				if(tabs3.length == 0){ 
					console.log("could not send mesage to current tab");
				}else{
					chrome.tabs.sendMessage(tabs3[0].id, {greeting: "chechLinks"}, function(response) {
					});
				}
			});
		});	
		
		//רשימת הקישורים האדומים בדף
		$("#redLinks").click(function(){
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs4) {
				if(tabs4.length == 0){ 
					console.log("could not send mesage to current tab");
				}else{
					chrome.tabs.sendMessage(tabs4[0].id, {greeting: "redLinks"}, function(response) {
					});
				}
			});
		});	
		
		//ערוך את הערך הנוכחי במכלול
		$("#editInMichlol").click(function(){

			var pageTitle
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs2) {
				chrome.tabs.sendMessage(tabs2[0].id, {greeting: "pageTitleOfWikipedia"}, function(response) {
					pageTitle = response.farewell
					chrome.extension.sendRequest({func:"editInHamichlol",title: pageTitle }, function(response) {});
				});
			});	
		
		});


		//יבוא דף לפי בקשה - מוויקיפדיה
		$("#importToMichlol").click(function(){
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs2) {
				chrome.tabs.sendMessage(tabs2[0].id, {greeting: "ImportByInputBox", wikipediaOrHamichlol: "wikipedia"}, function(response) {
				});
			});	
		})

		
		//יבוא דף לפי בקשה - מהמכלול
		$("#importToMichlolInMihlol").click(function(){
			if (imported==true){
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs2) {
					chrome.tabs.sendMessage(tabs2[0].id, {greeting: "ImportByInputBox", wikipediaOrHamichlol: "hamichlol"}, function(response) {
					});
				});	
			}else{
				alert("אין לך הרשאת מייבא")
			}
		})

		//ייבוא כמותי
		$("#multiImport").click(function(){
			if (multiImported==true){
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs2) {
					chrome.tabs.sendMessage(tabs2[0].id, {greeting: "multiImport", wikipediaOrHamichlol: "hamichlol"}, function(response) {
					});
				});	
			}else{
				alert("אין לך הרשאת מייבא כמותי")
			}
		})

	
		//ייבוא הערך הנוכחי
		$("#importThisToMichlol").click(function(){
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs2) {
				chrome.tabs.sendMessage(tabs2[0].id, {greeting: "importThisPage"}, function(response) {
				});
			});			
		});
		
		function sendCommand(data){
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs2) {
				chrome.tabs.sendMessage(tabs2[0].id, data, function(response) {
				});
			});		
		}
		
		
		//הצג סרגל
		$("#toolbar").click(function(){
			var newState = (localStorage.isSargelVisible == "false");
			localStorage.isSargelVisible = newState
		//	sendCommand({greeting: "toolbar", stateToolbar: newState});		
		});
	
		if (localStorage.getItem("isSargelVisible") === null) {
			localStorage.isSargelVisible = true;
		}
	//	sendCommand({greeting: "toolbar", stateToolbar: localStorage.isSargelVisible});
	})
});


