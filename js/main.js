
document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");

  var dots = document.querySelectorAll(".slides_pagination a");
  console.log(dots.length);

  var main_slides_lst = document.querySelectorAll(".main_slides_lst li");
  console.log(main_slides_lst.length);

  var slides_pagination = document.querySelector(".slides_pagination");

  var slides = main_slides_lst.length;

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

  var waiting_list = document.querySelector(".waiting_list");
  waiting_list.innerHTML = thumbnail_info.innerHTML;
  thumbNailList = document.querySelectorAll(".waiting_list .inner_rotate_holder");

  // initializing rightEnd when the number of thumbNailLists are given!!!
  rightEnd = thumbNailList.length - 1;

  // grabbing the rotate_holder to make visible after initial widths are calculated
  var rotate_holder = document.querySelector(".rotate_holder");

  // grabbing the view_window to choose its width
  var view_window = document.querySelector(".view_window");

  // getting the computed style width of a single inner_holder
  var inner_holder = document.querySelector(".inner_rotate_holder");
  var style = window.getComputedStyle(inner_holder, null);
  var pxIndex = style.width.indexOf("px");
  var itemWidth = parseFloat(style.width.substr(0, style.width.length-2));

  view_window.style.width = (itemWidth * 4) + "px";

  rotate_holder.style.visibility = "visible";

  waitingListLeft = - (itemWidth * 3);
  waiting_list.style.marginLeft = waitingListLeft + "px";


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

});

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

var rotateIndex = 3;
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
