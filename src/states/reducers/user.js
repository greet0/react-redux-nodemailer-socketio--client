const initialState = []

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "findAcc":
            if (action.payload.error === undefined) {
                return state = [action.payload]
            } else {
                console.log(action.payload.error)
                return state
            }

        case "listOnMsg":
            if (action.payload.users !== undefined) {
                return state = action.payload.users
            } else {
                console.log(action.payload.error)
                return state
            }

        case "listSentMsg":
            return state = action.payload.users
            
        case "msgStatusMod":
            return state = action.payload.users
            

        case "lastSeen":
            return state = action.payload

        default:
            return state;
    }
}

export default reducer