var link = document.querySelector(".order-link");
var popup = document.querySelector(".modal-order");
var close = popup.querySelector(".modal-close");

link.addEventListener("click", function (evt) {
evt.preventDefault();
popup.classList.add("modal-show");
});

close.addEventListener("click", function (evt) {
evt.preventDefault();
popup.classList.remove("modal-show");
popup.classList.remove("modal-error");
});

