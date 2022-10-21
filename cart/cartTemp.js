export const template = `
<div class="action_dropdown_cart">
  <div class="sitenav_content">
    <div class="sitenav_content_title">
      <p class="text_title">Cart</p>
    </div>
    <div class="sitenav_content_block cart-view">
      <div class="cart-view-scroll">
        <div class="cart-view-render">
          <div class="mini-cart__empty" style="">
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
          </div>
        </div>
      </div>
    </div>
    <div class="cart-view-line"></div>
    <div class="cart-view-total">
      <div class="cart_total_text">
        <span class="total_text">Total:</span>
        <span class="total_price">$0</span>
      </div>
      <form class="cart_button" action="../../cart/page_cart.html">
        <button type="submit" class="btn btn-animation">
          <span></span>
          <span></span>
          <span></span>
          <span>View Cart</span>
        </button>
      </form>
    </div>
  </div>
</div>`;
