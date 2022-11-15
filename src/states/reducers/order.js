const initialState = []

const reducer = (state = initialState, action) => {
     switch (action.type) {
          case "listInCart":
               if (action.payload.error === undefined) {
                    return state = action.payload
               } else {
                    console.log(action.payload.error)
                    return state
               }

          case "uncartItem":
               if (action.payload.error === undefined) {
                    return state = action.payload
               } else {
                    console.log(action.payload.error)
                    return state
               }

          case "readCart":
               if (action.payload.error === undefined) {
                    return state = action.payload
               } else {
                    console.log(action.payload.error)
                    return state
               }

          case "orderItem":
               if (action.payload.error === undefined) {
                    return state = action.payload.cart
               } else {
                    console.log(action.payload.error)
                    return state
               }

          case "logout":
               return state = initialState

          case "delAcc":
               return state = initialState

          default:
               return state;
     }
}

export default reducer