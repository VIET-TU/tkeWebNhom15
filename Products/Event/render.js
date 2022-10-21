import { producList } from "../../Category/All products/productsList.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
function log(val) {
  console.log(val);
}
const data = JSON.parse(localStorage.getItem("key1"));
if (!data[0]) {
  producList.map((i) => {
    if (i.name === data[1]) {
      data[0] = i.image;
      return;
    }
  });
}
$(".img-render").src = data[0];
$(".img-frist").src = data[0];
document.title = data[1];
$(".product-tilte").textContent = data[1];
if (data[2] !== "$undefined" && data[2]) {
  $(".price-sale").textContent = data[2];
  $(".price-curent").classList.add("active");
  $(".wrapper-onsale").style.display = "";
} else {
  $(".price-sale").textContent = "";
  $(".price-curent").classList.remove("active");
  $(".wrapper-onsale").style.display = "none";
}
$(".price-curent").textContent = data[3];

// render Related products
let arr_id = [100, 200];
log(arr_id);
let index = 1;
let id_ran = 0;
while (index <= 4) {
  do {
    id_ran = parseInt(Math.floor(Math.random() * 18) + 1);
  } while (arr_id.includes(id_ran));

  producList.forEach((item) => {
    if (item.id === id_ran) {
      if (
        item.name !== data[1] &&
        item.name !== "Sunglasses" &&
        item.name !== "Tisso Watch"
      ) {
        arr_id.push(item.id);
        index++;
        const temp = `<div class="page-item">
          <div class="wrap-onsale" style="display: ${item.sale ? "" : "none"}">
            <span class="onSale" >Sale!</span>
          </div>
          <a class="tap-link-product" data-index="1" href="./product.html">
          <img class="product-image" src="${
            item.image
          }" style="pointer-events: none;" alt="" />
          </a>
          <h2 class="tap-product-title">${item.name}</h2>
          <div class="wrap-sale">
            <span class="tap-price">
              <span class="price-amount price-pre price-sale" style="display: ${
                item.sale ? "" : "none"
              }">
                <span class="price-symbol">$${item.price_pre}</span>
              </span>
              <span class="price-amount price-cur ${item.sale ? "" : "active"}">
                <span class="price-symbol">$${item.price}</span>
              </span>
            </span>
          </div>
        </div>`;
        $(".tab__list").insertAdjacentHTML("beforeend", temp);
      }
    }
  });
}
