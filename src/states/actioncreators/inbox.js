import { store } from '../store'
const apis = require('../apis/user')

const loaded = (type, payload) => {
  return {
    type,
    payload
  }
}

let openUser = ""

export const listSentMsg = (arr) => {
  return async (dispatch) => {
    let lastInbox = store.getState().inbox
    let lastUsers = store.getState().usr
    let usrs = [...lastUsers]
    let ib = [...lastInbox]
    await arr.forEach(msg => {
      ib.push(msg)
      let useri = usrs.findIndex(e => e._id === msg.from || e._id === msg.to)
      if (useri !== -1) {
        usrs[useri].new = 0
      }
    });
    let sortedBox = ib.sort((a, b) => new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1)
    let sortedUsrs = usrs.sort((a, b) =>
      sortedBox.findIndex(e => e.from === a._id || e.to === a._id) < sortedBox.findIndex(e => e.from === b._id || e.to === b._id) ? 1 : -1)
    dispatch(loaded("listSentMsg", { inbox: [...new Set(sortedBox)], users: sortedUsrs }))
  }
}

export const listOnMsg = (msgs, from) => {
  return async (dispatch) => {
    let lastInbox = store.getState().inbox
    let lastUsers = store.getState().usr
    let me = store.getState().me
    let usrs = [...lastUsers]
    let ib = [...lastInbox]

    if (msgs.length === 0 && from !== "") {
      let n = usrs.findIndex(e => e._id === from || e._id === from)
      if (n === -1) {
        let a = await apis.findAccAPI(from)
        if (!a.error) {
          usrs.push(a)
        }
      }
    }
    for (let msgi = 0; msgi < msgs.length; msgi++) {
      const msg = msgs[msgi];
      let i = ib.findIndex(e => e._id === msg._id)
      if (i === -1) {
        ib.push(msg)
        let n = usrs.findIndex(e => e._id === msg.from || e._id === msg.to)
        if (n === -1 && msg.to === me._id) {
          let a = await apis.findAccAPI(msg.from)
          if (!a.error) {
            usrs.push(a)
          }
        }
        if (n === -1 && msg.from === me._id) {
          let a = await apis.findAccAPI(msg.to)
          if (!a.error) {
            usrs.push(a)
          }
        }
        let useri = usrs.findIndex(e => e._id === msg.from || e._id === msg.to)
        if (useri !== -1) {
          if (openUser !== usrs[useri]?._id && (msg.status === undefined || msg.status === "sent")) {
            usrs[useri].new = (usrs[useri].new || 0) + 1
          }
          else {
            usrs[useri].new = usrs[useri].new || 0
          }
        }
      }
    }
    const round = new Set()
    ib = ib.filter(x => {
      const duplicate = round.has(x.createdAt + x.from)
      round.add(x.createdAt + x.from)
      return !duplicate
    })
    let sortedBox = ib.sort((a, b) => new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1)
    let sortedUsrs = usrs.sort((a, b) =>
      sortedBox.findIndex(e => e.from === a._id || e.to === a._id) < sortedBox.findIndex(e => e.from === b._id || e.to === b._id) ? 1 : -1)
    dispatch(loaded("listOnMsg", { inbox: sortedBox, users: sortedUsrs }))
  }
}

export const msgStatusMod = (arr) => {
  return async (dispatch) => {
    let lastInbox = store.getState().inbox
    let lastUsers = store.getState().usr
    let usrs = [...lastUsers]
    let ib = [...lastInbox]
    await ib.forEach(msg => {
      if (arr.user === msg.from || arr.user === "") {
        msg.status = arr.status
        if (arr.status === "read") {
          openUser = arr.user
          let useri = usrs.findIndex(e => e._id === msg.from || e._id === msg.to)
          if (useri !== -1) {
            usrs[useri].new = 0
          }
        } else {
          openUser = ""
        }
      }
    });
    dispatch(loaded("msgStatusMod", { inbox: ib, users: usrs }))
  }
}
