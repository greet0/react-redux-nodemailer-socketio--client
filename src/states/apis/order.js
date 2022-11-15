const host = `http://${process.env.REACT_APP_HOST}`
let token = localStorage.getItem("auth");

const tokenCall = () => {
     token = localStorage.getItem("auth") || "";

}

const readCartAPI = async () => {
     try {
          tokenCall()
          const response = await fetch(`${host}/cart`, {
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

const listInCartAPI = async (id) => {
     try {
          if (id === undefined || id === null) {
               return { error: "invalid argument" }
          }
          tokenCall()
          const response = await fetch(`${host}/cart/add/${id}`, {
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

const orderItemAPI = async (id) => {
     try {
          if (id === undefined || id === null) {
               return { error: "invalid argument" }
          }
          tokenCall()
          const response = await fetch(`${host}/order/${id}`, {
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

const uncartItemAPI = async (id) => {
     try {
          if (id === undefined || id === null) {
               return { error: "invalid argument" }
          }
          tokenCall()
          const response = await fetch(`${host}/cart/remove/${id}`, {
               method: "DELETE",
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

module.exports = { listInCartAPI, readCartAPI, orderItemAPI, uncartItemAPI }
