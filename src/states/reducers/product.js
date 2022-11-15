const initialState = []

const reducer = (state = initialState, action) => {
     switch (action.type) {
          case "loadByID":
               if (action.payload.error === undefined) {
                    return state = action.payload
               } else {
                    console.log(action.payload.error)
                    return state
               }

          case "loadByUser":
               if (action.payload.error === undefined) {
                    return state = action.payload
               } else {
                    console.log(action.payload.error)
                    return state
               }

          case "loadByUserAuth":
               if (action.payload.error === undefined) {
                    return state = action.payload
               } else {
                    console.log(action.payload.error)
                    return state
               }

          case "createNew":
               if (action.payload.error === undefined) {
                    return state = action.payload
               } else {
                    console.log(action.payload.error)
                    return state
               }

          case "search":
               if (action.payload.error === undefined) {
                    return state = action.payload
               } else {
                    console.log(action.payload.error)
                    return state
               }

          default:
               return state;
     }
}

export default reducer