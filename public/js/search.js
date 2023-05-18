const searchHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();
  console.log(event);
  // Gather the data from the form elements on the page
  const searchForm = document.querySelector("#searchForm");
  const searchInput = document.querySelector("#search").value.trim();
  const searchSubmit = document.querySelector("#searchSubmit");
  console.log(searchInput);
  if (searchInput) {
    // Send the e-mail and password to the server
    // post to /login

    // Send the e-mail and password to the server
    // post to /login qithout fetch
    // post searchInput to /search backend

    console.log("Searching, redirecting...");
    console.log({ input: searchInput });
    let tempvalo = jQuery("#search").val();
    document.location.replace("/search/" + tempvalo);
  }
};
jQuery("#searchSubmit").on("click", function(){
  jQuery("#searchForm").submit();
});
document.querySelector("#searchForm").addEventListener("submit", searchHandler);
jQuery(document).ready(function ($) {
  $("#search2").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $(".resultbox .col").filter(function () {
      //$(".myhero").css("max-height", "300px");
      $(this).toggle($(this).data("name").toLowerCase().indexOf(value) > -1);
    });
  });
});


jQuery(document).ready(function($){
  if(window.location.pathname == "/checkout"){
  var whatafak = 0;
jQuery('tr[class*="prod-item-"').each(function(){
  let restafak = jQuery(this).find('td.rowPrice').text().toString();
  whatafak += parseFloat(restafak);
});
jQuery('th.totaled').text(whatafak);

  var whatafak2 = 0;
jQuery('tr[class*="prod-item-"').each(function(){
  let thenumber = 1;
  whatafak2 += parseFloat(thenumber);
});
jQuery('th.counted').text(whatafak2);
jQuery('span.badge.bg-primary.rounded-pill').text(whatafak2);
  }
  });