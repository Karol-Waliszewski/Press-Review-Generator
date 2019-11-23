// DOM
var $category = document.getElementById("category");
var $quantity = document.getElementById("quantity");
var $submit = document.getElementById("submit");

// Variables
var limit = limits.both;

// Funtions
var updateLimit = function() {
  limit = limits[$category.value];
  $quantity.setAttribute("max", limit);
};

var validateQuantity = function() {
  if ($quantity.value <= 0) {
    $quantity.value = 1;
  } else if ($quantity.value > limit) {
    $quantity.value = limit;
  }
  return $quantity.value;
};

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
  $submit.setAttribute("href", "/generator/" + category + $quantity.value);
};

// Listeners
$category.addEventListener("change", function() {
  updateLimit();
  validateQuantity();
  updateLink();
});
$quantity.addEventListener("change", function() {
  validateQuantity();
  updateLink();
});

// Init
updateLink();
