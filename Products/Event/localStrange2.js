const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
function log(val) {
  console.log(val);
}

window.addEventListener("load", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.className.match("tap-link-product")) {
      const parent = e.target.parentNode;
      const title_prodcut =
        parent.querySelector(".tap-product-title").textContent;
      const img = parent.querySelector(".tap-link-product img");
      const price_pre = parent.querySelector(".price-sale span").textContent;
      const price_cur = parent.querySelector(".price-cur span").textContent;
      const array = [img.src, title_prodcut, price_pre, price_cur];
      localStorage.setItem("key2", JSON.stringify(array));
    }
  });
});
