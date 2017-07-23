var tabUrlList = [
  "http://52.78.212.27:8080/woowa/main",
  "http://52.78.212.27:8080/woowa/course",
  "http://52.78.212.27:8080/woowa/soup",
  "http://52.78.212.27:8080/woowa/side",
  "http://52.78.212.27:8080/woowa/detail"
]

var tabUrlEvent = new Event("tabUrlEvent");
// window.dispatchEvent(tabUrlEvent)

var tabUrlObjectList = [];

var tabUrlData = {};

// a javascript helper function that triggers designated dom element when the data is loaded!!!
function loadTabUrlList(element, url) {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function() {
    var result = this.responseText;
    var data = JSON.parse(result);
    console.log(data);
    tabUrlData[String(url)] = data;
    element.dispatchEvent(tabUrlEvent);

  });
  oReq.open("GET", url);
  oReq.send();
}
