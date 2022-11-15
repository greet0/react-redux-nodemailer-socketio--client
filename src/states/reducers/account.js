const initialState = {}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "myAcc":
            if (action.payload.error === undefined) {
                return state = action.payload
            } else {
                console.log(action.payload.error)
                return state
            }

        case "editAcc":
            if (action.payload.error === undefined) {
                return state = action.payload
            } else {
                console.log(action.payload.error)
                return state
            }

        case "orderItem":
            let me = {...state}
            me.balance = me.balance - action.payload.price || me.balance
            return state = me

        case "logout":
            return state = initialState

        case "delAcc":
            return state = initialState

        default:
            return state
    }
}

export default reducer