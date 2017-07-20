
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

  /*
  var leftRotate = document.querySelector(".left_button");
  leftRotate.addEventListener("click", function(event) {
    var curList = document.querySelectorAll(".waiting_list .inner_rotate_holder");

    if(curList.length > 12) {

      for(var i = 0; i < 4; ++i) {
        console.log(curList);
        curList[0].parentElement.removeChild(curList[0]);
        console.log("Removed!");
        curList = document.querySelectorAll(".waiting_list .inner_rotate_holder");
        waitingListLeft = waitingListLeft + itemWidth;
        waiting_list.style.marginLeft = waitingListLeft + "px";

        rightEnd++;
        rightEnd = rightEnd % thumbNailList.length;

      }

    }

    beforeTransition(waiting_list, -1);

    sideTransition(waiting_list, waitingListLeft, waitingListLeft - itemWidth * 4, -1);

    waitingListLeft = waitingListLeft - itemWidth * 4;
    waiting_list.style.marginLeft = waitingListLeft + "px";

  });


  var rightRotate = document.querySelector(".right_button");
  rightRotate.addEventListener("click", function(event) {

    var curList = document.querySelectorAll(".waiting_list .inner_rotate_holder");


    if(curList.length > 12) {

      for(var i = 0; i < 4; ++i) {
        console.log(curList);
        curList[curList.length - 1].parentElement.removeChild(curList[curList.length - 1]);
        console.log("Removed!");
        curList = document.querySelectorAll(".waiting_list .inner_rotate_holder");

        leftStart = leftStart + thumbNailList.length - 1;
        leftStart = leftStart % thumbNailList.length;

      }

    }


    waitingListLeft = waitingListLeft - 4 * itemWidth;
    waiting_list.style.marginLeft = waitingListLeft + 'px';

    beforeTransition(waiting_list, 1);

    sideTransition(waiting_list, waitingListLeft, waitingListLeft + itemWidth * 4, 1);

    waitingListLeft = waitingListLeft + itemWidth * 4;

    waiting_list.style.marginLeft = waitingListLeft + "px";

  });

  */

  var rotate_holder_classes = ["main", "course", "soup", "side"];
  for(var i = 0; i < rotate_holder_classes.length; ++i) {
    var buffer = new SlideTab(rotate_holder_classes[i], tabUrlList[i]);
  }

}); // end of DOMContentLoaded

function beforeTransition(waiting_list, direction) {
  var count = 0;
  if(direction > 0) { //right use leftStart

    while(count < 4) {
      rightEnd = rightEnd % thumbNailList.length;

      waiting_list.innerHTML = thumbNailList[rightEnd].outerHTML + waiting_list.innerHTML;

      rightEnd--;
      rightEnd += thumbNailList.length;
      count++;
    }
  } else { //left use rightEnd
    while(count < 4) {
      leftStart = leftStart % thumbNailList.length;

      waiting_list.innerHTML = waiting_list.innerHTML + thumbNailList[leftStart].outerHTML;

      leftStart++;
      count++;
    }
  }
}

function sideTransition(waiting_list, currentLeft, objective, direction) {
  var buffer = currentLeft;
  if(direction < 0) { // left
    buffer = currentLeft - 30.0;
    if(buffer  < objective) {
      buffer = objective;

    }

  } else { // right
    buffer = currentLeft + 30.0;
    if(buffer > objective) {
      buffer = objective;

    }
  }
  waiting_list.style.marginLeft = buffer + "px";
  if(buffer == objective) {

    return;
  }
  requestAnimationFrame(sideTransition.bind(window, waiting_list, buffer, objective, direction));
}


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
