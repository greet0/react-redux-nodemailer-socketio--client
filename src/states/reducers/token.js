const initialState = localStorage.getItem("auth")

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "signup":
            if (action.payload.token !== undefined) {
                localStorage.setItem("deauth", action.payload.token)
                return state = null
            } else {
                return state
            }

        case "login":
            if (action.payload.token !== undefined) {
                if (!action.payload.success) {
                    localStorage.setItem("deauth", action.payload.token)
                    return state = null
                } else {
                    localStorage.removeItem("deauth")
                    document.cookie = `type=deauth; expires=${Date.now()-10}; path=/`;
                    return state = action.payload.token
                }
            } else {
                return state
            }

        case "lostPass":
            if (action.payload.token !== undefined) {
                localStorage.setItem("deauth", action.payload.token)
                return state = null
            } else {
                return state
            }

        case "verifyMail":
            if (action.payload.token !== undefined) {
                localStorage.removeItem("deauth")
                return state = action.payload.token
            } else {
                return state
            }

        case "resendMail":
            if (action.payload.token !== undefined) {
                localStorage.setItem("deauth", action.payload.token)
                return state = null
            } else {
                return state
            }

        case "logout":
            return state = null

        case "delAcc":
            if (action.payload.error === undefined) {
                return state = null
            } else {
                console.log(action.payload.error)
                return state
            }

        default:
            return state;
    }
}

export default reducer