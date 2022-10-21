import { producList } from "./productsList.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
function log(val) {
  console.log(val);
}
window.addEventListener("load", function () {
  const page1 = $(".page1");
  const page2 = $(".page2");
  let index = 1;
  producList.forEach((item) => {
    const template = `<div class="page-item">
    <div class="wrap-onsale" style="display: ${item.sale ? "" : "none"}">
      <span class="onSale">Sale!</span>
    </div>
    <a class="link-product" data-index="1" href="../../Products/products.html" >
              <img class="product-image" src="${
                item.image
              }" style="pointer-events: none;" alt="" />
            </a>
    <h2 class="product-title">${item.name}</h2>
    <div class="wrap-sale">
      <span class="price">
        <span class="price-amount price-pre" style="display: ${
          item.sale ? "" : "none"
        }">
          <span class="price-symbol price-sale">$${item.price_pre}</span>
        </span>
        <span class="price-amount price-cur ${item.sale ? "" : "active"}">
          <span class="price-symbol"> $${item.price}</span>
        </span>
      </span>
    </div>
  </div>`;
    if (index <= 13) {
      page1.insertAdjacentHTML("beforeend", template);
    } else {
      page2.insertAdjacentHTML("beforeend", template);

      page2.querySelectorAll(".product-image").forEach((i) => {
        if (
          page2.querySelector(".product-title").textContent === "Sunglasses" ||
          page2.querySelector(".product-title").textContent === "Tisso Watch"
        ) {
          i.style = "height: 240px; object-fit: cover; pointer-events: none;";
        }
      });
    }
    index++;
  });

  ////////////////////////

  const pageNumbers = $$(".page-numbers li");
  const containerContent = $(".container-content");
  const page_prev = $(".page-prev");
  const page_1 = $(".page-1");
  const page_2 = $(".page-2");
  const page_next = $(".page-next");
  page_prev.addEventListener("click", handClick);
  page_1.addEventListener("click", handClick);
  page_2.addEventListener("click", handClick);
  page_next.addEventListener("click", handClick);
  function handClick(e) {
    if (e.target.className.match("page-1")) {
      if (e.target.className.match("active")) {
        return;
      } else {
        containerContent.scrollLeft = 0;
        page_prev.style = "visibility: hidden; opacity: 0;";
        page_next.style = "visibility: visible; opacity: 1;";
        pageNumbers.forEach((e) => e.classList.remove("active"));
        e.target.classList.add("active");
      }
    } else if (e.target.className.match("page-2")) {
      if (e.target.className.match("active")) {
        return;
      } else {
        containerContent.scrollLeft = containerContent.scrollWidth;
        page_prev.style = "visibility: visible; opacity: 1;";
        page_next.style = "visibility: hidden; opacity: 0;";
        pageNumbers.forEach((e) => e.classList.remove("active"));
        e.target.classList.add("active");
      }
    } else if (e.target.className.match("page-prev")) {
      containerContent.scrollLeft = 0;
      page_prev.style = "visibility: hidden; opacity: 0;";
      page_next.style = "visibility: visible; opacity: 1;";
      pageNumbers.forEach((e) => e.classList.remove("active"));
      page_1.classList.add("active");
    } else if (e.target.className.match("page-next")) {
      containerContent.scrollLeft = containerContent.scrollWidth;
      page_next.style = "visibility: hidden; opacity: 0;";
      page_prev.style = "visibility: visible; opacity: 1;";
      pageNumbers.forEach((e) => e.classList.remove("active"));
      page_2.classList.add("active");
    }
  }
});
