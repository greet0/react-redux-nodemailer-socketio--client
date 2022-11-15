const apis = require('../apis/prod')

const loaded = (type, payload) => {
  return {
    type,
    payload
  }
}

export const loadByID = (id) => {
  return async (dispatch) => {
    let a = await apis.loadByIDAPI(id)
    dispatch(loaded("loadByID", a))
  }
}

export const loadByUser = (id) => {
  return async (dispatch) => {
    let a = await apis.loadByUserAPI(id)
    dispatch(loaded("loadByUser", a))
  }
}

export const loadByUserAuth = (id) => {
  return async (dispatch) => {
    let a = await apis.loadByUserAuthAPI(id)
    dispatch(loaded("loadByUserAuth", a))
  }
}

export const createNew = (image, title, description, category, price) => {
  return async (dispatch) => {
    let a = await apis.createNewAPI({ image, title, description, category, price })
    let b = a
    if (a.error === undefined) {
      b = await apis.loadByUserAuthAPI("me")
    }
    dispatch(loaded("createNew", b))
  }
}

export const deleteOne = (id) => {
  return async (dispatch) => {
    let a = await apis.deleteOneAPI(id)
    dispatch(loaded("deleteOne", a))
  }
}

export const editOne = (id, image, title, description, category, price) => {
  return async (dispatch) => {
    let a = await apis.editOneAPI({ id, image, title, description, category, price })
    dispatch(loaded("editOne", a))
  }
}

export const searchMe = (term) => {
  return async (dispatch) => {
    let a = await apis.searchMeAPI(term)
    dispatch(loaded("search", a))
  }
}
