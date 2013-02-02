// +++++ Container: Global Vars +++++
var clockTimer;
// ----- End Container: Global Vars -----

// +++++ Container: Clock gadget functions +++++
function leadingZero(integer) {
    if (integer < 10) {
        return "0"+integer;
    } else {
        return ""+integer;
    }
}

function changeImage() {
    var url = document.getElementById("inputimage").value;
    document.getElementById("desktop").innerHTML = "<img src=\"" + url + "\" alt=\"Desktop Image\" title=\"My Image\" />";
}

function getFullTime() {
    var time = new Date();
    var suffix = "";
    var currentHour = time.getHours();
    if (currentHour == 12) {
        suffix = "pm";
    } else if (currentHour > 12) {
        currentHour -= 12;
        suffix = "pm";
    } else if (currentHour == 0) {
        currentHour = 12;
        suffix = "am";
    } else {
        suffix = "am";
    }
    var currentMinute = time.getMinutes();
    var currentSecond = time.getSeconds();
    var fullTime = currentHour + ":" + leadingZero(currentMinute) +
                   ":" + leadingZero(currentSecond) + " " + suffix;
    return fullTime;
}

function getFullDate() {
    var time = new Date();
    var weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday",
                    "Saturday"];
    var months = ["January","February","March","April","May","June","July","August",
                  "September","October","November","December"];
    var currentMonth = months[time.getMonth()];
    var currentDayOfWeek = weekDays[time.getDay()];
    var currentDay = time.getDate();
    var currentYear = time.getFullYear();
    var fullDate = currentDayOfWeek + " - " + currentMonth + " " + currentDay + ", " +
                   currentYear;
    return fullDate;
}

function showTime() {
    setElementContent("clocktime",getFullTime());
    setElementContent("clockdate",getFullDate());
    clockTimer = setTimeout("showTime()",500);
}
// ----- End Container: Clock gadget functions -----

// +++++ Container: HTML document management functions +++++
function setElementContent(id,newContent) {
    try {
        document.getElementById(id).innerHTML = newContent;
    } catch (error) {
        alert("Error: "+error.description+"\n\n"+
              "Trying to set the contents of HTML element with ID\n"+
              id+" but that ID doesn't exist.");
    }
}

function getElementContent(id) {
    return document.getElementById(id).innerHTML;
}
// ----- End Container: HTML document management functions -----

// +++++ Container: Search management functions +++++
function getSearchBoxName() {
    return document.getElementById("searchbox").name;
}

function getSearchFormName() {
    return document.getElementById("searchform").name;
}

function getQuery() {
    return document.forms[getSearchFormName()][getSearchBoxName()].value;
}

function setSearchFormAction(actionString) {
    document.getElementById("searchform").action = actionString;
}

function setSearchBoxName(nameString) {
    document.getElementById("searchbox").name = nameString;
}

function setQuery(query) {
    document.forms[getSearchFormName()][getSearchBoxName()].value = query;
}

function imFeelingLucky() {
    document.getElementById("imfeelinglucky").name = "btnI";
    document.forms[getSearchFormName()]["btnI"].value = "Search";
}
// ----- End Container: Search management functions -----

// +++++ Container: Parse search input and perform query function +++++
function parseSearchInput() {
var query = getQuery();
if (query.slice(0,3) === "WP ") { //Wikipedia search
    setSearchFormAction("http://en.wikipedia.org/w/index.php");
    setSearchBoxName("search");
    //Chop off the "WP " part.
    setQuery(query.slice(3));
} else if (query.slice(0,3) === "GI ") { //Google image search
    setSearchFormAction("http://www.google.com/images");
    setSearchBoxName("q");
    setQuery(query.slice(3));
} else if (query.slice(0,3) === "YT ") { //Youtube search
    setSearchFormAction("http://www.youtube.com/results");
    setSearchBoxName("search_query");
    setQuery(query.slice(3));
} else if (query.slice(0,3) === "GT ") { //Google translate text.
    setSearchFormAction("http://translate.google.com");
    setSearchBoxName("text");
    setQuery(query.slice(3));
} else if (query.slice(0,3) === "WT ") { //Wiktionary search
    setSearchFormAction("http://en.wiktionary.org/w/index.php");
    setSearchBoxName("search");
    setQuery(query.slice(3));
} else if (query.slice(0,3) === "DT ") { //Dictionary.com search
    setSearchFormAction("http://dictionary.reference.com/dic");
    setSearchBoxName("q");
    setQuery(query.slice(3));
} else if (query.slice(0,3) === "TH ") { //Dictionary.com Thesaurus search
    setSearchFormAction("http://thesaurus.com/the");
    setSearchBoxName("q");
    setQuery(query.slice(3));
} else if (query.slice(0,3) === "GN ") { //Google news search
    setSearchFormAction("http://news.google.com/news/search?pz=1&amp;cf=all&amp;ned=us&amp;hl=en");
    setSearchBoxName("q");
    setQuery(query.slice(3));
} else if (query.slice(0,3) === "TV ") { //TVTropes search
    setSearchFormAction("http://www.google.com/search");
    setSearchBoxName("q");
    setQuery(query.slice(3)+" site:http://tvtropes.org/pmwiki");
} else if (query.slice(0,4) === "CWS ") { //Chrome web store search
    setSearchFormAction("https://chrome.google.com/webstore/search");
    setSearchBoxName("q");
    setQuery(query.slice(4));
} else if (query.slice(0,4) === "IFL ") { //I'm feeling lucky search
    setSearchFormAction("http://www.google.com/search");
    setSearchBoxName("q");
    setQuery(query.slice(4));
    imFeelingLucky();
} else if (query.slice(0,3) === "GE ") {
    setSearchFormAction("https://www.google.com/search");
    setSearchBoxName("q");
    setQuery(query.slice(3));
} else if (query.slice(0,3) === "GM ") {
    setSearchFormAction("http://maps.google.com/maps");
    setSearchBoxName("q");
    setQuery(query.slice(3));
} else { //Google search.
    if (query.slice(0,2) === "G ") { //Leading G to ensure google search.
        setQuery(query.slice(2));
    }
    setSearchFormAction("http://www.google.com/search");
    setSearchBoxName("q"); //q is for query.
}
}
// ----- End Container: Parse search input and perform query function -----

// +++++ Container: Startup function +++++
function pageStartup() {
    showTime();
  document.getElementById("searchbox").focus();
}
