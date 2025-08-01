const form = document.querySelector("#login-form")
// const inputForId = document.querySelector("#user_id")
// const inputForPassword = document.querySelector("#user_password")
const loginButton = document.querySelector("#login_button")

axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://localhost:3000"
console.log("---- here")

const login = () => {
    const userId = form.user_id.value
    const userPassword = form.user_password.value
    console.log("---- id, pw:", userId, userPassword)

    axios.post("/", {userId, userPassword})
}

loginButton.addEventListener("click", (event) => {
    event.preventDefault()
    login()
})
