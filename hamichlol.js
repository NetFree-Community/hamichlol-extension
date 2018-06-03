

chrome.extension.sendRequest({ func: "getOptions" }, function (response) {
	if (response.options.markPageInWikipedia) {
		$(CheckIfLinksfromWikipedia);
	}
});

function CheckIfLinksfromWikipedia() {

	$("#mw-content-text a.new").each(function () {
		var a = this;
		var $this = $(a);
		var href = $this.attr('href');
		if (!href) return;

		var title = false;
		try {
			title = (new URL(href, window.location.origin)).searchParams.get('title');
		} catch (e) { };
		if (!title) return;
		if (title.indexOf(":") != -1) return;

		if(a._checkWikipedia) return;
		a._checkWikipedia = true;

		chrome.extension.sendRequest({ func: "ifHaveWikipedia", title: title }, function (response) {
			if (response.have) {
				var $a = $("<a>")
					.attr("href","https://he.wikipedia.org/wiki/" + encodeURIComponent(title) )
					.attr("target","_blank")
					.text("W")
					.addClass("ex-michlol-link-wiki");
					
					$this.after($a);
			}
		});

	});

};

