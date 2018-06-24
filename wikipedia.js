



    var listClassification = [
        {
            name: "כפירה",
            list: ["כפירה ברוחניות", "כפירה בתורה", "כפירה בעיקר", "ביקורת המק" + "רא", "מעשה בראשית", "פילוסופיה"]
        },
        {
            name: "קדושת התורה",
            list: ["רדוקצית הדת", "להבדיל", "סמכות התורה", "בלעדיות האורתודוקסיה", "כבוד תח", "סמכות ההלכה"]
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
           list: ["צניעות/ניבול פה", "צניעות/נוער", "צניעות/בעיה חמורה"]
        },
        {
            name: "תיארוך",
            list: ["ראשית היקום", "ראשית העולם", "פרהיסטוריה", "לפנהס"]
        },
    ];


var badwordRaw = '7b7bd793d7a320d79ed795d7aad790d79d7d7d0ad793d7a320d796d79420d79ed79bd799d79c20d790d7aa20d7a8d7a9d799d79ed7aa20d794d79ed799d79cd799d79d20d7a9d799d791d793d7a7d79520d7a2d79c20d799d793d79920d794d792d790d793d79227d7982022d791d793d799d7a7d7aa20d79ed799d79cd799d79d20d797d7a9d795d793d795d7aa2220285b5bd79ed793d799d79420d795d799d7a7d7993a4761646765742d617370656b6c61727961436865636b2e6a735d5d292e20d794d792d790d793d79227d79820d7a9d795d790d79120d790d7aa20d7a8d7a9d799d79ed7aa20d794d79ed799d79cd799d79d20d790d795d798d795d79ed798d799d7aa20d79ed793d7a320d796d7942e20d790d799d79f20d79cd791d7a6d7a220d7a9d795d79d20d7a2d7a8d799d79bd79420d791d793d7a320d796d7942c20d79ed79cd791d79320d794d795d7a1d7a4d7aa20d79ed799d79cd799d79d20d79cd7a8d7a9d799d79ed795d7aa20d794d7a7d799d799d79ed795d7aa2e20d794d79ed799d79cd799d79d20d7a6d7a8d799d79bd795d7aa20d79cd794d799d795d7aa20d79ed795d7a4d7a8d793d795d7aa20d791d7a1d799d79ed79f207c20d791d799d7a0d799d794d79d2c20d794d7a1d799d79ed79f20272727d79cd790272720d7a6d7a8d799d79a20d79cd794d795d7a4d799d7a220d79cd790d797d7a820d794d79ed799d79cd79420d794d790d797d7a8d795d7a0d79420d791d7a8d7a9d799d79ed7942e0a0a3d3dd790d793d795d79d20d79bd794d7943d3d0a3c646976207374796c653d226261636b67726f756e642d636f6c6f723a20236666353535353b2077696474683a203135253b206865696768743a20313570783b223e3c2f6469763e0a3c212d2d20202d2d3e0ad7a1d7a7d7a17cd79ed799d79f7cd796d7a0d7955bd7aa5d2a7cd796d795d7a05bd794d795d7aa5d7cd7a0d7a2d7a8d7aa20d79cd799d795d795d7997cd799d7a6d790d7a0d799d7aa7cd7a4d7a8d799d7a6d795d7aa7cd796d799d79ed7947cd799d797d7a1d79920d79ed799d79f7cd794d795d79ed7955bd7a1d7a7d7a1d795d790d79c5d2a7c5bd798d7a8d7a05d2ad7a1d7a7d7a1d795d790d79c7cd798d7a8d7a0d7a1d79227d7a0d793d7a87cd794d798d7a8d795d7a1d7a7d7a1d795d790d79c7cd79cd7a1d791d7995bd799d7aa5d2a7cd79ed799d7a05bd799d7955d2bd7aa7cd790d795d7a4d79920d79ed799d7a0d7997cd790d795d7a4d79f20d79ed799d7a0d7997cd790d7a7d79820d79ed799d7a0d7997cd7aad795d79bd79f20d79ed799d7a0d7997cd7a4d795d7a8d7a0d795d792d7a8d7a4d799d7947cd7a4d795d7a8d7a0d795d792d7a8d7a4d7997cd7975bd7955d2ad7a95bd7955d2ad7a45bd794d7a0d799d795d7aa5d2a7cd790d799d799d793d7a17cd7905bd7995d2ad791d7a820d79ed799d79f7cd7905bd7995d2ad791d7a85bd7995d2a205bd7945d2ad79ed799d79f7cd7905bd7955d2ad7a05bd7955d2ad7a17c5bd79ed79c5d2ad790d795d7a05bd79fd7a0d795d7aad799d79d5d2b7cd799d797d7a1d79920d790d794d791d7947cd7a8d795d79e5bd7a0d79f5d2b7cd7a25bd7995d2ad7a8d7955bd79ed799d79d5d2b7cd790d799d7a0d798d799d79ed7997c5bd79ed79c5d2bd794d7aad790d794d7917cd7a4d793d795d7a4d799d79c7cd794d7a8d79ed795d79f7cd7a45bd7995d2ad79cd792d7a97cd794d7a2d793d7a4d79420d79ed799d7a0d799d7aa7cd793d795d792d79ed7a05bd799d7aa5d2a7cd7a9d793d799d799d79d7cd793d792d793d792d79f7cd79ed790d794d7917c5bd79ed79cd7945d2ad7aad790d794d7917cd7a7d795d7a0d793d795d79d7cd790d79ed7a6d7a2d79920d79ed7a0d799d7a2d7947c285c737c5e295bd7955d2ad795d7a1d7aa7cd799d79cd7935bd799d79d5d2a20d79cd79020d797d795d7a7d7995bd799d79d5d2a7cd7915bd79fd7aa5d2b20d79cd79020d797d795d7a7d7995bd7aad799d799d79d5d2a7cd7a9d797d7a7d7a0d799d7aa7cd7a9d797d799d799d7a0d799d7aa0a3c212d2d20202d2d3e0a0a3d3dd790d793d795d79d20d791d794d799d7a83d3d0a3c646976207374796c653d226261636b67726f756e642d636f6c6f723a20236666636363633b2077696474683a203135253b206865696768743a20313570783b223e3c2f6469763e0a3c212d2d20202d2d3e0ad790d791d795d79cd795d7a6d7995bd794d795d7a0d7a8d799d7aa5d7cd791d7a8d799d7a8d794205bd7945d2ad798d791d7a2d799d7aa7cd794d7aad7a4d7aad797d795d7aa20d794d797d799d799d79d7cd79ed795d7a6d79020d794d797d799d799d79d7cd790d793d79d20d7a7d793d79ed795d79f7cd790d793d79d20d794d7a7d793d79ed795d79f7cd79e5bd7995d2ad79cd799d7955bd79fd7a0d7995d2a20d7a9d7a05bd799d79dd7945d7cd79e5bd7995dd79cd799d790d7a8d7935bd7995d2a20d7a9d7a05bd794d799d79d5d7c30303020d7a9d7a0d7947c30303020d7a9d7a05bd794d799d79d5d7cd790d79cd7a320d7a9d7a05bd794d799d79d5d7cd7a4d7a8d7945bd7995d2a5b5c73d794d7995d2ad7a1d798d795d7a8d7995bd794d799d79d5d2a7cd79cd7a4d7a0d79920d796d79ed7a05bd7995d2ad7a0d7957cd792d799d79c20d794d799d7a7d795d79d7cd791d799d7a7d795d7a8d7aa20d794d79ed7a7d7a8d7907cd7945bd799d7955d2ad7a6d7a8d795d7aa20d79bd793d795d7a820d794d790d7a8d7a57cd7945bd799d7955d2ad795d7a6d7a8d795d7aa20d794d799d7a7d795d79d7c2828d794d7a9d79cd799d7a9d7997cd794d7a8d791d799d7a2d7997cd794d797d79ed799d7a9d7997cd794d7a9d799d7a9d7997cd794d7a9d791d799d7a2d7997cd794d7a9d79ed799d7a0d7997cd794d7aad7a9d799d7a2d7997cd794d7a2d7a9d799d7a8d799292028d79cd7a4d7a0d79422d7a17cd79cd7a4d7a0d79920d794d7a1d7a4d799d7a8d79429290a3c212d2d20202d2d3e0a0a3d3dd799d7a8d795d7a73d3d0a3c646976207374796c653d226261636b67726f756e642d636f6c6f723a20233939666639393b2077696474683a203135253b206865696768743a20313570783b223e3c2f6469763e0a3c212d2d20202d2d3e0ad79cd794d79822d7917cd797d79320d79ed799d7a0d7997cd794d795d79ed795d7a4d795d791d799d7947cd7a1d799d7a8d795d7a17cd79ed797d795d7a520d79cd7a0d799d7a9d795d790d799d79f7cd7a0d799d7a9d795d790d799d79d20d7a4d7aad795d797d799d79d7cd7a0d799d7a9d795d790d799d79d20d792d790d799d79d7cd791d7aa20d79cd795d799d7947cd791d7aa20d79cd795d795d799d7940a3c212d2d20202d2d3e0a0a3d3dd79bd797d795d79c3d3d0a3c646976207374796c653d226261636b67726f756e642d636f6c6f723a20236363636366663b2077696474683a203135253b206865696768743a20313570783b223e3c2f6469763e0a3c212d2d20202d2d3e0ad790d799d7a9d795d7aa7cd799d7a9d795285c737c24297cd794d7a9d799d79cd795d7a920d794d7a7d793d795d7a97cd7925bd7995d2ad790d795d79cd795d7927cd790d7a95bd79bd79a5d5bd799d794d795d79d5d2a285c737c24297cd7a4d799d79f7cd79b5bd7955d2ad79720d792d791d7a8d7907cd794d796d7935bd7955d2ad795d792d795d7aa0a3c212d2d20202d2d3e0a0a3d3dd7a6d794d795d7913d3d0a3c646976207374796c653d226261636b67726f756e642d636f6c6f723a20236565656539393b2077696474683a203135253b206865696768743a20313570783b223e3c2f6469763e0a3c212d2d20202d2d3e0ad790d79cd795d794d799d79d7cd790d79cd795d794d7997cd790d79cd795d7947cd790d79cd794d799d79d7c285c737c5e29d799d794285c737c24297cd794d790d79c7cd794d790d79cd799d79d7cd790d79cd799d79d7cd799d794d795d7947cd79ed799d7aad795d79cd795d792d799d7947cd79ed7a9d7a4d79820d794d7a2d791d7a8d7997cd7a4d79920d794d7aad795d7a8d7947cd794d79cd79bd794205bd7945d2ad799d794d795d793d799d7aa7cd7a4d79920d794d7aad7a022d79a7cd7a4d79920d794d79ed7a1d795d7a4d7a820d791d7aad7a022d79a7cd7a4d79920d794d7aad79cd79ed795d7937cd7a4d79920d794d792d79ed7a8d7907cd7a4d79920d797d79622d79c7cd79ed799d7a1d798d7995bd799d79dd7a7d7945d2a7cd797d795d7a7205bd7945d2ad79ed7a7d7a8d790d7997cd79ed7a1d795d7a8d7aa205bd7945d2ad799d794d795d793d799d7aa7cd7975bd7955d2ad7a7d7a85bd7995d2a205bd7945d2ad79ed7a7d7a8d7907cd793d79ed795d7aa20d79ed7a7d7a8d790d799d7aa7cd7a1d793d7a8d7aa20d798d79c5bd795d7955dd799d796d799d7947c5bd7a1d7a8d798205d2ad7a7d795d79cd7a0d795d7a27cd790d7a7d7a8d7a0d799d79d0a3c212d2d20202d2d3e';

var badwordList = [];

(function(){
    
    badwordList = [];

    var list = decodeURIComponent(badwordRaw.replace(/.{2}/g,(all) => '%' + all));

    list = list.split("<!--  -->");

    badwordList.push({ regex: list[1] , color: "#ff5555" });
    badwordList.push({ regex: list[3] , color: "#ffcccc" });
    badwordList.push({ regex: list[5] , color: "#99ff99" });
    badwordList.push({ regex: list[7] , color: "#ccccff" });
    badwordList.push({ regex: list[9] , color: "#eeee99" });

})();


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

function markBadWords(){

    var allTextNodes = $('#bodyContent').find('*').contents().filter(function () {
        return this.nodeType === 3;
    });
    
    allTextNodes.each(function () {
        var ele = $(this);

        var oldText = ele.text();

        for (var badword of badwordList) {
            if(!badword._regex){
                badword._regex = new RegExp("(\\s|^)[בכלמשהו]*(" + badword.regex + ")", 'g');
            }

            var doreplace = false;
            var newText = oldText.replace(badword._regex, function (m) {
                doreplace = true;
                return '<span style="background-color: ' + badword.color + ';">' + m + '</span>';
            });
            if(doreplace){
                ele.replaceWith(newText);
                break;
            }
        }
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
                    args: {  
                        add: "{{וח}}",
                        save: true,
                        rating: "נקי"
                    }
                },
                {
                    text: "יבא וסנן",
                    args: {
                        add: "{{וח}}",
                        open: true ,
                        rating: "עבר סינון"
                    }
                },
                {
                    text: "דורש טיפול",
                    args: {  
                        text: "{{דף לטיפול}}" , 
                        save: true ,
                        summary: "דף טיפול"
                    },
                    select: selectClass,
                    addHead: true
                },
                {
                    text: "לא מתאים",
                    args: {  
                        text: "{{לא מתאים}}" ,
                        save: true ,
                        summary: "לא מתאים"
                    },
                    addHead: true
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

                if(item.addHead){
                    $but.clone().appendTo($("#firstHeading"));
                }
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

        if(response.options.markBadWords){
            markBadWords();
        }
    });
}); 