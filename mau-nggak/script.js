function myFunction() {
  alert("I LOVE YOUU ❤️❤️ Bagi kontaknya dong... :)");
}

var button = document.querySelector("button");

button.addEventListener("click", function() {
  var changeTop = (Math.random() * ($(window).height() - $("button").height()));
  var changeLeft = (Math.random() * ($(window).width() - $("button").width()));
  $("button").css("margin-top", changeTop + "px");
  $("button").css("margin-left", changeLeft + "px");
});
