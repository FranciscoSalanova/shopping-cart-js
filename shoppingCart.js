import formatCurrency from "./util/formatCurrency.js"
import items from "./items.json"

const cartButton = document.querySelector("[data-cart-button]")
const cartItemsWrapper = document.querySelector("[data-cart-items-wrapper]")
const cartItemTemplate = document.querySelector("#cart-item-template")
const cartItemContainer = document.querySelector("[data-cart-items]")
const cartQuantity = document.querySelector("[data-cart-quantity]")
const cartTotal = document.querySelector("[data-cart-total]")
const cart = document.querySelector("[data-cart]")

const IMAGE_URL = "https://dummyimage.com/210x130"
let shoppingCart = []

export function setupShoppingCart() {
  renderCart()
}

// Persist the cart accross multiple pages

cartButton.addEventListener("click", () => {
  cartItemsWrapper.classList.toggle("invisible")
})

function renderCart() {
  if (shoppingCart.length === 0) {
    hideCart()
  } else {
    showCart()
    renderCartItems()
  }
}

function hideCart() {
  cart.classList.add("invisible")
  cartItemsWrapper.classList.add("invisible")
}

function showCart() {
  cart.classList.remove("invisible")
}

export function addToCart(id) {
  const existingItem = shoppingCart.find((entry) => entry.id === id)
  if (existingItem) {
    existingItem.quantity++
  } else {
    shoppingCart.push({ id: id, quantity: 1 })
  }

  renderCart()
}

// Remove items from cart

function renderCartItems() {
  cartQuantity.innerHTML = shoppingCart.length

  const total = shoppingCart.reduce((total, cartItem) => {
    const inventoryItem = items.find((item) => item.id === cartItem.id)
    return total + inventoryItem.priceCents * cartItem.quantity
  }, 0)
  cartTotal.innerHTML = formatCurrency(total / 100)

  cartItemContainer.innerHTML = ""
  shoppingCart.forEach((entry) => {
    const cartItem = cartItemTemplate.content.cloneNode(true)
    const item = items.find((item) => item.id === entry.id)

    const container = cartItem.querySelector("[data-item]")
    container.dataset.itemId = item.id
    const name = cartItem.querySelector("[data-name]")
    name.innerText = item.name
    if (entry.quantity > 1) {
      const quantity = cartItem.querySelector("[data-quantity]")
      quantity.innerText = `x${entry.quantity}`
    }
    const price = cartItem.querySelector("[data-price]")
    price.innerText = formatCurrency((item.priceCents * entry.quantity) / 100)
    const image = cartItem.querySelector("[data-image]")
    image.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`

    cartItemContainer.appendChild(cartItem)
  })
}
