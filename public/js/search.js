// Search handler to be able to search for products by name
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
  var search = 0;
jQuery('tr[class*="prod-item-"').each(function(){
  let searchText = jQuery(this).find('td.rowPrice').text().toString();
  search += parseFloat(searchText);
});
jQuery('th.totaled').text(search);

  var search2 = 0;
jQuery('tr[class*="prod-item-"').each(function(){
  let search3 = 1;
  search2 += parseFloat(search3);
});
jQuery('th.counted').text(search2);
jQuery('span.badge.bg-primary.rounded-pill').text(search2);
  }
  });