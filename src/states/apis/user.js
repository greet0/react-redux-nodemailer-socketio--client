const host = `http://${process.env.REACT_APP_HOST}`
let token = localStorage.getItem("auth");
let tempToken = localStorage.getItem("deauth");

const tokenCall = () => {
     token = localStorage.getItem("auth") || "";

}

const tempTokenCall = () => {
     tempToken = localStorage.getItem("deauth");
     if (token === undefined) {
          token = ""
     }
}

const signupAPI = async (params) => {
     try {
          if (params === undefined || params === null) {
               return { error: "invalid argument" }
          }
          const response = await fetch(`${host}/user/join`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(params)
          })
          return response.json()
     } catch (error) {
          return { error: error }
     }
}

const loginAPI = async (params) => {
     try {
          if (params === undefined || params === null) {
               return { error: "invalid argument" }
          }
          const response = await fetch(`${host}/user/login`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(params)
          })
          return response.json()
     } catch (error) {
          return { error: error }
     }
}

const myAccAPI = async () => {
     try {
          tokenCall()
          const response = await fetch(`${host}/user/account`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    "authToken": token
               },
          })
          return response.json()
     } catch (error) {
          return { error: error }
     }
}

const findAccAPI = async (id) => {
     try {
          if (id === undefined || id === null) {
               return { error: "invalid argument" }
          }
          tokenCall()
          const response = await fetch(`${host}/user/find/${id}`, {
               method: "GET",
               headers: {
                    "Content-Type": "application/json",
                    "authToken": token
               },
          })
          return response.json()
     } catch (error) {
          return { error: error }
     }
}

const lostPassAPI = async (email) => {
     try {
          if (email === undefined || email === null) {
               return { error: "invalid argument" }
          }
          const response = await fetch(`${host}/user/passwordlost`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify({email})
          })
          return response.json()
     } catch (error) {
          return { error: error }
     }
}

const newPassAPI = async (password) => {
     try {
          if (password === undefined || password === null) {
               return { error: "invalid argument" }
          }
          const response = await fetch(`${host}/user/newpassword`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    "authToken": token
               },
               body: JSON.stringify({password})
          })
          return response.json()
     } catch (error) {
          return { error: error }
     }
}

const verifyMailAPI = async (otp) => {
     try {
          if (otp === undefined || otp === null) {
               return { error: "invalid argument" }
          }
          tempTokenCall()
          const response = await fetch(`${host}/user/verifyemail`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    "authToken": tempToken
               },
               body: JSON.stringify({otp})
          })
          return response.json()
     } catch (error) {
          return { error: error }
     }
}

const resendMailAPI = async () => {
     try {
          tempTokenCall()
          const response = await fetch(`${host}/user/resendmail`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    "authToken": tempToken
               },
          })
          return response.json()
     } catch (error) {
          return { error: error }
     }
}

const editAccAPI = async (params) => {
     try {
          if (params === undefined || params === null) {
               return { error: "invalid argument" }
          }
          tokenCall()
          const response = await fetch(`${host}/user/account/edit`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    "authToken": token
               },
               body: JSON.stringify(params)
          })
          return response.json()
     } catch (error) {
          return { error: error }
     }
}

const delAccAPI = async (password) => {
     try {
          if (password === undefined || password === null) {
               return { error: "invalid argument" }
          }
          tokenCall()
          const response = await fetch(`${host}/user/account/delete`, {
               method: "DELETE",
               headers: {
                    "Content-Type": "application/json",
                    "authToken": token
               },
               body: JSON.stringify({password})
          })
          return response.json()
     } catch (error) {
          return { error: error }
     }
}

module.exports = { signupAPI, loginAPI, myAccAPI, findAccAPI, editAccAPI, delAccAPI, verifyMailAPI, resendMailAPI, lostPassAPI, newPassAPI }
