const host = `http://${process.env.REACT_APP_HOST}`
let token = localStorage.getItem("auth");

const tokenCall = () => {
     token = localStorage.getItem("auth") || "";

}

const loadByIDAPI = async (id) => {
     try {
          if (id === undefined || id === null) {
               return { error: "invalid argument" }
          }
          tokenCall()
          const response = await fetch(`${host}/product/read/${id}`, {
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

const loadByUserAPI = async (id) => {
     try {
          if (id === undefined || id === null) {
               return { error: "invalid argument" }
          }
          tokenCall()
          const response = await fetch(`${host}/product/by/0/${id}`, {
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

const loadByUserAuthAPI = async (id) => {
     try {
          if (id === undefined || id === null) {
               return { error: "invalid argument" }
          }
          tokenCall()
          const response = await fetch(`${host}/product/by/1/${id}`, {
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

const createNewAPI = async (params) => {
     try {
          if (params === undefined || params === null) {
               return { error: "invalid argument" }
          }
          tokenCall()
          const response = await fetch(`${host}/product/add`, {
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

const deleteOneAPI = async (id) => {
     try {
          if (id === undefined || id === null) {
               return { error: "invalid argument" }
          }
          tokenCall()
          const response = await fetch(`${host}/product/delete/${id}`, {
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

const editOneAPI = async (params) => {
     try {
          if (params === undefined || params === null) {
               return { error: "invalid argument" }
          }
          tokenCall()
          const response = await fetch(`${host}/product/edit/${params.id}`, {
               method: "PUT",
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

const searchMeAPI = async (term) => {
     const spaceRemove = term.split(/[ ]+/)
     term = spaceRemove.join(" ")

     const findIn = (obj) => {
          if (obj.title.toUpperCase().indexOf(term.toUpperCase()) !== -1
               || obj.description.toUpperCase().indexOf(term.toUpperCase()) !== -1
               || obj.category.toUpperCase().indexOf(term.toUpperCase()) !== -1
               || JSON.stringify(obj.price) === term) {
               return obj
          }
     }
     try {
          if (term !== "") {
               let arr = loadByIDAPI("all")
                    .then(arr => arr.filter(item => item === findIn(item)))

               return arr
          } else {
               return { error: "invalid argument" }
          }
     } catch (error) {
          return { error: error }
     }
}

module.exports = { loadByIDAPI, loadByUserAPI, loadByUserAuthAPI, createNewAPI, editOneAPI, deleteOneAPI, searchMeAPI }
