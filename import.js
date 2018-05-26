var imported, multiImported
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.greeting == "importThisPage"){
		importThisPage ()
	} else if (request.greeting == "ImportByInputBox"){
		ImportByInputBox (request.wikipediaOrHamichlol)
	}
});
 


//ייבוא הדף הנוכחי - להפעלה מוויקיפדיה
function importThisPage (){
	//בדיקת הרשאות משתמש
	chrome.extension.sendRequest({func:"checkUserRights"}, function(response) {
		if (response.imported==true){
			imported=true
			}
		if (response.multiImported==true){
		multiImported=true
		}
		var pageForImport = $("#firstHeading").text().trim();
		pageForImport=pageForImport.replace ("[","").replace ("]","").replace ("עריכה","").replace ("עריכת קוד מקור","").replace (" | ","");
		//ייבא ושכח, או ייבא וערוך, או ערוך במכלול
		dialogBox (pageForImport, "inportAndForget", "importAndEdit", "editOnly")		
	});
}

//ייבוא לפי בקשה
function ImportByInputBox (wikipediaOrHamichlol){
	//בדיקת הרשאות משתמש
	chrome.extension.sendRequest({func:"checkUserRights"}, function(response) {
		if (response.imported==true){
			imported=true
			}
		if (response.multiImported==true){
		multiImported=true
		}
		var pageForImport = prompt("מה שם הדף שברצונך לייבא?");
		if (wikipediaOrHamichlol=="wikipedia"){	
			dialogBox (pageForImport, "", "importAndEdit", "editOnly")
		}
		if (wikipediaOrHamichlol == "hamichlol"){
			if (imported==true){
				appendImport ("importAndEdit", pageForImport) //ייבא וערוך בלבד
			}else{
				alert("אין לך הרשאת מייבא")
			}
		}	
	})

}

//תיבת דו-שיח לצורך אפשרויות ייבוא
function dialogBox (pageForImport,inportAndForget,importAndEdit,editOnly){
	//תיבת דו-שיח
	$("<div>").attr ("id", "myModal").attr ("class", "modal").appendTo ("body");
	var MyDialogBox = $("#myModal")
	$(MyDialogBox).css ("display", "block");
	$("<div>").attr ("id", "modalContent").attr ("class", "modal-content").appendTo (MyDialogBox);
	$("<span>").attr ("id", "idClose").attr ("class", "close").text("x").appendTo ("#modalContent").on('click',function (){
		//חיסול תיבת הדו-שיח
		var elem = document.getElementById("myModal");
		elem.parentElement.removeChild(elem);
	});
	var dialogBoxContent = $("<div>")
	dialogBoxContent.attr ("class", "content")
	dialogBoxContent.attr ("id", "idContent")
	dialogBoxContent.appendTo ("#modalContent");	
	
	
	var inportAndForgetButton = $("<button>").css("margin", "5px").text("ייבא ושכח").on ("click", function(){appendImport("inportAndForget", pageForImport)})
	var importAndEditButton = $("<button>").css("margin", "5px").text("ייבא וערוך").on ("click", function(){appendImport("importAndEdit", pageForImport)})
	var editOnlyButton = $("<button>").css("margin", "5px").text("צור במכלול").on ("click", function(){appendImport("editOnly", pageForImport)})
	
	//בדיקה אם הערך חשוד
	var hasWords, hasPictures
	chrome.extension.sendRequest({func:"checkAspeklaryaInPage",title: pageForImport }, function(response) {
		if (response.hasWords == true){
			hasWords = true
		}else if(response.hasWords == false){
			hasWords = false
		}
		if (response.hasPictures == true){
			hasPictures = true
		}else if(response.hasPictures == false){
			hasPictures = false
		}
		var alertWords="",alertPictures=""
		if(hasWords==true){alertWords = '<p style="color:red">* בערך זה אותרו מילים החשודות כבעיתיות</p>'}
		if(hasPictures==true){alertPictures = '<p style="color:red">* בערך זה קיימות תמונות, יש לוודא כי הן אינן בלתי הולמות</p>'}
		if(hasWords==true || hasPictures==true ){
			$("<div><b>בדיקות אספקלריה</b></div>" + alertWords + alertPictures).appendTo(dialogBoxContent);
		}
	});

	
	if (inportAndForget=="inportAndForget"){
		if (imported==true){
			var inportAndForgetBox = $('<div style="; width:85%; border: 1px solid #f28500; border-radius:1em; background: #FEFEFE; margin: 15px; padding: 10px; text-align: center; font-size: 100%; clear: both;"><div style="color:#602000;padding: 5px;">שים לב, בלחיצה על "ייבא ושכח" הינך מאשר על אחריותך כי בדקת את הערך היטב, והוא כשר לחלוטין להיכנס למרחב המכלול.</div></div>')
			$(inportAndForgetButton).appendTo(inportAndForgetBox);
			inportAndForgetBox.appendTo(dialogBoxContent);			
		}

	}
	if (importAndEdit=="importAndEdit") {
		if (imported==true){
			var importAndEditBox = $('<div style="; width:85%; border: 1px solid #f28500; border-radius:1em; background: #FEFEFE; margin: 15px; padding: 10px; text-align: center; font-size: 100%; clear: both;"><div style="color:#602000;padding: 5px;">שים לב, בלחיצה על "ייבא וערוך" הערך ייובא למכלול, ואתה תועבר לדף הערך לשם המשך פיקוח ובקרה והתאמתו לאספקלריה התורנית של המכלול.</div></div>').appendTo(dialogBoxContent);
			$(importAndEditButton).appendTo(importAndEditBox);
		}
	}
	if (editOnly=="editOnly"){
		var editOnlyBox = $('<div style="; width:85%; border: 1px solid #f28500; border-radius:1em; background: #FEFEFE; margin: 15px; padding: 10px; text-align: center; font-size: 100%; clear: both;"><div style="color:#602000;padding: 5px;">בלחיצה על "ערוך במכלול" ייפתח חלון יצירת דף במכלול שיכיל את קוד המקור של הערך, אנא וודא כי הקוד מכיל קרדיט כראוי בתבנית ובתקציר עריכה ואז לחץ על שמור.<p style="font-size:85%;"><b>אין לעשות שינוי בקוד המקור של הערך לפני השמירה. אם ברצונך לערוך שינויים שמור את הערך ואז היכנס שוב למצב עריכה.</b></p></div></div>').appendTo(dialogBoxContent);
		$(editOnlyButton).appendTo(editOnlyBox);
	}
	
	$(MyDialogBox).append(MyDialogBox)
	
};


function appendImport (importType, pageForImport){
	if (importType == "inportAndForget"){
			//ייבוא
			if (pageForImport != null){
				chrome.extension.sendRequest({func:"ifHaveHamichlol",title: pageForImport }, function(response) {
					if (response.have != true){
						chrome.extension.sendRequest({func:"importPageToMichlol",title: pageForImport }, function(response) {
							alert ("הערך '" + pageForImport + "' יובא בהצלחה")
						});
					}else 	if (response.have = true){
						alert("הדף כבר קיים במכלול. אם ברצונך לייבא אותו שוב עשה זאת דרך הדף [[מיוחד:ייבוא]] ")
					}
				})
			}
	} else if (importType == "importAndEdit"){
			//ייבוא
			if (pageForImport != null){   //אם הוזן שם ערך
				chrome.extension.sendRequest({func:"ifHaveHamichlol",title: pageForImport }, function(response) {
					if (response.have != true){    //אם לא קיים במכלול
						chrome.extension.sendRequest({func:"checkAspeklaryaInPage",title: pageForImport }, function(response) {
						var alertWords="",alertPictures="", asplSummaryWords="",asplSummaryPictures=""
						if (response.hasWords == true){
							hasWords = true
							alertWords ="* בערך נמצאו מילים החשודות כבעיתיות"
							asplSummaryWords="מכיל מילים חשודות, "
						}else if(response.hasWords == false){
							hasWords = false
						}
						if (response.hasPictures == true){
							hasPictures = true
							alertPictures = "* בערך נמצאו תמונות, יש לוודא כי הן אינן בלתי הולמות"
							asplSummaryPictures ="מכיל תמונות, "
						}else if(response.hasPictures == false){
							hasPictures = false
						}
						var apkl = ""
						if(hasWords==true || hasPictures==true ){
							apkl = "\n לידיעתך! \n" + alertWords + "\n" + alertPictures + "\n"
						}
						chrome.extension.sendRequest({func:"importPageToMichlol",title: pageForImport, summary: "ייבוא מוויקיפדיה העברית: ראה רשימת התורמים. " + asplSummaryWords + asplSummaryPictures }, function(response) {
							alert ("הערך '" + pageForImport + "' יובא בהצלחה.\nכעת תועבר לדף הערך כדי לבצע בקרת אספקלריה תורנית." + "\n" + apkl + "\nשים לב!\nאין להשאיר במרחב הערכים ערך שלא עבר בקרה.")
							//פתיחה בכרטיסיה חדשה
							chrome.extension.sendRequest({func:"createNewTab",newUrl: "http://www.hamichlol.org.il/" + encodeURIComponent(pageForImport) }, function(response) {});
						});	
					});		
				
					}else 	if (response.have = true){   //אם כבר קיים במכלול
						alert("הדף כבר קיים במכלול. אם ברצונך לייבא אותו שוב עשה זאת דרך הדף [[מיוחד:ייבוא]] ")
					}
				})			
			}
	} else if (importType == "editOnly"){
		//יצירת/עריכת הדף במכלול
		if (pageForImport != null){
			chrome.extension.sendRequest({func:"ifHaveHamichlol",title: pageForImport }, function(response) {
				if (response.have != true){
					chrome.extension.sendRequest({func:"editInHamichlol",title: pageForImport }, function(response) {
					});
				}else 	if (response.have = true){
					alert("הדף כבר קיים במכלול.")
				}
			})
		}
	}
	//חיסול תיבת הדו-שיח
	var elem = document.getElementById("myModal");
	elem.parentElement.removeChild(elem);
};

