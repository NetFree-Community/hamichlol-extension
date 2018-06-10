


    var listClassification = [
        {
            name: "כפירה",
            list: ["כפירה ברוחניות", "כפירה בתורה", "כפירה בעיקר", "ביקורת המקרא", "מעשה בראשית", "פילוסופיה"]
        },
        {
            name: "קדושת התורה",
            list: ["רדוקצית הדת", "להבדיל", "סמכות התורה", "בלעדיות האורתודוקסיה", "כבוד תח", "סמכות ההלכה", "ציונות"]
        },
        {
            name: "דתות",
            list: ["נצרות", "איסלאם", "דתות אחרות", "מיתולוגיה"]
        },
        {
            name: "תרבות",
            list: ["תרבות ובידור","ספורט", "אלימות"]
        },
        {
           name: "צניעות",
           list: ["צניעות", "צניעות/נוער", "תועבה/גאווה"]
        },
        {
            name: "תיארוך",
            list: ["ראשית היקום", "ראשית העולם", "פרהיסטוריה", "שחר ההיסטוריה", "לפנהס"]
        },
    ];


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

function selectClass(item){

    return new Promise(function(resolve, reject) {
        var $div = $("<div>");
        
        $div.addClass("ex-main-select-class");

        var $close = $("<span>");
        $close.addClass("ex-close").text("X").appendTo($div);

        $close.on("click",function(){
            $div.remove();
            reject();
        });

        var $list = $("<div>");

        $list.addClass("ex-list-class").appendTo($div);


        listClassification.forEach(function(mclass){
            mclass.list.forEach(function(sub){
                var $item = $("<span>");
                $item.addClass("ex-item-class").text(mclass.name + " | " + sub).appendTo($list);

                $item.on('click',function(){
                    item.args.text = "{{" + ["דף לטיפול","סיווג=" + mclass.name , "סיווג משנה=" + sub].join("|") + "}}"
                    $div.remove();
                    resolve();
                });
            });
        });

        $div.appendTo("body");
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
                    args: {  
                        text: " {{דף לטיפול}}" , 
                        save: true ,
                        summary: "דף טיפול"
                    },
                    select: selectClass
                },
                {
                    text: "לא מתאים",
                    args: {  
                        text: "{{לא מתאים}}" ,
                        save: true ,
                        summary: "לא מתאים"
                    }
                }
            ];

            listButton.forEach((item)=>{
                var $but = $("<button>");

                $but
                    .text(item.text)
                    .addClass('ex-michlol-button')
                    .appendTo($bodyContent)
                    .on('click', () => {

                        (item.select ? item.select(item) : Promise.resolve()).then(() => {
                            return improtToHamichlol(item.args);
                        }).then(() => {
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