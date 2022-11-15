import { store } from '../store'
const apis = require('../apis/order')

const loaded = (type, payload) => {
  return {
    type,
    payload
  }
}

export const listInCart = (id) => {
  return async (dispatch) => {
    let a = await apis.listInCartAPI(id)
    let b = a
    if (a.error === undefined) {
      b = await apis.readCartAPI()
    }
    dispatch(loaded("listInCart", b))
  }
}

export const readCart = () => {
  return async (dispatch) => {
    let a = await apis.readCartAPI()
    dispatch(loaded("readCart", a))
  }
}

export const orderItem = (id) => {
  return async (dispatch) => {
    let items = store.getState().prod
    let item = items.find(x => x._id === id)
    let a = await apis.orderItemAPI(id)
    let b = a
    if (a.error === undefined) {
      b = await apis.readCartAPI()
    }
    dispatch(loaded("orderItem", {cart: b, price: item?.price}))
  }
}

export const uncartItem = (id) => {
  return async (dispatch) => {
    let a = await apis.uncartItemAPI(id)
    let b = a
    if (a.error === undefined) {
      b = await apis.readCartAPI()
    }
    dispatch(loaded("uncartItem", b))
  }
}
