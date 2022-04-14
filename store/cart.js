import set from 'lodash/set'

export const state = () => ({
  cartItems: []
})

export const getters = {
  cartItems: (state) => state.cartItems,
  subtotal: (state) => {
    return state.cartItems.reduce((total, product) => {
      return product ? total + product.price * product.quantity : total
    }, 0)
  },
  selectedProducts: (state) => {
    const selectedProducts = []
    state.cartItems.forEach((item) => {
      if (item.selected) {
        selectedProducts.push(item)
      }
    })
    return selectedProducts
  }
}

export const actions = {
  selectProduct({ commit }, payload) {
    commit('SELECT_PRODUCT', payload)
  },
  addDataSelectedProduct({ commit }, payload) {
    commit('ADD_DATA', payload)
  },
  addToCart({ commit, state }, payload) {
    commit('ADD_TO_CART', payload)
  },
  updateCartQuantity: (context, payload) => {
    context.commit('UPDATE_CART_QUANTITY', payload)
  },
  setCartQuantity: (context, payload) => {
    context.commit('SET_CART_QUANTITY', payload)
  },
  updateCartExist: (context, payload) => {
    context.commit('UPDATE_CART_EXIST', payload)
  },
  updateSelectedProductsExistTrue: (context, payload) => {
    context.commit('UPDATE_SELECTED_PRODUCTS_EXIST_TRUE', payload)
  },
  removeCartItem({ commit }, payload) {
    commit('REMOVE_CART_ITEM', payload)
  },
  removeCartItems({ commit }, payload) {
    const { products } = payload
    if (products && products.length) {
      products.forEach((product) => {
        commit('REMOVE_CART_ITEM', product)
      })
    }
  },
  removeSelectedItem: (context, payload) => {
    context.commit('REMOVE_SELECTED_ITEM', payload)
  },
  clearSelectedCart: (context) => {
    context.commit('CLEAR_SELECTED_CART_ITEMS')
  },
  clearCart: (context) => {
    context.commit('CLEAR_CART_ITEMS')
  }
}

export const mutations = {
  SELECT_PRODUCT: (state, payload) => {
    const { product, selected } = payload
    state.cartItems.forEach((item) => {
      if (item.id === product.id) {
        item.selected = selected
      }
    })
  },
  ADD_DATA: (state, payload) => {
    const { field, value, id } = payload
    const indexCart = state.cartItems.findIndex((item) => item.id === id)
    set(state.cartItems[indexCart], field, value)
  },
  ADD_DATA_CART_ITEM: (state, payload) => {
    state.cartItems.push(payload)
  },
  ADD_TO_CART: (state, payload) => {
    const product = payload
    const cartItems = state.cartItems.find((item) => item.id === payload.id)
    const qty = payload.quantity ? payload.quantity : 1

    if (cartItems) {
      // cartItems.quantity = cartItems.quantity + 1
    } else {
      state.cartItems.push({
        ...product,
        quantity: qty
      })
    }
  },
  UPDATE_CART_QUANTITY: (state, payload) => {
    state.cartItems.find((items, index) => {
      if (items.id === payload.product.id) {
        const qty = state.cartItems[index].quantity + payload.qty
        if (qty !== 0) {
          state.cartItems[index].quantity = qty
        } else {
          state.cartItems.splice(index, 1)
        }
        return true
      }
    })
  },
  SET_CART_QUANTITY: (state, payload) => {
    state.cartItems.find((items, index) => {
      if (items.id === payload.id) {
        const qty = payload.qty
        if (qty !== 0) {
          state.cartItems[index].quantity = qty
        }
        return true
      }
    })
  },
  REMOVE_CART_ITEM: (state, payload) => {
    const index = state.cartItems.indexOf(payload)
    state.cartItems.splice(index, 1)
  },
  REMOVE_SELECTED_ITEM: (state, payload) => {
    const indexCart = state.cartItems.indexOf(payload)
    state.cartItems.splice(indexCart, 1)
  },
  CLEAR_SELECTED_CART_ITEMS: (state) => {
    state.cartItems = state.cartItems.filter((el) => el.selected !== true)
  },
  CLEAR_CART_ITEMS: (state) => {
    state.cartItems = []
  }
}
