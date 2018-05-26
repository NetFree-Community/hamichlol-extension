chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.greeting == "multiImport"){
		multiImport ();	
	};
});

function multiImport(){

		 
	//function dialogBox (pageForImport,inportAndForget,importAndEdit,editOnly){
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
		
	
	var dialog = dialogBoxContent


	var dialogTitle = "<H2>ייבוא רשימת ערכים</H2>"
	var linksListTitle = "<H3>רשימת הערכים (עד 10 ערכים)</H3>"
	var multiImportBtn = '<button id="multiImportBtn" style="vertical-align:top; margin: 3px;">ייבא את כל הערכים ברשימה</button>'
	var MultiImportWithFilterBtn = '<button id="MultiImportWithFilterBtn" style="vertical-align:top; margin: 3px;">ייבא את כל הערכים ברשימה - לא כולל ערכים המכילים מילים חשודות</button>'
	var linksArea = '<textarea id="linksArea"  style="min-width:520px; height:200px; margin: 3px;">'  +"הזן כאן רשימת ערכים לייבוא. ניתן להיעזר ברשימת הקישורים האדומים (בתפריט. לחץ, וגלול למטה לראות את הרשימה.)"+ '</textarea>';
	var codeTitle = "<H3>קוד להעתקה לדף בקרת ייבוא</H3>" + 'לאחר ייבוא הערכים למכלול, ניתן ליצור דף לבקרה קלה על כל הערכים, יש להעתיק את הקוד ל<a href="http://www.hamichlol.org.il/%D7%9E%D7%99%D7%95%D7%97%D7%93:%D7%94%D7%93%D7%A3_%D7%A9%D7%9C%D7%99/%D7%90%D7%A8%D7%92%D7%96_%D7%97%D7%95%D7%9C" target="_blank">ארגז החול שלכם</a>:'
	var btnCode = '<p>  <button id="btnCode" style="vertical-align:top;">העתק ללוח</button></p>'
	var codelistArea = '<textarea id="codelistArea" readonly="readonly" style="min-width:520px; height:200px;">' + "__ללא_תוכן__"   + '</textarea>';
	
	var dialogHtml =  dialogTitle + linksListTitle + multiImportBtn + MultiImportWithFilterBtn +linksArea  + codeTitle + btnCode + codelistArea;

	$(dialog).append(dialogHtml);
	
	//הגבלת מספר שורות ואורך תווים בשורה בתיבת טקסט  

	$("#linksArea").keyup(function(){
		createControlCode(); //הוספת יצירת קוד בקקה
		limitTextarea(this,10,100)
	})

	function limitTextarea(textarea, maxLines, maxChar) {
		var lines = textarea.value.replace(/\r/g, '').split('\n'), lines_removed, char_removed, i;
		if (maxLines && lines.length > maxLines) {
			lines = lines.slice(0, maxLines);
			lines_removed = 1
		}
		if (maxChar) {
			i = lines.length;
			while (i-- > 0) if (lines[i].length > maxChar) {
				lines[i] = lines[i].slice(0, maxChar);
				char_removed = 1
			}
			if (char_removed || lines_removed) {
				textarea.value = lines.join('\n')
			}
		}
	}

	// יצירת קוד בקרה
	function createControlCode (){
		var linkslist="";
		var codelist = "";

		//קוד בקרת ייבוא מתוך רשימת הערכים בתיבה
		var textboxContent = $("#linksArea").val()
		var linkslistFromTb = textboxContent.split('\n')
		for (var num in linkslistFromTb) {
			var thislink = linkslistFromTb[num]
			if (linkslist.indexOf(thislink)>-1){
			}
			else{
				codelist = codelist + "{{בקרת ייבוא חדש|" + thislink  + "}}";
			};
		};
	
		$("#codelistArea").text(codelist)
	};

 
	//ייבוא הרשימה עם פילטר מילים חשודות
	var MultiImportWithFilterBtn = document.querySelector("#MultiImportWithFilterBtn")
	MultiImportWithFilterBtn.addEventListener('click', function(event) {
		var textBoxRows = $("#linksArea").val ()
		var splited=textBoxRows.split('\n')
		chrome.extension.sendRequest({func:"MultiImportWithFilter",titles: splited, summary: "ייבוא כמותי. " + "ייבוא מוויקיפדיה העברית, ראה רשימת התורמים"}, function(response) {
			alert("הפעולה הסתיימה. הטענת הדפים לשרת מתבצעת בהדרגה ועלולה להימשך זמן מה, בהתאם לכמות הערכים.")
		});
	})
	
	//ייבוא הרשימה בלי פילטר מילים חשודות
	var multiImportBtn = document.querySelector("#multiImportBtn")
	multiImportBtn.addEventListener('click', function(event) {
		var textBoxRows = $("#linksArea").val ()
		var splited=textBoxRows.split('\n')
		for (var num in splited){
			var thislink = splited[num]
			chrome.extension.sendRequest({func:"importPageToMichlol",title: thislink, summary: "ייבוא כמותי. " + "ייבוא מוויקיפדיה העברית, ראה רשימת התורמים" }, function(response) {
				console.log(response.titleLink + "  יובא עם סטטוס: " + response.succeed	)
			});
		}
		alert("הפעולה הסתיימה. הטענת הדפים לשרת מתבצעת בהדרגה ועלולה להימשך זמן מה, בהתאם לכמות הערכים.")
	})
 
	
	//העתקת קוד ללוח
	var copyTextareaBtn = document.querySelector('#btnCode');
	copyTextareaBtn.addEventListener('click', function(event) {
	var copyTextarea = document.querySelector('#codelistArea');
	  copyTextarea.select();

	  try {
		var successful = document.execCommand('copy');
		var msg = successful ? 'successful' : 'unsuccessful';
		alert('הטקסט הועתק ללוח');
	  } catch (err) {
		alert('העתקה ללוח נכשלה!');
	  }
	
	//העלאת תיבת הדו שיח
	$(MyDialogBox).append(MyDialogBox)
	
});

}




function checkIfHaveWords (text){
	var words = [];


	for(var i = 0; i < words.length; i++){
		if(text.indexOf(words[i]) > -1){
			return true;
		}
    }
}
