

function ifHaveHamichlol(title,random) {
	var link = 'http://www.hamichlol.org.il/w/index.php?title=' + encodeURIComponent(title) + '&action=raw';
	if(random) link += "&r=" + random;
	return fetch(link,{method: 'HEAD'}).then(function (response) {
		return response.status == 200;
	});
}

function ifHaveWikipedia(title,random) {
	var link = 'http://he.wikipedia.org/w/index.php?title=' + encodeURIComponent(title) + '&action=raw';
	if(random) link += "&r=" + random;
	return fetch(link,{method: 'HEAD'}).then(function (response) {
		return response.status == 200;
	});
}

var functions = {};

functions['ifHaveHamichlol'] = function (request, sender, sendResponse) {
	ifHaveHamichlol(request.title,request.random).then(function (have) {
		sendResponse({ have: have });
	});
};

functions['ifHaveWikipedia'] = function (request, sender, sendResponse) {
	ifHaveWikipedia(request.title,request.random).then(function (have) {
		sendResponse({ have: have });
	});
};

function getWikipediaText(title) {
	return fetch('http://he.wikipedia.org/w/index.php?title=' + encodeURIComponent(title) + '&action=raw').then(function (response) {
		if (response.status !== 200)
			return Promise.reject(new Error(`status code: ${response.status}`));

		return response.text();
	});
}

function getWikipediaTextAndInfo(title) {
	return fetch('https://he.wikipedia.org/w/api.php?action=parse&page=' + encodeURIComponent(title) + '&format=json&prop=wikitext|revid').then(response => {
		if (response.status !== 200)
			return Promise.reject(new Error(`Status code: ${response.status}`));

		return response.text();
	}).then(text => {

		var parse = JSON.parse(text);

		if(!parse || !parse.parse) return Promise.reject("empty response");

		if(parse.error) return Promise.reject(parse.error.info || parse.error);

		parse.parse.wikitext = parse.parse.wikitext["*"];
		// {"title":"","pageid":30975,"revid":23236311,"wikitext":""}
		return parse.parse;
	});
}


 

functions['improtToHamichlol'] = function (request, sender, sendResponse) {

	getWikipediaTextAndInfo(request.title)
	.then(i => i, err => request.text ? {} : Promise.reject(err)) // skip error on block page
	.then(pageInfo => {

		var $form = $("<form>");

		var actionUrl = "http://www.hamichlol.org.il/w/index.php?title=" + encodeURIComponent(request.title) + "&action=submit";

		$form
			.attr("target", request.open ? "_blank" : "import-iframe")
			.attr("action", actionUrl)
			.attr("enctype", "multipart/form-data")
			.attr("method", "post");

		if(pageInfo.revid && pageInfo.title){
			let rating = [
				"מיון ויקיפדיה",
				"דף=" + pageInfo.title,
				"גרסה=" + pageInfo.revid,
			];

			if(request.rating)
				rating.push("דרגה=" + request.rating);

			request.add = (request.add ? request.add + "\n" : "") + "{{" + rating.join("|") +  "}}";
		}

		var add = (request.add && "\n" + request.add) || "";
		var summary = request.summary || "ייבוא מוויקיפדיה העברית, ראה רשימת התורמים";
		var wikitext = (request.text || pageInfo.wikitext) + add;

		var params = [];
		params.push(["wpTextbox1", wikitext]);
		params.push(["wpSummary", summary]);
		params.push(["wpAntispam", ""]);

		params.push(["wpSection", ""]);
		params.push(["wpStarttime", ""]);
		params.push(["wpEdittime", ""]);
		params.push(["editRevId", ""]);
		params.push(["wpScrolltop", "0"]);
		params.push(["oldid", "0"]);
		params.push(["parentRevId", "0"]);
		params.push(["format", "text/x-wiki"]);
		params.push(["model", "wikitext"]);
		params.push(["mode", "preview"]);
		params.push(["wpUltimateParam", "1"]);

		if(request.open){
			params.push(["wpPreview", "תצוגה מקדימה"]);
		}else{
			params.push(["wpDiff", "הצגת שינויים"]);
		}
 
		params.forEach(item => {
			$("<input>").attr("type", "hidden").attr("name", item[0]).val(item[1]).appendTo($form);
		});

		if (request.open) {
			$form.appendTo($('body'));
			$form.submit();
			sendResponse({});
		} else {
			fetch(actionUrl, {
				method: 'POST',
				body: new FormData($form.get(0)),
				credentials: "include"
			}).then(function (response) {
				return response.text();
			}).then(function (text) {
				var $html = $(text);
				var $form = $html.find("#editform");

				return $form.length ? $form : Promise.reject(new Error("no have form"));
			}).then(function ($form) {
				var dataForm = new FormData($form.get(0));
				dataForm.append("wpSave", "שמירת הדף");

				return fetch(actionUrl, {
					method: 'POST',
					body: dataForm,
					credentials: "include"
				});
			}).then(function (response) {
				return response.text();
			}).then(function (text) {
				var $html = $(text);
				var title = $html.find("#firstHeading").text().trim();

				sendResponse({ title: title });
			}).catch(function (err) {
				sendResponse({ error: err });
			});
		}

		$form.remove();
	}, function (err) {
		alert(err);
	});
};


functions['compareWikipedia'] = function (request, sender, sendResponse) {

	getWikipediaTextAndInfo(request.title).then(function (pageInfo) {
		var $form = $("<form>");

		var actionUrl = "http://www.hamichlol.org.il/w/index.php?title=" + encodeURIComponent(request.title) + "&action=submit";

		$form
			.attr("target", request.open ? "_blank" : "import-iframe")
			.attr("action", actionUrl)
			.attr("enctype", "multipart/form-data")
			.attr("method", "post"); 

		var params = [];
		params.push(["wpTextbox1", pageInfo.wikitext]);
		params.push(["wpSummary", "עידכון מויקיפדיה גירסה" + " " + pageInfo.revid ]);
		params.push(["wpAntispam", ""]);

		params.push(["wpSection", ""]);
		params.push(["wpStarttime", ""]);
		params.push(["wpEdittime", ""]);
		params.push(["editRevId", ""]);
		params.push(["wpScrolltop", "0"]);
		params.push(["oldid", "0"]);
		params.push(["parentRevId", "0"]);
		params.push(["format", "text/x-wiki"]);
		params.push(["model", "wikitext"]);
		params.push(["mode", "preview"]);
		params.push(["wpUltimateParam", "1"]);
		params.push(["wpDiff", "הצגת שינויים"]);
 
		params.forEach(item => {
			$("<input>").attr("type", "hidden").attr("name", item[0]).val(item[1]).appendTo($form);
		});
 
		$form.appendTo($('body'));
		$form.submit();
		sendResponse({});
		 
		$form.remove();
	}, function (err) {
		alert(err);
	});
}; 




functions["getOptions"] = function (request, sender, sendResponse) {
	var options = {};
	try {
		options = JSON.parse(localStorage.getItem("options"));
	} catch (error) { }
	sendResponse({ options: options });
};


chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
	if (functions[request.func]) {
		functions[request.func](request, sender, sendResponse);
	}
});

