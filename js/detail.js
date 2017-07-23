document.addEventListener("DOMContentLoaded", function(event) {

  var templatetext = document.querySelector(".template_text").innerHTML;
  var template = Handlebars.compile(templatetext);

  var url = window.location.href;

  var hash_code = getParameterByName('hash_code', url);
  console.log(hash_code);
  var title = getParameterByName('title', url).split("?")[0];
  var content_holder = document.querySelector(".content");
  loadTabUrlList(content_holder, baseurl + hash_code);

  var detailPage = new DetailPage(baseurl + hash_code, title);
  content_holder.addEventListener("tabUrlEvent", function(event) {

  });

}); // End of DOMContentLoaded

var baseurl = "http://52.78.212.27:8080/woowa/detail/"

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
