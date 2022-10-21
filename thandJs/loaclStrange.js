const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
function log(val) {
  console.log(val);
}

function renderproduct1(e) {
  const parent = e.target.parentNode;
  const title_prodcut = parent.querySelector(".product-title").textContent;
  const img = parent.querySelector(".product-image");
  let price_pre = parent.querySelector(".price-sale");
  price_pre = price_pre ? price_pre.textContent : "";
  const price_cur = parent.querySelector(".price-cur span").textContent;
  const array = [img.src, title_prodcut, price_pre, price_cur];
  localStorage.setItem("key1", JSON.stringify(array));
}
function renderproduct2(e) {
  const parent = e.target.parentNode;
  const title_prodcut = parent.querySelector(".product-title").textContent;
  const img = "";
  let price_pre = parent.querySelector(".price-sale");
  price_pre = price_pre ? price_pre.textContent : "";
  const price_cur = parent.querySelector(".price-cur span").textContent;
  const array = [img, title_prodcut, price_pre, price_cur];
  localStorage.setItem("key1", JSON.stringify(array));
}

window.addEventListener("load", () => {
  document.body.addEventListener("click", (e) => {
    const poiter = e.target;
    if (poiter.classList.contains("link-product")) {
      renderproduct1(e);
    } else if (poiter.className.match("link-productHome")) {
      renderproduct2(e);
    }
  });
});
