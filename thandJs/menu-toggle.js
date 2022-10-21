// const $ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);
function log(val) {
  console.log(val);
}
const menuToggle = document.querySelector(".menu-toggle-icon");
const menu = document.querySelector(".menu-toggle-navi");
const menu_toggle_list = document.querySelector(".menu-toggle-dropdow-list");
menuToggle.addEventListener("click", function () {
  menu.classList.toggle("is-show");
  menuToggle.classList.toggle("fa-bars");
  menuToggle.classList.toggle("fa-times");
});
const sub_nav = document.querySelector(".dropdow_nav");
sub_nav.addEventListener("click", () => {
  menu_toggle_list.classList.toggle("is-show2");
});
document.addEventListener("click", function (event) {
  if (
    !menu.contains(event.target) &&
    !event.target.matches(".menu-toggle-icon")
  ) {
    menu.classList.remove("is-show");
    menu_toggle_list.classList.remove("is-show2");
    menuToggle.classList.remove("fa-times");
    menuToggle.classList.add("fa-bars");
  }
});
