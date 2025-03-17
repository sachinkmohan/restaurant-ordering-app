import { menuArray } from "./data.js";

const menuItemsEl = document.getElementById("menu-items");
const orderSummaryEl = document.getElementById("order-summary");
const orderItemBtn = document.getElementById("order-item-btn");

document.addEventListener("click", (e) => {
  if (e.target.dataset.order) {
    handlePlaceOrderClick(Number(e.target.dataset.order));
  }
});

function handlePlaceOrderClick(orderId) {
  const orderObj = menuArray.filter((menuItem) => {
    return menuItem.id === orderId;
  })[0];
  const orderedItemName = orderObj.name;
  const orderedItemPrice = orderObj.price;
  renderOrderSummary();
}

function renderOrderSummary() {
  let orderSummaryItemsHtml = ` <div>
          <h2>Your Order</h2>
          <div class="order-items-container">
            <ul id="order-items">
              <li class="order-item">
                <div class="item-name-in-summary">
                  <span>Pizza</span
                  ><button class="remove-item-btn">remove</button>
                </div>

                <span class="item-price">$14</span>
              </li>
            </ul>
          </div>
          <div class="total">
            <span>Total price: </span>
            <span id="total-price">$14</span>
          </div>
          <button id="place-order-btn">Place Order</button>
        </div>`;
  orderSummaryEl.innerHTML = orderSummaryItemsHtml;
}

function renderMenuItems() {
  let menuItemsHtml = ``;
  menuArray.forEach((item) => {
    menuItemsHtml += `
    <div class="menu-item-container">
        <div class="menu-item">
            <p class="emoji">${item.emoji}</p>
            <div class="item-name">
                <h2>${item.name}</h2>
                <h5>${item.ingredients}</h5>
                <p>$${item.price}</p>
            </div>
        </div>
            <button id="order-item-btn" >
            <i class="fa-solid fa-circle-plus" data-order="${item.id}"></i>
            </button>
    </div>
    `;
  });
  menuItemsEl.innerHTML = menuItemsHtml;
}

renderMenuItems();
