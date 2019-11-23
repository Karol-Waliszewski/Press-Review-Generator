// DOM
var $category = document.getElementById("category");
var $quantity = document.getElementById("quantity");
var $submit = document.getElementById("submit");

// Funtions
var updateLink = function() {
  let category;
  switch ($category.value) {
    case "country":
      category = "kraj/";
      break;
    case "world":
      category = "swiat/";
      break;
    default:
      category = "";
      break;
  }
  console.log(`${category}/${$quantity.value}`);
  $submit.setAttribute("href", `/generator/${category}${$quantity.value}`);
};

// Listeners
$category.addEventListener("change", updateLink);
$quantity.addEventListener("change", updateLink);

// Init
updateLink();
