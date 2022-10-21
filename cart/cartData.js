import { producList } from "../Category/All products/productsList.js";
import { template } from "./cartTemp.js";
import { renderCart, renderCountHolder } from "./cart.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
function log(val) {
  console.log(val);
}

window.addEventListener("load", () => {
  document.body.addEventListener("click", (e) => {
    const poiter = e.target;
    const arrCart = JSON.parse(localStorage.getItem("dataCart")) || [];
    if (poiter.className.match("btn-add-cart")) {
      const name = $(".product-tilte").textContent;
      const amout = parseInt($(".text-mount").value);
      let amount_cart = 0;
      if ($(".amount-cart")) {
        amount_cart = $(".amount-cart");
      }
      if (arrCart) {
        for (let item of arrCart) {
          if (item[0] === name) {
            item[3] = parseInt(item[3]) + amout;
            if (item[3] > 10) {
              item[3] = 10;

              alert("bạn đã mua vượt quá số lượng sản phẩm có sẵn");
              renderCart();
              renderCountHolder();
            }
            localStorage.setItem("dataCart", JSON.stringify(arrCart));
            renderCart();
            renderCountHolder();
            return;
          }
        }
      }
      const price_sale = $(".price-sale").textContent;
      const price_curent = $(".price-curent").textContent;
      const image = $(".image-wrapper img").src;
      const array = [name, price_sale, price_curent, amout, image];
      arrCart.push(array);
      localStorage.setItem("dataCart", JSON.stringify(arrCart));
      renderCart();
      renderCountHolder();
    }
  });
});
