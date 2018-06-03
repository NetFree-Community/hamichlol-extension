

var random = Math.random() + "";

function CheckIfLinksfromHanichlol() {
    $("#mw-content-text a").each(function () {
        var a = this;
        var $this = $(a);
        var href = $this.attr('href');

        if (!href || !href.startsWith("/wiki/")) return;

        var title = $this.attr('title');
        if (!title) return;

        if (a._checkInHamichlol) return;
        a._checkInHamichlol = true;

        chrome.extension.sendRequest({ func: "ifHaveHamichlol", title: title , random: random }, function (response) {
            if (!response.have) {
                var $elm = $("<span>")
                    .text("M")
                    .addClass("ex-michlol-link");

                $this.after($elm)
            }
        });

    });
}


$(function () {

    var pageTitle = $("#firstHeading").text().trim();

    chrome.extension.sendRequest({ func: "ifHaveHamichlol", title: pageTitle , random: random }, function (response) {
        if(!response) return;
        if (response.have) {
            var $a = $('<a>');
            $a
                .attr("href",'http://www.hamichlol.org.il/' + encodeURIComponent(pageTitle))
                .attr("target","_blank")
				.text("צפה במכלול")
				.addClass("ex-michlol-link-to-michlol");
            
                $("#firstHeading").after($a);
        } else {

            $("#firstHeading").css('color', 'red');

            var $bodyContent = $("#bodyContent");

            var listButton = [
                {
                    text: "יבא ושכח",
                    args: {  add: "{{וח}}" , save: true }
                },
                {
                    text: "יבא וסנן",
                    args: {  add: "{{וח}}" , open: true }
                },
                {
                    text: "דורש טיפול",
                    args: {  add: " {{דף לטיפול|תרבות|ספורט}}" , save: true },
                    select: true
                },
                {
                    text: "לא מתאים",
                    args: {  text: "{{לא מתאים}}" , save: true }
                }
            ];

            listButton.forEach((item)=>{
                var $but = $("<button>");

                $but
                    .text(item.text)
                    .addClass('ex-michlol-button')
                    .appendTo($bodyContent)
                    .on('click', () => {
                        if(item.select){

                            return;
                        }

                        improtToHamichlol(item.args).then(()=>{
                            $but.addClass('done')
                        });
                    });

            });

            function improtToHamichlol(obj) 
            {
                
                obj.title = pageTitle;
                obj.func = "improtToHamichlol";

                return new Promise(function(resolve, reject) {
                    chrome.extension.sendRequest(obj, function (response) {
                        if(response.err)
                            return reject(response.err);
                        resolve();
                    });
                });
            }



        }
    });


    chrome.extension.sendRequest({ func: "getOptions" }, function (response) {
        if (response.options.markNotHavePageInHamichlol) {
            CheckIfLinksfromHanichlol();
        }
    });
}); 