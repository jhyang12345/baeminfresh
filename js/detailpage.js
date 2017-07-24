class DetailPage {
  constructor(url, title) {
    this.url = url;
    console.log(url);
    this.title = title;
    this.content_holder = document.querySelector('.content');
    this.template_text = document.querySelector('.template_text').innerHTML;
    this.product_info = document.querySelector('.product_info');
    this.image_list = document.querySelector('.image_list');
    this.image_template = document.querySelector(".image_template").innerHTML;

    this.template = Handlebars.compile(this.template_text);
    this.imageTemplate = Handlebars.compile(this.image_template);
    this.init();
  }

  init() {
    this.content_holder.addEventListener('tabUrlEvent', function(event) {
      this.data = tabUrlData[this.url].data;
      this.data.title = this.title;
      this.data.price = this.data.prices[this.data.prices.length - 1];
      this.data.price = this.data.price.substr(0, this.data.price.length - 1);
      this.product_info.innerHTML = this.template(this.data);

      for(var i = 0; i < this.data.detail_section.length; ++i) {
        this.image_list.innerHTML += this.imageTemplate({src: this.data.detail_section[i]});
      }

      console.log(this.data.price);
    }.bind(this));
  }
}
