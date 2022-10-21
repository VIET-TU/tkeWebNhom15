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
window.addEventListener("load", function () {
  const arrCart = JSON.parse(localStorage.getItem("dataCart"));
  let total = 0;
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
  let discount = $(".order-summary-discount").textContent;
  if (discount.trim().length < 2) discount = 0;
  $(".payment-doe-price").textContent = `${processed_price(total - discount)}`;

  let city;
  $(".city").addEventListener("change", function (e) {
    log(this.value);
    if (this.value === "null") {
      $(".distric").textContent = "";
      $(".distric").insertAdjacentHTML(
        "beforeend",
        `<option value="null">Quận / Huyện</option>`
      );
      $(".ward").textContent = "";
      $(".ward").insertAdjacentHTML(
        "beforeend",
        `<option value="null">Phường / Xã</option>`
      );
      $(".select-distric").style = `pointer-events: none;opacity: 0.5`;
      $(".select-ward").style = "pointer-events: none; opacity: 0.5";
      return;
    }
    city = this.value;
    $(".select-distric").style = `pointer-events: visible;opacity: 1`;
    $(".distric").innerHtml = ` <option value="null">Quận / Huyện</option>`;
    const temp = `  <option value="btn">Quận Bắc Từ Niêm</option>
                    <option value="ntn">Quận Nam Từ Niêm</option>
                    <option value="cg">Quận cầu giấy</option>
                    <option value="hd">Quận Hà Đông</option>
                    <option value="dd">Quận Đống Đa</option>`;
    $(".distric").insertAdjacentHTML("beforeend", temp);
    handleDistric();
  });
  // event submit
  $(".form-main").addEventListener("submit", handleSubmitformMain);
});

function handleSubmitformMain(e) {
  const nameClient = this.elements["name-clinet"].value.trim();
  const email = this.elements["email"].value.trim();
  const phone = this.elements["phone"].value;
  const city = this.elements["city"].value;
  const distric = this.elements["distric"].value;
  const ward = this.elements["ward"].value;
  const add_detial = this.elements["address"].value.trim();
  const regexName =
    /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u;
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  if (!regexName.test(nameClient)) {
    alert("Bạn nhập tên chưa đúng");
    e.preventDefault();
    return;
  }
  if (!regexName.test(email)) {
    alert("Bạn nhập email chưa đúng");
    e.preventDefault();
    return;
  }
  if (!regexPhone.test(phone)) {
    alert("Bạn nhập số điện thoại chưa đúng");
    e.preventDefault();
    return;
  }
  if (city === "null") {
    alert("Bạn nhập chưa nhập tên tỉnh / thành");
    e.preventDefault();
    return;
  }
  if (distric === "null") {
    alert("Bạn nhập chưa nhập tên quận / huyện");
    e.preventDefault();
    return;
  }
  if (distric === "null") {
    alert("Bạn nhập chưa nhập tên phường / huyện");
    e.preventDefault();
    return;
  }
  if (!add_detial) {
    alert("Bạn nhập chưa nhập tên địa chỉ");
    e.preventDefault();
    return;
  }
  const arrayForm = [nameClient, email, phone, city, distric, ward, add_detial];
  log(nameClient);
  localStorage.setItem("form-main", arrayForm);
}

function handleDistric() {
  $(".distric").addEventListener("change", function (e) {
    if (this.value === "null") {
      $(".ward").textContent = "";
      $(".ward").insertAdjacentHTML(
        "beforeend",
        `<option value="null">Phường / Xã</option>`
      );
      $(".select-ward").style = "pointer-events: none; opacity: 0.5";
      return;
    }
    $(".select-ward").style = "pointer-events: visible; opacity: 1";
    log(this.value);
    $(".ward").innerHtml = `<option value="null">Phường / Xã</option>`;
    data_wrap[this.value].forEach((i) => {
      const temp = `<option value="${i}">Quận ${i}</option>`;
      $(".ward").insertAdjacentHTML("beforeend", temp);
    });
  });
}

const data_wrap = {
  btn: [
    "Cổ Nhuế 1",
    "Cổ Nhuế 2",
    "Liên Mạc",
    "Minh Khai",
    "Phú Diễn",
    "Phúc Diễn",
    "Thượng Cát",
    "Thụy Phương",
    "Tây Tựu",
    "Xuân Tảo",
    "Xuân Đỉnh",
    "Đông Ngạc",
    "Đức Thắng",
  ],
  ntn: [
    "Cầu Diễn",
    "Mễ Trì",
    "Mỹ Đình 1",
    "Mỹ Đình 2",
    "Phú Đô",
    "Phương Canh",
    "Trung Văn",
    "Tây Mỗ",
    "Xuân Phương",
    "Đại Mỗ",
  ],
  cg: [
    "Cầu Diễn",
    "Mễ Trì",
    "Mỹ Đình 1",
    "Mỹ Đình 2",
    "Phú Đô",
    "Phương Canh",
    "Trung Văn",
    "Tây Mỗ",
    "Xuân Phương",
    "Đại Mỗ",
  ],
  dd: [
    "Cát Linh",
    "Hàng Bột",
    "Khâm Thiên",
    "Khương Thượng",
    "Kim Liên",
    "Láng Hạ",
    "Láng Thượng",
    "Nam Đồng",
    "Ngã Tư Sở",
    "Phương Liên",
    "Phương Mai",
    "Quang Trung",
    "Quốc Tử Giám",
    "Thịnh Quang",
    "Thổ Quan",
    "Trung Liệt",
    "Trung Phụng",
    "Trung Tự",
    "Văn Chương",
    "Văn Miếu",
    "Ô Chợ Dừa",
  ],
  hd: [
    "Biên Giang",
    "Dương Nội",
    "Hà Cầu",
    "Kiến Hưng",
    "La Khê",
    "Mộ Lao",
    "Nguyễn Trãi",
    "Phú La",
    "Phú Lãm",
    "Phú Lương",
    "Phúc La",
    "Quang Trung",
    "Văn Quán",
    "Vạn Phúc",
    "Yên Nghĩa",
    "Yết Kiêu",
    "Đồng Mai",
  ],
  hbt: [
    "Bách Khoa",
    "Bùi Thị Xuân",
    "Bạch Mai",
    "Bạch Đằng",
    "Cầu Dền",
    "Lê Đại Hành",
    "Minh Khai",
    "Nguyễn Du",
    "Ngô Thì Nhậm",
    "Phạm Đình Hổ",
    "Phố Huế",
    "Quỳnh Lôi",
    "Quỳnh Mai",
    "Thanh Lương",
    "Thanh Nhàn",
    "Trương Định",
    "Vĩnh Tuy",
    "Đống Mác",
    "Đồng Nhân",
    "Đồng Tâm",
  ],
  hk: [
    "Chương Dương Độ",
    "Cửa Nam",
    "Cửa Đông",
    "Hàng Buồm",
    "Hàng Bài",
    "Hàng Bông",
    "Hàng Bạc",
    "Hàng Bồ",
    "Hàng Gai",
    "Hàng Mã",
    "Hàng Trống",
    "Hàng Đào",
    "Lý Thái Tổ",
    "Phan Chu Trinh",
    "Phúc Tân",
    "Tràng Tiền",
    "Trần Hưng Đạo",
    "Đồng Xuân",
  ],
  lb: [
    "Bồ Đề",
    "Cự Khối",
    "Gia Thụy",
    "Giang Biên",
    "Long Biên",
    "Ngọc Lâm",
    "Ngọc Thụy",
    "Phúc Lợi",
    "Phúc Đồng",
    "Sài Đồng",
    "Thượng Thanh",
    "Thạch Bàn",
    "Việt Hưng",
    "Đức Giang",
  ],
  hm: [
    "Giáp Bát",
    "Hoàng Liệt",
    "Hoàng Văn",
    "Lĩnh Nam",
    "Mai Động",
    "Thanh Trì",
    "Thịnh Liệt",
    "Trần Phú",
    "Tân Mai",
    "Tương Mai",
    "Vĩnh Hưng",
    "Yên Sở",
    "Đại Kim",
    "Định Công",
  ],
  hk: [
    "Chương Dương Độ",
    "Cửa Nam",
    "Cửa Đông",
    "Hàng Buồm",
    "Hàng Bài",
    "Hàng Bông",
    "Hàng Bạc",
    "Hàng Bồ",
    "Hàng Gai",
    "Hàng Mã",
    "Hàng Trống",
    "Hàng Đào",
    "Lý Thái Tổ",
    "Phan Chu Trinh",
    "Phúc Tân",
    "Tràng Tiền",
    "Trần Hưng Đạo",
    "Đồng Xuân",
  ],
  tx: [
    "Hạ Đình",
    "Khương Mai",
    "Khương Trung",
    "Khương Đình",
    "Kim Giang",
    "Nhân Chính",
    "Phương Liệt",
    "Thanh Xuân Bắc",
    "Thanh Xuân Nam",
    "Thanh Xuân Trung",
    "Thượng Đình",
  ],
};

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

[...$$(".list_short_coupon label")].forEach((i) => {
  i.addEventListener("click", handleDiscount);
});

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
