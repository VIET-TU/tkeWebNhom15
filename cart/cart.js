import { producList } from "../Category/All products/productsList.js";
// import { template } from "./cartTemp.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
function log(val) {
  console.log(val);
}
const temp_mini_cart = `<div class="mini-cart__empty" style="">
<div>
  <div class="svgico-mini-cart">
    <svg
      width="81"
      height="70"
      viewBox="0 0 81 70"
      style="
        stroke: #000000;
        width: 50px;
        height: 50px;
        margin: 5px auto 0;
      "
    >
      <g
        transform="translate(0 2)"
        stroke-width="4"
        fill="none"
        fill-rule="evenodd"
      >
        <circle
          stroke-linecap="square"
          cx="34"
          cy="60"
          r="6"
        ></circle>
        <circle
          stroke-linecap="square"
          cx="67"
          cy="60"
          r="6"
        ></circle>
        <path
          d="M22.9360352 15h54.8070373l-4.3391876 30H30.3387146L19.6676025 0H.99560547"
        ></path>
      </g>
    </svg>
  </div>
  Your cart is currently empty.
</div>
</div>`;
export function renderCart() {
  renderCountHolder();
  renderTotalPricce();
  const arrCart = JSON.parse(localStorage.getItem("dataCart"));
  if ($(".cart-porduct-item")) {
    $(".cart-view-render-item").innerHTML = "";
    renderTotalPricce();
  }
  renderCartItem();
  renderTotalPricce();
  action_cart.classList.add("active_move");
  $(".menu-toggle-action_dropdown_cart").classList.add("active_move");
  numbers_click = 1;
}

let numbers_click = 0;
const cart = $(".cart");
const action_cart = $(".cart .action_dropdown_cart");
window.addEventListener("load", function () {
  renderCountLocal();
  cart.addEventListener("click", function (e) {
    renderTotalPricce();
    if (
      e.currentTarget.className === "cart" &&
      !e.target.className.match("menu-toggle-cart")
    ) {
      const poiter = e.target;
      const arrCart = JSON.parse(localStorage.getItem("dataCart")) || [];
      if (numbers_click === 0 || poiter.className !== "cart") {
        if ($(".cart-porduct-item")) {
          $(".cart-view-render-item").innerHTML = "";
          $(
            ".menu-toggle-cart-view-render .menu-toogle-cart-view-render-item"
          ).textContent = "";
          renderTotalPricce();
        }
        renderCartItem();
        renderTotalPricce();
        action_cart.classList.add("active_move");
        numbers_click = 1;
      } else {
        action_cart.classList.remove("active_move");
        numbers_click = 0;
        renderTotalPricce();
      }
    }
  });

  $(".menu-toggle-cart").addEventListener("click", function (e) {
    renderTotalPricce();
    const poiter = e.target;
    const arrCart = JSON.parse(localStorage.getItem("dataCart")) || [];
    if (numbers_click === 1 || poiter.className !== "menu-toggle-cart") {
      if (
        $(".menu-toggle-cart-view-render .menu-toogle-cart-view-render-item")
      ) {
        $(
          ".menu-toggle-cart-view-render .menu-toogle-cart-view-render-item"
        ).textContent = "";
        renderTotalPricce();
      }
      renderCartItem();
      renderTotalPricce();
      $(".menu-toggle-action_dropdown_cart").classList.add("active_move");
      numbers_click = 0;
    } else {
      $(".menu-toggle-action_dropdown_cart").classList.remove("active_move");
      numbers_click = 1;
      renderTotalPricce();
    }
  });

  this.document.body.addEventListener("click", function (e) {
    log(e.target);
    renderCountLocal();
    const poiter = e.target;

    function find_name_cart(name, val) {
      let arrCart = JSON.parse(localStorage.getItem("dataCart")) || [];
      arrCart.forEach((i) => {
        if (i[0] === name.trim()) {
          i[3] = val;
        }
      });
      return arrCart;
    }
    let val_input;
    if (poiter.className === "btn_cart-minus") {
      const parent = poiter.parentNode;
      const item_right = parent.parentNode.parentNode;
      val_input = parent.querySelector(".btn_cart-minus + input");
      if (val_input.value == 1) return;
      val_input.value = parseInt(val_input.value) - 1;
      renderCountHolder();
      renderCountLocal();
    } else if (poiter.className === "btn_cart-plus") {
      const parent = poiter.parentNode;
      val_input = parent.querySelector(".btn_cart-minus + input");
      if (parseInt(val_input.value) === 10) return;
      val_input.value = parseInt(val_input.value) + 1;
      renderCountHolder();
      renderCountLocal();
    } else if (poiter.className.match("button-minus")) {
      const parent = poiter.parentNode;
      const item_right = parent.parentNode.parentNode;
      const name = item_right.querySelector(".cart-title").innerText;
      val_input = parent.querySelector(".btn_cart-minus + input");
      if (val_input.value == 1) return;
      val_input.value = parseInt(val_input.value) - 1;
      $$(".cart-porduct-item").forEach((item) => {
        if (
          item.querySelector(".cart-title").innerText.trim() === name.trim()
        ) {
          item.querySelector(".btn_cart-minus + input").value = val_input.value;
          return;
        }
      });
      const arrCart = find_name_cart(name, val_input.value);
      localStorage.setItem("dataCart", JSON.stringify(arrCart));
      renderCountHolder();
      renderCountLocal();
    } else if (poiter.className.match("button-plus")) {
      const parent = poiter.parentNode;
      const item_right = parent.parentNode.parentNode;
      const name = item_right.querySelector(".cart-title").innerText;
      val_input = parent.querySelector(".btn_cart-minus + input");
      log(parseInt(val_input.value) + 1);
      if (parseInt(val_input.value) === 10) return;
      val_input.value = parseInt(val_input.value) + 1;
      $$(".cart-porduct-item").forEach((item) => {
        if (
          item.querySelector(".cart-title").innerText.trim() === name.trim()
        ) {
          item.querySelector(".btn_cart-minus + input").value = val_input.value;
          return;
        }
      });
      const arrCart = find_name_cart(name, val_input.value);
      localStorage.setItem("dataCart", JSON.stringify(arrCart));
      renderTotalPricce(); //
      renderCountHolder();
      renderCountLocal();
    } else if (poiter.className === "cart-remove") {
      const parent = e.target.parentNode;
      const name = parent.querySelector(".cart-title").innerText;
      let arrCart = JSON.parse(localStorage.getItem("dataCart")) || [];
      arrCart = arrCart.filter((item) => {
        return item[0] !== name.trim();
      });
      $$(".cart-porduct-item").forEach((item) => {
        if (
          item.querySelector(".cart-title").innerText.trim() === name.trim()
        ) {
          log(item);
          item.parentNode.removeChild(item);
          return;
        }
      });
      if (!$$(".cart-porduct-item").length) {
        $(".mini-cart__empty").style.display = "block";
        $(".menu-togglemini-cart__empty").style.display = "block";
      }
      localStorage.setItem("dataCart", JSON.stringify(arrCart));
      renderCountHolder();
      renderTotalPricce();
      renderCountHolder();
    }
  });
  /// end  hand minus plus close////
});

const mini_cart = $(".mini-cart__empty");

function renderCartItem() {
  const arrCart = JSON.parse(localStorage.getItem("dataCart")) || [];
  if (arrCart.length) {
    if ($(".mini-cart__empty")) mini_cart.style.display = "none";
    $(".menu-togglemini-cart__empty").style.display = "none";
    arrCart.forEach(function (i) {
      const temp = `<div class="cart-porduct-item">
      <div class="cart-porduct-item_left">
        <img src="${i[4]}" alt="" />
      </div>
      <div class="cart-porduct-item_right">
        <p class="cart-title">
          <span>${i[0]}</span>
        </p>
        <div class="cart-quantity">
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
          <div class="cart-price">${i[2]}</div>
        </div>
      </div>
      <div class="cart-remove">
        <i class="fa fa-times"></i>
      </div>
    </div>`;
      $(".cart-view-render-item").insertAdjacentHTML("beforeend", temp);
      $(".menu-toogle-cart-view-render-item").insertAdjacentHTML(
        "beforeend",
        temp
      );
    });
  } else {
    mini_cart.style.display = "block";
  }
}

function renderTotalPricce() {
  const arrCart = JSON.parse(localStorage.getItem("dataCart")) || [];
  if (arrCart) {
    const total_price = $(".total_price");
    let total = 0;
    arrCart.forEach((i) => {
      total += parseInt(i[2].trim().slice(1)) * parseInt(i[3]);
    });
    total_price.innerText = `$${total}.00`;
    $(".menu-toggle-total_price").innerText = `$${total}.00`;
  }
}

export function renderCountHolder() {
  const arrCart = JSON.parse(localStorage.getItem("dataCart") || 0);
  let count = 0;
  if (arrCart) {
    arrCart.forEach((i) => {
      count += parseInt(i[3]);
    });
  }
  $(".count-holder span").textContent = count;
  $(".menu-toggle-count-holder .menu-toggle-count").innerText = count;
}
export function renderCountLocal() {
  const arrCart = JSON.parse(localStorage.getItem("dataCart") || 0);
  let count = 0;
  if (arrCart) {
    arrCart.forEach((i) => {
      count += parseInt(i[3]);
    });
  }
  $(".count-holder span").textContent = count;
  $(".menu-toggle-count-holder .menu-toggle-count").innerText = count;
}
