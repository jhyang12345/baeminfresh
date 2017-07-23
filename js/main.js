
document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");
  var dots = document.querySelectorAll(".slides_pagination a");
  var main_slides_lst = document.querySelectorAll(".main_slides_lst li");
  var slides_pagination = document.querySelector(".slides_pagination");
  var slides = main_slides_lst.length;
  // template holder
  var thumbnail_info = document.querySelector("#thumbnail_info");

  slides_pagination.addEventListener("click", function(event) {

    console.log("clicked!");
    if(event.target.nodeName === "A") {
        console.log(event.target.innerHTML);
        var index = parseInt(event.target.innerHTML);
        var hideElem;
        var showElem = main_slides_lst[index];
        for(var i = 0; i < main_slides_lst.length; ++i) {

          if(main_slides_lst[i].style.display != "none") {
            if(i == index) return;
            hideElem = main_slides_lst[i];
          }

          else {

          }
        }
        if(ref) cancelAnimationFrame(ref);

        requestAnimationFrame(fader.bind(window, hideElem, showElem, index));
        startAuto(right);
        makeWhite(index);
    }
  });

  var left = document.querySelector(".slides_prev");
  left.addEventListener("click", function(event) {
    var curIndex;
    for(var i = 0; i < main_slides_lst.length; ++i) {

      if(main_slides_lst[i].style.display != "none") {
          curIndex = i;
      }

    }
    var newIndex;
    if(curIndex == 0) newIndex = slides - 1;
    else newIndex = curIndex - 1;

    requestAnimationFrame(fader.bind(window, main_slides_lst[curIndex], main_slides_lst[newIndex], curIndex));
    startAuto(right);
    makeWhite(newIndex);
  });

  var right = document.querySelector(".slides_next");
  right.addEventListener("click", function(event) {
    var curIndex;
    for(var i = 0; i < main_slides_lst.length; ++i) {

      if(main_slides_lst[i].style.display != "none") {
          curIndex = i;
      }

    }
    var newIndex;
    if(curIndex == slides - 1) newIndex = 0;
    else newIndex = curIndex + 1;

    requestAnimationFrame(fader.bind(window, main_slides_lst[curIndex], main_slides_lst[newIndex], curIndex));
    startAuto(right);
    makeWhite(newIndex);
  });

  /*
  setTimeout(function() {
    right.click();
  }, 2000);
*/

  var rotate_holder_classes = ["main", "course", "soup", "side"];
  for(var i = 0; i < rotate_holder_classes.length; ++i) {
    var buffer = new SlideTab(rotate_holder_classes[i], tabUrlList[i]);
  }

}); // end of DOMContentLoaded



var hider = 1.0;
var shower = 0;

let ref;

var thumbNailList;

var rightEnd;
var leftStart = 0;

function fader(hideElem, showElem, index) {

  hider -= 0.03;
  shower += 0.03;
  showElem.style.zIndex = 51;
  hideElem.style.zIndex = 0;

  showElem.style.display = "block";

  hideElem.style.display = "none";
  hideElem.style.opacity = hider;
  showElem.style.opacity = shower;


  if(hider <= 0.0 || shower >= 1.0) {
    hider = 1.0;
    shower = 0.0;
    cancelAnimationFrame(ref);
    showElem.style.display = "block";
    hideElem.style.display = "none";
    showElem.style.zIndex = 50;

    return;
  }

  ref = requestAnimationFrame(fader.bind(window, hideElem, showElem, index));
}


function makeWhite(index) {
  var slides_pagination = document.querySelector(".slides_pagination");
  var dots = document.querySelectorAll(".slides_pagination a");
  for(var i = 0; i < dots.length; ++i) {
    if(index != i) dots[i].style.opacity = 0.3;
    else dots[index].style.opacity = 1.0;
  }

}

let auto;

function startAuto(elem) {
  if(auto) clearInterval(auto);
  auto = setInterval(function() {

  }, 4000);

}
