chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.greeting == "redLinks"){
		redLinksList ();	
	};
});




function redLinksList(){
		var mainList = new Array();
		var redLinksList = new Array();
		var count=0;
		var numberOfItems = document.getElementsByTagName("a").length;
		mainList=document.getElementsByTagName ("a");
		
		for(var i=0; i < numberOfItems; i++){
			var B = mainList[i].className;

			var A=document.getElementsByTagName ("a")[i];
			
			if (B=="new"){

			 var G = 	$(A).attr('title');
			 
			    var str = G;
				var pos = str.indexOf("(הדף אינו קיים)");
				var N = G.slice(0, pos-1);
				redLinksList[count]=N;
				count=count+1;
							 var Y = "YES";

			};
		  
		};
			
		var M="";
		for (var num in redLinksList) {
			var thislink = redLinksList[num]
			if (M.indexOf(thislink)>-1){
			}
			else{
				M= M + '\n' + thislink 
			};
		 };
		 //alert(M);
		 
		 
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
		
		$("<H3>רשימת קישורים אדומים בדף</H3>").appendTo(dialogBoxContent)
		$('<textarea id="linkslist" style="min-width:520px; height:200px;">' + M + '</textarea>').appendTo(dialogBoxContent)
	
	$(MyDialogBox).append(MyDialogBox)
	
//};
}