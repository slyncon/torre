var searchBar = document.querySelector("#search");

searchBar.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.querySelector("form").submit();
  }
});