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

// a javascript helper function that triggers designated dom element when the data is loaded!!!
function loadTabUrlList(element, url) {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function() {
    var result = this.responseText;
    console.log(data);
    // element.dispatchEvent(tabUrlEvent);
  });
  oReq.open("GET", url);
  oReq.send();
}
