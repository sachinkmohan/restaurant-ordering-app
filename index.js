import { menuArray } from "./data.js";

const menuItemsEl = document.getElementById("menu-items");
const orderSummaryEl = document.getElementById("order-summary");
const orderItemBtn = document.getElementById("order-item-btn");
const removeBtn = document.getElementById("remove-item-btn");

let orderedItems = [];

document.addEventListener("click", (e) => {
  if (e.target.dataset.order) {
    handlePlaceOrderClick(Number(e.target.dataset.order));
  }
  if (e.target.dataset.remove) {
    removeItems(Number(e.target.dataset.remove));
    renderOrderSummary();
  }
});

function handlePlaceOrderClick(orderId) {
  const orderObj = menuArray.filter((menuItem) => {
    return menuItem.id === orderId;
  })[0];

  const orderedItemName = orderObj.name;
  const orderedItemPrice = orderObj.price;
  const orderedItemId = orderObj.id;

  orderedItems.push({
    name: orderedItemName,
    price: orderedItemPrice,
    id: orderedItemId,
  });
  console.log("items ordered", orderedItems);
  renderOrderSummary();
}

function renderOrderSummary() {
  let orderedItemsHtml = ``;
  orderedItems.forEach((item) => {
    orderedItemsHtml += `<ul id="order-items">
              <li class="order-item">
                <div class="item-name-in-summary">
                  <span>${item.name}</span
                  ><button id="remove-item-btn" data-remove=${item.id}>remove</button>
                </div>
                <span class="item-price">${item.price}</span>
              </li>
            </ul>`;
  });

  let totalPrice = orderedItems.reduce(
    (total, currentItem) => total + currentItem.price,
    0
  );

  let orderSummaryItemsHtml = `<div>
          <h2>Your Order</h2>
          <div class="order-items-container">
            ${orderedItemsHtml}
          </div>
          <div class="total">
            <span>Total price: </span>
            <span id="total-price">${totalPrice}</span>
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

function removeItems(id) {
  orderedItems = orderedItems.filter((item) => item.id !== id);
}

renderMenuItems();
