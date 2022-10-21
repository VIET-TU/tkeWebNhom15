import { producList } from "../Category/All products/productsList.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
function log(val) {
  console.log(val);
}
function renderCartZero() {
  const arrCart = JSON.parse(localStorage.getItem("dataCart")) || [];
  renderCountLocal();
  if (arrCart.length) {
    $(".cart-zezo").style.display = "none";
    $(".summary-button").style.display = "";
    $(".list-pageform-cart").style.display = "block";
    $(".count-cart").style.display = "";
    if (arrCart.length > 1) {
      $(".count-cart").textContent = `${arrCart.length} products`;
    } else {
      $(".count-cart").textContent = "1 product";
    }
    $(".table-cart").textContent = "";
    let total_order = 0;
    arrCart.forEach((i) => {
      const amount = parseInt(i[2].trim().slice(1)) * parseInt(i[3]);
      total_order += amount;
      const temp = `<div class="media-line-item">
      <div class="item-left ">
        <div class="item-img">
        <img src="${i[4]}" alt="" />
        </div>
      </div>
      <div class="item-middle">
        <h3 class="item-title">
          <a href="#"><span class="cart-title">${i[0]}</span></a>
        </h3>
        <div class="item-price">
          <span class="price-sale" style="${i[1] ? "" : "display: none"}">
            <span>${i[1]}</span>
          </span>
          <span class="price-cur">
            <span>${i[2]}</span>
          </span>
        </div>
      </div>
      <div class="item-right">
        <div class="item-total-price">
          <span>$${processed_3_number(amount)}.00</span>
        </div>
        <div class="item-qty">
          <div class="quantity-selector">
            <div class="btn_cart-minus button-minus">
              <i class="" aria-hidden="true">-</i>
            </div>
            <input
              type="text"
              value="${i[3]}"
              min="1"
              max="10"
              style="pointer-events: none"
              class="amount-cart"
            />
            <div class="btn_cart-plus button-plus">
              <i class="" aria-hidden="true">+</i>
            </div>
          </div>
        </div>
      </div>
      <div class="item-trash">
        <i style="pointer-events: none" class="fa fa-trash" aria-hidden="true"></i>
      </div>`;
      $(".table-cart").insertAdjacentHTML("beforeend", temp);
      $(".total-order").textContent = `${processed_3_number(
        total_order
      )}.00 USD`;
    });
  } else {
    $(".list-pageform-cart").style.display = "none";
    $(".count-cart").style.display = "none";
    $(".cart-zezo").style.display = "block";
    $(".summary-button").style.display = "none";
  }
}
function processed_3_number(price) {
  price = `${price}`;
  let length = price.length;
  let length_price;
  length_price = parseInt(price.length / 3);
  if (!(length % 3)) length_price -= 1;
  let distance = 3;
  for (let i = 1; i <= length_price; i++) {
    price =
      price.slice(0, length - distance) +
      "," +
      price.slice(length - distance, length + length_price);
    distance += 3;
  }
  return price;
}
function render_total_order() {
  const arrCart = JSON.parse(localStorage.getItem("dataCart")) || 0;
  let total_order = 0;
  if (arrCart) {
    arrCart.forEach((i) => {
      total_order = parseInt(i[2].trim().slice(1)) * parseInt(i[3]);
    });
  }
  $(".total-order").textContent = `${processed_3_number(total_order)}.00 USD`;
}
function find_name_cart(name, val) {
  let arrCart = JSON.parse(localStorage.getItem("dataCart")) || [];
  arrCart.forEach((i) => {
    if (i[0] === name) {
      i[3] = val;
    }
  });
  return arrCart;
}
let media_lineItem;
let table_cart;
let name_trash;
window.addEventListener("load", function () {
  renderCartZero();
  this.document.body.addEventListener("click", function (e) {
    const poiter = e.target;
    let select = e.target.dataset.select || "";
    let val_input;
    if (poiter.className.match("btn_cart-minus")) {
      const media_lineItem = poiter.parentNode.parentNode.parentNode.parentNode;
      const name = media_lineItem
        .querySelector(".item-title a")
        .textContent.trim();
      val_input = media_lineItem.querySelector(".amount-cart");
      if (val_input.value == 1) return;
      val_input.value = parseInt(val_input.value) - 1;
      const arrCart = find_name_cart(name, val_input.value);
      localStorage.setItem("dataCart", JSON.stringify(arrCart));
      renderCartZero();
    } else if (poiter.className.match("btn_cart-plus")) {
      const media_lineItem = poiter.parentNode.parentNode.parentNode.parentNode;
      const name = media_lineItem
        .querySelector(".item-title a")
        .textContent.trim();
      val_input = media_lineItem.querySelector(".amount-cart");
      if (parseInt(val_input.value) === 10) {
        alert(`số lượng sản phẩm ${name} chỉ có 10 thôi bạn ê`);
        return;
      }
      val_input.value = parseInt(val_input.value) + 1;
      const arrCart = find_name_cart(name, val_input.value);
      localStorage.setItem("dataCart", JSON.stringify(arrCart));
      renderCartZero();
    } else if (poiter.className.match("item-trash") || select) {
      if (!select) {
        media_lineItem = poiter.parentNode;
        name_trash = media_lineItem
          .querySelector(".item-title a")
          .textContent.trim();
        table_cart = $(".table-cart");
        document.body.insertAdjacentHTML("beforeend", temp_wranning);
      }
      if (select.match("yes")) {
        let arrCart = JSON.parse(localStorage.getItem("dataCart"));
        arrCart = arrCart.filter((item) => {
          return item[0] !== name_trash;
        });
        document.body.removeChild($(".wranning"));
        localStorage.setItem("dataCart", JSON.stringify(arrCart));
        renderCartZero();
        render_total_order();
      } else if (select === "no") {
        document.body.removeChild($(".wranning"));
      }
    }
    renderCartZero();
    // render_total_order();
  });
});

function renderCountLocal() {
  const arrCart = JSON.parse(localStorage.getItem("dataCart") || 0);
  let total = 0;
  if (arrCart) {
    arrCart.forEach((i) => {
      total += parseInt(i[3]);
    });
  }
  $(".count-holder span").textContent = total;
}

const temp_wranning = `<div class="wranning">
<div class="wranning-form">
  <div class="wranning_heading">
    <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
    <h1>Mày chắc chưa</h1>
  </div>
  <p class="warning_desc">
    Mày có chắc là muốn xóa sản phẩm đang chọn không ?
  </p>
  <div class="select_yes_no">
    <button data-select="yes">Xác Nhận</button>
    <button data-select="no">Hủy</button>
  </div>
</div>
</div>`;
