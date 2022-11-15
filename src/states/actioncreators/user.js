import { store } from '../store'
const apis = require('../apis/user')

const loaded = (type, payload) => {
  return {
    type,
    payload
  }
}

export const signup = (image, name, email, password, isBuyer, isSeller, description) => {
  return async (dispatch) => {
    let a = await apis.signupAPI({ image, name, email, password, isBuyer, isSeller, description })
    dispatch(loaded("signup", a))
  }
}

export const login = (email, password) => {
  return async (dispatch) => {
    let a = await apis.loginAPI({ email, password })
    dispatch(loaded("login", a))
  }
}

export const myAcc = () => {
  return async (dispatch) => {
    let a = await apis.myAccAPI()
    dispatch(loaded("myAcc", a))
  }
}

export const findAcc = (id) => {
  return async (dispatch) => {
    let a = await apis.findAccAPI(id)
    dispatch(loaded("findAcc", a))
  }
}

export const lastSeen = (obj) => {
  return async (dispatch) => {
    let lastState = store.getState().usr
    let users = [...lastState]
    await users.forEach(usr => {
      if (usr._id === obj.id) {
        usr.lastActive = obj.status
      }
    });
    dispatch(loaded("lastSeen", users))
  }
}

export const editAcc = (image, name, description) => {
  return async (dispatch) => {
    let a = await apis.editAccAPI({ image, name, description })
    dispatch(loaded("editAcc", a))
  }
}

export const lostPass = (email) => {
  return async (dispatch) => {
    let a = await apis.lostPassAPI(email)
    dispatch(loaded("lostPass", a))
  }
}

export const newPass = (pwd) => {
  return async (dispatch) => {
    let a = await apis.newPassAPI(pwd)
    dispatch(loaded("newPass", a))
  }
}

export const verifyMail = (otp) => {
  return async (dispatch) => {
    let a = await apis.verifyMailAPI(otp)
    dispatch(loaded("verifyMail", a))
  }
}

export const resendMail = () => {
  return async (dispatch) => {
    let a = await apis.resendMailAPI()
    dispatch(loaded("resendMail", a))
  }
}

export const logoutCall = () => {
  return (dispatch) => {
    dispatch(loaded("logout", ""))
  }
}

export const delAcc = (pwd) => {
  return async (dispatch) => {
    let a = await apis.delAccAPI(pwd)
    dispatch(loaded("delAcc", a))
  }
}
