const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
function log(val) {
  console.log(val);
}
function processed_price(price) {
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
let total = 0;
window.addEventListener("load", function () {
  const arrCart = JSON.parse(localStorage.getItem("dataCart"));
  arrCart.forEach((i) => {
    total += parseInt(i[2].trim().slice(1) * parseInt(i[3] * 24000));
    const temp = `<div class="media-line-item">
        <div class="item-left">
          <div class="amount-product">
            <span class="amout">${i[3]}</span>
          </div>
          <div class="item-img">
            <img
              src="${i[4]}"
              alt=""
            />
          </div>
        </div>
        <div class="item-middle">
          <h3 class="item-title">
            <span class="cart-title">${i[0]}</span>
          </h3>
          <div class="item-price">
            <span class="price-cur">
              <span>${processed_price(
                parseInt(i[2].trim().slice(1)) * 24000
              )}đ</span>
            </span>
          </div>
        </div>
        <div class="item-right">
          <div class="item-total-price">
            <span>${processed_price(
              parseInt(i[2].trim().slice(1) * parseInt(i[3] * 24000))
            )}đ</span>
          </div>
        </div>
      </div>`;
    $(".table-cart").insertAdjacentHTML("beforeend", temp);
  });
  $(".order-summary-subotal").textContent = `${processed_price(total)} VND`;
  $(".content-box").addEventListener("change", handleShip);
  $(".payment_rate").addEventListener("change", handlePayment);
  renderTotalPrice();
  [...$$(".list_short_coupon label")].forEach((i) => {
    i.addEventListener("click", handleDiscount);
  });
  $(".input-discoutn").addEventListener("input", function (e) {
    if (this.value) {
      $(".btn-discount").style = "";
      $(".btn-discount").classList.add("active");
    } else {
      $(".btn-discount").style = "pointer-events: none";
      $(".btn-discount").classList.remove("active");
    }
  });
  $(".btn-discount").addEventListener("click", function (e) {
    val = document.getElementById("in-discount");
    if (val.value === "UTC-IT3-10") {
      Swal.fire("Good job!", "You clicked the button!", "success");
      let price_discout = total * 0.1;
      renderTotalPrice(price_discout);
      price_discout = parseInt(
        `${price_discout}`.slice(0, `${price_discout}`.length - 3)
      );
      $(".order-summary-discount").textContent = `${processed_price(
        price_discout
      )},000 VND`;
      val.value = "";
      $(".btn-discount").style = "pointer-events: none";
      $(".btn-discount").classList.remove("active");
      $(".list_short_coupon label").style =
        "background-color: #c8c8c8; pointer-events: none";
      $(".list_short_coupon .sale-5").style = "";
      return;
    } else if (val.value === "UTC-IT3-5") {
      let price_discout = total * 0.05;
      renderTotalPrice(price_discout);
      price_discout = parseInt(
        `${price_discout}`.slice(0, `${price_discout}`.length - 3)
      );
      $(".order-summary-discount").textContent = `${processed_price(
        price_discout
      )},000 VND`;
      val.value = "";
      $(".btn-discount").style = "pointer-events: none";
      $(".btn-discount").classList.remove("active");
      $(".list_short_coupon .sale-5").style =
        "background-color: #c8c8c8; pointer-events: none";
      $(".list_short_coupon label").style = "";
      return;
    }
    $(".btn-discount").style = "pointer-events: none";
    $(".btn-discount").classList.remove("active");
    val.value = "";
    alert("Mã giảm giá của bạn không tồn tịa");
  });
  $(".btn-complete").addEventListener("click", handBtnComplete);
});

function renderTotalPrice(price_discout = 0) {
  let ship = $(".order-summary-ship").textContent;
  ship = ship.slice(0, 2) + ship.slice(3, ship.length - 1);
  if (ship.trim().length < 3) ship = 0;
  $(".payment-doe-price").textContent = `${processed_price(
    total - price_discout - parseInt(ship)
  )}`;
}

function handleShip(e) {
  const ship = $$(".ship-radio");
  let val_ship;
  ship.forEach((i) => {
    if (i.checked) {
      val_ship = i.value;
    }
  });
  $(".order-summary-ship").textContent = `${val_ship}đ`;

  renderTotalPrice();
}

function handlePayment(e) {
  const pay = $(".payment-radio-tel");
  if (pay.checked) {
    $(".wrap-content-payment").style = "";
  } else {
    $(".wrap-content-payment").style = "display: none";
  }
}

function handleDiscount(e) {
  if (e.target.className.match("sale-10")) {
    document.getElementById("in-discount").value = "UTC-IT3-10";
    $(".btn-discount").style = "";
    $(".btn-discount").classList.add("active");
  } else {
    document.getElementById("in-discount").value = "UTC-IT3-5";
    $(".btn-discount").style = "";
    $(".btn-discount").classList.add("active");
  }
}
function wait(timer = 0) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, timer);
  });
}
async function handBtnComplete() {
  temp = ` <div class="wrap-load">
  <div class="loader">
    <div class="inner one"></div>
    <div class="inner two"></div>
    <div class="inner three"></div>
  </div>
</div>`;
  document.body.insertAdjacentHTML("beforeend", temp);
  const wrap_load = $(".wrap-load");
  await wait(6000);
  wrap_load.removeChild(document.querySelector(".loader"));
  await wait(500);
  wrap_load.insertAdjacentHTML("beforeend", `<div class="receipt"></div>`);
}
