window.addEventListener("load", function () {
  const imageCover = document.querySelector(".image-cover");
  imageCover.addEventListener("mousemove", handleHoverImage);
  const imageWrapper = document.querySelector(".image-wrapper");
  let imageWraperWidth = imageWrapper.offsetWidth;
  let imageWraperHeight = imageWrapper.offsetHeight;
  const image = document.querySelector(".image");
  function handleHoverImage(e) {
    const pX = e.pageX;
    const pY = e.pageY;
    image.style = "width: auto; height: auto; max-height: unset";
    let imageWidth = image.offsetWidth;
    let imageHeight = image.offsetHeight;
    let spaceX = (imageWidth / 2 - imageWraperWidth) * 2;
    let spaceY = (imageHeight / 2 - imageWraperHeight) * 2;
    imageWidth = imageWidth + spaceX;
    imageHeight = imageHeight + spaceY;
    let ratioX = imageWidth / imageWraperWidth / 2.6;
    let ratioY = imageHeight / imageWraperHeight / 2.6;
    let x = (pX - 50 - imageWrapper.offsetLeft) * ratioX;
    let y = (pY - 50 - imageWrapper.offsetTop) * ratioY;
    image.style = `left: ${-x}px; top: ${-y}px; width: auto; height: auto; max-height: unset; transform: none;`;
  }
  imageCover.addEventListener("mouseleave", handleLeaveImage);
  function handleLeaveImage() {
    image.style = "";
  }
});
window.addEventListener("load", function () {
  const flex_ontrol = this.document.querySelector(".flex-control-nav");
  const img_nav = this.document.querySelectorAll(".flex-control-nav .img-nav");
  const imgae = this.document.querySelector(".image");
  let img_current;
  flex_ontrol.addEventListener("click", (e) => {
    imgae.src = e.target.src;
    img_current = e.target.src;
    img_nav.forEach((item) => {
      item.classList.add("flex-active");
    });
    e.target.classList.remove("flex-active");
  });

  ///////////
  const de_re = this.document.querySelector(".desc-review");
  const de_re_lis = this.document.querySelectorAll(".desc-review li");
  const revi = this.document.querySelector(".tap-panel-review");
  const desc = this.document.querySelector(".tap-panel-desc");
  de_re.addEventListener("click", (e) => {
    de_re_lis.forEach((i) => i.classList.add("active-desc-revi"));
    if (e.target.className.match("desc-tap")) {
      de_re_lis[0].classList.add("active-desc-revi");
      de_re_lis[1].classList.remove("active-desc-revi");
      revi.style.display = "none";
      desc.style.display = "block";
    } else {
      de_re_lis[0].classList.remove("active-desc-revi");
      de_re_lis[1].classList.add("active-desc-revi");
      desc.style.display = "none";
      revi.style.display = "block";
    }
  });
  const icon_zoo = this.document.querySelector(".icon-zoo");
  let child;
  document.addEventListener("click", function (e) {
    child = document.querySelector(".image-full");
    if (e.target.className.match(icon_zoo.className)) {
      const image_full = `<div class="image-full">
            <div class="wrap-img">
                <i class="fa fa-times icon-close" aria-hidden="true"></i>
                        <img src="${imgae.src}" alt="">
                      </div>
                      </div>`;
      if (child) {
        const parentNode = child.parentNode;
        parentNode.removeChild(child);
      }
      document.body.insertAdjacentHTML("beforeend", image_full);
    }
    if (
      e.target.className.match("image-full") ||
      e.target.className.match("icon-close")
    ) {
      if (child) {
        const parentNode = child.parentNode;
        parentNode.removeChild(child);
      }
    }
  });
});
