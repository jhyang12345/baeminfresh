class SlideTab {
  constructor(name, url) {
    this.class = name;
    this.format = document.querySelector("#thumbnail_info");
    this.parent = document.querySelector("." + name);
    this.url = url;
    console.log(this.parent);

    this.init();
    this.addListeners();
  }

  templateMaker() {

    var templatetext = this.format.innerHTML;
    var template = Handlebars.compile(templatetext);

    return template;

  }

  init() {
    this.waiting_list = this.parent.querySelector(".waiting_list");
    //complete list
    this.thumbNailList = this.parent.querySelectorAll(".inner_rotate_holder");
    this.rightEnd = this.thumbNailList.length - 1;
    this.leftStart = 0;

    var rotate_holder = this.parent;

    this.view_window = this.parent.querySelector(".view_window");

    //making a template
    var template = this.templateMaker();
    this.template = this.templateMaker();

    this.waiting_list.innerHTML = template({title: "Hi", src: "https://cdn.bmf.kr/_data/product/H2BDC/2f86b4a25087b212615edac616e0f811.jpg"});


    this.inner_holder = this.parent.querySelector(".inner_rotate_holder");
    this.style = window.getComputedStyle(this.inner_holder, null);

    this.itemWidth = parseFloat(this.style.width.substr(0, this.style.width.length-2));

    this.view_window.style.width = (this.itemWidth * 4) + "px";

    // make rotate_holder visible after initial load
    rotate_holder.style.visibility = "visible";

    this.waitingListLeft = - (this.itemWidth * 0);
    this.waiting_list.style.marginLeft = this.waitingListLeft + "px";

    this.waiting_list.innerHTML = "";

    console.log("Initialized!!");

    loadTabUrlList(this.parent, this.url);

    this.parent.addEventListener("tabUrlEvent", function(event) {
      var items = tabUrlData[this.url];
      for(var i = 0; i < items.length; ++i) {

        this.waiting_list.innerHTML += template({title: i + 1, image: items[i].image,
        alt: items[i].alt});
      }

      // item list initialized
      this.item_list = this.waiting_list.querySelectorAll(".inner_rotate_holder");
      console.log(this.item_list.length);
      this.rightEnd = this.item_list.length - 1;

    }.bind(this));

  }

  addListeners() {
    var root = this.parent;
    var leftRotate = root.querySelector(".left_button");
    var waiting_list = root.querySelector(".waiting_list");

    leftRotate.addEventListener("click", function(event) {
      console.log("Left!");

      var curList = root.querySelectorAll(".waiting_list .inner_rotate_holder");

      if(curList.length > 12) {

        for(var i = 0; i < 4; ++i) {
          console.log(curList);
          curList[0].parentElement.removeChild(curList[0]);
          console.log("Removed!");
          curList = root.querySelectorAll(".waiting_list .inner_rotate_holder");
          this.waitingListLeft = this.waitingListLeft + this.itemWidth;
          waiting_list.style.marginLeft = this.waitingListLeft + "px";

          this.rightEnd++;
          this.rightEnd = this.rightEnd % thumbNailList.length;

        }

      }

      this.beforeTransition(waiting_list, -1);

      this.sideTransition(waiting_list, this.waitingListLeft, this.waitingListLeft - this.itemWidth * 4, -1);

      this.waitingListLeft = this.waitingListLeft - this.itemWidth * 4;
      waiting_list.style.marginLeft = this.waitingListLeft + "px";

    }.bind(this));



    var rightRotate = root.querySelector(".right_button");
    rightRotate.addEventListener("click", function(event) {
      console.log("Right!");

      var thumbNailList = this.item_list;

      var curList = root.querySelectorAll(".waiting_list .inner_rotate_holder");
      console.log(thumbNailList);

      if(curList.length > 12) {

        for(var i = 0; i < 4; ++i) {
          console.log(curList);
          curList[curList.length - 1].parentElement.removeChild(curList[curList.length - 1]);
          console.log("Removed!");
          curList = root.querySelectorAll(".waiting_list .inner_rotate_holder");

          this.leftStart = this.leftStart + thumbNailList.length - 1;
          this.leftStart = leftStart % thumbNailList.length;

        }

      }


      this.waitingListLeft = this.waitingListLeft - 4 * this.itemWidth;
      waiting_list.style.marginLeft = this.waitingListLeft + 'px';

      //this.beforeTransition.bind(this, waiting_list, 1);
      this.beforeTransition(waiting_list, 1);

      this.sideTransition(waiting_list, this.waitingListLeft, this.waitingListLeft + this.itemWidth * 4, 1);

      this.waitingListLeft = this.waitingListLeft + this.itemWidth * 4;

      waiting_list.style.marginLeft = this.waitingListLeft + "px";

    }.bind(this));


  }

  beforeTransition(waiting_list, direction) {
    var thumbNailList = this.item_list;
    console.log(this.item_list);
    console.log(this.url);

    var items = tabUrlData[this.url];
    console.log(items);

    console.log(this.rightEnd);
    var count = 0;
    if(direction > 0) { //right use leftStart

      while(count < 4) {
        this.rightEnd = this.rightEnd % thumbNailList.length;

        var template = this.templateMaker();

        var inserter = template(items[this.rightEnd]);

        waiting_list.innerHTML = inserter + waiting_list.innerHTML;

        this.rightEnd--;
        this.rightEnd += thumbNailList.length;
        count++;
      }
    } else { //left use rightEnd
      while(count < 4) {
        this.leftStart = this.leftStart % thumbNailList.length;

        var template = this.templateMaker();

        var inserter = template(items[this.leftStart]);


        waiting_list.innerHTML = waiting_list.innerHTML + inserter;

        this.leftStart++;
        count++;
      }
    }
  }

  sideTransition(waiting_list, currentLeft, objective, direction) {
    var thumbNailList = this.item_list;

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
    requestAnimationFrame(this.sideTransition.bind(window, waiting_list, buffer, objective, direction));
  }


}
