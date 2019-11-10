let $copy = document.getElementById("copy");
let $message = document.getElementById("generator-message");
let $content = document.getElementById("generator-message-content");
let $close = document.getElementById("generator-message-close");
let $background = document.getElementById("generator-message-background");

let copyToClipboard = function() {
  let $generator = document.getElementById("generator");
  navigator.clipboard
    .writeText($generator.value)
    .then(() => {
      $content.innerHTML = "Prasówka została skopiowana.";
      $message.classList.add("is-active");
    })
    .catch(err => {
      $content.innerHTML =
        "Wystąpił błąd podczas kopiowania. Proszę skopiuj prasówkę ręcznie.";
      $message.classList.add("is-active");
    });
};

let closeMessage = function() {
  $message.classList.remove("is-active");
};

$copy.addEventListener("click", copyToClipboard);
$close.addEventListener("click", closeMessage);
$background.addEventListener("click", closeMessage);
