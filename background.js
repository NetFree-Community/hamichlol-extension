

function ifHaveHamichlol(title,random) {
	var link = 'http://www.hamichlol.org.il/w/index.php?title=' + encodeURIComponent(title) + '&action=raw';
	if(random) link += "&r=" + random;
	return fetch(link).then(function (response) {
		return response.status == 200;
	});
}

function ifHaveWikipedia(title,random) {
	var link = 'http://he.wikipedia.org/w/index.php?title=' + encodeURIComponent(title) + '&action=raw';
	if(random) link += "&r=" + random;
	return fetch(link).then(function (response) {
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


 

functions['improtToHamichlol'] = function (request, sender, sendResponse) {

	var textSrc = request.text ? Promise.resolve(request.text) : getWikipediaText(request.title);

	textSrc.then(function (pageText) {
		var $form = $("<form>");

		var actionUrl = "http://www.hamichlol.org.il/w/index.php?title=" + encodeURIComponent(request.title) + "&action=submit";

		$form
			.attr("target", request.open ? "_blank" : "import-iframe")
			.attr("action", actionUrl)
			.attr("enctype", "multipart/form-data")
			.attr("method", "post");

		var add = (request.add && "\n\n" + request.add) || "";
		var summary = request.summary || "ייבוא מוויקיפדיה העברית, ראה רשימת התורמים";


		var params = [];
		params.push(["wpTextbox1", pageText + add]);
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
		params.push(["wpPreview", "תצוגה מקדימה"]);
 
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

